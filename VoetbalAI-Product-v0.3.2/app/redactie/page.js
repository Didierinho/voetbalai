import {Header,Footer} from "../../components/ui";import RedactieForm from "./RedactieForm";
export default function Redactie(){
 return <><Header/><main className="wrap editorPage">
  <div className="editorHero"><div><small>VOETBALAI CMS • v0.3</small><h1>Redactieomgeving</h1><p>Van los nieuwsfeit naar een controleerbaar conceptartikel. Dit is de eerste versie van de toekomstige automatische redactie-engine.</p></div>
  <div className="editorStatus"><span>●</span><div><b>Editorial engine</b><small>READY FOR TESTING</small></div></div></div>
  <div className="workflow"><div className="active"><b>1</b><span>Feiten</span></div><i>→</i><div><b>2</b><span>Bronstatus</span></div><i>→</i><div><b>3</b><span>AI-concept</span></div><i>→</i><div><b>4</b><span>Review</span></div><i>→</i><div><b>5</b><span>Publicatie</span></div></div>
  <RedactieForm/>
 </main><Footer/></>}
