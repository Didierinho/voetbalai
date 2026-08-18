import Link from "next/link";

const crestStyles = {
 "Feyenoord": {mark:"R", sub:"ROTTERDAM", cls:"crest-redblack"},
 "PSV": {mark:"E", sub:"EINDHOVEN", cls:"crest-redwhite"},
 "Ajax": {mark:"A", sub:"AMSTERDAM", cls:"crest-white-red"},
 "Liverpool": {mark:"L", sub:"MERSEYSIDE", cls:"crest-red"},
 "Oranje": {mark:"N", sub:"NEDERLAND", cls:"crest-orange"},
 "AZ": {mark:"A", sub:"ALKMAAR", cls:"crest-redwhite"},
 "FC Twente": {mark:"T", sub:"ENSCHEDE", cls:"crest-red"},
 "sc Heerenveen": {mark:"H", sub:"FRYSLÂN", cls:"crest-blue"},
 "FC Utrecht": {mark:"U", sub:"UTRECHT", cls:"crest-redwhite"},
 "Europa": {mark:"★", sub:"EUROPA", cls:"crest-blue"},
};

export function Header(){
 return <><div className="demo">PRODUCTDEMO v0.3.2 <span>•</span> fictieve beeldidentiteit • AI-redactie voorbereid</div>
 <header><div className="wrap header">
   <Link href="/" className="brand"><i>V</i><b>VOETBAL<span>AI</span></b></Link>
   <nav>
    <Link href="/">Net binnen</Link><Link href="/categorie/eredivisie">Eredivisie</Link>
    <Link href="/transfercenter">Transfercenter</Link><Link href="/categorie/oranje">Oranje</Link>
    <Link href="/categorie/europa">Europa</Link><Link href="/club/feyenoord">Clubs</Link>
   </nav>
   <div className="headerRight"><Link className="editorBtn" href="/redactie">✦ Redactie</Link><Link className="myclubs" href="/club/feyenoord">★ Mijn clubs</Link></div>
 </div></header></>
}

function Crest({club, second=false}){
 const s=crestStyles[club] || {mark:(club||"V").slice(0,1),sub:club||"VOETBAL",cls:"crest-dark"};
 return <div className={`fakeCrest ${s.cls} ${second?"second":""}`}>
   <div className="crestRing"><div className="crestCore">{s.mark}</div></div>
   <small>{s.sub}</small>
 </div>
}

const storyImages = {
 "feyenoord-akkoord-rechtsback":"/news/training-team.jpg",
 "psv-verdediger-terug":"/news/training-goalkeeper.jpg",
 "ajax-middenvelder-scandinavie":"/news/training-detail.jpg",
 "liverpool-transfer":"/news/fans-night.jpg",
 "oranje-voorselectie":"/news/stadium.jpg",
 "az-jeugd":"/news/training-team.jpg",
 "twente-spits":"/news/training-detail.jpg",
 "champions-league-loting":"/news/fans-night.jpg",
 "heerenveen-aanvoerder":"/news/training-goalkeeper.jpg",
 "utrecht-europa":"/news/stadium.jpg"
};
export function Thumb({a, large=false}){
 const src=storyImages[a.slug] || "/news/stadium.jpg";
 return <div className={`newsPhoto ${large?"newsPhotoHero":""}`}><img src={src} alt="" /><div className="newsPhotoOverlay"></div></div>
}

export function Reliability({a}){return <span className={`reliability r${a.score[0]}`}>{a.status} <b>{a.score}</b></span>}

export function Card({a}){
 return <article className="card"><Thumb a={a}/><div className="cardcopy">
   <div><span className="cat">{a.category}</span> <Reliability a={a}/></div>
   <h3><Link href={`/artikel/${a.slug}`}>{a.title}</Link></h3><p>{a.intro}</p>
   <div className="meta">{a.time} • {a.club} <Link href={`/artikel/${a.slug}`}>Lees meer →</Link></div>
 </div></article>
}

export function DataBadge({live}){return <span className={`databadge ${live?"live":"demoMode"}`}>{live?"LIVE DATA":"DEMO DATA"}</span>}
export function Footer(){return <footer><div className="wrap footerGrid"><div><b>VOETBALAI</b><p>AI-native voetbalnieuws • productdemo v0.3.2</p></div><Link href="/redactie">Open redactieomgeving →</Link></div></footer>}
