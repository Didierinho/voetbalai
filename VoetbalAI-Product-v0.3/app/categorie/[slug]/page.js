import {articles} from "../../../lib/data";import {Header,Footer,Card} from "../../../components/ui";
export default async function Category({params}){const {slug}=await params;const name=slug.charAt(0).toUpperCase()+slug.slice(1);const list=articles.filter(a=>a.category.toLowerCase()===slug);
return <><Header/><main className="wrap listing"><small className="green">DOSSIER</small><h1>{name}</h1><p>Het laatste {name.toLowerCase()}-nieuws in de VoetbalAI productdemo.</p><div className="feed">{(list.length?list:articles).map(a=><Card a={a} key={a.slug}/>)}</div></main><Footer/></>}
