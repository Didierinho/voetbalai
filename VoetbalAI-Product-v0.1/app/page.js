import Link from "next/link";
import {articles} from "../lib/data";
import {Header,Footer,Thumb,Reliability,Card} from "../components/ui";

export default function Home(){
 const hero=articles[0];
 return <><Header/><main className="wrap">
  <section className="topgrid">
   <div className="hero">
    <Thumb a={hero} large/>
    <div className="heroShade"></div>
    <div className="heroCopy"><Reliability a={hero}/><h1>{hero.title}</h1><p>{hero.intro}</p>
    <div className="meta">{hero.time} • vandaag <Link className="read" href={`/artikel/${hero.slug}`}>Lees meer →</Link></div></div>
   </div>
   <aside className="panel net"><div className="paneltitle">● NET BINNEN <Link href="/categorie/eredivisie">Bekijk alles</Link></div>
    {articles.slice(1,6).map(a=><div className="netrow" key={a.slug}><span>{a.time}</span><div><small>{a.category}</small><Link href={`/artikel/${a.slug}`}>{a.title}</Link></div></div>)}
   </aside>
  </section>

  <section className="highlight">
   <div className="sectionhead"><div><small>ACTUEEL</small><h2>Uitgelicht</h2></div><div className="tabs">Nederland • Transfers • Europa</div></div>
   <div className="highlightgrid">{articles.slice(1,5).map(a=><div className="feature" key={a.slug}><Thumb a={a}/><div className="featurecopy"><span>{a.category} • {a.score}</span><h3><Link href={`/artikel/${a.slug}`}>{a.title}</Link></h3><small>{a.time}</small></div></div>)}</div>
  </section>

  <section className="bodygrid">
   <div><div className="sectionhead"><div><small>LAATSTE NIEUWS</small><h2>Alles wat je moet weten</h2></div></div>
    <div className="feed">{articles.map(a=><Card a={a} key={a.slug}/>)}</div>
   </div>
   <aside>
    <div className="panel standings"><div className="paneltitle">STAND EREDIVISIE <span>DEMO</span></div>
     {["PSV","Ajax","Feyenoord","AZ","FC Twente"].map((c,i)=><div className="standing" key={c}><b>{i+1}</b><span>{c}</span><small>{76-i*6} p</small></div>)}
    </div>
    <div className="panel ai"><em>AI UITLEG</em><h3>Van bron naar eigen artikel</h3><p>De redactie-engine bewaart eerst losse feiten en bronstatus. Pas daarna schrijft AI een nieuw bericht.</p><div>BRON → FEIT → CHECK → AI → PUBLICATIE</div></div>
    <div className="panel trending"><div className="paneltitle">🔥 POPULAIR</div>{articles.slice(0,5).map((a,i)=><Link href={`/artikel/${a.slug}`} key={a.slug}><b>0{i+1}</b>{a.title}</Link>)}</div>
   </aside>
  </section>
 </main><Footer/></>
}