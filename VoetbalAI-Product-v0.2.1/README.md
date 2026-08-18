# VoetbalAI Product v0.2.1

## Nieuw in v0.2
- Betere fictieve thumbnails met eigen clubbadges en redactionele symbolen
- Nieuwe wedstrijdstrip op de homepage
- Live Eredivisie-stand en komende wedstrijden voorbereid via football-data.org
- Automatische fallback naar demo-data wanneer er geen API-key is
- Uitgebreid Transfercenter
- Uitgebreidere clubpagina
- Extra demo-artikelen
- Responsive desktop/mobiel

## GitHub + Vercel
Upload/vervang de bestanden in dezelfde repository en laat Vercel opnieuw deployen.

### Live voetbaldata activeren
1. Maak een API-token aan bij football-data.org.
2. Ga in Vercel naar: Project → Settings → Environment Variables.
3. Voeg toe:
   FOOTBALL_DATA_API_KEY = jouw_token
4. Gebruik de variabele voor Production, Preview en Development indien gewenst.
5. Redeploy de site.

De API-key wordt alleen server-side gebruikt en staat dus niet in de browsercode.

## Zonder API-key
De website blijft volledig werken met DEMO DATA. Boven de stand en wedstrijden staat dan duidelijk `DEMO DATA`.

## Ontwikkelen lokaal
Node.js 20.9+

npm install
npm run dev

## Volgende productstap
v0.3: echte redactie-pipeline:
signaal → feitextractie → bronstatus → AI-artikel → review/publicatie.


## v0.2.1 patch
- Next.js bijgewerkt naar 16.2.11.
- React en React DOM bijgewerkt naar 19.2.6.
- Bedoeld om Vercel's blokkade op kwetsbare Next.js-versies op te lossen.
