"""
Database and Data Models for Full Stack Learning Platform
"""
from dataclasses import dataclass, field
from typing import List, Optional
from datetime import datetime

@dataclass
class UserProfile:
    user_id: int
    username: str
    display_name: str
    avatar: str = "👨‍💻"
    xp: int = 0
    level: int = 1
    streak_count: int = 1
    bio: str = ""
    created_at: datetime = field(default_factory=datetime.now)

@dataclass
class LessonProgress:
    user_id: int
    lesson_id: str
    completed: bool = False
    score: Optional[int] = None
    completed_at: Optional[datetime] = None
