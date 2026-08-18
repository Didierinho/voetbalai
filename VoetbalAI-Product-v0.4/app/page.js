import Link from "next/link";
import {getPublishedArticles,isDatabaseLive} from "../lib/contentStore";
import {getEredivisieStandings,getEredivisieMatches} from "../lib/footballData";
import {Header,Footer,Thumb,Reliability,Card,DataBadge} from "../components/ui";

function normalize(a){
 return {
  ...a,
  time:a.time || (a.published_at ? new Date(a.published_at).toLocaleTimeString("nl-NL",{hour:"2-digit",minute:"2-digit"}) : "nu"),
  score:a.score || a.reliability_score || "3/5",
  status:a.status || a.reliability_status || "AANNEMELIJK",
  kind:a.kind || (a.category==="Transfers"?"transfer":"club"),
  theme:a.theme || "europe",
  sources:a.sources || [a.source_1,a.source_2].filter(Boolean)
 };
}

export default async function Home(){
 const dbLive=isDatabaseLive();
 const published=(await getPublishedArticles()).map(normalize);
 const items=published.length ? published : [];
 const hero=items[0];
 const [{table,live:tableLive},{matches,live:matchesLive}] = await Promise.all([getEredivisieStandings(),getEredivisieMatches()]);
 return <><Header/><main className="wrap">
  {dbLive && <div className="liveStrip">● LIVE CMS • gepubliceerde artikelen komen uit Supabase</div>}
  {hero ? <>
  <section className="topgrid">
   <div className="hero"><Thumb a={hero} large/><div className="heroShade"></div>
    <div className="heroCopy"><Reliability a={hero}/><h1>{hero.title}</h1><p>{hero.intro}</p>
    <div className="meta">{hero.time} • vandaag <Link className="read" href={`/artikel/${hero.slug}`}>Lees meer →</Link></div></div>
   </div>
   <aside className="panel net"><div className="paneltitle">● NET BINNEN <Link href="/categorie/eredivisie">Bekijk alles</Link></div>
    {items.slice(1,6).map(a=><div className="netrow" key={a.slug}><span>{a.time}</span><div><small>{a.category}</small><Link href={`/artikel/${a.slug}`}>{a.title}</Link></div></div>)}
   </aside>
  </section>

  <section className="matchbar panel">
   <div className="matchbarHead"><b>WEDSTRIJDEN</b><DataBadge live={matchesLive}/></div>
   <div className="matchscroll">{matches.slice(0,4).map((m,i)=><div className="miniMatch" key={i}><small>{new Date(m.utcDate).toLocaleDateString("nl-NL",{weekday:"short",day:"numeric",month:"short"})}</small><div><b>{m.homeTeam.name}</b><span>{m.status==="FINISHED"?`${m.score.fullTime.home}-${m.score.fullTime.away}`:"vs"}</span><b>{m.awayTeam.name}</b></div></div>)}</div>
  </section>

  <section className="highlight">
   <div className="sectionhead"><div><small>ACTUEEL</small><h2>Uitgelicht</h2></div><Link className="tabs" href="/transfercenter">Naar Transfercenter →</Link></div>
   <div className="highlightgrid">{items.slice(1,5).map(a=><div className="feature" key={a.slug}><Thumb a={a}/><div className="featurecopy"><span>{a.category} • {a.score}</span><h3><Link href={`/artikel/${a.slug}`}>{a.title}</Link></h3><small>{a.time}</small></div></div>)}</div>
  </section>

  <section className="bodygrid">
   <div><div className="sectionhead"><div><small>LAATSTE NIEUWS</small><h2>Alles wat je moet weten</h2></div></div>
    <div className="feed">{items.map(a=><Card a={a} key={a.slug}/>)}</div></div>
   <aside>
    <div className="panel standings"><div className="paneltitle">STAND EREDIVISIE <DataBadge live={tableLive}/></div>
     {table.slice(0,7).map(r=><div className="standing" key={r.position}><b>{r.position}</b><span>{r.name}</span><small>{r.points} p</small></div>)}
    </div>
    <div className="panel ai"><em>AI UITLEG</em><h3>Van bron naar publicatie</h3><p>VoetbalAI bewaart feiten, bronstatus en AI-output als losse velden. Publiceren is een aparte redactiehandeling.</p><div>BRON → FEIT → AI → REVIEW → LIVE</div></div>
   </aside>
  </section></> : <div className="emptyHome"><h1>Nog geen gepubliceerde artikelen</h1><p>Open de redactieomgeving om het eerste artikel te publiceren.</p><Link href="/redactie">Naar redactie →</Link></div>}
 </main><Footer/></>
}