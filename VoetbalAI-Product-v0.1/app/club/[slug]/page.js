import {articles} from "../../../lib/data";import {Header,Footer,Card} from "../../../components/ui";
export default async function Club({params}){const {slug}=await params;const club=slug.charAt(0).toUpperCase()+slug.slice(1);const list=articles.filter(a=>a.club.toLowerCase()===slug);
return <><Header/><main className="wrap listing"><div className="clubHero pro"><div className="bigBadge">{club.slice(0,2).toUpperCase()}</div><div><small className="green">CLUBPAGINA</small><h1>{club}</h1><p>Nieuws, transfers, wedstrijden en context op één plek.</p><div className="clubNav"><span>Overzicht</span><span>Nieuws</span><span>Transfers</span><span>Wedstrijden</span></div></div></div>
 <div className="clubStats"><div><small>VORM</small><b>W W G W W</b></div><div><small>COMPETITIE</small><b>Eredivisie</b></div><div><small>VOLGERS</small><b>12.4K demo</b></div></div>
 <div className="feed">{(list.length?list:articles.slice(0,5)).map(a=><Card a={a} key={a.slug}/>)}</div></main><Footer/></>}
