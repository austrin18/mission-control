// ── NAV SCROLL ───────────────────────────────────────────
const nav = document.getElementById('nav');
const mobileBtn = document.getElementById('mobile-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

mobileBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── HERO CANVAS ──────────────────────────────────────────
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const COLORS = ['#3B82F6','#F59E0B','#10B981','#8B5CF6'];
let nodes = [], W, H;

function resize() {
  W = canvas.width  = canvas.offsetWidth;
  H = canvas.height = canvas.offsetHeight;
}

function initNodes() {
  nodes = Array.from({ length: 55 }, (_, i) => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - .5) * .35,
    vy: (Math.random() - .5) * .35,
    r: Math.random() * 2.2 + 1,
    color: COLORS[i % COLORS.length],
    pulse: Math.random() * Math.PI * 2
  }));
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  nodes.forEach(n => {
    n.pulse += .018;
    n.x += n.vx; n.y += n.vy;
    if (n.x < 0 || n.x > W) n.vx *= -1;
    if (n.y < 0 || n.y > H) n.vy *= -1;
  });
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const d  = Math.sqrt(dx*dx + dy*dy);
      if (d < 150) {
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.strokeStyle = nodes[i].color;
        ctx.globalAlpha = (1 - d/150) * .2;
        ctx.lineWidth = .5;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }
    }
  }
  nodes.forEach(n => {
    const pr = n.r + Math.sin(n.pulse) * .5;
    const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 5);
    g.addColorStop(0, n.color + '44');
    g.addColorStop(1, 'transparent');
    ctx.beginPath(); ctx.arc(n.x, n.y, pr * 5, 0, Math.PI*2);
    ctx.fillStyle = g; ctx.fill();
    ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI*2);
    ctx.fillStyle = n.color;
    ctx.globalAlpha = .8; ctx.fill(); ctx.globalAlpha = 1;
  });
  requestAnimationFrame(draw);
}

window.addEventListener('resize', () => { resize(); initNodes(); }, { passive: true });
resize(); initNodes(); draw();

// ── TIMELINE DATA — 23 PROJECTS ─────────────────────────
const PROJECTS = [
  {
    id:1, year:'2016', domain:'dw', color:'blue',
    title:'Enterprise Data Ecosystem Assessment',
    role:'Business / Systems Analyst',
    tag:'Data Warehouse',
    headline:'Mapping a global pharma leader\'s fragmented data universe — turning 25+ legacy systems into cloud-ready architecture blueprints.',
    overview:'Audited a major global pharma organisation\'s current-state data landscape across 25+ systems, producing functional, non-functional, and architectural requirements for a cloud transformation programme. Delivered data flow diagrams, BRDs, FRDs, and technical specifications to Director-level stakeholders.',
    stack:['CDW','SAS Platforms','Data Flow Diagrams','BRD/FRD Authoring','Business Process Modelling'],
    impact:'Assessed 25+ data systems, mapped 20+ business processes, synthesised 25 stakeholder interviews into a full cloud migration documentation suite.'
  },
  {
    id:2, year:'2017', domain:'dw', color:'blue',
    title:'Cloud Data Warehouse Architecture POC',
    role:'Technology Analyst · Self-Directed Learner',
    tag:'Data Warehouse',
    headline:'From pharma assessment to cloud architecture — building AWS fluency and POC delivery on a major pharma data spine initiative.',
    overview:'Embedded in the data spine workstream of a large-scale hybrid cloud transformation. Independently researched AWS services and built proofs-of-concept across S3, Redshift, Glue, and Airflow to evaluate fit for a cloud-native data warehouse serving commercial pharma operations.',
    stack:['AWS S3','Amazon Redshift','AWS Glue','Apache Airflow','Requirements Documentation','POC Development'],
    impact:'POC recommendations directly informed architecture decisions. Received explicit recognition for AWS self-development and cross-workstream collaboration within 3 months.'
  },
  {
    id:3, year:'2017', domain:'reporting', color:'amber',
    title:'Multi-BU BI Reporting Operations',
    role:'BI Operations Owner',
    tag:'Reporting',
    headline:'Owning end-to-end BI operations for a 4-BU pharma reporting estate — 25 dashboards, daily accountability, live data validation.',
    overview:'Managed the full reporting operations cycle across 4 business units — monitoring AWS Glue jobs, running SQL validation queries against commercial pharma data (IQVIA DDD, Rx, TRx), and executing refresh cycles for 25 MicroStrategy dashboards across daily, weekly, and monthly cadences.',
    stack:['AWS Glue','Redshift','MicroStrategy','SQL','IQVIA Commercial Data','Sandbox Management'],
    impact:'Maintained 25-dashboard estate across 4 BUs with zero missed SLAs. Sole onshore owner of a multi-BU production reporting platform.'
  },
  {
    id:4, year:'2018', domain:'reporting', color:'amber',
    title:'Enterprise Reporting Platform Enhancements',
    role:'BI Developer · Client POC',
    tag:'Reporting',
    headline:'Expanding and enhancing a large pharma reporting platform — building new dashboards and serving as primary client liaison.',
    overview:'Led MicroStrategy dashboard development and enhancement delivery across a major pharma reporting programme, translating complex business requirements into production-ready analytical solutions. Served as the primary technical liaison between business stakeholders and the offshore delivery team.',
    stack:['MicroStrategy','SQL','AWS Redshift','Requirements Documentation','Client Relationship Management'],
    impact:'Delivered multiple reporting enhancements on time, deepening MicroStrategy expertise and client-facing delivery ownership.'
  },
  {
    id:5, year:'2019', domain:'reporting', color:'amber',
    title:'Global MicroStrategy Reporting Transformation',
    role:'Operations Lead · Trusted Programme POC',
    tag:'Reporting',
    headline:'Operations lead across 300+ MicroStrategy reports for a global pharma organisation — from requirements through full KT to internal team.',
    overview:'Served as primary onshore POC across a 9-month engagement covering requirements gathering, UAT leadership, and post-go-live operations for a 300+ report MicroStrategy self-serve platform spanning 6 global business units. Promoted from Associate to Associate Consultant mid-engagement.',
    stack:['MicroStrategy','Apache Airflow','AWS','UAT Frameworks','SOP/Runbook Authoring','KT Documentation'],
    impact:'Achieved consistent same-day UAT approvals across multiple release cycles. Led structured KT to internal team with full SOPs and runbooks. Promoted mid-engagement.'
  },
  {
    id:6, year:'2020', domain:'devops', color:'green',
    title:'US Business Lead — Dual Programme Delivery',
    role:'Independent Delivery Owner · Client Relationship Builder',
    tag:'DevOps / Delivery',
    headline:'Solo onshore delivery lead across two critical programmes for a newly independent pharma spin-off — building a trusted client partnership from zero.',
    overview:'Served as US Business Lead across two simultaneous programmes for a newly independent commercial pharma organisation. Delivered 15 platform enhancements end-to-end, authored full documentation suites (BRDs, FRDs, SOPs, user guides), and managed an India-based delivery team — with the onshore manager fully stepped back.',
    stack:['Tableau','Proprietary Sales Performance Suite','AWS','BRD/FRD Authoring','Project Plan Management','UAT'],
    impact:'Delivered 15 enhancements across 3 business units. Built a trusted client relationship from zero on a cold-start engagement. Received explicit client recognition across both review cycles.'
  },
  {
    id:7, year:'2020', domain:'dw', color:'blue',
    title:'Enterprise Decisioning Platform Implementation',
    role:'Technical Execution Partner · Adaptive Problem Solver',
    tag:'Data Warehouse',
    headline:'Bridging business rules and technical execution on a compressed decisioning platform implementation for a major oncology portfolio.',
    overview:'Supported end-to-end implementation of an enterprise AWS-based decisioning platform — spanning requirements, inbound/outbound data integrations across multiple systems, multi-environment SIT/UAT execution, and deployment readiness. Independently pivoted from business analyst to technical execution partner mid-engagement.',
    stack:['Enterprise Decisioning Platform (AWS)','Multi-Environment SIT/UAT','Business Rules Configuration','Data Integration Design','Penetration Testing'],
    impact:'Became critical to first operational runs of the live decisioning engine. Described by the client as indispensable during the high-pressure execution phase.'
  },
  {
    id:8, year:'2021', domain:'reporting', color:'amber',
    title:'AE Reporting Ecosystem Expansion + Conversational AI POC',
    role:'Client-Facing Execution Lead · First-Mover AI Prototyper',
    tag:'Reporting',
    headline:'Scaling an AE dashboard ecosystem from 40 to 65 dashboards — and independently building the programme\'s first conversational AI interface in 5 days.',
    overview:'Led dashboard design and delivery orchestration for a major pharma AE reporting revamp within a $20B+ commercial programme. Independently built a Dialogflow-based chatbot POC in ~5 days — designing a top-10 AE question flow and wiring conversational intents to MicroStrategy report outputs.',
    stack:['MicroStrategy','Dialogflow (Google)','AWS Redshift','Python','Requirements Documentation','Dashboard Build Trackers'],
    impact:'Scaled AE reporting from 40 to 65 dashboards across 5 BUs. Chatbot POC compelling enough for programme leadership to carry the concept into future phase scoping.'
  },
  {
    id:9, year:'2021', domain:'devops', color:'green',
    title:'AI-Driven Targeting Platform Operations',
    role:'Seamless Transition Leader · AI Operations Steward',
    tag:'DevOps / Delivery',
    headline:'Seamless mid-engagement takeover as onshore delivery lead — stabilising operations on a production AI-based HCP targeting platform.',
    overview:'Stepped in midstream as delivery lead on a health plans engagement operating a production AI-driven dynamic targeting algorithm continuously updating HCP priorities. Introduced change management discipline — an open-items register and enhancement log — and managed weekly enhancements directly with two client Directors.',
    stack:['Salesforce','Proprietary AI Targeting Algorithm','Tableau','Jira','Enhancement Log','Change Management'],
    impact:'Made the leadership transition invisible to the client. Managed 10-12 weekly enhancements with director-level governance. First engagement directly stewarding a production AI system.'
  },
  {
    id:10, year:'2022', domain:'reporting', color:'amber',
    title:'Health Plan STARS Quality Strategy Advisory',
    role:'Strategy Contributor · Domain Builder',
    tag:'Reporting',
    headline:'Contributing to a STARS quality improvement strategy for a regional health plan — building Medicare Advantage domain expertise from scratch.',
    overview:'Contributed to an advisory engagement helping a regional health plan develop a CMS STARS quality improvement strategy. Rapidly built working knowledge of STARS/HEDIS frameworks, Medicare Advantage reimbursement dynamics, and quality measure improvement pathways while contributing to deliverable development.',
    stack:['STARS/HEDIS Framework','Medicare Advantage','Quality Improvement Strategy','Stakeholder Interviews','PowerPoint'],
    impact:'Established foundational STARS and MA domain expertise that underpinned multiple subsequent health plan engagements.'
  },
  {
    id:11, year:'2022', domain:'dw', color:'blue',
    title:'STARS MVP — Simulator, Dashboards & AWS Architecture',
    role:'Technical Prototyper · Delivery Lead · Solution Architect',
    tag:'Data Warehouse',
    headline:'Building a live STARS performance simulator, Tableau demo dashboards, and a 4-layer AWS architecture POC for a health plan C-suite audience.',
    overview:'Served as delivery lead and technical prototyper on a STARS strategy MVP — independently building a JavaScript-based interactive STARS performance simulator and Tableau demo dashboards, and co-designing a 4-layer AWS cloud architecture (S3 → Databricks → AI/BI layer → Angular/Flask frontend). Final deliverable was a live client demo to health plan senior leadership.',
    stack:['JavaScript (Interactive Simulator)','Tableau','AWS (S3, Databricks, Aurora PostgreSQL, ECS/EMR)','Angular','Flask API','API Gateway'],
    impact:'Simulator anchored the final C-suite demo. AWS architecture provided a technically grounded blueprint for productionising the STARS analytics capability.'
  },
  {
    id:12, year:'2022', domain:'dw', color:'blue',
    title:'Internal MA Analytics Platform — Product & Architecture',
    role:'Greenfield Product Definer · Solution Architect',
    tag:'Data Warehouse',
    headline:'Acting as product manager and solution architect on an internal MA analytics initiative — defining vision, user stories, and end-to-end AWS architecture.',
    overview:'Owned product management and solution architecture for an internal concept-phase Medicare Advantage analytics platform — prioritising use cases, authoring user stories with acceptance criteria, and designing an end-to-end logical AWS data flow from source ingestion through metric standardisation to curated reporting output.',
    stack:['AWS (S3, Databricks, Aurora PostgreSQL)','Product Requirements Documentation','User Story Authoring','Data Flow Design','Dependency & Risk Mapping'],
    impact:'Produced a complete reusable concept-phase artifact set. Extended the 4-layer AWS architectural pattern from a concurrent client engagement into an internal capability.'
  },
  {
    id:13, year:'2023', domain:'reporting', color:'amber',
    title:'Enterprise STARS Reporting Platform — $480K Implementation',
    role:'Client-Facing Technical PM · Platform Implementation Lead',
    tag:'Reporting',
    headline:'Promoted to Consultant after owning the full build-out of a health plan\'s enterprise STARS reporting platform across 91 measures and 3 Medicare Advantage contracts.',
    overview:'Served as dual Technical SME and client-facing PM on a $480K, four-wave implementation — directly managing client Director and IT Senior Manager relationships, serving as primary onshore POC for a major healthcare data platform partner, and owning end-to-end SIT/UAT governance across 91 HEDIS/STARS measures and 3 MA contracts.',
    stack:['Healthcare Data Platform (EDP)','STARS/HEDIS (91 Measures, 3 Contracts)','SQL','Reporting Data Model Design','UAT Test Strategy','Member Cohort Analytics'],
    impact:'Delivered production-grade STARS platform on a $480K SOW. Managed VP-level UAT sign-off. Established 24-month rolling member-level data retention. Promoted to Consultant upon completion.'
  },
  {
    id:14, year:'2023', domain:'ai', color:'purple',
    title:'4 Agentic AI Demos → $600K Engagement Won',
    role:'Agentic AI Builder · BD Differentiator · Practice GenAI Resource',
    tag:'Agentic AI',
    headline:'Building 4 working agentic AI demos on a next-gen AI platform, winning a $600K engagement, and becoming the practice\'s informal GenAI resource.',
    overview:'Led major sections of a competitive Innovation Day proposal — building all 4 agentic AI demos from scratch on a proprietary next-gen AI platform: a Care Gap Closure agent (real-time structured + unstructured data fusion), a Call Centre Analytics agent (live audio processing, sentiment analysis), an Analytics QC Automation agent, and a Next-Best-Action decision support agent.',
    stack:['Next-Gen Agentic AI Platform','LLM Agent Design & Deployment','Real-Time Data Integration','Live Audio/Sentiment Processing','Proposal Development','GenAI Use Case Design'],
    impact:'Won a $600K Phase 2 and managed services engagement. Leadership cited contributions as pivotal to closing the sale. Became the informal GenAI resource for the broader health plans practice.'
  },
  {
    id:15, year:'2023', domain:'ai', color:'purple',
    title:'Prior Authorisation AI Engine — 4 RAG Pipelines, Built in 3 Weeks',
    role:'Agentic AI Architect · GenAI Product Builder',
    tag:'Agentic AI',
    headline:'Architecting and building a fully demoable prior authorisation automation engine — 4 RAG pipelines, a 6-step human-in-the-loop workflow, and a JS web interface, in 3 weeks.',
    overview:'Co-conceived and led the architecture and build of an internally funded Prior Authorisation automation engine on a next-gen AI platform — a 6-step agentic workflow: document ingestion → medical policy retrieval → criteria checklist generation → criteria validation against clinical notes → medical necessity summary → human expert final decision. Built all 4 RAG pipelines independently.',
    stack:['Next-Gen Agentic AI Platform','RAG (4 Pipelines)','Human-in-the-Loop Architecture','JavaScript Web Interface','Healthcare Data Generation','Multi-Document Retrieval'],
    impact:'Received explicit written recognition from a senior partner. Connected to 4 additional internal teams for proposal development. Pitched across at least 6 client efforts. Active ZS HPP BD asset.'
  },
  {
    id:16, year:'2024', domain:'devops', color:'green',
    title:'Technology Assessment Lead — Managed Medicaid Plan',
    role:'Technology Assessment Lead · First People Manager',
    tag:'DevOps / Delivery',
    headline:'First people management role — leading technology assessment for a regional managed Medicaid plan as the sole ZS technology voice on a $300K engagement.',
    overview:'Substituted for a planned tech manager and owned the full technology assessment workstream on an 8-week rapid diagnostic — conducting 4 IT stakeholder interviews, building a data catalogue from scratch, producing a Visio current-state architecture diagram, and creating and presenting technology recommendations to Plan President and VP-level stakeholders.',
    stack:['Technology Assessment Methodology','Excel (Data Catalogue)','Visio (Architecture Diagrams)','Stakeholder Interviews','Transformation Roadmap'],
    impact:'Received written recognition from 2 VPs following the Final Readout. First formal people management experience — directly managing an Associate and Associate Consultant.'
  },
  {
    id:17, year:'2024', domain:'devops', color:'green',
    title:'Enterprise Clinical Data Heritage Migration — 220 Studies',
    role:'Solo Delivery Lead · Clinical Migration Owner',
    tag:'DevOps / Delivery',
    headline:'Solo onshore delivery lead on a large pharma\'s clinical data heritage migration — coordinating a 220-study migration across 5 legacy systems while leading an 8-person offshore team.',
    overview:'Joined as the ZS onshore delivery and execution lead for a large-scale clinical data migration programme — governing migration of approximately 220 studies from 5 legacy clinical and biostatistics platforms into a modern Statistical Computing Environment. Carried sole onshore responsibility from week 2 through project closure.',
    stack:['Clinical Data Repository (CDR-SCE)','5 Legacy Clinical Systems','ALM Verification','ITQS/ITQA Approval Workflows','CSV Processes','AWS-SAS Snapshot Management'],
    impact:'Successfully migrated ~220 studies. Built trusted senior stakeholder relationships in a regulated R&D environment entered with zero prior experience. Formally recognised at project closure for leadership and mentorship.'
  },
  {
    id:18, year:'2024', domain:'devops', color:'green',
    title:'Founding GTM Strategy — Health Plan Technology Platform',
    role:'Founding Account Member · GTM Strategy Lead',
    tag:'DevOps / Delivery',
    headline:'Founding team member on a health plan technology platform\'s Go-To-Market strategy — $350K co-invested engagement that became a firm flagship case study.',
    overview:'Served as core onshore GTM lead for a health plan technology subsidiary\'s flagship UM/CM platform commercialisation — driving quantitative payer segmentation using purchased market data, synthesising 35+ executive and leadership interviews, developing segment-specific value narratives, and building an RFP response playbook adopted across the sales organisation.',
    stack:['Quantitative Payer Segmentation (Market Data)','35+ Executive Interviews','GTM Strategy Frameworks','Value Narrative Development','RFP Playbook Design','PowerPoint'],
    impact:'Phase 1 readout became a firm flagship case study. Phase 2 subsequently sold. Established ZS as the platform\'s strategic GTM partner. $250K ZS internal co-investment alongside $100K client SOW.'
  },
  {
    id:19, year:'2024', domain:'ai', color:'purple',
    title:'AI-Accelerated Pre-Sales — 180-Question RFI in 2 Days',
    role:'AI-Accelerated Pre-Sales Lead · CEO-Level Presenter',
    tag:'Agentic AI',
    headline:'Primary pre-sales lead for a health plan technology platform — built a next-gen AI agent to complete a 180-question RFI in 2 days, then presented to a health plan CEO.',
    overview:'Served as the primary ZS pre-sales lead for a UM/CM platform commercialisation across multiple active pursuits. Built a next-gen AI platform agent in 2 days to generate first-pass responses across all 180 government RFI questions, then coordinated inputs from 5 teams and 35+ stakeholders over the following 5 days to finalise. Authored the RFP Response Playbook v2.0 — a 5-stage lifecycle framework adopted across all 2025 pursuits.',
    stack:['Next-Gen Agentic AI Platform','RFI/RFP First-Pass Agent','Prior Proposal Synthesis','Playbook Authorship','CEO/CTO/COO Executive Alignment','Proposal Development'],
    impact:'180-question RFI first-draft completed in 2 days. Proposal presented to health plan CEO. RFP playbook adopted across all 2025 pursuits. Recognised across 3 senior reviewers for operating ahead of expectations.'
  },
  {
    id:20, year:'2025', domain:'ai', color:'purple',
    title:'Interoperability GTM Market Assessment',
    role:'Contributing Market Analyst · AI-Accelerated Researcher',
    tag:'Agentic AI',
    headline:'Contributing SME on a health plan technology platform\'s interoperability commercialisation — owning market landscape assessment while running parallel pre-sales at 20% time.',
    overview:'Served as named author and SME on a $350K interoperability GTM engagement — directing ACs through systematic desk research across the FHIR/API and CDE vendor ecosystem, and using AI tools (multiple platforms) to accelerate research synthesis and hypothesis generation at constrained time allocation.',
    stack:['Interoperability/CDE Vendor Research','FHIR/API Landscape','CMS Mandate Analysis','AI-Accelerated Research (Multiple Platforms)','GTM Hypothesis Development'],
    impact:'Delivered named market assessment at 20% time allocation without quality compromise. Contributed to enGen leadership aligning on interoperability as a credible commercialisation vector.'
  },
  {
    id:21, year:'2025', domain:'dw', color:'blue',
    title:'Enterprise Provider Data Assessment — 65+ Systems, $450K',
    role:'De Facto Delivery Manager · Enterprise Data Architect',
    tag:'Data Warehouse',
    headline:'De facto onshore delivery manager on a health system\'s enterprise provider data assessment — inventorying 65+ systems, conducting 40+ interviews, delivering a full architecture-to-roadmap suite in 12 weeks.',
    overview:'Operated as the onshore execution engine and delivery manager on a $450K, 12-week enterprise provider data management assessment — simultaneously functioning as Technology SME, Data Architect, Business Analyst, and Programme Manager on a lean 6-person team. Inventoried 65+ provider data systems, synthesised 40+ stakeholder interviews, and delivered a complete artifact suite enabling two major downstream investment decisions.',
    stack:['Provider Data Management (PDM)','Master Data Management (MDM)','65+ System Inventory','GCP/Healthcare Data Engine','AI-Accelerated Synthesis','Transformation Roadmap'],
    impact:'Inventoried 65+ systems. Synthesised 40+ interviews. Directly enabled and de-risked two major platform investment decisions (Provider MDM + GCP/HDE replacement). Named artifact author on core executive deliverables.'
  },
  {
    id:22, year:'2025', domain:'devops', color:'green',
    title:'Middle Office Transformation — CEO-Level Readout',
    role:'CEO-Visibility Delivery Lead · Transformation Narrative Owner',
    tag:'DevOps / Delivery',
    headline:'Synthesising 70+ interviews into a CEO and Health Plan President-level transformation readout in under a month on a zero-dollar strategic account investment.',
    overview:'Served as onshore execution lead on a zero-dollar SOW engagement — synthesising 70+ stakeholder interviews across Middle Office functions into a unified transformation narrative presented to Highmark\'s CEO and Health Plan President. Authored all primary deliverables and presented directly to the SVP of Org Change Management across multiple working sessions.',
    stack:['Qualitative Synthesis (70+ Interviews)','AI-Accelerated Theme Consolidation','Operating Model Assessment','Executive Readout Development','RAID Frameworks','PowerPoint'],
    impact:'CEO and Health Plan President-level readout delivered in under one month. No-regret quick wins adopted by leadership. Multi-phase transformation follow-on in active discussion.'
  },
  {
    id:23, year:'2025', domain:'ai', color:'purple',
    title:'Account BD Lead — Multi-Year Strategic Portfolio',
    role:'Account Connective Tissue · AI-Enabled Pursuit Engine',
    tag:'Agentic AI',
    headline:'Core onshore account and BD lead for a major health system portfolio — building a delivery-led growth engine across 2 years, 6 practice areas, and multiple multi-hundred-K pursuits.',
    overview:'Served as the institutional memory and execution engine for a strategic payer account — owning proposal content across every major pursuit, operationalising AI-accelerated BD workflows, contributing to 2026 account planning, and maintaining executive relationship continuity through client leadership changes. Account grew from a single GTM engagement into a multi-threaded 6+ practice area portfolio.',
    stack:['AI-Accelerated Proposal Synthesis (Multiple Platforms)','Multi-Thread Proposal Development','Account Planning','POV Development','Executive Relationship Management','Pursuit Tracking'],
    impact:'Contributed to expanding account from 1 engagement to 6+ practice areas with multiple multi-hundred-K engagements. Recognised across 3 senior reviewers for operating ahead of expectations and AI-enabled productivity above peer levels.'
  }
];

// ── BUILD TIMELINE ───────────────────────────────────────
const arcNodes = document.getElementById('arc-nodes');
const arcCard  = document.getElementById('arc-card');
const arcWrap  = document.getElementById('arc-card-wrap');
let activeNode = null;

PROJECTS.forEach((p, i) => {
  const node = document.createElement('div');
  node.className = 'arc-node';
  node.dataset.id = p.id;
  node.innerHTML = `
    <div class="arc-dot arc-dot--${p.color}"></div>
    <div class="arc-label">${p.tag}</div>
    <div class="arc-year">${p.year}</div>
  `;
  node.addEventListener('click', () => openArcCard(p, node));
  arcNodes.appendChild(node);
});

function colorVars(color) {
  const map = { blue:'var(--blue)', amber:'var(--amber)', green:'var(--green)', purple:'var(--purple)' };
  const dim  = { blue:'var(--blue-dim)', amber:'var(--amber-dim)', green:'var(--green-dim)', purple:'var(--purple-dim)' };
  return { c: map[color] || 'var(--blue)', d: dim[color] || 'var(--blue-dim)' };
}

function openArcCard(p, nodeEl) {
  if (activeNode) activeNode.classList.remove('active');
  if (activeNode === nodeEl) {
    activeNode = null;
    arcWrap.classList.remove('open');
    return;
  }
  activeNode = nodeEl;
  nodeEl.classList.add('active');
  const { c, d } = colorVars(p.color);
  const tagsHTML = p.stack.map(t => `<span class="arc-tag">${t}</span>`).join('');
  arcCard.innerHTML = `
    <div class="arc-card-top">
      <div>
        <span class="arc-card-badge" style="color:${c};border-color:${c};background:${d}">Project ${p.id} · ${p.year}</span>
        <div class="arc-card-title" style="margin-top:.75rem">${p.title}</div>
        <div class="arc-card-role">${p.role}</div>
      </div>
      <button class="arc-card-close" onclick="closeArcCard()">Close ✕</button>
    </div>
    <div class="arc-card-body">
      <div class="arc-card-overview">${p.overview}</div>
      <div class="arc-card-meta">
        <div>
          <div class="arc-meta-label">Tech Stack</div>
          <div class="arc-tags">${tagsHTML}</div>
        </div>
        <div>
          <div class="arc-meta-label">Impact</div>
          <div class="arc-card-overview" style="font-size:.88rem">${p.impact}</div>
        </div>
      </div>
    </div>
  `;
  arcWrap.classList.add('open');
  arcWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

window.closeArcCard = function() {
  if (activeNode) activeNode.classList.remove('active');
  activeNode = null;
  arcWrap.classList.remove('open');
};

// ── BUILD PROJECT CARDS ──────────────────────────────────
const FEATURED = [1, 7, 8, 11, 13, 14, 15, 17, 18, 19, 21, 22];
const grid = document.getElementById('project-grid');

PROJECTS.filter(p => FEATURED.includes(p.id)).forEach(p => {
  const { c } = colorVars(p.color);
  const tagsHTML = p.stack.slice(0,5).map(t => `<span class="card-tag">${t}</span>`).join('');
  const card = document.createElement('div');
  card.className = 'project-card';
  card.dataset.domain = p.domain;
  card.style.setProperty('--card-color', c);
  card.innerHTML = `
    <div class="card-top">
      <span class="card-domain">${p.tag}</span>
      <span class="card-year">${p.year}</span>
    </div>
    <div class="card-title">${p.title}</div>
    <div class="card-role">${p.role}</div>
    <div class="card-desc">${p.headline}</div>
    <div class="card-tags">${tagsHTML}</div>
    <button class="card-expand-btn" onclick="toggleCard(this)">+ View detail</button>
    <div class="card-expanded">
      <div class="card-expanded-body">
        <div>
          <div class="exp-block-label">Overview</div>
          <div class="exp-block-text">${p.overview}</div>
        </div>
        <div>
          <div class="exp-block-label">Impact</div>
          <div class="exp-block-text">${p.impact}</div>
        </div>
      </div>
    </div>
  `;
  grid.appendChild(card);
});

window.toggleCard = function(btn) {
  const expanded = btn.nextElementSibling;
  const isOpen = expanded.classList.toggle('open');
  btn.textContent = isOpen ? '− Collapse' : '+ View detail';
};

// ── FILTER TABS ──────────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', filter !== 'all' && card.dataset.domain !== filter);
    });
  });
});

// ── SCROLL REVEAL ────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
