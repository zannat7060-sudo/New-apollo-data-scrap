/* ============ EDIT THESE ============ */
const CONFIG = {
  brand: 'ApolloDataScrap',
  email: 'hello@apollodatascrap.com',      // your real email
  whatsapp: '8801XXXXXXXXX',                // WhatsApp number with country code, no + or spaces
  sampleSheet: 'https://docs.google.com/spreadsheets/',  // paste your public Google Sheet sample link
  year: 2026
};
/* ==================================== */

/* ---------- sample people (fictional, masked) ---------- */
const P=[
{n:'Daniel Moore',t:'VP of Sales',c:'Brightpath',l:'Austin, US',cn:'United States',d:'brightpath.io',ph:'+1 512 ••• ••21',i:'Software',e:'51–200',r:'$10M–$25M',s:'VP'},
{n:'Priya Nair',t:'Head of Growth',c:'Kestrel Labs',l:'London, UK',cn:'United Kingdom',d:'kestrellabs.com',ph:'+44 7••• ••• 482',i:'Biotech',e:'11–50',r:'$1M–$10M',s:'Head'},
{n:'Lucas Meyer',t:'Marketing Director',c:'Lumen Freight',l:'Berlin, DE',cn:'Germany',d:'lumenfreight.de',ph:'+49 15• ••• 7730',i:'Logistics',e:'201–500',r:'$50M–$100M',s:'Director'},
{n:'Amira Haddad',t:'Founder and CEO',c:'Tidewater Cloud',l:'Dubai, AE',cn:'UAE',d:'tidewater.cloud',ph:'+971 5• ••• 1904',i:'IT Services',e:'51–200',r:'$10M–$25M',s:'Owner'},
{n:'Tom Becker',t:'Sales Manager',c:'Oakridge Health',l:'Toronto, CA',cn:'Canada',d:'oakridgehealth.ca',ph:'+1 416 ••• ••58',i:'Healthcare',e:'501–1,000',r:'$100M–$250M',s:'Manager'},
{n:'Sofia Rossi',t:'COO',c:'Fernhill Capital',l:'Milan, IT',cn:'Italy',d:'fernhillcapital.it',ph:'+39 3•• ••• 216',i:'Financial Services',e:'11–50',r:'$5M–$10M',s:'CXO'},
{n:'Kevin Tan',t:'CTO',c:'Quarry Analytics',l:'Singapore, SG',cn:'Singapore',d:'quarryanalytics.sg',ph:'+65 8••• 3392',i:'Data Analytics',e:'51–200',r:'$10M–$25M',s:'CXO'}
];
const first=p=>p.n.split(' ')[0], last=p=>p.n.split(' ')[1];
const mask=p=>first(p)[0].toLowerCase()+'•••@'+p.d;
const prof=p=>'in/'+first(p).toLowerCase()+'-'+last(p)[0].toLowerCase()+'•••';
const ES=['Valid','Valid','Valid','Risky','Valid','Valid','Valid'];
const PS=['Verified','Verified','Unverified','Verified','Verified','Verified','Unverified'];
const SC=['98','95','93','61','97','94','90'];
const SRC=['Provider A','Provider B','Provider A','Provider C','Provider B','Provider A','Provider C'];

/* ---------- services (prices are PLACEHOLDERS: edit price / unit) ---------- */
const SERVICES=[
{slug:'apollo-data-scraping',icon:'users',title:'Apollo Data Scraping',
 short:'Contact lists from your Apollo search: names, job titles, companies and business emails.',
 price:3,unit:'1,000 leads',turnaround:'1 to 3 business days',
 intro:'Tell us who you want to reach. We collect the matching contacts from Apollo and return them in one clean Google Sheet.',
 desc:['Share your target job titles, industries, locations and company size, or send an Apollo search link. We run the search, collect every matching contact and organize the results into consistent columns.','Each list is checked for duplicates and formatted so you can import it straight into your cold email tool or CRM.'],
 includes:['Name, job title, company and location','Business email with a status for each contact','LinkedIn profile link when available','Duplicate rows removed','Google Sheet or CSV delivery'],
 cols:['Name','Job title','Company','Location','Email','Status'],
 rows:P.map((p,i)=>[p.n,p.t,p.c,p.l,mask(p),ES[i]]),
 ba:{a:'You send',b:'You get',pairs:[['Titles: VP Sales, Head of Growth','Matching contacts, one per row'],['Industry: Software, 51–200 staff','Company and location added'],['Countries: US, UK, Canada','Emails checked, duplicates removed']]},
 report:[['Contacts delivered',100,'1,000 rows'],['Emails marked valid',86,'86%'],['Duplicate rows removed',100,'Done']],
 faq:[['What do I need to send?','Your target job titles, industries, countries and company size, or an Apollo search link. We can also help you build the filters.'],['How many leads can I order?','Small test lists and large lists are both possible. Tell us the quantity and we confirm price and timing before starting.'],['Are the emails verified?','We check emails and mark each one as valid, risky or invalid, so you can choose what to send.'],['What format do I get?','A Google Sheet shared with you, or a CSV file if you prefer.']]},

{slug:'apollo-mobile-number-scraping',icon:'phone',title:'Apollo Mobile Number Scraping',
 short:'Direct mobile numbers for the contacts you want to call or message.',
 price:5,unit:'100 contacts',turnaround:'2 to 4 business days',
 intro:'Add phone numbers to your target list so your team can call and message decision makers directly.',
 desc:['Send us a contact list or an Apollo search, and we look up a direct mobile number for each person. Numbers come with the country and a status column.','Contacts without a number are marked clearly, so you know exactly what was found and what was not.'],
 includes:['Direct mobile number with country code','Status for each number','Name, job title and company','Contacts without a number marked','Google Sheet or CSV delivery'],
 cols:['Name','Company','Mobile','Country','Status'],
 rows:P.map((p,i)=>[p.n,p.c,p.ph,p.cn,PS[i]]),
 ba:{a:'You send',b:'You get',pairs:[['Names and companies','Direct mobile number found'],['Target countries: US, UK','Country shown for each number'],['Contacts without a phone','Marked verified or unverified']]},
 report:[['Contacts searched',100,'1,000 rows'],['Mobile numbers found',64,'64%'],['Numbers marked verified',48,'48%']],
 faq:[['Will every contact have a mobile number?','No. Coverage depends on the audience and the country. Contacts where no number is found are marked in the sheet.'],['Can you add numbers to my existing list?','Yes. Send a sheet with names and companies and we add a mobile number column.'],['Which countries do you cover?','Most major markets. Tell us your target countries and we confirm coverage before you order.'],['How are the numbers checked?','Each number gets a status, so you can call the verified ones first.']]},

{slug:'apollo-company-data-scraping',icon:'building',title:'Apollo Company Data Scraping',
 short:'Company lists with industry, size, revenue, website and location.',
 price:2,unit:'1,000 companies',turnaround:'1 to 2 business days',
 intro:'Build an account list of companies that match your ideal customer, before you look for the people.',
 desc:['Tell us the industries, countries and company size you sell to. We collect the matching companies and return a sheet with the details you need to qualify them.','Company domains are included, so the list is ready for email finding, enrichment or account-based outreach.'],
 includes:['Company name, website and domain','Industry and employee range','Revenue range when available','Headquarters location','Google Sheet or CSV delivery'],
 cols:['Company','Industry','Employees','Revenue','Website','HQ'],
 rows:P.map(p=>[p.c,p.i,p.e,p.r,p.d,p.l]),
 ba:{a:'You send',b:'You get',pairs:[['Industry: Logistics','Company list with size and revenue'],['Employees: 201–500','Website and HQ location'],['Country: Germany','Domains ready for outreach']]},
 report:[['Companies delivered',100,'1,000 rows'],['With website and domain',98,'98%'],['With employee range',92,'92%']],
 faq:[['What company details are included?','Name, website, industry, employee range, revenue range when available, and headquarters location.'],['Can you also get the people at these companies?','Yes. Combine this with Apollo Data Scraping to get contacts at each company.'],['Can I filter by technology or funding?','Yes, when the filter is available in Apollo. Tell us what you need and we confirm before starting.'],['How do I receive the list?','As a Google Sheet shared with you, or a CSV file.']]},

{slug:'apollo-email-enrichment',icon:'mail',title:'Apollo Email Enrichment',
 short:'Find and verify business emails for the people on your list.',
 price:3,unit:'1,000 contacts',turnaround:'1 to 2 business days',
 intro:'Turn names and company domains into business emails you can send to.',
 desc:['Send a list with names and company websites. We find the business email for each person and check it.','Every email gets a status and a confidence score, so you can send to the safest contacts first and review the rest.'],
 includes:['Business email for each person found','Valid, risky or invalid status','Confidence score','Your original columns kept','Google Sheet or CSV delivery'],
 cols:['Name','Domain','Email','Status','Score'],
 rows:P.map((p,i)=>[p.n,p.d,mask(p),ES[i],SC[i]]),
 ba:{a:'You send',b:'You get',pairs:[['Names and company domains','Business email found'],['An email list you already have','Valid, risky or invalid status'],['Contacts with no email','Confidence score for each']]},
 report:[['Contacts processed',100,'1,000 rows'],['Emails found',82,'82%'],['Marked valid',71,'71%']],
 faq:[['What should my list contain?','A full name and a company website or domain for each person.'],['Do you verify emails I already have?','Yes. Send them and we return a status for each one.'],['What does a risky status mean?','The address may exist but could bounce or belong to a catch-all domain. Send to risky emails in small batches.'],['Do you keep my original columns?','Yes. We add new columns and leave your data as it was.']]},

{slug:'linkedin-sales-navigator-scraping',icon:'compass',title:'LinkedIn Sales Navigator Scraping',
 short:'Lead lists exported from your Sales Navigator search.',
 price:3,unit:'1,000 leads',turnaround:'1 to 3 business days',
 intro:'Send us your Sales Navigator search and get the leads back as a structured sheet.',
 desc:['Build your search in Sales Navigator, or let us help you build it. We collect the leads from the results and return them with name, headline, company, seniority and profile link.','Pair this with email enrichment to turn the list into contacts you can reach.'],
 includes:['Name, headline and current company','Seniority level','Profile link','Duplicate rows removed','Google Sheet or CSV delivery'],
 cols:['Name','Headline','Company','Seniority','Profile'],
 rows:P.map(p=>[p.n,p.t+' at '+p.c.split(' ')[0],p.c,p.s,prof(p)]),
 ba:{a:'You send',b:'You get',pairs:[['Your Sales Navigator search','Name, headline and company'],['Seniority: Director, VP, CXO','Seniority level for each lead'],['A saved lead list','Profile links in one sheet']]},
 report:[['Leads delivered',100,'1,000 rows'],['With company name',97,'97%'],['With profile link',100,'100%']],
 faq:[['What do you need from me?','A Sales Navigator search link, or a description of your audience so we can help you build the search.'],['Can you add emails to this list?','Yes. Add Apollo Email Enrichment to get business emails for these leads.'],['How many leads can one search return?','Sales Navigator limits how many results a single search shows. For large audiences we split the work into several searches.'],['How is the data delivered?','As a Google Sheet shared with you, or a CSV file.']]},

{slug:'clay-mobile-number-enrichment',icon:'layers',title:'Clay Mobile Number Enrichment',
 short:'Mobile numbers found by checking several data sources through Clay.',
 price:45,unit:'1,000 contacts',turnaround:'2 to 4 business days',
 intro:'Fill the phone gaps in your list by checking several data providers in one workflow.',
 desc:['We run your contacts through a Clay workflow that checks multiple providers in order, so we can find numbers that a single source would miss.','Each result keeps a record of where the number came from and its status.'],
 includes:['Mobile numbers from multiple providers','Match source recorded for each number','Status per number','Your original columns kept','Google Sheet or CSV delivery'],
 cols:['Name','Company','Mobile','Match source','Status'],
 rows:P.map((p,i)=>[p.n,p.c,p.ph,SRC[i],PS[i]]),
 ba:{a:'You send',b:'You get',pairs:[['Names and companies','Mobile numbers matched'],['Contacts missing a phone','Match source recorded'],['Contacts from many countries','Status for each number']]},
 report:[['Contacts processed',100,'1,000 rows'],['Mobile numbers matched',58,'58%'],['Marked verified',44,'44%']],
 faq:[['How is this different from Apollo mobile numbers?','Clay checks several providers one after another, so it can find numbers that Apollo alone does not have.'],['What should my list contain?','Name and company, plus a LinkedIn URL or domain when you have it. More inputs improve the match rate.'],['Will every contact get a number?','No. Contacts where no number is found are marked in the sheet.'],['Do I need my own Clay account?','No. We run the workflow and send you the finished sheet.']]}
];
const bySlug=s=>SERVICES.find(x=>x.slug===s);

const HOME_FAQ=[
['What do you need from me to start?','Your target audience (job titles, industries, countries, company size), an Apollo or Sales Navigator search link if you have one, the quantity you need and the columns you want. If you are unsure, send what you have and we help with the rest.'],
['How will I receive the data?','As a Google Sheet shared with you, or as a CSV file. Columns are consistent and ready to import into your outreach tool.'],
['How long does delivery take?','Small lists often take one to three business days. Larger lists depend on size and filters. We confirm the timing before you pay.'],
['How do you check accuracy?','Emails are checked and marked valid, risky or invalid. Phone numbers get a status. Duplicate rows are removed before delivery.'],
['Can I see a sample first?','Yes. Look at the sample sheet on this page, or ask for a small sample that matches your audience.'],
['How do I pay?','We share payment details after you approve the scope and sample. Ask us about the options available in your country.']
];

const QUOTES=[ /* REPLACE with real client feedback */
{q:'We sent a Sales Navigator search and had a clean sheet back the next day. Titles and companies were already formatted for our outreach tool, so we loaded it straight in.',n:'Rachel Adams',r:'Head of Growth, Fernhill Studio',lead:true},
{q:'The mobile number enrichment filled gaps our own tools missed. The status column made it easy to decide who to call first.',n:'Marcus Lee',r:'Sales Manager, Quarry Logistics'},
{q:'Clear communication and a sample before we committed. That made the decision easy.',n:'Nadia Karim',r:'Founder, Tidewater Agency'}
];

/* ---------- helpers ---------- */
const ICONS={
users:'<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18.5 14.4c2 .8 3 2.6 3 5.6"/>',
phone:'<rect x="7" y="2.5" width="10" height="19" rx="2"/><path d="M11 18.5h2"/>',
building:'<path d="M4 21V5l9-2v18M13 8h7v13M2.5 21h19"/><path d="M7.5 8.5h2M7.5 12h2M7.5 15.5h2M16 12h1.5M16 15.5h1.5"/>',
mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3.5 7 8.5 6.5L20.5 7"/>',
compass:'<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
layers:'<path d="m12 3 9 5-9 5-9-5z"/><path d="m3 13 9 5 9-5"/>',
check:'<path d="m5 12.5 4.5 4.5L19 7.5"/>',
bolt:'<path d="M13 2.5 5 13.5h6L10 21.5l8-11h-6z"/>',
search:'<rect x="2.5" y="4" width="19" height="14.5" rx="2.2"/><path d="M2.5 8.4h19"/><circle cx="10.8" cy="13.2" r="2.6"/><path d="m12.8 15.2 2.4 2.4"/>',
link:'<path d="M10 13.5a4.5 4.5 0 0 0 6.4.4l2.6-2.6a4.5 4.5 0 0 0-6.4-6.4l-1.5 1.5"/><path d="M14 10.5a4.5 4.5 0 0 0-6.4-.4l-2.6 2.6a4.5 4.5 0 0 0 6.4 6.4l1.5-1.5"/>',
csv:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><text x="12" y="17.2" text-anchor="middle" font-size="5.2" font-weight="700" font-family="Arial,sans-serif" fill="currentColor" stroke="none">CSV</text>',
arrow:'<path d="M4 12h15M13 6l6 6-6 6"/>',
circleCheck:'<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
funnel:'<path d="M4 5h16l-6.2 7.4V19l-3.6-1.8v-4.8z"/>',
sheet:'<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9.5 17v-3M12 17v-5M14.5 17v-2"/>',
shield:'<path d="M12 3 5 6v5.5c0 4.2 2.8 7.6 7 9 4.2-1.4 7-4.8 7-9V6z"/><path d="m9 12 2.2 2.2L15.5 10"/>',
eye:'<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>',
chat:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>'
};
const icon=n=>`<svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[n]}</svg>`;
const tick=()=>`<span class="tick">${icon('check')}</span>`;
const chip=v=>`<span class="chip ${(v==='Valid'||v==='Verified')?'chip--ok':'chip--warn'}">${v}</span>`;
const priceText=s=>`From $${s.price} per ${s.unit}`;
const faqList=items=>items.map(([q,a])=>`<details><summary>${q}</summary><p>${a}</p></details>`).join('');
const go=(p)=>`#/${p}`;

function logoSvg(line){line=line||'#0E1A2F';
  let r='';const pos=[1,9.5,18];
  pos.forEach((y,j)=>pos.forEach((x,i)=>{const c=(i===1&&j===1);r+=`<rect x="${x}" y="${y}" width="7" height="7" rx="1" fill="${c?'#2750F0':'none'}" stroke="${c?'#2750F0':line}" stroke-width="1.6"/>`}));
  return `<svg width="28" height="28" viewBox="0 0 26 26" aria-hidden="true">${r}</svg>`;
}

function xlTable(cols,rows){
  const letters=cols.map((c,i)=>`<th>${String.fromCharCode(65+i)}</th>`).join('');
  const head=cols.map(c=>`<th>${c}</th>`).join('');
  const body=rows.map((r,j)=>`<tr><td class="gut">${j+1}</td>${r.map((v,i)=>`<td>${cols[i]==='Status'?chip(v):v}</td>`).join('')}</tr>`).join('');
  return `<table class="xl"><thead><tr class="letters"><th></th>${letters}</tr><tr><th class="gut"></th>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function heroTable(){
  const rows=P.map((p,i)=>`<tr style="--i:${i}"${i===6?' class="is-new"':''}><td class="gut">${i+1}</td><td>${p.n}</td><td class="hide-sm">${p.c}</td><td>${mask(p)}</td><td>${chip(ES[i])}</td></tr>`).join('');
  return `<table class="xl xl--live"><thead><tr class="letters"><th></th><th>A</th><th class="hide-sm">B</th><th>C</th><th>D</th></tr><tr><th class="gut"></th><th>Name</th><th class="hide-sm">Company</th><th>Email</th><th>Status</th></tr></thead><tbody>${rows}</tbody></table>`;
}

/* ---------- work images (generated SVG) ---------- */
const trunc=(t,n)=>{t=String(t);return t.length>n?t.slice(0,Math.max(1,n-1))+'…':t};
function sheetSvg(s){
  const W=720,gut=36,hdr=100,rh=36,n=Math.min(s.rows.length,7),H=hdr+rh*n+4;
  const lens=s.cols.map((c,i)=>s.cols[i]==='Status'?14:Math.max(c.length+2,...s.rows.map(r=>String(r[i]).length))+3);
  const tot=lens.reduce((a,b)=>a+b,0);
  const ws=lens.map(l=>l/tot*(W-gut));
  const xs=[];ws.reduce((a,w,i)=>{xs[i]=a;return a+w},gut);
  let o=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sample output sheet for ${s.title}" font-family="Instrument Sans, Segoe UI, sans-serif">`;
  o+=`<rect width="${W}" height="${H}" fill="#fff"/><rect width="${W}" height="40" fill="#F6F8FC"/>`;
  o+=`<rect x="12" y="8" width="54" height="24" rx="4" fill="#fff" stroke="#D9DFEA"/><text x="39" y="24.5" font-size="12" text-anchor="middle" fill="#0E1A2F">A1</text>`;
  o+=`<text x="84" y="25" font-size="13" font-style="italic" fill="#56627A">fx</text><text x="108" y="25" font-size="12.5" fill="#0E1A2F">${s.cols[0]}</text>`;
  o+=`<rect y="40" width="${W}" height="24" fill="#F6F8FC"/>`;
  s.cols.forEach((c,i)=>{o+=`<text x="${xs[i]+ws[i]/2}" y="56" font-size="11" text-anchor="middle" fill="#56627A">${String.fromCharCode(65+i)}</text>`});
  o+=`<rect y="64" width="${W}" height="36" fill="#EEF2FA"/>`;
  s.cols.forEach((c,i)=>{o+=`<text x="${xs[i]+10}" y="87" font-size="12.5" font-weight="700" fill="#0E1A2F">${c}</text>`});
  s.rows.slice(0,n).forEach((r,j)=>{
    const y=hdr+rh*j;
    o+=`<line x1="0" x2="${W}" y1="${y+rh}" y2="${y+rh}" stroke="#E8ECF4"/><text x="${gut/2}" y="${y+23}" font-size="11" text-anchor="middle" fill="#56627A">${j+1}</text>`;
    r.forEach((v,i)=>{
      const x=xs[i]+10;
      if(s.cols[i]==='Status'){
        const ok=(v==='Valid'||v==='Verified'),w=v.length*7+22;
        o+=`<rect x="${x}" y="${y+8}" width="${w}" height="20" rx="10" fill="${ok?'#DCF3E8':'#FFF0CC'}"/><text x="${x+w/2}" y="${y+22}" font-size="11.5" font-weight="700" text-anchor="middle" fill="${ok?'#0F7A55':'#8A5A00'}">${v}</text>`;
      } else {
        o+=`<text x="${x}" y="${y+23}" font-size="12.5" fill="#0E1A2F">${trunc(v,Math.floor((ws[i]-14)/6.4))}</text>`;
      }
    });
  });
  xs.forEach(x=>{o+=`<line x1="${x}" x2="${x}" y1="40" y2="${H}" stroke="#E8ECF4"/>`});
  return o+'</svg>';
}

function baSvg(s){
  const W=720,H=300,b=s.ba;
  let o=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="What you send and what you get" font-family="Instrument Sans, Segoe UI, sans-serif">`;
  o+=`<rect width="${W}" height="${H}" fill="#fff"/>`;
  o+=`<rect x="24" y="22" width="290" height="256" rx="10" fill="#F6F8FC" stroke="#D9DFEA"/><rect x="406" y="22" width="290" height="256" rx="10" fill="#E7ECFE" stroke="#BFCBFA"/>`;
  o+=`<text x="44" y="52" font-size="14" font-weight="700" fill="#0E1A2F">${b.a}</text><text x="426" y="52" font-size="14" font-weight="700" fill="#1D3FC7">${b.b}</text>`;
  b.pairs.forEach(([i,out],k)=>{
    const y=70+k*68;
    o+=`<rect x="40" y="${y}" width="258" height="52" rx="6" fill="#fff" stroke="#D9DFEA"/><text x="54" y="${y+31}" font-size="12.5" fill="#0E1A2F">${trunc(i,38)}</text>`;
    o+=`<rect x="422" y="${y}" width="258" height="52" rx="6" fill="#fff" stroke="#BFCBFA"/><circle cx="444" cy="${y+26}" r="9" fill="#DCF3E8"/><path d="m439.5 ${y+26} 3.2 3.2 6-6.2" fill="none" stroke="#0F7A55" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><text x="462" y="${y+31}" font-size="12.5" fill="#0E1A2F">${trunc(out,32)}</text>`;
  });
  o+=`<path d="M330 150h60m-10-10 10 10-10 10" fill="none" stroke="#2750F0" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`;
  return o+'</svg>';
}

function reportSvg(s){
  const W=720,H=300;
  let o=`<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Example delivery report" font-family="Instrument Sans, Segoe UI, sans-serif">`;
  o+=`<rect width="${W}" height="${H}" fill="#fff"/><text x="24" y="42" font-size="16" font-weight="700" fill="#0E1A2F">Delivery report</text><text x="696" y="42" font-size="12" text-anchor="end" fill="#56627A">Example figures</text><line x1="24" x2="696" y1="60" y2="60" stroke="#E8ECF4"/>`;
  s.report.forEach(([l,p,t],k)=>{
    const y=96+k*60;
    o+=`<text x="24" y="${y}" font-size="13" fill="#0E1A2F">${l}</text><text x="696" y="${y}" font-size="13" font-weight="700" text-anchor="end" fill="#0E1A2F">${t}</text>`;
    o+=`<rect x="24" y="${y+10}" width="672" height="12" rx="6" fill="#E8ECF4"/><rect x="24" y="${y+10}" width="${672*p/100}" height="12" rx="6" fill="${k===0?'#2750F0':'#0F7A55'}"/>`;
  });
  o+=`<text x="24" y="282" font-size="12" fill="#56627A">Delivered as Google Sheet and CSV</text>`;
  return o+'</svg>';
}

/* ---------- pages ---------- */
function pageHome(){
  const cells=SERVICES.map((s,i)=>`
    <a class="cell cell--t${i%6+1}" href="${go('service/'+s.slug)}">
      <span class="ico">${icon(s.icon)}</span>
      <h3>${s.title}</h3>
      <p>${s.short}</p>
      <span class="cell__foot"><span class="cell__price">${priceText(s)}</span><span class="cell__more">View details</span></span>
    </a>`).join('');
  const why=[
    ['circleCheck','t1','Direct Apollo data','Leads collected from Apollo.io to match your search, with the fields Apollo provides for each contact.'],
    ['funnel','t2','Custom filtering','Filter by industry, location, company size, job title and more. Send a search link or describe your audience.'],
    ['sheet','t3','Sheets ready to use','Consistent columns and duplicates removed, in a Google Sheet or CSV your outreach tool can import.'],
    ['shield','t4','Emails you can trust','Every email is checked and marked valid, risky or invalid, so you decide what to send.'],
    ['eye','t5','A sample before you commit','See a sample that matches your audience and check the quality first.'],
    ['chat','t6','Direct, fast communication','You talk to the person doing the work, and scope, price and timing are clear up front.']
  ].map(([ic,tone,t,d])=>`<article class="why6__card why6__card--${tone}"><span class="why6__ico">${icon(ic)}</span><h3>${t}</h3><p>${d}</p></article>`).join('');
  const steps=[
    ['search','Build Your Apollo Search','Log in to your Apollo account and apply filters such as industry, job title, location, and company size. Copy your filtered People Search URL.'],
    ['link','Submit Your Search URL','Send us your Apollo People Search URL and tell us your data requirements. We\'ll review your targeting and confirm the order details.'],
    ['csv','Receive Your Lead List','We export the requested data and organize it into a clean CSV file, ready for your CRM or outreach workflow.']
  ].map(([ic,t,d],i)=>`${i?`<span class="p3__arrow" aria-hidden="true">${icon('arrow')}</span>`:''}<article class="p3__card p3__card--${['t4','t2','t3'][i]}"><span class="p3__ico">${icon(ic)}</span><h3>${t}</h3><span class="p3__bar"></span><p>${d}</p></article>`).join('');
  const tabs=[['apollo-data-scraping','Apollo leads'],['apollo-company-data-scraping','Company data'],['apollo-mobile-number-scraping','Phone numbers'],['linkedin-sales-navigator-scraping','Sales Navigator']];
  const first_=bySlug(tabs[0][0]);
  const quotes=QUOTES.map(x=>`
    <figure class="quote${x.lead?' quote--lead':''}">
      <blockquote>${x.q}</blockquote>
      <figcaption><span class="avatar">${x.n.split(' ').map(w=>w[0]).join('')}</span><div><strong>${x.n}</strong><span>${x.r}</span></div></figcaption>
    </figure>`).join('');
  return `
  <section class="hero">
    <div class="wrap hero__in">
      <div>
        <h1>Apollo and LinkedIn lead data, delivered in a clean Google Sheet.</h1>
        <p class="hero__lead">Tell us who you want to reach. We collect the contacts, find and verify emails and mobile numbers, and hand over a sheet that is ready for your outreach.</p>
        <div class="hero__actions">
          <a class="btn btn--primary" href="${go('contact')}">Request a sample</a>
          <a class="btn btn--ghost" href="#services" data-go="services">See our services</a>
        </div>
        <p class="hero__note">Emails, mobile numbers and company data in one file.</p>
      </div>
      <div class="sheet" aria-label="Preview of a delivered lead sheet">
        <div class="sheet__bar"><span class="namebox">D7</span><span class="fx">fx</span><span class="formula">Valid</span></div>
        <div class="sheet__scroll">${heroTable()}</div>
        <div class="sheet__foot"><span>Preview of 7 rows. Values are masked.</span><span class="chip chip--ok">Emails checked</span></div>
      </div>
    </div>
  </section>

  <section class="section section--white" id="services">
    <div class="wrap">
      <div class="section__head"><h2>What we deliver</h2><p>Pick a service to see work samples, pricing and common questions.</p></div>
      <div class="cells">${cells}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="why6__head"><h2>Why teams choose <span class="accent">our Apollo data service</span></h2><p>Everything you need to run outbound on data you can trust.</p></div>
      <div class="why6__grid">${why}</div>
    </div>
  </section>

  <section class="section section--dark p3">
    <div class="wrap">
      <div class="p3__head">
        <span class="p3__badge">${icon('bolt')}Simple 3-Step Process</span>
        <h2>How to Export Apollo.io Leads in <span class="accent">3 Simple Steps</span></h2>
        <p>A simple, streamlined process to get your targeted B2B leads delivered in CSV format.</p>
      </div>
      <div class="p3__grid">${steps}</div>
    </div>
  </section>

  <section class="section" id="samples">
    <div class="wrap">
      <div class="section__head section__head--row">
        <div><h2>See what you will receive</h2><p>Every order is delivered as a Google Sheet like this one. Switch tabs to see each data type.</p></div>
        <a class="btn btn--primary" href="${CONFIG.sampleSheet}" target="_blank" rel="noopener">Open the sample Google Sheet</a>
      </div>
      <div class="sheet">
        <div class="sheet__scroll" id="sampleBody">${xlTable(first_.cols,first_.rows)}</div>
        <div class="tabs" role="tablist" aria-label="Sample sheets">
          ${tabs.map(([sl,l],i)=>`<button class="tab" role="tab" type="button" data-tab="${sl}" aria-selected="${i===0}">${l}</button>`).join('')}
        </div>
      </div>
      <p class="muted" style="margin-top:14px;font-size:.92rem">Names and contact details in these previews are fictional and masked.</p>
    </div>
  </section>

  <section class="section section--white">
    <div class="wrap">
      <div class="section__head"><h2>What clients say</h2></div>
      <div class="quotes">${quotes}</div>
    </div>
  </section>

  <section class="section">
    <div class="wrap">
      <div class="section__head"><h2>Questions we hear most</h2><p>Cannot find your answer? <a href="${go('contact')}" style="color:var(--blue-deep)">Send us a message</a>.</p></div>
      <div class="faq faq--center">${faqList(HOME_FAQ)}</div>
    </div>
  </section>`;
}

function pageServices(){
  const list=SERVICES.map(s=>`
    <li class="svc">
      <span class="ico">${icon(s.icon)}</span>
      <div><h3><a href="${go('service/'+s.slug)}" style="text-decoration:none">${s.title}</a></h3><p>${s.short}</p></div>
      <div class="svc__side">
        <span class="svc__price">$${s.price}<small>per ${s.unit}</small></span>
        <a class="btn btn--ghost" href="${go('service/'+s.slug)}">View details</a>
      </div>
    </li>`).join('');
  return `
  <section class="page-head"><div class="wrap">
    <h1>Services</h1>
    <p>Six ways we turn your target audience into a sheet of reachable contacts. Prices shown are starting prices.</p>
  </div></section>
  <section class="section section--white" style="padding-top:48px"><div class="wrap"><ul>${list}</ul></div></section>
  <section class="section"><div class="wrap split">
    <div class="split__head"><h2>Not sure which one you need?</h2><p>Describe your audience and goal. We recommend the right combination.</p></div>
    <div><a class="btn btn--primary" href="${go('contact')}">Talk to us</a></div>
  </div></section>`;
}

function pageService(slug){
  const s=bySlug(slug); if(!s) return pageServices();
  const others=SERVICES.filter(x=>x.slug!==slug).map(x=>`<a href="${go('service/'+x.slug)}">${x.title}</a>`).join('');
  return `
  <section class="page-head" style="padding-bottom:36px"><div class="wrap">
    <div class="crumbs"><a href="${go('services')}">Services</a><span>/</span><span>${s.title}</span></div>
    <h1>${s.title}</h1>
  </div></section>
  <div class="wrap detail">
    <div>
      <div class="gallery">
        <figure class="shot shot--wide">${sheetSvg(s)}<figcaption>Sample output sheet. Values are masked.</figcaption></figure>
      </div>
      <div class="prose">
        <h2>About this service</h2>
        ${s.desc.map(d=>`<p>${d}</p>`).join('')}
        <h2 style="margin-top:32px">What is included</h2>
        <ul class="checks">${s.includes.map(i=>`<li>${tick()}<span>${i}</span></li>`).join('')}</ul>
      </div>
    </div>
    <aside class="pricebox" aria-label="Pricing">
      <p class="pricebox__label">Starting at</p>
      <p class="price">$${s.price}<small>per ${s.unit}</small></p>
      <dl>
        <div><dt>Turnaround</dt><dd>${s.turnaround}</dd></div>
        <div><dt>Delivery</dt><dd>Google Sheet or CSV</dd></div>
        <div><dt>Sample</dt><dd>Available on request</dd></div>
      </dl>
      <a class="btn btn--primary btn--block" href="${go('contact?service='+s.slug)}">Order this service</a>
      <a class="btn btn--ghost btn--block" href="${go('contact?service='+s.slug)}">Ask a question</a>
      <p class="pricebox__note">Final price depends on quantity and filters. We confirm it before starting.</p>
    </aside>
  </div>
  <section class="section section--white detail-faq"><div class="wrap split">
    <div class="split__head"><h2>${s.title} FAQ</h2><p>Common questions about this service.</p></div>
    <div class="faq">${faqList(s.faq)}</div>
  </div></section>
  <section class="section"><div class="wrap">
    <h2 style="font-size:1.6rem">Other services</h2>
    <div class="others">${others}</div>
  </div></section>`;
}

function pageAbout(){
  const pr=[['Accuracy before volume','We verify and de-duplicate, so you spend your outreach on contacts that can actually be reached.'],['Clear scope and price','You know what you get, when you get it and what it costs before we start.'],['Simple delivery','A Google Sheet or CSV with consistent columns, ready to import.']].map(([t,d])=>`<li><h3>${t}</h3><p>${d}</p></li>`).join('');
  return `
  <section class="page-head"><div class="wrap">
    <h1>We turn lead searches into ready-to-use sheets.</h1>
  </div></section>
  <section class="section section--white" style="padding-top:56px"><div class="wrap">
    <p class="lead-p">${CONFIG.brand} is a lead data service for sales teams, agencies and founders. You tell us who you want to reach, and we handle the searching, enrichment and cleaning.</p>
    <p class="lead-p">We focus on a small set of services and do them carefully: Apollo and Sales Navigator data collection, company data, email enrichment and mobile number enrichment.</p>
  </div></section>
  <section class="section"><div class="wrap split">
    <div class="split__head"><h2>How we work</h2></div>
    <ul class="principles">${pr}</ul>
  </div></section>
  <section class="section section--dark"><div class="wrap" style="text-align:center">
    <div class="section__head" style="margin-bottom:28px"><h2>Ready to see a sample?</h2><p style="color:#B8C3DA">Describe your audience and we send a sample that matches it.</p></div>
    <a class="btn btn--light" href="${go('contact')}">Request a sample</a>
  </div></section>`;
}

function pageContact(params){
  const pre=params.get('service')||'';
  const opts=SERVICES.map(s=>`<option value="${s.title}"${s.slug===pre?' selected':''}>${s.title}</option>`).join('')+'<option value="Not sure yet">Not sure yet</option>';
  return `
  <section class="page-head"><div class="wrap">
    <h1>Tell us who you want to reach.</h1>
    <p>Send your audience and the data you need. We reply with scope, price and a sample.</p>
  </div></section>
  <div class="wrap contact">
    <dl>
      <div><dt>Email</dt><dd><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></dd></div>
      <div><dt>WhatsApp</dt><dd><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">Message us on WhatsApp</a></dd></div>
      <div><dt>Reply time</dt><dd>Usually within one business day</dd></div>
    </dl>
    <div class="form">
      <div class="field-row">
        <div class="field"><label for="cName">Your name</label><input id="cName" type="text" autocomplete="name"></div>
        <div class="field"><label for="cEmail">Email</label><input id="cEmail" type="email" autocomplete="email"></div>
      </div>
      <div class="field"><label for="cService">Service</label><select id="cService">${opts}</select></div>
      <div class="field"><label for="cMsg">What do you need?</label><textarea id="cMsg" placeholder="Target job titles, industries, countries, how many leads, and any search link."></textarea></div>
      <button class="btn btn--primary btn--block" type="button" id="sendBtn">Send request</button>
      <p class="note" id="formNote" role="status"></p>
    </div>
  </div>`;
}

function footerHtml(){
  const links=SERVICES.map(s=>`<li><a href="${go('service/'+s.slug)}">${s.title}</a></li>`).join('');
  return `
  <div class="cta-band"><div class="wrap cta-band__in">
    <h2>Tell us who you want to reach. We send a sample.</h2>
    <a class="btn btn--light" href="${go('contact')}">Request a sample</a>
  </div></div>
  <div class="wrap foot-grid">
    <div><a class="brand" href="#/">${logoSvg('#FFFFFF')}<span class="brand__name">${CONFIG.brand}</span></a><p>Apollo, LinkedIn Sales Navigator and Clay lead data, delivered as a clean Google Sheet.</p></div>
    <div><h4>Pages</h4><ul><li><a href="#/">Home</a></li><li><a href="${go('services')}">Services</a></li><li><a href="${go('about')}">About</a></li><li><a href="${go('contact')}">Contact</a></li></ul></div>
    <div><h4>Services</h4><ul>${links}</ul></div>
    <div><h4>Contact</h4><ul><li><a href="mailto:${CONFIG.email}">${CONFIG.email}</a></li><li><a href="https://wa.me/${CONFIG.whatsapp}" target="_blank" rel="noopener">WhatsApp</a></li></ul></div>
  </div>
  <div class="wrap foot-base">&copy; ${CONFIG.year} ${CONFIG.brand}. All rights reserved.</div>`;
}

