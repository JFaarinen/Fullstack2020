(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{15:function(e,t,n){e.exports=n(38)},37:function(e,t,n){},38:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(14),c=n.n(o),u=n(4),l=n(2),i=function(e){var t=e.name,n=e.number,a=e.deletePerson;return r.a.createElement("li",null,t,": ",n,r.a.createElement("button",{onClick:a},"Poista"))},m=function(e){var t=e.filteredPersons,n=e.deletePerson;return r.a.createElement("div",null,r.a.createElement("h3",null,"Numbers"),r.a.createElement("ul",null,t.map((function(e){return r.a.createElement(i,{key:e.name,name:e.name,number:e.number,deletePerson:function(){return n(e.id)}})}))))},s=function(e){var t=e.addPerson,n=e.newName,a=e.handleNameChange,o=e.newNumber,c=e.handleNumberChange;return r.a.createElement("div",null,r.a.createElement("h3",null,"Add new"),r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"name: ",r.a.createElement("input",{value:n,onChange:a})),r.a.createElement("div",null,"number: ",r.a.createElement("input",{value:o,onChange:c})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"add"))))},d=function(e){var t=e.type,n=e.message;return null===n?null:r.a.createElement("div",{className:t},n)},f=n(3),b=n.n(f),h="http://localhost:3001/api/persons",v=function(){return b.a.get(h)},g=function(e){return b.a.post(h,e)},E=function(e,t){return b.a.put("".concat(h,"/").concat(e),t)},p=function(e){return b.a.delete("".concat(h,"/").concat(e))},j=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],c=Object(a.useState)(""),i=Object(l.a)(c,2),f=i[0],b=i[1],h=Object(a.useState)(""),j=Object(l.a)(h,2),w=j[0],O=j[1],C=Object(a.useState)(""),P=Object(l.a)(C,2),k=P[0],N=P[1],y=Object(a.useState)(!0),S=Object(l.a)(y,2),J=S[0],x=S[1],A=Object(a.useState)(null),B=Object(l.a)(A,2),D=B[0],I=B[1],L=Object(a.useState)(null),T=Object(l.a)(L,2),V=T[0],q=T[1];Object(a.useEffect)((function(){v().then((function(e){o(e.data)}))}),[]);var z=J?n:n.filter((function(e){return e.name.toLowerCase().includes(k)})),F=function(e,t){q(e),I(t),setTimeout((function(){I(null)}),5e3)};return r.a.createElement("div",null,r.a.createElement("h2",null,"Phonebook"),r.a.createElement(d,{type:V,message:D}),r.a.createElement("div",null,"filter shown with"," ",r.a.createElement("input",{value:k,onChange:function(e){console.log(e.target.value),N(e.target.value),""===k?(console.log("n\xe4ytet\xe4\xe4n kaikki"),x(!0)):(console.log("suodatus ",e.target.value),x(!1))}})),r.a.createElement(s,{addPerson:function(e){e.preventDefault();var t=n.filter((function(e){return e.name===f}));if(console.log(t),t.length>0){if(window.confirm("".concat(t[0].name," is already in phonebook, do you want to replace the number?"))){var a=Object(u.a)(Object(u.a)({},t[0]),{},{number:w});E(a.id,a).then((function(e){F("message","Contact ".concat(a.name,": number updatet")),o(n.map((function(t){return t.id!==a.id?t:e.data})))})).catch((function(e){F("error","Error: Contact was already removed from database"),o(n.filter((function(e){return e.id!==a.id})))}))}else F("message","Contact was not modified");b(""),O("")}else{var r={name:f,number:w};g(r).then((function(e){F("message","Contact ".concat(r.name," added to database")),o(n.concat(e.data)),b(""),O("")})).catch((function(e){F("error","Error: ".concat(e.message," Validation error"))}))}},newName:f,handleNameChange:function(e){console.log(e.target.value),b(e.target.value)},newNumber:w,handleNumberChange:function(e){console.log(e.target.value),O(e.target.value)}}),r.a.createElement(m,{filteredPersons:z,deletePerson:function(e){var t=n.find((function(t){return t.id===e}));window.confirm("Poistetaanko ".concat(t.name))?p(e).then((function(a){F("message","Contact  ".concat(t.name," removed from database")),o(n.filter((function(t){return t.id!==e})))})):F("message","Person ".concat(t.name," not removed"))}}))};n(37);c.a.render(r.a.createElement(j,null),document.getElementById("root"))}},[[15,1,2]]]);
//# sourceMappingURL=main.067ec036.chunk.js.map