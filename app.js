const DEMO = {
leadership:[
 {name:"Director General",role:"National Headquarters",bio:"Overall strategic coordination, direction and supervision."},
 {name:"National Leadership",role:"National Headquarters",bio:"Coordinates national programmes, administration and organizational development."},
 {name:"State & Regional Commands",role:"Command Structure",bio:"Coordinates approved activities at regional and state levels."}
],
units:[
 {name:"Guardiant Police",bio:"Supports discipline, order and approved organizational duties."},
 {name:"Band Corps",bio:"Supports ceremonial, musical and public-event activities."},
 {name:"GIID",bio:"Supports information, intelligence and organizational coordination within approved responsibilities."},
 {name:"Drill Squad",bio:"Promotes discipline, teamwork, ceremonial drill and physical coordination."},
 {name:"Medical Department",bio:"Supports first-aid awareness and medical coordination during activities."},
 {name:"Faith Defenders Unit",bio:"Supports values-based service and approved faith-related activities."},
 {name:"Community Development Department",bio:"Coordinates community service, empowerment and local development initiatives."},
 {name:"Guardiants Women Corps",bio:"Promotes participation, leadership and service among women members."}
],
courses:[
 {title:"Leadership Development",description:"Practical leadership, character, responsibility and team development."},
 {title:"Commandership",description:"Command responsibilities, diligence, coordination and effective service."},
 {title:"Civic Education",description:"Civic awareness, responsibility and community participation."},
 {title:"Drill & Discipline",description:"Teamwork, discipline, ceremonial drill and coordination."},
 {title:"Humanitarian Service",description:"Practical skills for volunteer and community humanitarian activities."},
 {title:"Community Development",description:"Identifying needs and contributing to sustainable local initiatives."}
],
news:[
 {title:"National Headquarters Announcements",body:"Official notices, directives and organizational updates will appear here.",date:"Official Update"},
 {title:"Training & Activities",body:"Training, seminars, camps and community activities will be published here.",date:"Programmes"},
 {title:"Organizational News",body:"Highlights from commands, community projects and major milestones.",date:"Publications"}
],
events:[
 {title:"Upcoming National Programme",description:"Event details will be published by National Headquarters.",date:"TBA"},
 {title:"Leadership & Command Training",description:"Watch this space for registration and programme information.",date:"TBA"}
],
downloads:[],
gallery:[],
contact:{email:"",phone:"",address:"National Headquarters, Nigeria",facebook:"",instagram:"",whatsapp:"",youtube:""}
};

const menuBtn=document.querySelector(".menu-btn");
if(menuBtn) menuBtn.onclick=()=>document.querySelector("nav").classList.toggle("open");
document.querySelectorAll("nav a").forEach(a=>a.onclick=()=>document.querySelector("nav").classList.remove("open"));
document.getElementById("year").textContent=new Date().getFullYear();

async function getData(){
  try{
    if(window.SUPABASE_URL && window.SUPABASE_ANON_KEY){
      const tables=["leadership","units","courses","news","events","downloads","gallery"];
      const out={};
      for(const t of tables){
        const r=await fetch(`${SUPABASE_URL}/rest/v1/${t}?select=*`,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`}});
        if(r.ok) out[t]=await r.json();
      }
      const c=await fetch(`${SUPABASE_URL}/rest/v1/site_settings?select=*`,{headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`}});
      if(c.ok){const rows=await c.json();out.contact=Object.fromEntries(rows.map(x=>[x.key,x.value]));}
      return {...DEMO,...out};
    }
  }catch(e){console.warn("Online CMS unavailable; using demo content.",e)}
  return DEMO;
}
function cards(id,items,type){
 const el=document.getElementById(id); if(!el)return;
 if(!items?.length){el.innerHTML='<p class="muted">Content will be published here by National Headquarters.</p>';return}
 el.innerHTML=items.map(x=>{
   if(type==="news") return `<article><small>${x.date||"NEWS"}</small><h3>${esc(x.title)}</h3><p>${esc(x.body)}</p></article>`;
   if(type==="course") return `<article><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></article>`;
   if(type==="event") return `<div class="event"><div class="event-date"><b>—</b><span>${esc(x.date||"DATE")}</span></div><div><h3>${esc(x.title)}</h3><p>${esc(x.description)}</p></div></div>`;
   if(type==="unit") return `<article><h3>${esc(x.name)}</h3><p>${esc(x.bio||"")}</p></article>`;
   return `<article><h3>${esc(x.name)}</h3><p>${esc(x.role||"")}</p><p>${esc(x.bio||"")}</p></article>`;
 }).join("");
}
function renderDownloads(items){const e=document.getElementById("downloads-list");if(!items?.length){e.innerHTML="<div><p>Official documents and approved resources will be added here.</p></div>";return}e.innerHTML=items.map(x=>`<div class="download"><span><b>${esc(x.title)}</b><br><small>${esc(x.description||"")}</small></span><a href="${safeUrl(x.url)}" target="_blank" rel="noopener">Open / Download</a></div>`).join("")}
function renderGallery(items){const e=document.getElementById("gallery-list");if(!items?.length){e.innerHTML='<p class="muted">Activity photos will be added here.</p>';return}e.innerHTML=items.map(x=>`<figure><img src="${safeUrl(x.image_url)}" alt="${esc(x.caption||"Gallery photo")}"><figcaption>${esc(x.caption||"")}</figcaption></figure>`).join("")}
function renderContact(c){const e=document.getElementById("contact-details");let s="";for(const [label,key] of [["Email","email"],["Phone","phone"],["Address","address"]])if(c?.[key])s+=`<p class="contact-info"><b>${label}</b><br>${esc(c[key])}</p>`;for(const [label,key] of [["Facebook","facebook"],["Instagram","instagram"],["WhatsApp","whatsapp"],["YouTube","youtube"]])if(c?.[key])s+=`<p class="contact-info"><a href="${safeUrl(c[key])}" target="_blank" rel="noopener">${label}</a></p>`;e.innerHTML=s||"<p>Official contact details will be published here.</p>"}
function esc(v=""){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function safeUrl(v=""){return String(v).replace(/"/g,"%22").replace(/</g,"%3C").replace(/>/g,"%3E")}
getData().then(d=>{cards("leadership-list",d.leadership,"leader");cards("units-list",d.units,"unit");cards("courses-list",d.courses,"course");cards("news-list",d.news,"news");cards("events-list",d.events,"event");renderDownloads(d.downloads);renderGallery(d.gallery);renderContact(d.contact)});

document.getElementById("membership-form").addEventListener("submit",async e=>{
 e.preventDefault();const f=new FormData(e.target);const msg=document.getElementById("form-msg");
 if(window.SUPABASE_URL&&window.SUPABASE_ANON_KEY){try{const r=await fetch(`${SUPABASE_URL}/rest/v1/membership_applications`,{method:"POST",headers:{apikey:SUPABASE_ANON_KEY,Authorization:`Bearer ${SUPABASE_ANON_KEY}`,"Content-Type":"application/json",Prefer:"return=minimal"},body:JSON.stringify(Object.fromEntries(f))});if(r.ok){msg.textContent="Application submitted successfully.";e.target.reset();return}}catch(err){}}
 msg.textContent="Demo mode: connect the supplied Supabase configuration to receive applications online.";
});
