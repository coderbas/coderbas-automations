# backend/config.example.py
import os

# Store secret in ENV, not in Git.
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "")
OTHER_SETTING   = "changeme"
