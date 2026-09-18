"""
Curriculum Content Transformation & Parser
"""
import json
from typing import Dict, List, Any

def parse_lesson_meta(raw_content: str) -> Dict[str, Any]:
    """Extract metadata, title, and estimated completion time from lesson content."""
    lines = raw_content.splitlines()
    title = lines[0].replace("#", "").strip() if lines else "Untitled"
    return {
        "title": title,
        "line_count": len(lines),
        "word_count": sum(len(l.split()) for l in lines)
    }
