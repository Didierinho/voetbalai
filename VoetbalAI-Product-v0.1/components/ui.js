import Link from "next/link";

export function Header(){
 return <><div className="demo">PRODUCTDEMO <span>•</span> fictieve content & eigen badges</div>
 <header><div className="wrap header">
   <Link href="/" className="brand"><i>V</i><b>VOETBAL<span>AI</span></b></Link>
   <nav>
    <Link href="/">Net binnen</Link><Link href="/categorie/eredivisie">Eredivisie</Link>
    <Link href="/categorie/transfers">Transfers</Link><Link href="/categorie/oranje">Oranje</Link>
    <Link href="/categorie/europa">Europa</Link><Link href="/club/feyenoord">Clubs</Link>
   </nav>
   <button className="myclubs">★ Mijn clubs</button>
 </div></header></>
}

export function Thumb({a, large=false}){
 return <div className={`thumb ${a.theme} ${large?"large":""}`}>
   <div className="stadium"></div><div className="badge">{a.badge}</div>
   <div className="visual-label">{a.club}</div>
 </div>
}

export function Reliability({a}){
 return <span className={`reliability r${a.score[0]}`}>{a.status} <b>{a.score}</b></span>
}

export function Card({a}){
 return <article className="card"><Thumb a={a}/><div className="cardcopy">
   <div><span className="cat">{a.category}</span> <Reliability a={a}/></div>
   <h3><Link href={`/artikel/${a.slug}`}>{a.title}</Link></h3><p>{a.intro}</p>
   <div className="meta">{a.time} • {a.club} <Link href={`/artikel/${a.slug}`}>Lees meer →</Link></div>
 </div></article>
}

export function Footer(){return <footer><div className="wrap"><b>VOETBALAI</b><p>AI-native voetbalnieuws • productdemo v0.1</p></div></footer>}
