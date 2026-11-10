import{m as i}from"./TemplateSection-XeCjQ-sk.js";const a={about:{rootClass:"about",html:`<figure class="ab-video">
<img data-media="image">
<button class="ab-play" aria-label="{{abPlayAriaLabel}}" data-video="{{videoUrl}}">{{{icon}}}</button>
<div class="ab-badge">
{{{icon2}}}
<p>{{{p}}}</p>
</div>
</figure>
<div class="ab-content">
<p class="ab-eyebrow">{{{abEyebrow}}}</p>
<h2>{{{h2}}}</h2>
<p class="ab-sub">{{{abSub}}}</p>
<ul class="ab-tabs" role="tablist">
{{#each items}}<li class="{{liClass}}" role="tab" tabindex="0" data-tab="{{liDataTab}}" aria-selected="{{liAriaSelected}}">{{li}}</li>{{/each}}
</ul>
<div class="ab-panel show" data-panel="about">
{{#each paragraphs}}<p class="{{abP1Class}}">{{{abP1}}}</p>
{{/each}}
</div>
<div class="ab-panel" data-panel="why">
<ul class="ab-list">
{{#each items2}}<li>{{li}}</li>
{{/each}}
</ul>
</div>
<div class="ab-panel" data-panel="mission">
{{#each abPps}}<p class="{{abPpClass}}">{{{abPp}}}</p>
{{/each}}
</div>
<div class="ab-panel" data-panel="quality">
<p class="ab-pp">{{abPp}}</p>
<ul class="ab-list ab-list2">
{{#each items3}}<li>{{li}}</li>
{{/each}}
</ul>
</div>
<div class="ab-certs">
{{#each certs}}<div class="cert">
{{{icon}}}
<div>{{{div}}}</div>
</div>
{{/each}}
</div>
</div>`}},t=[],e={tpl:"about",variant:"",image:{id:null,url:"/uploads/legacy/Ceremonial%20Guard%20Team%20Portrait.webp",webp:"/uploads/legacy/Ceremonial%20Guard%20Team%20Portrait.webp",alt:"Bengaluru Squad ceremonial guard team",w:1122,h:1402,variants:{480:"/uploads/legacy/Ceremonial%20Guard%20Team%20Portrait-480.webp",768:"/uploads/legacy/Ceremonial%20Guard%20Team%20Portrait-768.webp"}},abPlayAriaLabel:"Play video",videoUrl:"",icon:'<svg viewBox="0 0 24 24"><path d="M8 5.2v13.6L19.5 12z"></path></svg>',icon2:'<svg viewBox="0 0 24 24"><path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z"></path><path d="m8.5 12 2.5 2.5 4.5-5"></path></svg>',p:"Trained. Trusted.<br><b>Always Vigilant.</b>",abEyebrow:"<span></span>ABOUT BENGALURU SQUAD",h2:"BEST SECURITY AGENCY<br><em>IN BANGALORE</em>",abSub:"An <b>ISO 9001:2015</b> &amp; <b>ISO 45001:2018</b> Certified Private Security Agency<br> in Bangalore offering reliable and efficient security services.",items:[{liClass:"active",liDataTab:"about",liAriaSelected:"true",li:"About"},{liClass:"",liDataTab:"why",liAriaSelected:"false",li:"Why Us"},{liClass:"",liDataTab:"mission",liAriaSelected:"false",li:"Our Mission & Vision"},{liClass:"",liDataTab:"quality",liAriaSelected:"false",li:"Quality Assurance"}],paragraphs:[{abP1Class:"ab-p1",abP1:"We pride ourselves on our unwavering commitment to 100% compliance with the existing<br> laws in all our services. Our team of highly trained professionals ensure that every aspect of<br> our security services adheres to the highest industry standards and regulations. This<br> dedication to compliance guarantees safety and security of our clients and reinforces our<br> reputation as a trusted security partner."},{abP1Class:"ab-p2",abP1:"We are registered under Private Security Agencies Regulation Act (PSARA-2005).<br> Our Security agency in bangalore is registered with ESI and PF Authorities."}],items2:[{li:"24/7 trained and disciplined security personnel for homes, businesses & events."},{li:"1,200+ security professionals serving 400+ trusted clients across Bengaluru."},{li:"ISO 9001:2015 & ISO 45001:2018 certified systems and processes."},{li:"Registered under PSARA-2005, with ESI and PF compliance for every guard."},{li:"Rapid response, transparent reporting and one point of contact for every site."}],abPps:[{abPpClass:"ab-pp",abPp:"<b>Our Mission</b> — To deliver reliable, disciplined and technology-backed security that lets homes, businesses and events operate with complete peace of mind, every hour of every day."},{abPpClass:"ab-pp ab-pp2",abPp:"<b>Our Vision</b> — To be Bangalore’s most trusted security partner, known for integrity, professional training and an unwavering commitment to the people and places we protect."}],abPp:"Quality is built into every deployment. Our guards are selected, verified and trained to documented standards, and each site is audited regularly against our ISO-certified procedures.",items3:[{li:"Background verification and structured induction training for every guard."},{li:"Regular site audits, supervisor checks and incident reporting."},{li:"Continuous improvement through client feedback and ISO-aligned reviews."}],certs:[{icon:'<svg viewBox="0 0 48 48"><circle cx="24" cy="19" r="14"></circle><circle cx="24" cy="19" r="9"></circle><path d="m24 13 2 4 4.5.5-3.3 3 1 4.5L24 22.8 19.8 25l1-4.5-3.3-3 4.5-.5z"></path><path d="M15 31 11 44l7-3 4 5 2-11M33 31l4 13-7-3-4 5-2-11"></path></svg>',div:"<strong>ISO 9001:2015</strong><span>CERTIFIED</span>"},{icon:'<svg viewBox="0 0 48 48"><circle cx="24" cy="19" r="14"></circle><circle cx="24" cy="19" r="9"></circle><path d="m24 13 2 4 4.5.5-3.3 3 1 4.5L24 22.8 19.8 25l1-4.5-3.3-3 4.5-.5z"></path><path d="M15 31 11 44l7-3 4 5 2-11M33 31l4 13-7-3-4 5-2-11"></path></svg>',div:"<strong>ISO 45001:2018</strong><span>CERTIFIED</span>"},{icon:'<svg viewBox="0 0 48 48"><path d="M24 4 7 10v13c0 10 7 17.5 17 21 10-3.5 17-11 17-21V10z"></path><path d="m16 24 6 6 11-12"></path></svg>',div:"<strong>PSARA-2005</strong><span>REGISTERED</span>"}]},l={type:"about",label:"About",icon:"file-text",category:"Content",description:'Legacy "about" section; used on: home',fields:[{name:"variant",type:"text",label:"Extra CSS classes (variant)",help:"Appended to the section root class list, e.g. pg-award"},{name:"image",label:"Image",type:"image"},{name:"abPlayAriaLabel",label:"Ab Play Aria Label",type:"text"},{name:"videoUrl",label:"Video (link or upload)",type:"videourl"},{name:"icon",label:"Icon",type:"svg"},{name:"icon2",label:"Icon2",type:"svg"},{name:"p",label:"P",type:"richtext",inline:!0},{name:"abEyebrow",label:"Ab Eyebrow",type:"richtext",inline:!0},{name:"h2",label:"H2",type:"richtext",inline:!0},{name:"abSub",label:"Ab Sub",type:"richtext",inline:!0},{name:"items",label:"Items",type:"repeater",addLabel:"Add item",fields:[{name:"liClass",label:"Li CSS class",type:"text"},{name:"liDataTab",label:"Li Data Tab",type:"text"},{name:"liAriaSelected",label:"Li Aria Selected",type:"text"},{name:"li",label:"Li",type:"text"}],itemLabel:"{liClass}"},{name:"paragraphs",label:"Paragraphs",type:"repeater",addLabel:"Add item",fields:[{name:"abP1Class",label:"Ab P1 CSS class",type:"text"},{name:"abP1",label:"Ab P1",type:"richtext",inline:!0}],itemLabel:"{abP1Class}"},{name:"items2",label:"Items2",type:"repeater",addLabel:"Add item",fields:[{name:"li",label:"Li",type:"text"}],itemLabel:"{li}"},{name:"abPps",label:"Ab Pps",type:"repeater",addLabel:"Add item",fields:[{name:"abPpClass",label:"Ab Pp CSS class",type:"text"},{name:"abPp",label:"Ab Pp",type:"richtext",inline:!0}],itemLabel:"{abPpClass}"},{name:"abPp",label:"Ab Pp",type:"textarea"},{name:"items3",label:"Items3",type:"repeater",addLabel:"Add item",fields:[{name:"li",label:"Li",type:"text"}],itemLabel:"{li}"},{name:"certs",label:"Certs",type:"repeater",addLabel:"Add item",fields:[{name:"icon",label:"Icon",type:"svg"},{name:"div",label:"Div",type:"richtext",inline:!0}],itemLabel:"{div}"}],defaults:e,Component:i("about",a,e,t)},n=Object.freeze(Object.defineProperty({__proto__:null,default:l,defaults:e,templates:a,widgets:t},Symbol.toStringTag,{value:"Module"}));export{n as _};
