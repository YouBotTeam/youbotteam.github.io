var form,mainContainer,chatContainer,containerCustom,autocompleteElement,customPopupClassList,conversationContainer,inputChat="",lastSearch="",showPopup=!0,configuration={},typingTimer=null,commanderResponse=null;const fullScreenOpen="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTY0IDM3MS4yaDc2Ljc5NVY0NDhIMTkyVjMyMEg2NHY1MS4yem03Ni43OTUtMjMwLjRINjRWMTkyaDEyOFY2NGgtNTEuMjA1djc2Ljh6TTMyMCA0NDhoNTEuMnYtNzYuOEg0NDhWMzIwSDMyMHYxMjh6bTUxLjItMzA3LjJWNjRIMzIwdjEyOGgxMjh2LTUxLjJoLTc2Ljh6Ii8+PC9zdmc+",fullScreenClose="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTM5Ni43OTUgMzk2LjhIMzIwVjQ0OGgxMjhWMzIwaC01MS4yMDV6TTM5Ni44IDExNS4yMDVWMTkySDQ0OFY2NEgzMjB2NTEuMjA1ek0xMTUuMjA1IDExNS4ySDE5MlY2NEg2NHYxMjhoNTEuMjA1ek0xMTUuMiAzOTYuNzk1VjMyMEg2NHYxMjhoMTI4di01MS4yMDV6Ii8+PC9zdmc+";function ChatCustomization(){}ChatCustomization.configuration=e=>{configuration=e},document.addEventListener("readystatechange",(()=>{"interactive"===document.readyState&&(setCustomStyleOfPage(),configuration.clearCacheOnRefresh&&sessionStorage.clear(),checkElement(".rw-widget-container").then((()=>{mainContainer=document.getElementsByClassName("rw-widget-container")[0],webChatOperation();new MutationObserver((()=>{webChatOperation()})).observe(mainContainer,{attributes:!0})})))}));var statusChat=()=>mainContainer?.classList.contains("rw-chat-open")?mainContainer?.classList.contains("rw-full-screen")?statusWebChat.FULLSCREEN:statusWebChat.OPEN:statusWebChat.CLOSE;function setCustomStyleOfPage(){const e=document.documentElement.style,t=configuration?.colorCustom;if(t){const n=t?.primary,o=t?.messageUser,a=t?.sendButton,s=t?.messageBot;if(n&&e.setProperty("--primary-color",n),o){const{backgroundColor:t,textColor:n}=o;t&&e.setProperty("--msg-user-bg-color",t),n&&e.setProperty("--msg-user-text-color",n)}if(s){const{backgroundColor:t,textColor:n}=s;t&&e.setProperty("--msg-bot-bg-color",t),n&&e.setProperty("--msg-bot-text-color",n)}a&&e.setProperty("--button-send-color",a)}if(configuration?.mainButtonDimension){const t=configuration?.mainButtonDimension?.width,n=configuration?.mainButtonDimension?.height;t&&e.setProperty("--width-button",t),n&&e.setProperty("--height-button",n)}}function createAutocomplete(){if(!document.querySelector(".autocomplete")){const e=document.createElement("div");e.classList.add("autocomplete","container-input");const t=document.getElementsByClassName("rw-new-message")[0];t.setAttribute("id","autocomplete");const n=document.getElementsByClassName("rw-send")[0];e.appendChild(t),e.appendChild(n),form.setAttribute("autocomplete","off"),form.appendChild(e)}}function webChatOperation(){const e=document.getElementsByClassName("autocomplete container-input")[0];switch(statusChat()){case statusWebChat.OPEN:form=document.getElementsByClassName("rw-sender")[0],configuration?.enableAutoComplete&&(createAutocomplete(),autocomplete()),configuration?.baseUrl&&configuration?.project_name&&configuration?.buttonMenu?.enableSection&&buttonMenuToggle(),conversationContainer=document.getElementsByClassName("rw-conversation-container")[0],chatContainer=conversationContainer.getElementsByClassName("rw-messages-container")[0],document.querySelector(".container-custom")&&removeConversationContainer(),configuration?.enableClickOnImage&&(mutationObserverChatContainer(),clickOnImage());const t=document.getElementsByClassName("rw-new-message")[0];t.addEventListener("input",(e=>{inputChat=e.srcElement.value,document.getElementsByClassName("rw-send")[0].addEventListener("click",(()=>{inputConversationMthd(e.target.value)}))})),customPopupClassList?.add("display-none"),t.addEventListener("keyup",(e=>{"Enter"===e.key&&inputChat&&inputConversationMthd(inputChat)})),e&&e.style.removeProperty("height");const n=[...document.getElementsByClassName("rw-header")].filter((e=>!e.classList.contains("custom-header")))[0].getElementsByClassName("rw-toggle-fullscreen-button");n.length&&n[0].addEventListener("click",(e=>{mainContainer.classList.toggle("rw-full-screen")})),setSizeOfImage(null,null),setHeightOfIframe(null);break;case statusWebChat.FULLSCREEN:e&&(e.style.height="3rem"),setHeightOfIframe("30rem"),setSizeOfImage("30rem","20rem");break;case statusWebChat.CLOSE:localStorage.getItem("interaction")&&openFeedbackSection(),localStorage.setItem("position","popup"),showPopup&&"popup"===localStorage.getItem("position")&&configuration?.popupSection?.showPopup&&!localStorage.getItem("interaction")&&(createCustomPopup(configuration?.popupSection?.popupText||"Clicca sul bottone per inziare la chat"),customPopupClassList.add("fade-in"),customPopupClassList.remove("display-none"),showPopup=!1),localStorage.removeItem("interaction"),localStorage.setItem("position","close");break}if(document.querySelector(".rw-toggle-fullscreen-button")&&document.querySelector(".custom-header")&&configuration?.pilloleSection?.enableFullScreen){const e=document.getElementsByClassName("rw-toggle-fullscreen-button"),t=e[0].getElementsByTagName("img")[0],n=e[1].getElementsByTagName("img")[0];setIconToButtonFullScreen(t),setIconToButtonFullScreen(n),t.classList.add("rw-toggle-fullscreen","rw-fullScreenImage"),n.classList.add("rw-toggle-fullscreen","rw-fullScreenExitImage"),n.classList.remove("rw-fullScreenImage")}localStorage.getItem("hint")&&(statusChat()===statusWebChat.FULLSCREEN||statusChat()===statusWebChat.OPEN)&&autocompleteElement?.value&&lastSearch&&commanderResponse&&autocompleteElement.value===lastSearch||createListToComplete(autocompleteElement,commanderResponse)}function setSizeOfImage(e,t){[...document.getElementsByClassName("rw-image-details")].forEach((n=>{const o=n.children[0].style;o.width=e,o.height=t}))}function setHeightOfIframe(e){[...document.getElementsByTagName("iframe")].forEach((t=>{t.style.height=e}))}function setIconToButtonFullScreen(e){statusChat()===statusWebChat.FULLSCREEN?e.setAttribute("src",fullScreenOpen):e.setAttribute("src",fullScreenClose)}function fullScreenButton(){return configuration?.pilloleSection?.enableFullScreen?'\n  <button class="rw-toggle-fullscreen-button" id="customFullScreenButton">\n    <img class="rw-toggle-fullscreen rw-fullScreenImage" alt="toggle fullscreen">\n  </button>\n  ':""}function inputConversationMthd(e){e.trim()&&localStorage.setItem("interaction",!0)}function createCustomPopup(e){document.querySelector(".popup-custom")||(document.getElementsByClassName("rw-widget-container")[0].insertAdjacentHTML("beforeend",`<div class="popup-custom">${e}</div>`),customPopupClassList=document.getElementsByClassName("popup-custom")[0].classList)}function buttonMenuToggle(){document.getElementsByClassName("dropdown").length||(document.getElementsByClassName("rw-header-buttons")[0].insertAdjacentHTML("beforeend",'\n        <div class="dropdown">\n          <button class="button-menu">\n            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-three-dots-vertical rw-default icon-button-menu" viewBox="0 0 16 16">\n              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>\n            </svg>\n          </button>\n          <div id="dropdown-content">\n            <a id="pillole">Pillole</a>\n          </div>\n        </div>'),configuration?.buttonMenu?.enableResetChat&&(document.getElementById("dropdown-content").insertAdjacentHTML("beforeend",' <a id="reset-chat">Reset chat</a>'),document.getElementById("reset-chat").addEventListener("click",(()=>{}))),document.getElementById("pillole").addEventListener("click",(()=>{showOrHideChatContainer(!1),showOrHideHeaderContainer(!1),(containerCustom=document.createElement("div")).classList.add("rw-messages-container","container-custom"),pilloleSection()})))}function openFeedbackSection(){createConversationContainer(),(containerCustom=document.createElement("div")).classList.add("rw-messages-container","container-custom"),feedbackSection()}function createConversationContainer(){(conversationContainer=document.createElement("div")).classList.add("rw-conversation-container","custom-container"),mainContainer.insertAdjacentElement("afterbegin",conversationContainer)}function mutationObserverChatContainer(){new MutationObserver((()=>{clickOnImage()})).observe(chatContainer,{childList:!0})}function clickOnImage(){document.querySelectorAll("img").forEach((e=>{"BUTTON"!==e.parentNode.nodeName&&e.addEventListener("click",(e=>{window.open(e.srcElement.currentSrc,"_blank")}),!1)}))}function removeAvatarOnMsg(){const e=document.getElementById("rw-messages").getElementsByClassName("rw-from-response");for(var t of e){const e=t.getElementsByClassName("rw-message")[0];e.classList.remove("rw-with-avatar"),e.removeChild(t.getElementsByTagName("img")[0])}}function feedbackSection(){const e=statusChat()===statusWebChat.FULLSCREEN;if(!document.querySelector("#container-custom")){e&&mainContainer.classList.remove("rw-full-screen"),localStorage.setItem("position","feedback"),conversationContainer.appendChild(containerCustom);const t='\n    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">\n      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>\n    </svg>',n=Array(5).fill(`${t}`);containerCustom.innerHTML='\n      <div id="container-custom">\n        <div class="class-rating">\n        </div>\n        <div class="container-textarea">\n            <textarea id="textareabox" placeholder="Lascia un feedback..."></textarea>\n        </div>\n        <p id="error-feedback"></p>\n        <div class="container-button">\n          <input type="button" value="Invia" id="inviaFeedback" />\n        </div>\n      </div>',createCustomHeader(configuration?.feedbackSection?.title||"Lascia un feedback");const o=document.getElementsByClassName("class-rating")[0];n.forEach((e=>o.insertAdjacentHTML("afterbegin",e))),handleStarFeedback(),document.getElementById("inviaFeedback").addEventListener("click",(()=>{document.getElementById("textareabox").value.trim();[...o.getElementsByTagName("svg")].filter((e=>e.classList.contains("checked"))).length;removeConversationContainer()}))}}function handleStarFeedback(){const e=[...document.getElementsByClassName("class-rating")[0].getElementsByTagName("svg")];e.forEach(((t,n)=>{let o="";t.addEventListener("mouseover",(()=>{"click"!==o&&(o="mouseover",starAddChecked(e.slice(0,n+1)),starRemoveChecked(e.slice(n+1,e.length)))})),t.addEventListener("mouseout",(()=>{"click"!==o&&(o="mouseout",starRemoveChecked(e))})),t.addEventListener("click",(()=>{o="click",e[n].classList.add("checked")}))}))}function starRemoveChecked(e){e.forEach((e=>{e.classList.remove("checked")}))}function starAddChecked(e){e.forEach((e=>{e.classList.add("checked")}))}function pilloleSection(){conversationContainer.querySelector(".container-pillole")||document.querySelector(".container-custom")||(localStorage.setItem("position","pillole"),createCustomHeader("Pillole"),conversationContainer.appendChild(containerCustom),containerCustom.innerHTML='<div id="container-custom"></div>',getPillole().then((e=>{const{value:t}=e,n=document.createElement("ul");t.forEach((e=>{const t=document.createElement("div");t.classList.add("container-collapse");const{multimedia:o}=e,a=o?.find((e=>"video"===e.type)),s=o?.find((e=>"icon"===e.type));t.innerHTML=`\n                                <button type="button" class="collapsible">\n                                  <div class="collapsibile-icon-img">\n                                  ${s?`  <img class="pillole-icon" src="${s.link}"/>`:""}\n                                    <h1 class="pillole-title">${e.title}</h1>\n                                  </div>\n                                  <div>\n                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000" class="bi bi-chevron-down arrow-down" viewBox="0 0 16 16">\n                                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />\n                                    </svg>\n                                  </div>\n                                </button>\n                                <div class="content">\n                                    ${e.title===e.content?"":`<p>${e.content}</p>`}\n                                    ${a?`                                    <iframe src="${a.link}"\n                                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`:""}\n                                    <div>\n                                      ${e?.description}\n                                    </div>\n                                </div>\n                                    `;const i=document.createElement("li");i.appendChild(t),n.appendChild(i)})),[...n.getElementsByTagName("button")].forEach((e=>{e.addEventListener("click",(function(){this.classList.toggle("active");const t=e.getElementsByClassName("arrow-down")[0].classList;t.contains("rotate-arrow")?t.remove("rotate-arrow"):t.add("rotate-arrow");var n=this.nextElementSibling;"block"===n.style.display?n.style.display="none":n.style.display="block"}))})),document.getElementById("container-custom").appendChild(n)})).catch((e=>{})))}function createCustomHeader(e){conversationContainer.insertAdjacentHTML("afterbegin",`\n    <div class="rw-header custom-header">\n      <h4 class="rw-title">${e}</h4>\n      <div class="container-close">\n        <svg xmlns="http://www.w3.org/2000/svg" id="close-icon" width="24" height="24" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">\n          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>\n        </svg>\n        ${localStorage.getItem("interaction")?"":fullScreenButton()}\n      </div>\n    </div>\n        `);let t=document.getElementById("customFullScreenButton");t&&(t=t.getElementsByTagName("img")[0],setIconToButtonFullScreen(t),t.addEventListener("click",(()=>{mainContainer.classList.toggle("rw-full-screen");this.toggleClassList(document.getElementsByClassName("rw-launcher rw-hide-sm")[0],["rw-full-screen","rw-hide"])}))),document.getElementById("close-icon").addEventListener("click",(()=>{"pillole"===localStorage.getItem("position")?(backToFirstView(),localStorage.setItem("position","open")):(removeConversationContainer(),localStorage.setItem("position","close"))}))}function showOrHideChatContainer(e){const t=conversationContainer.getElementsByClassName("rw-messages-container")[0],n=conversationContainer.getElementsByTagName("form")[0];e?(t.classList.remove("display-none"),n.classList.remove("display-none")):(t.classList.add("display-none"),n.classList.add("display-none"))}function showOrHideHeaderContainer(e){const t=document.getElementsByClassName("rw-header-and-loading")[0];e?t.classList.remove("display-none"):t.classList.add("display-none")}function removeContainerCustom(){conversationContainer.removeChild(document.getElementsByClassName("container-custom")[0])}function removeCustomHeader(){conversationContainer.removeChild(document.getElementsByClassName("custom-header")[0])}function backToFirstView(){removeContainerCustom(),removeCustomHeader(),showOrHideChatContainer(!0),showOrHideHeaderContainer(!0)}function removeConversationContainer(){let e=document.getElementsByClassName("custom-container")[0];e&&mainContainer.removeChild(e)}function autocomplete(){autocompleteElement=document.getElementById("autocomplete"),configuration?.autoFocusOnInput&&autocompleteElement.focus(),configuration?.baseUrl&&configuration?.project_name&&autocompleteElement.addEventListener("input",(function(e){let t=e.target.value;t=t.trimStart(),clearTimeout(typingTimer),commanderResponse&&lastSearch!==t&&(closeAllLists(),localStorage.setItem("hint",!1)),typingTimer=setTimeout((()=>{t.length>5&&[...t].find((e=>" "===e))&&(lastSearch=t,localStorage.setItem("hint",!0),getHintComplete(t).then((e=>{(commanderResponse=e.matches).length&&createListToComplete(this,commanderResponse)})).catch((e=>{})))}),1e3)})),autocompleteElement.addEventListener("keyup",(e=>{"Enter"===e.code&&(closeAllLists(),localStorage.setItem("hint",!1))})),document.getElementsByClassName("rw-messages-container")[0].addEventListener("click",(e=>{localStorage.setItem("hint",!1),closeAllLists(e.target)}))}function closeAllLists(e){for(var t=document.getElementsByClassName("autocomplete-items"),n=0;n<t.length;n++)e!=t[n]&&e!=autocompleteElement&&t[n].parentNode.removeChild(t[n])}function toggleClassList(e,t){[...t].map((t=>{e?.classList?.toggle(t)}))}function createListToComplete(e,t){var n,o,a=e?.value;if(closeAllLists(),!a)return!1;if((n=document.createElement("div")).setAttribute("id",`${e.id}autocomplete-list`),n.setAttribute("class","autocomplete-items"),t){for(item in t.length>3&&(n.style.height="10rem"),n.style.bottom="4rem",t)(o=document.createElement("div")).innerText+=t[item],o.addEventListener("click",(function(e){autocompleteElement.value=this.innerText,localStorage.setItem("hint",!1),closeAllLists()})),n.appendChild(o);setTimeout((()=>{conversationContainer.insertBefore(n,form)}))}}const checkElement=async e=>{for(;null===document.querySelector(e);)await new Promise((e=>requestAnimationFrame(e)));return document.querySelector(e)};async function getHintComplete(e){return this.optionSharedCall("service/recommend",JSON.stringify({text:e}))}async function getPillole(){return this.optionSharedCall("service/load/file",null,{filename:"pillole_ref.json"})}async function optionSharedCall(e,t,n){const o=configuration?.baseUrl,a=configuration?.project_name;if(a&&o){const i=new Headers;i.append("Authorization","Basic dXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI="),i.append("Content-Type","application/json");var s={headers:i,method:t?"POST":"GET",...t&&{body:t,redirect:"follow"}};const c=await fetch(`${o}${e}?${new URLSearchParams({project_name:a,...n&&{...n}})}`,s);return await c.json()}return null}window.onbeforeunload=()=>{localStorage.removeItem("interaction")};const statusWebChat={OPEN:"OPEN",CLOSE:"CLOSE",FULLSCREEN:"FULLSCREEN"};