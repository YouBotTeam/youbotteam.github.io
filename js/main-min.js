var y=window.t;var d;var p="";var f;var m;var w="";var g="";var i;var h=true;var b="";var M=null;var e=null;var x={};var v;var S;var k;var c=[];var T=null;const z=document.documentElement.style;const o="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTY0IDM3MS4yaDc2Ljc5NVY0NDhIMTkyVjMyMEg2NHY1MS4yem03Ni43OTUtMjMwLjRINjRWMTkyaDEyOFY2NGgtNTEuMjA1djc2Ljh6TTMyMCA0NDhoNTEuMnYtNzYuOEg0NDhWMzIwSDMyMHYxMjh6bTUxLjItMzA3LjJWNjRIMzIwdjEyOGgxMjh2LTUxLjJoLTc2Ljh6Ii8+PC9zdmc+";const n="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTM5Ni43OTUgMzk2LjhIMzIwVjQ0OGgxMjhWMzIwaC01MS4yMDV6TTM5Ni44IDExNS4yMDVWMTkySDQ0OFY2NEgzMjB2NTEuMjA1ek0xMTUuMjA1IDExNS4ySDE5MlY2NEg2NHYxMjhoNTEuMjA1ek0xMTUuMiAzOTYuNzk1VjMyMEg2NHYxMjhoMTI4di01MS4yMDV6Ii8+PC9zdmc+";const t=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;const a=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>`;const s=`<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>`;function l(){}l.configuration=t=>{const{title:o,subtitle:e,inputTextFieldHint:i,profileAvatar:n,customData:c,socketUrl:a,socketPath:s,showFullScreenButton:l,showBadge:u,docViewer:r,hideWhenNotConnected:d,openAutomatically:f,initPayload:m,selector:w,storage:g,elementTriggerResetChat:h,elementTriggerOpenChat:v}=t.o;b=g;p=t.i;y["default"]({l:{...c,i:t.i},u:a,m:s,g:u,selector:w,h:r,v:m,p:l,M:d,S:f,title:o,k:e,T:i,L:n,$:v,j:h,N:{storage:g}});x=t.C;M=x.I||null;st()};document.addEventListener("readystatechange",()=>{if(document.readyState==="interactive"){u();if(x.O){st().clear()}rt("#rasaWebchatPro").then(()=>{const t=new MutationObserver(t=>{const o=t[0].addedNodes;if(o.length){f=document.getElementsByClassName("rw-widget-container")[0];O()}});const o=document.getElementById("rasaWebchatPro").children[0];t.observe(o,{childList:true});rt(".rw-widget-container").then(()=>{const t=new MutationObserver(()=>{O()});t.observe(f,{attributes:true})})})}});var L=()=>f.classList.contains("rw-chat-open")?f.classList.contains("rw-full-screen")?pt.H:pt.OPEN:pt.A;function u(){const t=x?.color;if(t){const e=t?.B;const i=t?.message;const n=t?.D;const c=i?.P;const a=i?.F;const s=t?.title?.color;if(s){z.setProperty("--youai-color-title",s)}const l=t?.V?.color;if(l){z.setProperty("--youai-color-subtitle",l)}if(e){z.setProperty("--youai-primary-color",e)}if(a){const u=a?.backgroundColor;const t=a?.color;if(u){z.setProperty("--youai-msg-user-bg-color",u)}if(t){z.setProperty("--youai-msg-user-text-color",t)}}if(c){const u=c?.backgroundColor;const t=c?.color;if(u){z.setProperty("--youai-msg-bot-bg-color",u)}if(t){z.setProperty("--youai-msg-bot-text-color",t);z.setProperty("--youai-color-wave-dot",t)}}if(n){z.setProperty("--youai-button-send-color",n)}}const o=x?.W;if(o){const r=o?.width;const d=o?.height;if(r){z.setProperty("--youai-width-button",r)}if(d){z.setProperty("--youai-height-button",d)}}}function $(){if(!document.querySelector(".autocomplete")){const t=document.createElement("div");t.classList.add("autocomplete","youai-container-input");const o=document.getElementsByClassName("rw-new-message")[0];o.setAttribute("id","autocomplete");const e=document.getElementsByClassName("rw-send")[0];t.appendChild(o);t.appendChild(e);if(x?.Y?.attachments?.show){const i=`
      <button id="youai-btn-attachments" type="button">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
      </button>`;t.insertAdjacentHTML("afterbegin",i);r()}d.setAttribute("autocomplete","off");d.appendChild(t)}}function r(){rt("#youai-btn-attachments").then(()=>{const i=`<svg xmlns="http://www.w3.org/2000/svg" class="youai-icon-upload" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`;document.getElementById("youai-btn-attachments").addEventListener("click",()=>{if(!document.querySelector(".youai-modal-attachments")){m.insertAdjacentHTML("afterbegin",`
            <div class="youai-container-modal-attachments" data-keyboard="false" data-backdrop="static">
              <div class="youai-modal-attachments">
                <div class="youai-input-file-container">
                  ${i}
                  <input type="file" id="youai-input-file-attachments" accept="${x?.Y?.attachments?.accept||null}" multiple/>
                  <h2>Scegli un file</h2>
                </div>
                <div class="youai-file-selected-container" style="display: none;">
                </div>
                <div class="youai-btn-footer-attachments">
                  <button id="youai-cancel-attachments" class="rw-conversation-container rw-reply"> Annulla</button>
                  <button id="youai-confirm-attachments" disabled class="rw-conversation-container rw-reply"> Conferma</button>
                </div>
              </div>
            </div>
            `);const t=document.getElementById("youai-cancel-attachments");const o=document.getElementById("youai-confirm-attachments");const e=document.getElementById("youai-input-file-attachments");e.addEventListener("change",t=>{c=Object.values(t.target.files).map(t=>t);C(o)});t.addEventListener("click",()=>{E()});o.addEventListener("click",()=>{const e=new FormData;c.forEach((t,o)=>e.append(`file##${o}`,t,t.name));ht(e).then(t=>{j(t,false)},t=>j(null,true));E()})}})})}function j(t,o){const e=document.getElementsByClassName("rw-group-message rw-from-response");const i=m.getElementsByClassName("rw-group-message rw-from-response")[e.length-1];i.insertAdjacentHTML("beforeend",`<div class="rw-group-message rw-from-client">
      <div class="rw-message rw-with-avatar">
        <div class="rw-client">
          <div class="rw-message-text">
            ${o?`Errore nell'invio dei file`:`<h1> File caricati: </h1> ${N(t)} `}
          </div>
        </div>
      </div>
    </div>`);yt()}function N(t){return`${t!==null?`
  <div class="youai-list-file-uploaded">${t.map(t=>`<div class="youai-item-file-uploaded">
          <div id="${t.filename}" class="youai-item-file-uploaded-status">
            ${t.U?s:a}
          </div>
          <div class="youai-item-file-upload-name">
            ${t.filename}
          </div>
        </div>`).toString().replaceAll(",","")}
  </div>`:``}`}function E(){c=[];m.removeChild(m.getElementsByClassName("youai-container-modal-attachments")[0])}function C(t){const o=document.getElementsByClassName("youai-input-file-container")[0];const e=document.getElementsByClassName("youai-file-selected-container")[0];if(c.length){const n=new FormData;var i="";c.forEach((t,o)=>{const e=`<svg xmlns="http://www.w3.org/2000/svg" onclick="fileSelezionato('${t.name}##${o}')" class="youai-delete-file" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;n.append(`file-${o}`,t);i+=`
        <li class="youai-file-selected" id="${t.name}##${o}">
          ${e}
          <p class="youai-name-file">
            ${t.name}
          </p>
        </li>
      `});e.innerHTML=`
      <ul class="youai-ul youai-ul-file-selected">
        ${i}
      <ul>
    `;t.removeAttribute("disabled");o.style.display="none";e.style.display=""}else{o.style.display="";e.style.display="none"}}function I(t){const o=t.split("##");c=c.filter(t=>t.name!==o[0]);document.getElementsByClassName("youai-ul-file-selected")[0].removeChild(document.getElementById(t));C(document.getElementById("youai-confirm-attachments"))}function O(){if(f){const t=document.getElementsByClassName("autocomplete youai-container-input")[0];switch(L()){case pt.OPEN:d=document.getElementsByClassName("rw-sender")[0];$();ct();const e=x?.Y;const i=e?.R.enable;if(x?.Z&&i&&(e?._?.enable||e?.J?.enable)){V()}k=document.getElementsByClassName("rw-conversation-container")[0];m=k.getElementsByClassName("rw-messages-container")[0];if(document.querySelector(".youai-container-custom")){nt()}if(x?.G){U();R()}const n=document.getElementsByClassName("rw-new-message")[0];n.addEventListener("input",t=>{w=t.srcElement.value;document.getElementsByClassName("rw-send")[0].addEventListener("click",()=>{P(t.target.value)})});S?.add("youai-display-none");n.addEventListener("keyup",t=>{if(t.key==="Enter"&&w){P(w)}});if(t){t.style.removeProperty("height")}const c=[...document.getElementsByClassName("rw-header")].filter(t=>!t.classList.contains("custom-header"))[0].getElementsByClassName("rw-toggle-fullscreen-button");if(c.length){c[0].addEventListener("click",t=>{f.classList.toggle("rw-full-screen")})}H(null,null);A(null);break;case pt.H:if(t)t.style.height="3rem";A("30rem");H("30rem","20rem");z.setProperty("--youai-rw-widget-container-width","100%");break;case pt.A:const a=x?.Y?.X;if(a){z.setProperty("--youai-rw-widget-container-width",a?.width)}if(localStorage.getItem("interaction")&&x?.Y?.q?.enable){W()}localStorage.setItem("position","popup");const s=x?.Y?.K;if(h&&localStorage.getItem("position")==="popup"&&s?.show&&!localStorage.getItem("interaction")){F(s?.text||"Clicca sul bottone per inziare la chat");S.add("youai-fade-in");S.remove("youai-display-none");h=false}localStorage.removeItem("interaction");localStorage.setItem("position","close");break}const o=x?.Y?._;if(document.querySelector(".rw-toggle-fullscreen-button")&&document.querySelector(".custom-header")&&o?.tt&&o?.filename){const l=document.getElementsByClassName("rw-toggle-fullscreen-button");const u=l[0].getElementsByTagName("img")[0];const r=l[1].getElementsByTagName("img")[0];B(u);B(r);u.classList.add("rw-toggle-fullscreen","rw-fullScreenImage");r.classList.add("rw-toggle-fullscreen","rw-fullScreenExitImage");r.classList.remove("rw-fullScreenImage")}if(!(localStorage.getItem("hint")&&(L()===pt.H||L()===pt.OPEN)&&v?.value&&g&&T&&v.value===g)){ut(v,T)}}}function H(e,i){const t=[...document.getElementsByClassName("rw-image-details")];t.forEach(t=>{const o=t.children[0].style;o.width=e;o.height=i})}function A(o){[...document.getElementsByTagName("iframe")].forEach(t=>{t.style.height=o})}function B(t){if(L()===pt.H){t.setAttribute("src",o)}else{t.setAttribute("src",n)}}function D(){return x?.Y?._?.tt?`
  <button class="rw-toggle-fullscreen-button" id="customFullScreenButton">
    <img class="rw-toggle-fullscreen rw-fullScreenImage" alt="toggle fullscreen">
  </button>
  `:""}function P(t){if(t.trim()){localStorage.setItem("interaction",true)}}function F(t){if(!document.querySelector(".youai-popup-custom")){document.getElementsByClassName("rw-widget-container")[0].insertAdjacentHTML("beforeend",`<div class="youai-popup-custom">${t}</div>`);S=document.getElementsByClassName("youai-popup-custom")[0].classList}}function V(){if(!document.getElementsByClassName("youai-dropdown").length){const t=x?.Y;const o=t?.J?.enable;const e=t?._?.enable;document.getElementsByClassName("rw-header-buttons")[0].insertAdjacentHTML("beforeend",`
        <div class="youai-dropdown">
          <button class="youai-button-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-three-dots-vertical rw-default youai-icon-button-menu" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <div id="youai-dropdown-content">
          ${e?`<a
              id="pillole"
              class="${x?.Y?._?.ot?"youai-disabled-link":""}">
                Pillole
              </a>`:``}
            ${o?`<a id="reset-chat">Reset chat</a>`:``}
          </div>
        </div>`);document.getElementsByClassName("youai-button-menu")[0].addEventListener("click",function(t){document.getElementById("youai-dropdown-content").style.display="block";t.stopPropagation()});if(e){document.getElementById("pillole").addEventListener("click",()=>{K(false);tt(false);i=document.createElement("div");i.classList.add("rw-messages-container","youai-container-custom");X()})}}}function W(){Y();i=document.createElement("div");i.classList.add("rw-messages-container","youai-container-custom");_()}function Y(){k=document.createElement("div");k.classList.add("rw-conversation-container","custom-container");f.insertAdjacentElement("afterbegin",k)}function U(){const t=new MutationObserver(()=>{R()});t.observe(m,{childList:true})}function R(){const t=document.querySelectorAll(".rw-image-frame");t.forEach(t=>{if(t.parentNode.nodeName!=="BUTTON"){t.addEventListener("click",t=>{window.open(t.srcElement.currentSrc,"_blank")},false)}})}function Z(){const t=document.getElementById("rw-messages");const o=t.getElementsByClassName("rw-from-response");for(var e of o){const i=e.getElementsByClassName("rw-message")[0];i.classList.remove("rw-with-avatar");i.removeChild(e.getElementsByTagName("img")[0])}}function _(){const t=L()===pt.H;if(!document.querySelector("#youai-container-custom")){if(t){f.classList.remove("rw-full-screen")}localStorage.setItem("position","feedback");k.appendChild(i);const o=`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;const e=Array(5).fill(`${o}`);i.innerHTML=`
      <div id="youai-container-custom">
        <div class="youai-class-rating">
        </div>
        <div class="youai-container-textarea">
            <textarea id="youai-textareabox" placeholder="Lascia un feedback..."></textarea>
        </div>
        <p id="youai-error-feedback"></p>
        <div class="youai-container-button">
          <input type="button" value="Invia" id="youAiSendFeedback" />
        </div>
      </div>`;q(x?.Y.q?.title||"Lascia un feedback");const n=document.getElementsByClassName("youai-class-rating")[0];e.forEach(t=>n.insertAdjacentHTML("afterbegin",t));J();document.getElementById("youAiSendFeedback").addEventListener("click",()=>{let t=document.getElementById("youai-textareabox");let o=t.value.trim();const e=[...n.getElementsByTagName("svg")];const i=e.filter(t=>t.classList.contains("youai-checked")).length;mt(o,i);nt()})}}function J(){const i=[...document.getElementsByClassName("youai-class-rating")[0].getElementsByTagName("svg")];i.forEach((t,o)=>{let e="";t.addEventListener("mouseover",()=>{if(e!=="click"){e="mouseover";Q(i.slice(0,o+1));G(i.slice(o+1,i.length))}});t.addEventListener("mouseout",()=>{if(e!=="click"){e="mouseout";G(i)}});t.addEventListener("click",()=>{e="click";i[o].classList.add("youai-checked")})})}function G(t){t.forEach(t=>{t.classList.remove("youai-checked")})}function Q(t){t.forEach(t=>{t.classList.add("youai-checked")})}function X(){if(!k.querySelector(".container-pillole")){if(!document.querySelector(".youai-container-custom")){localStorage.setItem("position","pillole");q("Pillole");k.appendChild(i);i.innerHTML=`<div id="youai-container-custom"></div>`;gt().then(t=>{const{content:o}=t;const a=document.createElement("ul");a.classList.add("youai-ul");o.forEach(t=>{const o=document.createElement("div");o.classList.add("youai-container-collapse");const{multimedia:e}=t;const i=e?.find(t=>t.type==="video");const n=e?.find(t=>t.type==="icon");o.innerHTML=`<button type="button" class="youai-collapsible">
                                    <div class="youai-collapsibile-icon-img">
                                      ${n?`
                                      <img class="youai-pillole-icon" src="${n.link}" />`:``}
                                      <h1 class="youai-pillole-title">
                                        ${t.title}
                                      </h1>
                                    </div>
                                    <div>
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        fill="#000"
                                        class="bi bi-chevron-down arrow-down"
                                        viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                      </svg>
                                    </div>
                                  </button>
                                  <div class="youai-content">
                                    ${t.title===t.content?"":` <p>${t.content}</p>
                                    `}  
                                    ${i?`<iframe class="youai-yt"
                                      src="${i.link}" title="YouTube video player" frameborder="0"
                                      style="${L()===pt.H?"height: 33rem;":""}"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen>
                                      </iframe>`:``}
                                    <div>${t?.description}</div>
                                  </div>
                                  `;const c=document.createElement("li");c.appendChild(o);a.appendChild(c)});[...a.getElementsByTagName("button")].forEach(e=>{e.addEventListener("click",function(){this.classList.toggle("active");const t=e.getElementsByClassName("arrow-down")[0].classList;if(!t.contains("youai-rotate-arrow")){t.add("youai-rotate-arrow")}else{t.remove("youai-rotate-arrow")}var o=this.nextElementSibling;if(o.style.display==="block"){o.style.display="none"}else{o.style.display="block"}})});document.getElementById("youai-container-custom").appendChild(a)})["catch"](t=>{it();localStorage.setItem("position","close");console.log(`Erorr: ${t}`)})}}}function q(t){k.insertAdjacentHTML("afterbegin",`
    <div class="rw-header custom-header">
      <h4 class="rw-title">${t}</h4>
      <div class="youai-container-close">
        <svg xmlns="http://www.w3.org/2000/svg" id="youai-close-icon" width="24" height="24" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg>
        ${localStorage.getItem("interaction")?"":D()}
      </div>
    </div>
        `);let o=document.getElementById("customFullScreenButton");if(o){o=o.getElementsByTagName("img")[0];B(o);o.addEventListener("click",()=>{f.classList.toggle("rw-full-screen");const t=["rw-full-screen","rw-hide"];this.et(document.getElementsByClassName("rw-launcher rw-hide-sm")[0],t)})}document.getElementById("youai-close-icon").addEventListener("click",()=>{if(localStorage.getItem("position")==="pillole"){it();localStorage.setItem("position","open")}else{nt();localStorage.setItem("position","close")}})}function K(t){const o=k.getElementsByClassName("rw-messages-container")[0];const e=k.getElementsByTagName("form")[0];if(t){o.classList.remove("youai-display-none");e.classList.remove("youai-display-none")}else{o.classList.add("youai-display-none");e.classList.add("youai-display-none")}}function tt(t){const o=document.getElementsByClassName("rw-header-and-loading")[0];if(t){o.classList.remove("youai-display-none")}else{o.classList.add("youai-display-none")}}function ot(){k.removeChild(document.getElementsByClassName("youai-container-custom")[0])}function et(){k.removeChild(document.getElementsByClassName("custom-header")[0])}function it(){ot();et();K(true);tt(true)}function nt(){let t=document.getElementsByClassName("custom-container")[0];if(t){f.removeChild(t)}}function ct(){if(x?.Y?.autocomplete?.enable){v=document.getElementById("autocomplete");if(x?.it){v.focus()}if(x?.Z){v.addEventListener("input",function(t){let o=t.target.value;o=o.trimStart();clearTimeout(e);if(T&&g!==o){at();localStorage.setItem("hint",false)}e=setTimeout(()=>{if(o.length>5&&[...o].find(t=>t===" ")){g=o;localStorage.setItem("hint",true);dt(o).then(t=>{T=t;if(T.length){ut(this,T)}})["catch"](t=>console.log(`Error: ${t}`))}},1e3)})}v.addEventListener("keyup",t=>{if(t.code==="Enter"){at();localStorage.setItem("hint",false)}});document.getElementsByClassName("rw-messages-container")[0].addEventListener("click",t=>{localStorage.setItem("hint",false);at(t.target)})}}function at(t){var o=document.getElementsByClassName("youai-autocomplete-items");for(var e=0;e<o.length;e++){if(t!=o[e]&&t!=v){o[e].parentNode.removeChild(o[e])}}}function st(){return b==="session"?sessionStorage:localStorage}function lt(o,t){[...t].map(t=>{o?.classList?.toggle(t)})}function ut(t,o){var e,i,n=t?.value;at();if(!n){return false}e=document.createElement("div");e.setAttribute("id",`${t.id}autocomplete-list`);e.setAttribute("class","youai-autocomplete-items");if(o){if(o.length>3){e.style.height="10rem"}e.style.bottom="4rem";for(item in o){i=document.createElement("div");i.innerText+=o[item];i.addEventListener("click",function(t){v.value=this.innerText;localStorage.setItem("hint",false);at()});e.appendChild(i)}setTimeout(()=>{k.insertBefore(e,d)})}}const rt=async t=>{while(document.querySelector(t)===null){await new Promise(t=>requestAnimationFrame(t))}return document.querySelector(t)};async function dt(t){return this.nt("recommend",JSON.stringify({text:t}),{...M&&{I:M}})}async function ft(){return this.nt("nlu/recommender",null,{...M&&{I:M}})}async function mt(t,o){return this.nt("feedback",JSON.stringify({message:t,ct:o,channel:"webchat",at:wt()},{...M&&{I:M}}))}function wt(){const t="chat_session";const o=st().getItem(t);return JSON.parse(o).st}async function gt(){return this.nt("load/file",null,{filename:x?.Y?._?.filename,...M&&{I:M}})}async function ht(t){return this.nt("upload/media",t,{lt:wt(),...M&&{I:M}},false)}async function vt(t,o,e,i=true){var n=`${x?.Z}${t}`;if(n&&p){const a=new Headers;a.append("token",p);if(i){a.append("Content-Type","application/json")}var c={headers:a,method:o?"POST":"GET",...o&&{body:o,redirect:"follow"}};if(JSON.stringify(e)!==JSON.stringify({})){n=`${n}?${new URLSearchParams({...e})}`}const s=await fetch(n,c);const l=await s.json();return l.value||l.matches}return null}document.addEventListener("click",function(){const t=document.getElementById("youai-dropdown-content");if(t){t.style.display="none"}},false);function yt(){m.scrollTop=m.scrollHeight}window.onbeforeunload=()=>{localStorage.removeItem("interaction")};const pt={OPEN:"OPEN",A:"CLOSE",H:"FULLSCREEN"};