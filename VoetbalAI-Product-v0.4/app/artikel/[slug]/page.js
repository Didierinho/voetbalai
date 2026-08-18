import {notFound} from "next/navigation";import Link from "next/link";
import {getArticleBySlug,getPublishedArticles} from "../../../lib/contentStore";
import {Header,Footer,Thumb,Reliability} from "../../../components/ui";

function n(a){return {...a,score:a.score||a.reliability_score||"3/5",status:a.status||a.reliability_status||"AANNEMELIJK",time:a.time||"nu",sources:a.sources||[a.source_1,a.source_2].filter(Boolean),kind:a.kind||"club",theme:a.theme||"europe"}}

export default async function Article({params}){const {slug}=await params;const raw=await getArticleBySlug(slug);if(!raw)notFound();const a=n(raw);
const related=(await getPublishedArticles()).filter(x=>x.slug!==slug).slice(0,3).map(n);
return <><Header/><main className="wrap articlePage"><div className="breadcrumbs"><Link href="/">Home</Link> / {a.category} / {a.club}</div>
 <div className="articleGrid"><article className="story"><Reliability a={a}/><h1>{a.title}</h1><p className="lead">{a.intro}</p><div className="meta">{a.time} • VoetbalAI-redactie</div><Thumb a={a} large/>
 {Array.isArray(a.facts)&&a.facts.length>0&&<><h2>Wat is er gebeurd?</h2><div className="facts">{a.facts.map((f,i)=><p key={i}>✓ {f}</p>)}</div></>}
 <h2>Het volledige verhaal</h2><p>{a.body||a.intro}</p>
 {a.analysis&&<div className="analysis"><b>AI-DUIDING</b><h3>Waarom is dit belangrijk?</h3><p>{a.analysis}</p></div>}
 <div className="sources"><b>Bronnen voor de feiten</b>{a.sources?.map(s=><span key={s}>{s}</span>)}</div></article>
 <aside><div className="panel"><div className="paneltitle">GERELATEERD</div>{related.map(x=><div className="related" key={x.slug}><Thumb a={x}/><Link href={`/artikel/${x.slug}`}>{x.title}</Link></div>)}</div></aside></div>
 </main><Footer/></>}
