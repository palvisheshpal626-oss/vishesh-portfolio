import asyncio
from pathlib import Path
from playwright.async_api import async_playwright
from pdfminer.high_level import extract_text
import pdfplumber

async def generate():
    html_path = Path("resume_template.html").resolve()
    pdf_path = Path("public/Vishesh_Kumar_Resume.pdf").resolve()
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(f"file:///{html_path.as_posix()}", wait_until="networkidle")
        await page.pdf(
            path=str(pdf_path),
            format="Letter",
            print_background=True,
            margin={"top": "0.35in", "bottom": "0.35in", "left": "0.45in", "right": "0.45in"}
        )
        await browser.close()
    
    with pdfplumber.open(str(pdf_path)) as pdf:
        print(f"Total Pages: {len(pdf.pages)}")
        for idx, page in enumerate(pdf.pages):
            txt = page.extract_text() or ""
            print(f"Page {idx+1} character length: {len(txt)}")
    
    # Copy to all target locations
    targets = [
        Path("VISHESH KUMAR (2).pdf").resolve(),
        Path("VISHESH KUMAR (2).pdf.pdf").resolve(),
        Path("public/VISHESH KUMAR (2).pdf").resolve(),
        Path("public/VISHESH KUMAR (2).pdf.pdf").resolve(),
        Path("VISHESH KUMAR RESUME.pdf").resolve(),
        Path("public/VISHESH KUMAR RESUME.pdf").resolve(),
        Path("VISHESH KUMAR.pdf").resolve(),
        Path("public/VISHESH KUMAR.pdf").resolve(),
        Path("public/Vishesh_Kumar_Resume.pdf").resolve(),
        Path("public/resume.pdf").resolve()
    ]
    for target in targets:
        target.write_bytes(pdf_path.read_bytes())
        print(f"Written to {target}")

if __name__ == "__main__":
    asyncio.run(generate())
