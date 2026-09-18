/**
 * Domain Models & Entity Schemas for HTML & CSS Mastery
 */

class UserProfileModel {
    constructor({ id, username, displayName, avatar = '👨‍💻', xp = 0, level = 1, streak = 1, bio = '' } = {}) {
        this.id = id;
        this.username = username;
        this.displayName = displayName || username;
        this.avatar = avatar;
        this.xp = xp;
        this.level = level;
        this.streak = streak;
        this.bio = bio;
    }
}

class ProgressModel {
    constructor({ userId, completedTopics = [], bookmarks = [], savedCode = {}, quizScores = {} } = {}) {
        this.userId = userId;
        this.completedTopics = completedTopics;
        this.bookmarks = bookmarks;
        this.savedCode = savedCode;
        this.quizScores = quizScores;
    }
}

module.exports = { UserProfileModel, ProgressModel };
