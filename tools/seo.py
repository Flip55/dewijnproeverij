#!/usr/bin/env python3
"""Zet per pagina de SEO-tags in de <head>: title, description, canonical, Open Graph, robots.

Gebruik: python3 tools/seo.py          (schrijft alle pagina's + sitemap.xml)
De tabel PAGES is de enige plek om titels en beschrijvingen aan te passen.
"""
import re
from pathlib import Path

SITE = "https://dewijnproeverij.com"
ROOT = Path(__file__).resolve().parent.parent

# bestand: (title, description, indexeren?)
PAGES = {
    "index.html": (
        "Wijnproeverij in Gent, bij jou thuis — De wijnproeverij",
        "Wijnproeverij of wijndegustatie aan huis in Gent en omstreken. Wij brengen zes tot acht flessen en de uitleg, jij de vrienden. Wine tasting at home in Ghent, in English on request.",
        True),
    "proeverij.html": (
        "Wijndegustatie aan huis: formule en prijs — De wijnproeverij",
        "Zes tot tien vrienden, twee druivensoorten, zes tot acht flessen, ± €200 voor de hele groep. Zo verloopt een wijndegustatie aan huis bij De wijnproeverij.",
        True),
    "smaaktest.html": (
        "SommelAI smaaktest: welke wijn past bij jou?",
        "Doe de gratis SommelAI smaaktest en ontdek in een paar minuten welke druif bij jouw smaak past. Rood of wit, jij kiest.",
        True),
    "rode-wijn.html": (
        "Welke rode wijn past bij jou? Doe de test — SommelAI",
        "Cabernet, Pinot Noir, Malbec, Syrah of Primitivo? Beantwoord een handvol korte vragen en SommelAI vertelt welke rode druif bij jou past.",
        True),
    "witte-wijn.html": (
        "Welke witte wijn past bij jou? Doe de test — SommelAI",
        "Chardonnay, Sauvignon Blanc, Pinot Gris, Riesling of Gewürztraminer? Beantwoord een handvol korte vragen en SommelAI vertelt welke witte druif bij jou past.",
        True),
    "tips.html": (
        "Wijntips zonder snobisme — De wijnproeverij",
        "Praktische wijntips in gewoon Vlaams: aroma's herkennen, de termen die je moet kennen en proeven als een pro. Geen wijnsnobisme, wel goesting.",
        True),
    "wijnaromas.html": (
        "Wijnaroma's herkennen: zo ruik je wat er in je glas zit",
        "Rode vruchten, vanille, peper of natte steen: leer de belangrijkste wijnaroma's herkennen en waar ze vandaan komen. Zonder omwegen uitgelegd.",
        True),
    "wijnjargon.html": (
        "Wijnjargon voor beginners: de termen die je moet kennen",
        "Tannines, body, afdronk, terroir: de onmisbare wijntermen op een rijtje, uitgelegd in gewoon Vlaams. Handig voor je eerste (of tiende) proeverij.",
        True),
    "proeven-als-pro.html": (
        "Wijn proeven als een pro: kijken, ruiken, proeven",
        "Leer wijn proeven in drie stappen: kijken, ruiken en proeven. Zo haal je meer uit elk glas, thuis of op een wijnproeverij.",
        True),
    "over-ons.html": (
        "Over ons: drie jeugdvrienden met een wijnprobleem — De wijnproeverij",
        "Flip, Tim en Nick: drie jeugdvrienden uit de regio Gent die wijnproeven leuk en toegankelijk maken. Geen snobisme, wel kennis en goesting.",
        True),
    "contact.html": (
        "Wijnproeverij boeken in Gent en omstreken — Contact",
        "Vraag een datum aan voor een wijnproeverij aan huis in Gent en omstreken. Vertel ons wanneer, waar en met hoeveel; we antwoorden snel met een voorstel.",
        True),
    # niet indexeren: testpagina's en privé groepsoverzicht
    "cadeau.html": (
        "Een wijnproeverij cadeau geven: cadeaubon voor thuis",
        "Zoek je een origineel cadeau voor een wijnliefhebber in Gent en omstreken? Geef een wijnproeverij aan huis: zes tot tien vrienden, zes tot acht flessen, één avond om nooit te vergeten.",
        True),
    "groep.html": ("Groepsoverzicht — SommelAI", "Privé groepsoverzicht van een SommelAI-proeverij.", False),
}

OG_IMAGE = f"{SITE}/assets/og.png"


def head_block(fname, title, desc, index):
    url = SITE + "/" if fname == "index.html" else f"{SITE}/{fname}"
    lines = [
        f"<title>{title}</title>",
        f'<meta name="description" content="{desc}">',
        f'<link rel="canonical" href="{url}">',
    ]
    if not index:
        lines.append('<meta name="robots" content="noindex, nofollow">')
    lines += [
        '<meta property="og:type" content="website">',
        '<meta property="og:site_name" content="De wijnproeverij">',
        '<meta property="og:locale" content="nl_BE">',
        f'<meta property="og:title" content="{title}">',
        f'<meta property="og:description" content="{desc}">',
        f'<meta property="og:url" content="{url}">',
        f'<meta property="og:image" content="{OG_IMAGE}">',
        '<meta property="og:image:width" content="1200">',
        '<meta property="og:image:height" content="630">',
        '<meta name="twitter:card" content="summary_large_image">',
    ]
    return "\n".join(lines)


# Alles tussen <title> en de favicon-link wordt vervangen; de rest van de head blijft staan.
PATTERN = re.compile(r"<title>.*?(?=<link rel=\"icon\")", re.S)


def main():
    for fname, (title, desc, index) in PAGES.items():
        p = ROOT / fname
        html = p.read_text(encoding="utf-8")
        new, n = PATTERN.subn(head_block(fname, title, desc, index) + "\n", html, count=1)
        assert n == 1, f"geen title-blok gevonden in {fname}"
        p.write_text(new, encoding="utf-8")
        print("ok", fname)

    urls = [SITE + "/" if f == "index.html" else f"{SITE}/{f}" for f, v in PAGES.items() if v[2]]
    sm = ['<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    sm += [f"  <url><loc>{u}</loc></url>" for u in urls]
    sm.append("</urlset>\n")
    (ROOT / "sitemap.xml").write_text("\n".join(sm), encoding="utf-8")
    print("ok sitemap.xml", len(urls), "url's")


if __name__ == "__main__":
    main()
