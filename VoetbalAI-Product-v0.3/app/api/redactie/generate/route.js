import {NextResponse} from "next/server";

function demoDraft(data){
 const certainty = {
  officieel:{status:"OFFICIEEL",score:"5/5"},
  sterk:{status:"MEERDERE BRONNEN",score:"4/5"},
  aannemelijk:{status:"AANNEMELIJK",score:"3/5"},
  gerucht:{status:"GERUCHT",score:"2/5"},
 }[data.certainty] || {status:"AANNEMELIJK",score:"3/5"};

 const event=(data.event||"").trim();
 const clean=event.replace(/\s+/g," ");
 const first=clean.split(".")[0] || `${data.club} zorgt voor nieuws`;
 let title=first;
 if(title.length>82) title=title.slice(0,79).trim()+"…";
 const guarded = certainty.score==="2/5" ? `Volgens de opgegeven bron wordt ${data.club} in verband gebracht met een nieuwe ontwikkeling. De informatie is nog niet officieel bevestigd.` :
 `Rond ${data.club} is een nieuwe ontwikkeling bekend geworden. De kern van het bericht is gebaseerd op de feiten die in de redactieomgeving zijn ingevoerd.`;
 return {
  mode:"demo",category:data.category||"Nieuws",club:data.club||"Voetbal",
  status:certainty.status,score:certainty.score,title,
  intro:clean || guarded,
  facts:[
   `Bronstatus: ${certainty.status.toLowerCase()}.`,
   `Primaire bron: ${data.source1||"niet opgegeven"}.`,
   data.source2 ? `Tweede bron: ${data.source2}.` : "Er is nog geen tweede bron opgegeven."
  ],
  body:`${guarded} ${clean} VoetbalAI houdt in deze productdemo expliciet rekening met de gekozen betrouwbaarheid. Onbevestigde informatie wordt daarom voorzichtig geformuleerd en officiële informatie kan stelliger worden beschreven. De volgende stap is dat deze concepttekst door een redacteur wordt gecontroleerd voordat publicatie plaatsvindt.`,
  analysis:`Voor de lezer is vooral relevant wat dit kan betekenen voor ${data.club}. In een volledige versie koppelt VoetbalAI hier automatisch selectie-, wedstrijd- en transferdata aan, maar die duiding blijft gescheiden van de bevestigde feiten.`
 };
}

function parseOutput(data){
 const chunks=[];
 for(const item of (data.output||[])){
  for(const c of (item.content||[])){
   if(c.type==="output_text" && c.text) chunks.push(c.text);
  }
 }
 return chunks.join("\n").trim();
}

export async function POST(req){
 try{
  const input=await req.json();
  if(!input.event?.trim()) return NextResponse.json({error:"Voer eerst een nieuwsfeit in."},{status:400});
  const apiKey=process.env.OPENAI_API_KEY;
  if(!apiKey) return NextResponse.json(demoDraft(input));

  const scoreMap={officieel:"5/5 officieel",sterk:"4/5 meerdere betrouwbare bronnen",aannemelijk:"3/5 aannemelijk",gerucht:"2/5 gerucht"};
  const prompt=`Je bent de Nederlandse voetbalredactie van VoetbalAI.
Gebruik ALLEEN de onderstaande aangeleverde feiten. Verzin geen namen, bedragen, quotes, blessures, contractdetails of bevestigingen.
Schrijf origineel; kopieer geen formuleringen uit bronnen.
Wanneer de status een gerucht is, formuleer nadrukkelijk voorzichtig.

Gebeurtenis: ${input.event}
Club: ${input.club}
Categorie: ${input.category}
Bron 1: ${input.source1}
Bron 2: ${input.source2||"geen"}
Bronstatus: ${scoreMap[input.certainty]||"3/5 aannemelijk"}

Geef uitsluitend geldige JSON met:
{"title":"","intro":"","facts":["","",""],"body":"","analysis":""}
Titel max 85 tekens. Intro max 240 tekens. Body 180-260 woorden. Analysis max 100 woorden.`;

  const response=await fetch("https://api.openai.com/v1/responses",{
   method:"POST",
   headers:{"Authorization":`Bearer ${apiKey}`,"Content-Type":"application/json"},
   body:JSON.stringify({
    model:process.env.OPENAI_MODEL || "gpt-5.6",
    input:prompt
   })
  });
  if(!response.ok){
   const txt=await response.text();
   console.error("OpenAI error",response.status,txt);
   return NextResponse.json({...demoDraft(input),mode:"demo",warning:"OpenAI-call mislukte; demo-generator gebruikt."});
  }
  const raw=await response.json();
  const text=parseOutput(raw);
  let generated;
  try{generated=JSON.parse(text.replace(/^```json\s*|\s*```$/g,""));}catch{generated=null;}
  if(!generated) return NextResponse.json({...demoDraft(input),warning:"AI-output kon niet als JSON worden gelezen; demo-generator gebruikt."});
  const certainty={officieel:{status:"OFFICIEEL",score:"5/5"},sterk:{status:"MEERDERE BRONNEN",score:"4/5"},aannemelijk:{status:"AANNEMELIJK",score:"3/5"},gerucht:{status:"GERUCHT",score:"2/5"}}[input.certainty];
  return NextResponse.json({mode:"openai",category:input.category,club:input.club,...certainty,...generated});
 }catch(e){
  console.error(e);
  return NextResponse.json({error:"Er ging iets mis in de redactie-engine."},{status:500});
 }
}
