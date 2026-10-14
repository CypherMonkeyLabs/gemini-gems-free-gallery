"""Run any Gem as an app with the Gemini API.

Usage:
  export GEMINI_API_KEY="your-key"
  pip install google-genai
  python examples/gem_app.py gems/02-meeting-recap-desk.md "Recap these notes: ..."
"""
import os
import re
import sys

from google import genai
from google.genai import types


def load_instructions(path: str) -> str:
    text = open(path, encoding="utf-8").read()
    match = re.search(r"```text\n(.*?)```", text, re.S)
    if not match:
        sys.exit(f"No instructions block found in {path}")
    return match.group(1).strip()


def main() -> None:
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        sys.exit("Set the GEMINI_API_KEY environment variable first.")
    client = genai.Client(api_key=key)
    reply = client.models.generate_content(
        model=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"),
        contents=sys.argv[2],
        config=types.GenerateContentConfig(system_instruction=load_instructions(sys.argv[1])),
    )
    print(reply.text)


if __name__ == "__main__":
    main()
