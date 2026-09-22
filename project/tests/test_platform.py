"""
Automated Test Suite for Platform Models and Utilities
"""
from src.utils.helpers import calculate_xp_level, hash_identifier
from src.models.models import UserProfile

def test_xp_level_calculation():
    assert calculate_xp_level(0) == 1
    assert calculate_xp_level(499) == 1
    assert calculate_xp_level(500) == 2
    assert calculate_xp_level(1500) == 4

def test_hash_identifier():
    h = hash_identifier("test-lesson")
    assert len(h) == 64
    assert isinstance(h, str)

def test_user_profile_creation():
    user = UserProfile(user_id=1, username="abhimanyu", display_name="Abhimanyu Tiwari", xp=1000)
    assert user.username == "abhimanyu"
    assert user.xp == 1000
