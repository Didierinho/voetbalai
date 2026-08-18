"use client";
import {useEffect,useState} from "react";

const initial = {
  event:"Feyenoord heeft een akkoord bereikt met een 23-jarige rechtsback. De speler tekent een contract tot medio 2030.",
  club:"Feyenoord",
  category:"Transfers",
  source1:"Officieel clubkanaal",
  source2:"Competitiedata",
  certainty:"officieel"
};

export default function RedactieForm({databaseLive=false}){
 const [form,setForm]=useState(initial);
 const [loading,setLoading]=useState(false);
 const [saving,setSaving]=useState("");
 const [result,setResult]=useState(null);
 const [error,setError]=useState("");
 const [notice,setNotice]=useState("");
 const [items,setItems]=useState([]);

 const set=(k,v)=>setForm(f=>({...f,[k]:v}));

 async function loadDashboard(){
   try{
     const r=await fetch("/api/articles",{cache:"no-store"});
     const d=await r.json();
     if(r.ok) setItems(d.articles||[]);
   }catch{}
 }
 useEffect(()=>{loadDashboard()},[]);

 async function generate(e){
  e.preventDefault(); setLoading(true); setError(""); setResult(null); setNotice("");
  try{
   const res=await fetch("/api/redactie/generate",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
   const data=await res.json();
   if(!res.ok) throw new Error(data.error||"Genereren mislukt");
   setResult(data);
  }catch(err){setError(err.message)} finally{setLoading(false)}
 }

 async function store(status){
   if(!result) return;
   setSaving(status); setNotice(""); setError("");
   try{
     const res=await fetch("/api/articles",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
       ...result,
       source1:form.source1,
       source2:form.source2,
       publication_status:status,
       image_key:form.club
     })});
     const data=await res.json();
     if(!res.ok) throw new Error(data.error||"Opslaan mislukt");
     if(data.demo){
       setNotice("Demo-modus: de workflow werkt, maar zonder Supabase wordt het artikel nog niet permanent opgeslagen.");
     }else{
       setNotice(status==="published" ? "Artikel gepubliceerd en zichtbaar op de site." : "Concept opgeslagen.");
       await loadDashboard();
     }
   }catch(err){setError(err.message)} finally{setSaving("")}
 }

 async function changeStatus(id,status){
   try{
     const res=await fetch("/api/articles/status",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id,status})});
     const data=await res.json();
     if(!res.ok) throw new Error(data.error);
     if(data.demo) setNotice("Statuswijzigingen worden pas permanent met Supabase.");
     else await loadDashboard();
   }catch(err){setError(err.message)}
 }

 return <>
 <div className="editorGrid">
  <form className="editorForm" onSubmit={generate}>
   <div className="formHead"><span>01</span><div><small>INPUT</small><h2>Nieuw nieuwsfeit</h2></div></div>
   <label>Wat is er gebeurd?<textarea rows="7" value={form.event} onChange={e=>set("event",e.target.value)} /></label>
   <div className="twoCol">
    <label>Club<input value={form.club} onChange={e=>set("club",e.target.value)}/></label>
    <label>Categorie<select value={form.category} onChange={e=>set("category",e.target.value)}><option>Transfers</option><option>Eredivisie</option><option>Oranje</option><option>Europa</option></select></label>
   </div>
   <label>Bron 1<input value={form.source1} onChange={e=>set("source1",e.target.value)}/></label>
   <label>Bron 2<input value={form.source2} onChange={e=>set("source2",e.target.value)}/></label>
   <label>Betrouwbaarheid<select value={form.certainty} onChange={e=>set("certainty",e.target.value)}>
    <option value="officieel">5/5 — Officieel bevestigd</option>
    <option value="sterk">4/5 — Meerdere betrouwbare bronnen</option>
    <option value="aannemelijk">3/5 — Aannemelijk</option>
    <option value="gerucht">2/5 — Gerucht</option>
   </select></label>
   <button className="generateBtn" disabled={loading}>{loading?"VoetbalAI schrijft…":"✦ Genereer conceptartikel"}</button>
   <p className="formNote">{databaseLive?"DATABASE LIVE • publiceren is permanent":"DEMO DATABASE • voeg Supabase toe om permanent op te slaan"}</p>
  </form>

  <section className="editorPreview">
   <div className="formHead"><span>02</span><div><small>OUTPUT</small><h2>Conceptartikel</h2></div></div>
   {!result && !error && <div className="previewEmpty"><b>Hier verschijnt het artikel.</b><p>Voer links een gebeurtenis in en laat VoetbalAI er een redactioneel concept van maken.</p></div>}
   {error && <div className="previewError">{error}</div>}
   {notice && <div className="previewNotice">{notice}</div>}
   {result && <div className="generatedArticle">
    <div className="generatedTop"><span className="mode">{result.mode==="openai"?"OPENAI API":"DEMO ENGINE"}</span><span>{result.score}</span></div>
    <small>{result.category} • {result.club}</small>
    <h1>{result.title}</h1><p className="generatedIntro">{result.intro}</p>
    <div className="factChecks">{result.facts?.map((f,i)=><div key={i}>✓ {f}</div>)}</div>
    <h3>Het verhaal</h3><p>{result.body}</p>
    <div className="generatedAnalysis"><b>AI-DUIDING</b><p>{result.analysis}</p></div>
    <div className="generatedSources"><b>Bronnen</b><span>{form.source1}</span>{form.source2&&<span>{form.source2}</span>}</div>
    <div className="editorActions">
      <button type="button" onClick={()=>store("draft")} disabled={!!saving}>{saving==="draft"?"Opslaan…":"Bewaar concept"}</button>
      <button type="button" className="publishFake" onClick={()=>store("published")} disabled={!!saving}>{saving==="published"?"Publiceren…":"Publiceer artikel"}</button>
    </div>
   </div>}
  </section>
 </div>

 <section className="cmsDashboard">
   <div className="dashboardHead"><div><small>CONTENT</small><h2>Laatste artikelen</h2></div><span>{databaseLive?"LIVE DATABASE":"DEMO WEERGAVE"}</span></div>
   <div className="dashboardTable">
    <div className="dashRow dashHeader"><span>Artikel</span><span>Categorie</span><span>Status</span><span>Actie</span></div>
    {items.slice(0,10).map(a=><div className="dashRow" key={a.id||a.slug}>
      <div><b>{a.title}</b><small>{a.club}</small></div>
      <span>{a.category}</span>
      <span className={`statusPill ${a.publication_status}`}>{a.publication_status==="published"?"Gepubliceerd":"Concept"}</span>
      <div className="dashActions">
        {a.publication_status==="draft" && <button onClick={()=>changeStatus(a.id,"published")}>Publiceer</button>}
        {a.publication_status==="published" && <button onClick={()=>changeStatus(a.id,"draft")}>Terug naar concept</button>}
      </div>
    </div>)}
   </div>
 </section>
 </>;
}
