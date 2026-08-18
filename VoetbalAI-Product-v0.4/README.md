# VoetbalAI Product v0.4

## Wat is nieuw
- Supabase/Postgres-ready database-laag
- Werkende `Bewaar concept` en `Publiceer artikel` workflow
- Redactie-dashboard met concept/gepubliceerd status
- Gepubliceerde database-artikelen verschijnen dynamisch op de homepage
- Dynamische artikelpagina's lezen uit dezelfde contentlaag
- Zonder database blijft de site gewoon in demo-modus werken
- AI-generator uit v0.3 blijft aanwezig
- Fotografische nieuwsbeelden uit v0.3.2 blijven aanwezig

## 1. Deployen
Upload `VoetbalAI-Product-v0.4` naar GitHub.
Vercel Root Directory:
`VoetbalAI-Product-v0.4`

Framework: Next.js
Build/Output/Install overrides: uit.

## 2. Supabase instellen
Maak een gratis Supabase-project.
Open in Supabase de SQL Editor en voer `supabase.sql` uit.

Voeg daarna in Vercel toe:
`NEXT_PUBLIC_SUPABASE_URL`
`SUPABASE_SERVICE_ROLE_KEY`

De service role key staat alleen server-side in Vercel en hoort NOOIT in GitHub.

Redeploy daarna.

## 3. OpenAI
Optioneel voor echte AI-generatie:
`OPENAI_API_KEY`
`OPENAI_MODEL`

Zonder OpenAI-key blijft de demo-generator werken.

## 4. Football data
Optioneel:
`FOOTBALL_DATA_API_KEY`

## Testworkflow
1. Open `/redactie`
2. Vul een nieuwsfeit in
3. Genereer concept
4. Klik `Bewaar concept` of `Publiceer artikel`
5. Bij een gekoppelde Supabase-database wordt het artikel permanent opgeslagen
6. Een gepubliceerd artikel verschijnt direct in de dynamische sitecontent

## Nog niet in v0.4
- echte gebruikerslogin/rechten
- automatische bronmonitoring
- afbeeldinggenerator per artikel
- scheduled publishing
- revisiegeschiedenis

Dat zijn logische vervolgstappen voor v0.5.
