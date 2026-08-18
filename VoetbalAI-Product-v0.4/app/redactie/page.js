import {Header,Footer} from "../../components/ui";
import RedactieForm from "./RedactieForm";
import {isDatabaseLive} from "../../lib/contentStore";

export default function Redactie(){
 const databaseLive=isDatabaseLive();
 return <><Header/><main className="wrap editorPage">
  <div className="editorHero"><div><small>VOETBALAI CMS • v0.4</small><h1>Redactieomgeving</h1><p>Genereer, bewaar en publiceer artikelen. Met Supabase aangesloten verschijnen publicaties direct in de dynamische contentlaag.</p></div>
  <div className="editorStatus"><span>●</span><div><b>{databaseLive?"Database gekoppeld":"Demo database"}</b><small>{databaseLive?"LIVE":"CONFIGURATIE NODIG"}</small></div></div></div>
  <div className="workflow"><div className="active"><b>1</b><span>Feiten</span></div><i>→</i><div><b>2</b><span>Bronstatus</span></div><i>→</i><div><b>3</b><span>AI-concept</span></div><i>→</i><div><b>4</b><span>Opslaan</span></div><i>→</i><div><b>5</b><span>Publicatie</span></div></div>
  <RedactieForm databaseLive={databaseLive}/>
 </main><Footer/></>
}