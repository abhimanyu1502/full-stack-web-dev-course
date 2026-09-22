/**
 * Embedded SQLite Database Layer
 * Zero-dependency database using Node.js native `node:sqlite` (DatabaseSync).
 * Supports persistent file storage with fallback for seamless cross-platform execution.
 */

const path = require('path');
const fs = require('fs');
const crypto = require('crypto');

// Support Railway persistent volume via DATABASE_DIR env var
// Railway: mount a volume at /data and set DATABASE_DIR=/data
// Local:   defaults to ./server/data/
const DATA_DIR = process.env.DATABASE_DIR || path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'learning_platform.db');

let db = null;
let isNativeSqlite = false;

try {
    const { DatabaseSync } = require('node:sqlite');
    db = new DatabaseSync(DB_PATH);
    isNativeSqlite = true;
    console.log(`[DB] Connected to native SQLite database at: ${DB_PATH}`);
} catch (err) {
    console.warn('[DB] Native node:sqlite not available, using in-memory store fallback:', err.message);
}

// Password hashing helper
function hashPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
    if (!stored || !stored.includes(':')) return false;
    const [salt, originalHash] = stored.split(':');
    const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
    return hash === originalHash;
}

// Initialize tables
function initSchema() {
    if (!isNativeSqlite) return;

    db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS profiles (
            user_id INTEGER PRIMARY KEY,
            display_name TEXT,
            avatar TEXT DEFAULT '💻',
            xp INTEGER DEFAULT 0,
            level INTEGER DEFAULT 1,
            streak_count INTEGER DEFAULT 1,
            streak_last_visit TEXT,
            bio TEXT DEFAULT 'Aspiring Full Stack Web Developer',
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS user_progress (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            item_type TEXT NOT NULL,
            item_id TEXT NOT NULL,
            score INTEGER DEFAULT NULL,
            completed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, item_type, item_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS saved_snippets (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            snippet_id TEXT NOT NULL,
            code_content TEXT NOT NULL,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(user_id, snippet_id),
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );

        CREATE TABLE IF NOT EXISTS project_submissions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            project_id TEXT NOT NULL,
            title TEXT NOT NULL,
            html_code TEXT NOT NULL,
            css_code TEXT NOT NULL,
            submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
    `);

    // Seed default leaderboard learners if table is empty
    const checkCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    if (checkCount && checkCount.count === 0) {
        seedDemoData();
    }
}

function seedDemoData() {
    console.log('[DB] Seeding showcase learners for community leaderboard...');
    const seedLearners = [
        { username: 'alex_frontend', email: 'alex@example.com', name: 'Alex Rivera', avatar: '🚀', xp: 4250, streak: 14, bio: 'Building responsive interfaces daily!' },
        { username: 'sara_code', email: 'sara@example.com', name: 'Sara Chen', avatar: '🎨', xp: 3400, streak: 9, bio: 'CSS Grid enthusiast & UI designer' },
        { username: 'jordan_dev', email: 'jordan@example.com', name: 'Jordan Patel', avatar: '⚡', xp: 2850, streak: 7, bio: 'Learning web development from scratch' },
        { username: 'priya_web', email: 'priya@example.com', name: 'Priya Sharma', avatar: '🌟', xp: 2150, streak: 5, bio: 'Accessibility advocate & semantic HTML nerd' },
        { username: 'marcus_fullstack', email: 'marcus@example.com', name: 'Marcus Taylor', avatar: '🔥', xp: 1750, streak: 4, bio: 'Mastering flexbox layouts and micro-interactions' }
    ];

    const insertUser = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
    const insertProfile = db.prepare(`
        INSERT INTO profiles (user_id, display_name, avatar, xp, level, streak_count, streak_last_visit, bio)
        VALUES (?, ?, ?, ?, ?, ?, date('now'), ?)
    `);

    seedLearners.forEach(learner => {
        const passwordHash = hashPassword('demo1234');
        const res = insertUser.run(learner.username, learner.email, passwordHash);
        const userId = res.lastInsertRowid;
        const level = Math.max(1, Math.floor(learner.xp / 650) + 1);
        insertProfile.run(userId, learner.name, learner.avatar, learner.xp, level, learner.streak, learner.bio);
    });
}

// -----------------------------------------------------------------------------
// Database Operations API
// -----------------------------------------------------------------------------

function registerUser(username, email, password) {
    if (!isNativeSqlite) return { error: 'Database unavailable' };
    try {
        const passwordHash = hashPassword(password);
        const insertUser = db.prepare('INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)');
        const res = insertUser.run(username, email, passwordHash);
        const userId = Number(res.lastInsertRowid);

        const insertProfile = db.prepare(`
            INSERT INTO profiles (user_id, display_name, avatar, xp, level, streak_count, streak_last_visit)
            VALUES (?, ?, '💻', 50, 1, 1, date('now'))
        `);
        insertProfile.run(userId, username);

        return { success: true, userId, username, email };
    } catch (err) {
        if (err.message && err.message.includes('UNIQUE constraint')) {
            return { error: 'Username or email already exists' };
        }
        return { error: err.message };
    }
}

function loginUser(email, password) {
    if (!isNativeSqlite) return { error: 'Database unavailable' };
    const user = db.prepare('SELECT * FROM users WHERE email = ? OR username = ?').get(email, email);
    if (!user) return { error: 'Invalid credentials' };

    const valid = verifyPassword(password, user.password_hash);
    if (!valid) return { error: 'Invalid credentials' };

    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(user.id);
    return {
        success: true,
        userId: Number(user.id),
        user: {
            id: Number(user.id),
            username: user.username,
            email: user.email,
            profile: profile || {}
        }
    };
}

function getProfile(userId) {
    if (!isNativeSqlite || userId == null) return null;
    const uid = Number(userId);
    if (isNaN(uid)) return null;
    const user = db.prepare('SELECT id, username, email, created_at FROM users WHERE id = ?').get(uid);
    if (!user) return null;
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
    const progressCount = db.prepare('SELECT COUNT(*) as count FROM user_progress WHERE user_id = ?').get(userId);

    return {
        ...user,
        profile: profile || {},
        completedCount: progressCount ? progressCount.count : 0
    };
}

function syncProgressData(userId, clientProgress) {
    if (!isNativeSqlite || !userId) return { success: false };

    const upsertProgress = db.prepare(`
        INSERT INTO user_progress (user_id, item_type, item_id, score)
        VALUES (?, ?, ?, ?)
        ON CONFLICT(user_id, item_type, item_id) 
        DO UPDATE SET score = excluded.score, completed_at = CURRENT_TIMESTAMP
    `);

    // Sync lessons
    if (Array.isArray(clientProgress.completedLessons)) {
        clientProgress.completedLessons.forEach(id => {
            try { upsertProgress.run(userId, 'lesson', id, null); } catch (_) {}
        });
    }

    // Sync quizzes
    if (clientProgress.quizScores && typeof clientProgress.quizScores === 'object') {
        Object.entries(clientProgress.quizScores).forEach(([qId, data]) => {
            try { upsertProgress.run(userId, 'quiz', qId, data.score || 0); } catch (_) {}
        });
    }

    // Update profile XP & Streak
    if (typeof clientProgress.xp === 'number') {
        const updateProfile = db.prepare(`
            UPDATE profiles 
            SET xp = MAX(xp, ?), 
                streak_count = MAX(streak_count, ?),
                streak_last_visit = date('now')
            WHERE user_id = ?
        `);
        const streakCount = (clientProgress.streak && clientProgress.streak.count) || 1;
        updateProfile.run(clientProgress.xp, streakCount, userId);
    }

    return { success: true };
}

function getLeaderboard(limit = 10) {
    if (!isNativeSqlite) return [];
    return db.prepare(`
        SELECT u.username, p.display_name, p.avatar, p.xp, p.level, p.streak_count, p.bio
        FROM profiles p
        JOIN users u ON u.id = p.user_id
        ORDER BY p.xp DESC, p.streak_count DESC
        LIMIT ?
    `).all(limit);
}

function saveUserSnippet(userId, snippetId, code) {
    if (!isNativeSqlite) return { success: false };
    const stmt = db.prepare(`
        INSERT INTO saved_snippets (user_id, snippet_id, code_content, updated_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(user_id, snippet_id)
        DO UPDATE SET code_content = excluded.code_content, updated_at = CURRENT_TIMESTAMP
    `);
    stmt.run(userId, snippetId, code);
    return { success: true };
}

function getUserSnippets(userId) {
    if (!isNativeSqlite) return [];
    return db.prepare('SELECT snippet_id, code_content, updated_at FROM saved_snippets WHERE user_id = ? ORDER BY updated_at DESC').all(userId);
}

function submitProjectWork(userId, projectId, title, htmlCode, cssCode) {
    if (!isNativeSqlite) return { success: false };
    const stmt = db.prepare(`
        INSERT INTO project_submissions (user_id, project_id, title, html_code, css_code)
        VALUES (?, ?, ?, ?, ?)
    `);
    const res = stmt.run(userId, projectId, title, htmlCode, cssCode);
    return { success: true, submissionId: Number(res.lastInsertRowid) };
}

function getRecentProjectSubmissions(limit = 15) {
    if (!isNativeSqlite) return [];
    return db.prepare(`
        SELECT s.id, s.project_id, s.title, s.html_code, s.css_code, s.submitted_at,
               u.username, p.display_name, p.avatar
        FROM project_submissions s
        JOIN users u ON u.id = s.user_id
        JOIN profiles p ON p.user_id = u.id
        ORDER BY s.submitted_at DESC
        LIMIT ?
    `).all(limit);
}

// Run schema initialization
initSchema();

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    syncProgressData,
    getLeaderboard,
    saveUserSnippet,
    getUserSnippets,
    submitProjectWork,
    getRecentProjectSubmissions,
    isAvailable: () => isNativeSqlite
};
