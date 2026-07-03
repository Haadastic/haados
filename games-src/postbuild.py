"""Post-process a pygbag build/web/index.html for HaadOS:
   1) repoint the runtime CDN from pygame-web.github.io to our self-hosted /cdn/
   2) restyle the loading screen to match the HaadOS theme

Usage: python postbuild.py <slug>   (operates on public/games/<slug>/index.html)
"""
import sys
from pathlib import Path

# HaadOS loader theme — injected before </head>, overrides pygbag defaults.
THEME_CSS = """
<style id="haados-loader">
  html, body { margin:0; height:100%; background:#141017 !important; }
  body {
    background:
      radial-gradient(900px 500px at 50% -10%, rgba(240,138,60,0.10), transparent 60%),
      #141017 !important;
    font-family: ui-monospace, "JetBrains Mono", Menlo, monospace !important;
    color:#f1e7d3;
  }
  #transfer { position:fixed; left:0; right:0; top:calc(50% + 46px);
    text-align:center; z-index:10; }
  #status { display:inline-block; margin:0 !important;
    color:#b0a084 !important; font-weight:normal !important;
    font-family: ui-monospace, monospace !important; font-size:12px;
    letter-spacing:0.04em; }
  #progress { -webkit-appearance:none; appearance:none;
    height:6px !important; width:240px !important; border:1px solid #372c1c;
    background:#1a140c; margin-top:12px; }
  #progress::-webkit-progress-bar { background:#1a140c; }
  #progress::-webkit-progress-value { background:#f08a3c; }
  #progress::-moz-progress-bar { background:#f08a3c; }
  #infobox {
    position:fixed !important; left:50% !important; top:50% !important;
    transform:translate(-50%,-50%);
    background:#1a140c !important; color:#f08a3c !important;
    border:2px solid #372c1c !important;
    box-shadow:0 18px 40px -16px rgba(0,0,0,0.7);
    padding:16px 26px !important; font-weight:normal !important;
    font-family: ui-monospace, monospace !important; font-size:13px;
    letter-spacing:0.03em; z-index:11; }
  #infobox::after {
    content:"first run unpacks python — a few seconds";
    display:block; margin-top:8px; color:#7a6c55; font-size:11px; }
  canvas.emscripten { background:#141017 !important; }
</style>
"""

def process(slug: str) -> None:
    idx = Path(__file__).resolve().parent.parent / "public" / "games" / slug / "index.html"
    html = idx.read_text(encoding="utf-8")

    # 1) self-host the runtime
    html = html.replace("https://pygame-web.github.io/cdn/", "/cdn/")

    # 2) friendlier loading copy + JS background color
    html = html.replace("Loading, please wait ...", "booting " + slug + " …")
    html = html.replace('body.style.background = "#7f7f7f"', 'body.style.background = "#141017"')

    # 3) inject the theme (once)
    if "haados-loader" not in html:
        html = html.replace("</head>", THEME_CSS + "\n</head>", 1)

    idx.write_text(html, encoding="utf-8", newline="")
    external = "pygame-web.github.io" in html
    print(f"{slug}: themed + repointed (external refs: {external})")

if __name__ == "__main__":
    process(sys.argv[1])
