
const DEMO_TABLE = [
 {position:1,name:"PSV",played:34,won:24,draw:5,lost:5,gd:52,points:77},
 {position:2,name:"Feyenoord",played:34,won:22,draw:7,lost:5,gd:45,points:73},
 {position:3,name:"Ajax",played:34,won:21,draw:6,lost:7,gd:38,points:69},
 {position:4,name:"AZ",played:34,won:19,draw:8,lost:7,gd:31,points:65},
 {position:5,name:"FC Twente",played:34,won:18,draw:7,lost:9,gd:24,points:61},
];

const DEMO_MATCHES = [
 {utcDate:"2026-08-21T18:00:00Z",homeTeam:{name:"Feyenoord"},awayTeam:{name:"PSV"},status:"SCHEDULED",score:{fullTime:{home:null,away:null}}},
 {utcDate:"2026-08-22T19:00:00Z",homeTeam:{name:"Ajax"},awayTeam:{name:"AZ"},status:"SCHEDULED",score:{fullTime:{home:null,away:null}}},
 {utcDate:"2026-08-23T12:30:00Z",homeTeam:{name:"FC Twente"},awayTeam:{name:"FC Utrecht"},status:"SCHEDULED",score:{fullTime:{home:null,away:null}}},
];

async function fd(path){
  const token = process.env.FOOTBALL_DATA_API_KEY;
  if(!token) return null;
  const res = await fetch(`https://api.football-data.org/v4${path}`,{
    headers:{"X-Auth-Token":token},
    next:{revalidate:900}
  });
  if(!res.ok) throw new Error(`football-data.org ${res.status}`);
  return res.json();
}

export async function getEredivisieStandings(){
  try{
    const data = await fd("/competitions/DED/standings");
    if(!data) return {live:false,table:DEMO_TABLE};
    const overall = data.standings?.find(s=>s.type==="TOTAL") || data.standings?.[0];
    const table = (overall?.table || []).map(r=>({
      position:r.position,name:r.team?.shortName || r.team?.name,
      played:r.playedGames,won:r.won,draw:r.draw,lost:r.lost,
      gd:r.goalDifference,points:r.points
    }));
    return {live:true,table};
  }catch(e){
    return {live:false,table:DEMO_TABLE,error:String(e)};
  }
}

export async function getEredivisieMatches(){
  try{
    const data = await fd("/competitions/DED/matches?status=SCHEDULED");
    if(!data) return {live:false,matches:DEMO_MATCHES};
    return {live:true,matches:(data.matches || []).slice(0,6)};
  }catch(e){
    return {live:false,matches:DEMO_MATCHES,error:String(e)};
  }
}
