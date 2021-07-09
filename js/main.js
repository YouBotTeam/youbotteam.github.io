var typingTimer;
var mainContainer;
var lastSearch = "";
var containerCustom;
var showPopup = true;
var autocompleteElement;
var customPopupClassList;
var conversationContainer;

document.addEventListener("DOMContentLoaded", () => {
  // Rasa Web Chat
  window.WebChat.default({
    selector: "#webchat",
    initPayload: ["/welcome"],
    customData: { language: "en" }, // arbitrary custom data. Stay minimal as this will be added to the socket
    socketUrl: "https://demo.weai.it",
    socketPath: "/socket.io/",
    showFullScreenButton: true,
    title: "Comune di Milano",
    profileAvatar: "./images/favicon.png",
    subtitle: "Infoline 020202",
    inputTextFieldHint: "Scrivi la tua richiesta...",
    params: { storage: "session" }, // can be set to "local"  or "session". details in storage section.
  });

  // Operazioni di editing web chat
  setTimeout(() => {
    mainContainer = document.getElementsByClassName("rw-widget-container")[0];
    webChatOperation();

    const mutationObserver = new MutationObserver((mutationsList) => {
      // var mutationsListClassList = mutationsList[0].target.classList;
      webChatOperation();
    });

    mutationObserver.observe(mainContainer, { attributes: true });
  }, 500);
});

function createAutocomplete() {
  if (!document.querySelector(".autocomplete")) {
    const containerForm = document.createElement("div");
    containerForm.classList.add("autocomplete", "container-input");

    const textArea = document.getElementsByClassName("rw-new-message")[0];
    textArea.setAttribute("id", "autocomplete");
    const rwSend = document.getElementsByClassName("rw-send")[0];

    containerForm.appendChild(textArea);
    containerForm.appendChild(rwSend);

    const form = document.getElementsByClassName("rw-sender")[0];
    form.setAttribute("autocomplete", "off");

    form.appendChild(containerForm);
  }
}

function webChatOperation() {
  if (mainContainer?.classList.contains("rw-chat-open")) {
    createAutocomplete();
    autocomplete();
    clickOnImage();
    buttonMenu();
    // removeAvatarOnMsg();
    conversationContainer = document.getElementsByClassName(
      "rw-conversation-container"
    )[0];
    if (document.querySelector(".container-custom")) {
      removeConversationContainer();
    }
    const inputConversation =
      document.getElementsByClassName("rw-new-message")[0];
    inputConversation.addEventListener("input", (event) => {
      document
        .getElementsByClassName("rw-send")[0]
        .addEventListener("click", () => {
          inputConversationMthd(event.target.value);
        });
    });
    customPopupClassList?.add("display-none");
    // TODO: implementare logica per Enter button
    inputConversation.addEventListener("keyup", (event) => {
      console.log(event);
      console.log(this);
      //   if (event.key === "Enter") {
      //     inputConversationMthd(inputConversation.value);
      //   }
    });
  } else {
    if (localStorage.getItem("interaction")) {
      openFeedbackSection();
    }
    localStorage.removeItem("interaction");
    if (showPopup) {
      createCustomPopup("Clicca sul bottone per inziare la chat");
      customPopupClassList.add("fade-in");
      customPopupClassList.remove("display-none");
      showPopup = false;
    }
  }
}

function inputConversationMthd(value) {
  if (value.trim()) {
    console.log(value);
    localStorage.setItem("interaction", true);
  }
}

function createCustomPopup(contentPopup) {
  if (!document.querySelector(".popup-custom")) {
    mainContainer.insertAdjacentHTML(
      "beforeend",
      `<div class="popup-custom ">${contentPopup}</div>`
    );
    customPopupClassList =
      document.getElementsByClassName("popup-custom")[0].classList;
  }
}

function buttonMenu() {
  if (!document.getElementsByClassName("dropdown").length) {
    document.getElementsByClassName("rw-header-buttons")[0].insertAdjacentHTML(
      "beforeend",
      `
        <div class="dropdown">
          <button class="button-menu">
            <img class="rw-default icon-button-menu" src="./images/three-dots-vertical.svg"/>
          </button>
          <div id="dropdown-content">
            <a id="reset-chat">Reset chat</a>
            <a id="pillole">Pillole</a>
          </div>
        </div>`
      // <a id="feedback">Feedback</a>
    );

    document.getElementById("reset-chat").addEventListener("click", () => {
      // TODO: trovare un modo per resettare la chat
      const chatSession = sessionStorage.getItem("chat_session");
      console.log(chatSession);
    });

    document.getElementById("pillole").addEventListener("click", () => {
      showOrHideChatContainer(false);
      showOrHideHeaderContainer(false);
      containerCustom = document.createElement("div");
      containerCustom.classList.add(
        "rw-messages-container",
        "container-custom"
      );
      pilloleSection();
    });
  }
}

function openFeedbackSection() {
  createConversationContainer();
  containerCustom = document.createElement("div");
  containerCustom.classList.add("rw-messages-container", "container-custom");
  feedbackSection();
}

function createConversationContainer() {
  conversationContainer = document.createElement("div");
  conversationContainer.classList.add(
    "rw-conversation-container",
    "custom-container"
  );
  mainContainer.insertAdjacentElement("afterbegin", conversationContainer);
}

function clickOnImage() {
  const listOfImageTag = document.querySelectorAll("img.rw-image-frame");
  listOfImageTag.forEach((image) => {
    image.addEventListener(
      "click",
      (ev) => {
        window.open(ev.srcElement.currentSrc, "_blank");
      },
      false
    );
  });
}

function removeAvatarOnMsg() {
  const messages = document.getElementById("rw-messages");
  const msgReponse = messages.getElementsByClassName("rw-from-response");
  // const messagesList = messages.getElementsByClassName("rw-message");
  for (var message of msgReponse) {
    message.classList.remove("rw-with-avatar");
    if (!message.querySelector(".rw-avatar")) {
      const img = message.getElementsByTagName("img");
      if (img.length) {
        message.removeChild(img[0]);
      }
    }
  }
}

function feedbackSection() {
  if (!document.querySelector("#container-custom")) {
    localStorage.setItem("position", "feedback");
    conversationContainer.appendChild(containerCustom);
    containerCustom.innerHTML = `
      <div id="container-custom">
        <div class="class-rating">
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
        <div class="container-textarea">
            <textarea id="textareabox" placeholder="Lascia un feedback..."></textarea>
        </div>
        <p id="error-feedback"></p>
        <div class="container-button">
          <input type="button" value="Invia" id="inviaFeedback" />
        </div>
      </div>`;
    createCustomHeader("Lascia un feedback");
    handleStarFeedback();
    document.getElementById("inviaFeedback").addEventListener("click", () => {
      let textArea = document.getElementById("textareabox");
      let textAreaValue = textArea.value.trim();
      const listOfStar = [
        ...document
          .getElementsByClassName("class-rating")[0]
          .getElementsByTagName("span"),
      ];
      const starSelected = listOfStar.filter((star) =>
        star.classList.contains("checked")
      ).length;
      if (!textAreaValue && !starSelected) {
        removeConversationContainer();
        // textArea.classList.add("textarea-error");
        // document.getElementById("error-feedback").innerText =
        //   "Errore: scrivere una descrizione.";
      } else {
        // textArea.classList.remove("textarea-error");
        // TODO: allegare la chiamata per il salvataggio del feedback
        console.log({ textAreaValue, starSelected });
        removeConversationContainer();
      }
    });
  }
}

function handleStarFeedback() {
  const listOfStar = [
    ...document
      .getElementsByClassName("class-rating")[0]
      .getElementsByTagName("span"),
  ];
  listOfStar.forEach((star, index) => {
    let recordLastStatus = "";
    star.addEventListener("mouseover", () => {
      recordLastStatus = "mouseover";
      starAddChecked(listOfStar.slice(0, index + 1));
      starRemoveChecked(listOfStar.slice(index + 1, listOfStar.length));
    });
    star.addEventListener("mouseout", () => {
      if (recordLastStatus !== "click") {
        recordLastStatus = "mouseout";
        starRemoveChecked(listOfStar);
      }
    });
    star.addEventListener("click", () => {
      recordLastStatus = "click";
      listOfStar[index].classList.add("checked");
    });
  });
}

function starRemoveChecked(listOfStar) {
  listOfStar.forEach((starFiltered) => {
    starFiltered.classList.remove("checked");
  });
}

function starAddChecked(listOfStar) {
  listOfStar.forEach((starFiltered) => {
    starFiltered.classList.add("checked");
  });
}

function pilloleSection() {
  if (!conversationContainer.querySelector(".container-pillole")) {
    if (!document.querySelector(".container-custom")) {
      localStorage.setItem("position", "pillole");
      createCustomHeader("Pillole");
      conversationContainer.appendChild(containerCustom);
      containerCustom.innerHTML = `<div id="container-custom"></div>`;
      const pillole = [
        {
          title: "Active Business",
          content: "Pillola polizza Active Business",
          multimedia: [
            {
              type: "icon",
              link: "https://cattolica.weai.it/static/bot-images/icon_business.PNG",
            },
            {
              type: "video",
              link: "https://www.youtube-nocookie.com/embed/F2_aSibJ1P8",
            },
          ],
        },
        {
          title: "Active Casa & Persona",
          content: "Pillola polizza Active Casa & Persona",
          multimedia: [
            {
              type: "icon",
              link: "https://cattolica.weai.it/static/bot-images/icon_home.PNG",
            },
            {
              type: "video",
              link: "https://www.youtube-nocookie.com/embed/4drzqU3pSso",
            },
          ],
        },
        {
          title: "TCM",
          content: "Pillola polizza TCM",
          multimedia: [
            {
              type: "icon",
              link: "https://cattolica.weai.it/static/bot-images/icon_tcm.PNG",
            },
            {
              type: "video",
              link: "https://www.youtube-nocookie.com/embed/YZFqTN9VVlQ",
            },
          ],
        },
      ];

      const domPillole = document.createElement("ul");
      pillole.forEach((pillola) => {
        const contentLi = document.createElement("div");
        contentLi.classList.add("container-collapse");
        contentLi.innerHTML = `
                                <button type="button" class="collapsible"><img class="pillole-icon" src="${
                                  pillola.multimedia.find(
                                    (multi) => multi.type === "icon"
                                  ).link
                                }"/><h1 class="pillole-title">${
          pillola.title
        }</h1></button>
                                <div class="content" style="${
                                  mainContainer.classList.contains(
                                    "rw-full-screen"
                                  )
                                    ? "height: 30rem;"
                                    : ""
                                }">
                                    <p>${pillola.content}</p>
                                    <iframe src="${
                                      pillola.multimedia.find(
                                        (multi) => multi.type === "video"
                                      ).link
                                    }" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    `;
        const li = document.createElement("li");
        li.appendChild(contentLi);
        domPillole.appendChild(li);
      });
      [...domPillole.getElementsByTagName("button")].forEach((button) => {
        button.addEventListener("click", function () {
          this.classList.toggle("active");
          var content = this.nextElementSibling;
          if (content.style.display === "block") {
            content.style.display = "none";
          } else {
            content.style.display = "block";
          }
        });
      });
      document.getElementById("container-custom").appendChild(domPillole);
    }
  }
}

function createCustomHeader(title) {
  conversationContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="rw-header custom-header">
      <h4 class="rw-title">${title}</h4>
      <div class="container-close">
        <img id="close-icon" src="./images/x-lg.svg" />
      </div>
    </div>
    `
  );
  document.getElementById("close-icon").addEventListener("click", () => {
    if (localStorage.getItem("position") === "pillole") {
      backToFirstView();
      localStorage.setItem("position", "open");
    } else {
      removeConversationContainer();
      localStorage.setItem("position", "close");
    }
  });
}

async function getHintComplete(text) {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Basic dXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI="
  );
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    text,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  const call = await fetch(
    "https://weai.it/service/recommend/cattolica",
    requestOptions
  );
  const response = await call.json();
  return response;
}

function showOrHideChatContainer(show) {
  const chatContainer = conversationContainer.getElementsByClassName(
    "rw-messages-container"
  )[0];
  const formContainer = conversationContainer.getElementsByTagName("form")[0];
  if (show) {
    chatContainer.classList.remove("display-none");
    formContainer.classList.remove("display-none");
  } else {
    chatContainer.classList.add("display-none");
    formContainer.classList.add("display-none");
  }
}

function showOrHideHeaderContainer(show) {
  const headerContainer = document.getElementsByClassName(
    "rw-header-and-loading"
  )[0];
  if (show) {
    headerContainer.classList.remove("display-none");
  } else {
    headerContainer.classList.add("display-none");
  }
}

function removeContainerCustom() {
  conversationContainer.removeChild(
    document.getElementsByClassName("container-custom")[0]
  );
}

function removeCustomHeader() {
  conversationContainer.removeChild(
    document.getElementsByClassName("custom-header")[0]
  );
}

function backToFirstView() {
  removeContainerCustom();
  removeCustomHeader();
  showOrHideChatContainer(true);
  showOrHideHeaderContainer(true);
}

function removeConversationContainer() {
  mainContainer.removeChild(
    document.getElementsByClassName("custom-container")[0]
  );
}

// // Avatar title
// const avatar = document.createElement('img');
// avatar.setAttribute('src', './images/favicon.png');
// avatar.setAttribute('alt', 'chat avatar');
// avatar.classList.add('rw-avatar');
// document.getElementsByClassName('rw-header rw-with-subtitle')[0].insertBefore(avatar, document.getElementsByClassName('rw-header-buttons')[0]);

function autocomplete() {
  autocompleteElement = document.getElementById("autocomplete");
  autocompleteElement.addEventListener("click", function (event) {
    // TODO implementare logica di mantenimento dell'hint
    // createListToComplete(this, currentFocus, *****);
  });

  autocompleteElement.addEventListener("input", function (e) {
    let input = e.target.value;
    input = input.trimStart();
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      if (input.length > 5 && [...input].find((char) => char === " ")) {
        lastSearch = input;
        getHintComplete(input)
          .then((response) => {
            createListToComplete(this, response.matches);
          })
          .catch((error) => console.log(`Error: ${error}`));
      }
    }, 1500);
  });

  document.addEventListener("click", (e) => {
    closeAllLists(e.target);
  });
}

function closeAllLists(elmnt) {
  var automCompleteItemsList =
    document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < automCompleteItemsList.length; i++) {
    if (elmnt != automCompleteItemsList[i] && elmnt != autocompleteElement) {
      automCompleteItemsList[i].parentNode.removeChild(
        automCompleteItemsList[i]
      );
    }
  }
}

function createListToComplete(context, list) {
  var a,
    b,
    val = context.value;
  closeAllLists();
  if (!val) {
    return false;
  }
  currentFocus = -1;
  a = document.createElement("div");
  a.setAttribute("id", context.id + "autocomplete-list");
  a.setAttribute("class", "autocomplete-items");
  switch (list.length) {
    case 1:
      a.style.marginTop = "-3.4rem";
      break;
    case 2:
      a.style.marginTop = "-5.9rem";
      break;
    case 3:
      a.style.marginTop = "-8.4rem";
      break;
    default:
      a.style.marginTop = "-10.9rem";
      a.style.height = "10rem";
      break;
  }
  context.parentNode.appendChild(a);
  for (item in list) {
    b = document.createElement("div");
    b.innerText += list[item];
    b.addEventListener("click", function (e) {
      autocompleteElement.value = this.innerText;
      closeAllLists();
    });
    a.appendChild(b);
  }
}
