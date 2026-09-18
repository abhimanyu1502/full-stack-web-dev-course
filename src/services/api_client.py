"""
Client Service for Platform REST API
"""
import urllib.request
import json
from typing import Dict, Any

class PlatformAPIClient:
    def __init__(self, base_url: str = "http://localhost:5000"):
        self.base_url = base_url.rstrip("/")

    def get_health(self) -> Dict[str, Any]:
        req = urllib.request.Request(f"{self.base_url}/api/health")
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode("utf-8"))

    def get_leaderboard(self) -> Dict[str, Any]:
        req = urllib.request.Request(f"{self.base_url}/api/leaderboard")
        with urllib.request.urlopen(req) as res:
            return json.loads(res.read().decode("utf-8"))
