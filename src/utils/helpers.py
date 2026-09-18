"""
Platform Utilities and Helpers
"""
import hashlib

def calculate_xp_level(xp: int) -> int:
    """Compute user level based on accumulated XP points."""
    return max(1, (xp // 500) + 1)

def hash_identifier(val: str) -> str:
    """Generate SHA-256 fingerprint for cache keys."""
    return hashlib.sha256(val.encode("utf-8")).hexdigest()
