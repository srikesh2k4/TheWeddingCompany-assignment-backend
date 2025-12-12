import re
def slugify(name: str) -> str:
    s = name.strip().lower()
    s = re.sub(r'\s+', '_', s)
    s = re.sub(r'[^a-z0-9_]', '', s)
    return s
