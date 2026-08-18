import {articles} from "../../lib/data";import {Header,Footer,Thumb,Reliability} from "../../components/ui";import Link from "next/link";
export default function Transfercenter(){
 const list=articles.filter(a=>a.category==="Transfers");
 return <><Header/><main className="wrap listing transferPage">
  <div className="transferHero"><div><small className="green">TRANSFERCENTER</small><h1>Transfers & geruchten</h1><p>Officieel nieuws, betrouwbare signalen en geruchten worden zichtbaar van elkaar onderscheiden.</p></div>
  <div className="legend"><span>5/5 Officieel</span><span>4/5 Sterk</span><span>3/5 Aannemelijk</span><span>2/5 Gerucht</span></div></div>
  <div className="transferGrid">{list.map(a=><article className="transferCard" key={a.slug}><Thumb a={a}/><div><Reliability a={a}/><h2><Link href={`/artikel/${a.slug}`}>{a.title}</Link></h2><p>{a.intro}</p><div className="transferRoute"><b>{a.club}</b><span>→</span><b>Nieuwe club</b></div><small>{a.time} • bijgewerkt in demo</small></div></article>)}</div>
 </main><Footer/></>}
