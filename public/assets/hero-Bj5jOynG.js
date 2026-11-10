import{m as n}from"./TemplateSection-XeCjQ-sk.js";const t={hero:{rootClass:"hero",html:`<i class="deco deco-l"></i><i class="deco deco-r"></i>
<div data-layout="header"></div>
<div class="hero-content">
<p class="eyebrow">{{{eyebrow}}}</p>
<h1>{{{h1}}}</h1>
<p class="lead">{{{lead}}}</p>
<div class="cta">
<a href="{{btnHref}}" class="btn btn-gold">
{{{shieldIcon}}} {{btnText}} {{{icon}}}</a>
<a href="{{btn2Href}}" class="btn btn-outline">{{btn2Text}} {{{icon2}}}</a>
</div>
</div>
<div class="stats">
{{#each stats2}}<div class="stat">
{{{icon}}}
<div>{{{div}}}</div>
</div>
{{/each}}
<i></i>
</div>`}},a=[],e={tpl:"hero",variant:"",eyebrow:"BENGALURU SQUAD<span></span>",h1:"Security That<br><em>Stands Ready.</em>",lead:"Professional security for homes, businesses &amp; events<br> backed by trained and disciplined personnel.",btnHref:"#our-services",shieldIcon:'<svg class="shield" viewBox="0 0 24 24"><path d="M12 2.5 4 5.5v6c0 5 3.4 8.6 8 10 4.6-1.4 8-5 8-10v-6z"></path><path d="m8.5 12 2.5 2.5 4.5-5"></path></svg>',btnText:"Our Services",icon:'<svg viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"></path></svg>',btn2Href:"#risk",btn2Text:"Contact Us",icon2:'<svg viewBox="0 0 24 24"><path d="M4 12h16M14 6l6 6-6 6"></path></svg>',stats2:[{icon:'<svg viewBox="0 0 48 48"><path d="M24 4 7 10v13c0 10 7 17.5 17 21 10-3.500 17-11 17-21V10z"></path><path d="m16 24 6 6 11-12"></path></svg>',div:"<strong>24/7</strong><span>SECURITY RESPONSE</span>"},{icon:'<svg viewBox="0 0 48 48"><circle cx="24" cy="14" r="6"></circle><path d="M12 36c0-7 5-12 12-12s12 5 12 12z"></path><circle cx="9" cy="19" r="4.500"></circle><path d="M2 34c0-5 3-8 7-8"></path><circle cx="39" cy="19" r="4.500"></circle><path d="M46 34c0-5-3-8-7-8"></path></svg>',div:"<strong>1,200+</strong><span>SECURITY PROFESSIONALS</span>"},{icon:'<svg viewBox="0 0 48 48"><path d="M3 20 12 11l8 3 6-3 10 4 9 8-6 8-4-2-4 5-6-1-3 4-8-6-3-5-4 1z"></path><path d="m18 24 7 6M23 20l8 8"></path></svg>',div:"<strong>400+</strong><span>TRUSTED CLIENTS</span>"},{icon:'<svg viewBox="0 0 48 48"><circle cx="24" cy="19" r="14"></circle><circle cx="24" cy="19" r="9"></circle><path d="m24 13 2 4 4.500.5-3.300 3 1 4.500L24 22.800 19.800 25l1-4.500-3.300-3 4.500-.5z"></path><path d="M15 31 11 44l7-3 4 5 2-11M33 31l4 13-7-3-4 5-2-11"></path></svg>',div:"<strong>ISO</strong><span>CERTIFIED AGENCY</span>"}]},s={type:"hero",label:"Home Hero",icon:"image",category:"Hero",description:'Legacy "hero" section; used on: home',fields:[{name:"variant",type:"text",label:"Extra CSS classes (variant)",help:"Appended to the section root class list, e.g. pg-award"},{name:"eyebrow",label:"Eyebrow",type:"richtext",inline:!0},{name:"h1",label:"H1",type:"richtext",inline:!0},{name:"lead",label:"Lead",type:"richtext",inline:!0},{name:"btnHref",label:"Btn link URL",type:"text"},{name:"shieldIcon",label:"Shield Icon",type:"svg"},{name:"btnText",label:"Btn Text",type:"text"},{name:"icon",label:"Icon",type:"svg"},{name:"btn2Href",label:"Btn2 link URL",type:"text"},{name:"btn2Text",label:"Btn2 Text",type:"text"},{name:"icon2",label:"Icon2",type:"svg"},{name:"stats2",label:"Stats2",type:"repeater",addLabel:"Add item",fields:[{name:"icon",label:"Icon",type:"svg"},{name:"div",label:"Div",type:"richtext",inline:!0}],itemLabel:"{div}"}],defaults:e,Component:n("hero",t,e,a)},c=Object.freeze(Object.defineProperty({__proto__:null,default:s,defaults:e,templates:t,widgets:a},Symbol.toStringTag,{value:"Module"}));export{c as _};
