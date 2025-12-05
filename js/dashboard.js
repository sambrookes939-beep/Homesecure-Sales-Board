import { db } from "./firebase-init.js";
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";
const tbody=document.querySelector("#leaderboard tbody");
const recentDiv=document.getElementById("recent");
let chart1, chart2;

function monday(d){ const day=d.getDay(); const diff=d.getDate()-day+(day==0?-6:1); return new Date(d.setDate(diff)); }

onSnapshot(query(collection(db,"sales"), orderBy("created","desc")), snap=>{
 const sales=[];
 snap.forEach(doc=>{
  const d=doc.data();
  const t=d.created?.toMillis?d.created.toMillis():Date.now();
  sales.push({...d, time:t});
 });

 const agents={};
 sales.forEach(s=>{
  if(!agents[s.agent]) agents[s.agent]={daily:0,weekly:0,monthly:0,yearly:0,ups:0,mons:0,countM:0};
  const a=agents[s.agent];
  const now=new Date(); const dt=new Date(s.time);
  const startMon=monday(new Date());
  if(dt.toDateString()===now.toDateString()) a.daily++;
  if(dt>=startMon) a.weekly++;
  if(dt.getMonth()===now.getMonth() && dt.getFullYear()===now.getFullYear()){
    a.monthly++; a.ups+=s.upfront; a.mons+=s.monitoring; a.countM++;
  }
  if(dt.getFullYear()===now.getFullYear()) a.yearly++;
 });

 const rows=Object.entries(agents).map(([agent,v])=>{
   const avgUp=v.countM? (v.ups/v.countM).toFixed(2):"0";
   const avgMo=v.countM? (v.mons/v.countM).toFixed(2):"0";
   return {agent, ...v, avgUp, avgMo};
 }).sort((a,b)=>b.monthly-a.monthly);

 tbody.innerHTML="";
 rows.forEach((r,i)=>{
  const tr=document.createElement("tr");
  tr.innerHTML=`<td>${i+1}</td><td>${r.agent}</td><td>${r.daily}</td>
                <td>${r.weekly}</td><td>${r.monthly}</td>
                <td>${r.avgUp}</td><td>${r.avgMo}</td><td>${r.yearly}</td>`;
  tbody.appendChild(tr);
 });

 recentDiv.innerHTML=sales.slice(0,10)
   .map(s=>`<div>${s.agent}: €${s.upfront}+€${s.monitoring} — ${new Date(s.time).toLocaleString()}</div>`).join("");

 const ctx1=document.getElementById("chart1").getContext("2d");
 const ctx2=document.getElementById("chart2").getContext("2d");
 if(chart1) chart1.destroy();
 chart1=new Chart(ctx1,{type:"bar",data:{
   labels:rows.map(r=>r.agent),
   datasets:[{label:"Monthly Sales", data:rows.map(r=>r.monthly)}]
 }});
 const totalM=rows.reduce((a,r)=>a+r.countM,0);
 const teamUp= totalM? rows.reduce((a,r)=>a+r.ups,0)/totalM:0;
 const teamMo= totalM? rows.reduce((a,r)=>a+r.mons,0)/totalM:0;
 if(chart2) chart2.destroy();
 chart2=new Chart(ctx2,{type:"bar",data:{
   labels:["Avg Upfront","Avg Monitoring"],
   datasets:[{label:"Team Average", data:[teamUp,teamMo]}]
 }});
});