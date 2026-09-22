import os
import sys
import unittest

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from src.utils.helpers import calculate_xp_level, hash_identifier
from src.models.models import UserProfile

class TestPlatformModelsAndHelpers(unittest.TestCase):
    def test_xp_level_calculation(self):
        self.assertEqual(calculate_xp_level(0), 1)
        self.assertEqual(calculate_xp_level(499), 1)
        self.assertEqual(calculate_xp_level(500), 2)
        self.assertEqual(calculate_xp_level(1500), 4)

    def test_hash_identifier(self):
        h = hash_identifier("test-lesson")
        self.assertEqual(len(h), 64)
        self.assertIsInstance(h, str)

    def test_user_profile_creation(self):
        user = UserProfile(user_id=1, username="abhimanyu", display_name="Abhimanyu Tiwari", xp=1000)
        self.assertEqual(user.username, "abhimanyu")
        self.assertEqual(user.xp, 1000)

if __name__ == '__main__':
    unittest.main()

