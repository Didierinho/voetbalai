# VoetbalAI Product v0.3.2

## Nieuw in v0.3
- Eerste echte redactieomgeving op `/redactie`
- Nieuwsfeit + club + categorie + bronnen + betrouwbaarheid invoeren
- Automatische conceptgeneratie
- Werkt zonder API-key met ingebouwde demo-engine
- Optionele OpenAI Responses API-koppeling via server-side environment variable
- Nieuwe fictieve editorial visual engine
- Geen simpele FR / EV / AD-cirkels meer als enige beeldtaal
- Verschillende visuals voor transfers, geruchten, selectie, training, wedstrijden en jeugd
- Bestaande homepage, transfercenter, categorie- en clubpagina's blijven werken
- Live voetbaldata-fallback uit v0.2 blijft behouden

## Deployen op Vercel
Upload de map `VoetbalAI-Product-v0.3` naar GitHub.
Zet in Vercel de Root Directory op:
`VoetbalAI-Product-v0.3`

Framework Preset: Next.js
Build / Output / Install overrides: uit.

## AI echt activeren
Zonder key werkt `/redactie` met de DEMO ENGINE.

Voor echte AI:
Vercel → Settings → Environment Variables

Voeg toe:
`OPENAI_API_KEY` = jouw OpenAI API key
`OPENAI_MODEL` = gpt-5.6

Redeploy daarna.

De key wordt alleen in de server-side route gebruikt en wordt niet naar de browser gestuurd.

## Football data
Optioneel:
`FOOTBALL_DATA_API_KEY` = jouw football-data.org token

## Belangrijk
v0.3 publiceert gegenereerde artikelen nog niet permanent in een database.
De knoppen 'Bewaar concept' en 'Publiceren' zijn voor nu interface-elementen.
De logische v0.4-stap is database + echte concept/publiceerworkflow + automatische broninvoer.


## v0.3.2
Geen nieuwe AI-afbeeldingen gegenereerd. Letterbadges, neplogo’s, vraagtekens en pijlen zijn verwijderd. De site gebruikt losse bestaande Pexels-stockfoto’s als tijdelijke redactionele assets.
