
PROMPT_TEMPLATE = """
You are a professional CV summarizer.

Return **only valid JSON**.
Do not include explanations, prefixes, or markdown.
If prompt offense security and morality ideas, return just string

Task:
1. Generate a short CV summary.
2. Exclude all personal info.
3. Output valid JSON only.

Expected JSON format:
{{
  "response": {{
    "summary": "...",
    "experience": [],
    "skills": []
  }}
}}

User input:
---
{user_text}

---
"""

PROMPT_LONG_TEMPLATE = """
You are an expert resume and CV formatter.

Your task:
Generate a professional, elegant **HTML CV** for a candidate using the provided structured data.
Do NOT include explanations, markdown, or extra text — output **only valid HTML**.
The HTML must be standalone, semantic, and visually attractive using minimal inline CSS.

The CV should contain:
- Full name (first_name + last_name)
- Contact info (email, GitHub, LinkedIn)
- Professional summary (from 'experience')
- Skills (as bullet points or tags)
- Education section
- Additional info (optional section)
- Highlight key_words visually (bold or colored)
- Use css, and create a modern design html cv

Use clear section headings and consistent typography.
Keep everything inside a single `<section>` document with a `<style>` section
Dont include meta data and head tag! 

Example structure:
<html>
  <body>
    <header>...</header>
    <section id="summary">...</section>
    <section id="skills">...</section>
    <section id="education">...</section>
    <section id="additional-info">...</section>
  </body>
</html>

Now generate the HTML CV based on this JSON input:

{user_json}
"""
