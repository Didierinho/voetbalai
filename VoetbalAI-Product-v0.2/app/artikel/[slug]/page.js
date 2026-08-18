import {notFound} from "next/navigation"; import Link from "next/link";
import {articles} from "../../../lib/data"; import {Header,Footer,Thumb,Reliability,Card} from "../../../components/ui";
export default async function Article({params}){const {slug}=await params;const a=articles.find(x=>x.slug===slug);if(!a)notFound();
const related=articles.filter(x=>x.slug!==slug).slice(0,3);
return <><Header/><main className="wrap articlePage"><div className="breadcrumbs"><Link href="/">Home</Link> / {a.category} / {a.club}</div>
 <div className="articleGrid"><article className="story"><Reliability a={a}/><h1>{a.title}</h1><p className="lead">{a.intro}</p><div className="meta">{a.time} • Vandaag • AI-redactie</div><Thumb a={a} large/>
 <h2>Wat is er gebeurd?</h2><div className="facts"><p>✓ De kerninformatie is in deze demo als afzonderlijk feit opgeslagen.</p><p>✓ De bronstatus bepaalt hoe stellig het artikel wordt geschreven.</p><p>✓ Feit en AI-duiding worden bewust van elkaar gescheiden.</p></div>
 <h2>Het volledige verhaal</h2><p>Dit is een demonstratie van de uiteindelijke artikelervaring. In de productieversie wordt de tekst niet opgebouwd door een bestaand nieuwsartikel te herschrijven. Eerst worden gebeurtenissen uit toegestane bronnen vertaald naar gestructureerde feiten. Daarna genereert de redactie-engine op basis daarvan een nieuw Nederlandstalig bericht.</p>
 <p>Wanneer een gegeven nog niet bevestigd is, blijft dat zichtbaar. Een transfergerucht wordt dus niet automatisch een akkoord en een speler die weer meetraint wordt niet zonder bevestiging als wedstrijdfit beschreven.</p>
 <div className="analysis"><b>AI-DUIDING</b><h3>Waarom is dit belangrijk?</h3><p>Hier kan VoetbalAI context toevoegen: gevolgen voor de selectie, mogelijke vervolgstappen en relevante data. Deze sectie wordt duidelijk onderscheiden van het feitelijke nieuws.</p></div>
 <div className="sources"><b>Bronnen voor de feiten</b>{a.sources.map(s=><span key={s}>{s}</span>)}</div></article>
 <aside><div className="panel"><div className="paneltitle">GERELATEERD</div>{related.map(x=><div className="related" key={x.slug}><Thumb a={x}/><Link href={`/artikel/${x.slug}`}>{x.title}</Link></div>)}</div></aside></div>
 </main><Footer/></>}
