import{m as t}from"./TemplateSection-XeCjQ-sk.js";const a={"csg-why":{rootClass:"csg-why",html:`<div class="csg-head">
<span class="csg-shield"><i class="csg-ln"></i>{{{icon}}}<i class="csg-ln"></i></span>
<h2>{{{h2}}}</h2>
<span class="csg-uline"></span>
</div>
<div class="csg-why-row">
<figure class="csg-why-photo"><img data-media="image" loading="lazy"></figure>
<ul class="csg-list">
{{#each items}}<li><i><svg viewBox="0 0 24 24"><path d="M12 2.500 4 5.500v6c0 5 3.400 8.500 8 10 4.600-1.500 8-5 8-10v-6z"></path><path d="m8.500 12 2.500 2.500 4.500-5"></path></svg></i><span>{{{span}}}</span></li>
{{/each}}
</ul>
</div>`}},s=[],e={tpl:"csg-why",variant:"",icon:'<svg viewBox="0 0 24 24"><path d="M12 2.500 4 5.500v6c0 5 3.400 8.500 8 10 4.600-1.500 8-5 8-10v-6z"></path><path d="m8.500 12 2.500 2.500 4.500-5"></path></svg>',h2:"WHY CHOOSE US FOR <em>SECURITY SERVICES?</em>",image:{id:null,url:"/uploads/legacy/corporate%20security%20guards/security_team_internal_image.webp",webp:"/uploads/legacy/corporate%20security%20guards/security_team_internal_image.webp",alt:"Bengaluru Squad security guards at a corporate client",w:804,h:395,variants:{480:"/uploads/legacy/corporate%20security%20guards/security_team_internal_image-480.webp",768:"/uploads/legacy/corporate%20security%20guards/security_team_internal_image-768.webp"}},items:[{span:"ISO 9001:2015 &amp; ISO 45001:2018"},{span:"Almost <b>two decades</b> of experience"},{span:"Well-trained &amp; experienced security guards"},{span:"<b>Regular supervision</b> of the security guards by managers"},{span:"Usage of tools and technology in use"},{span:"<b>100s</b> of happy customers"}]},i={type:"csg-why",label:"Csg Why",icon:"shield",category:"Services",description:'Legacy "csg-why" section; used on: corporate-security-guards',fields:[{name:"variant",type:"text",label:"Extra CSS classes (variant)",help:"Appended to the section root class list, e.g. pg-award"},{name:"icon",label:"Icon",type:"svg"},{name:"h2",label:"H2",type:"richtext",inline:!0},{name:"image",label:"Image",type:"image"},{name:"items",label:"Items",type:"repeater",addLabel:"Add item",fields:[{name:"span",label:"Span",type:"richtext",inline:!0}],itemLabel:"{span}"}],defaults:e,Component:t("csg-why",a,e,s)},l=Object.freeze(Object.defineProperty({__proto__:null,default:i,defaults:e,templates:a,widgets:s},Symbol.toStringTag,{value:"Module"}));export{l as _};
