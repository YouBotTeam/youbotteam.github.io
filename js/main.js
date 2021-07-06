var mainContainer;
var containerCustom;
var customPopupClassList;
var conversationContainer;

document.addEventListener("DOMContentLoaded", () => {
  // Rasa Web Chat
  window.WebChat.default({
    selector: "#webchat",
    initPayload: "/welcome",
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
    // setWidthCustom(mainContainer.classList);
    webChatOperation();

    const mutationObserver = new MutationObserver((mutationsList) => {
      var mutationsListClassList = mutationsList[0].target.classList;
      setWidthCustom(mutationsListClassList);
      webChatOperation();
    });

    mutationObserver.observe(mainContainer, { attributes: true });
  }, 500);
});

function setWidthCustom(domClassList) {
  if (!domClassList.contains("rw-chat-open")) {
    // mainContainer.classList.add("w-half");
  } else {
    // mainContainer.classList.remove("w-half");
  }
}

function webChatOperation() {
  createCustomPopup("Clicca sul bottone per inziare la chat");
  if (mainContainer.classList.contains("rw-chat-open")) {
    clickOnImage();
    buttonMenu();
    // removeAvatarOnMsg();
    customPopupClassList.add("display-none");
    // Custom container
    conversationContainer = document.getElementsByClassName(
      "rw-conversation-container"
    )[0];
  } else {
    customPopupClassList.add("fade-in");
    customPopupClassList.remove("display-none");
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
      // TODO: aggiungere la chiamata a servizio
      console.log("/reset");
    });

    document.getElementById("pillole").addEventListener("click", () => {
      console.log("/pillole");
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
  showOrHideChatContainer(false);
  showOrHideHeaderContainer(false);
  containerCustom = document.createElement("div");
  containerCustom.classList.add("rw-messages-container", "container-custom");
  feedbackSection();
}

function clickOnImage() {
  document.getElementsByClassName("image")[0].addEventListener(
    "click",
    (ev) => {
      window.open(ev.srcElement.currentSrc, "_blank");
    },
    false
  );
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
  if (!document.querySelector(".container-custom")) {
    createCustomHeader("Lascia un feedback");
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
        <div class="container-button">
          <input type="button" value="Invia" id="inviaFeedback" />
        </div>
      </div>`;
    handleStarFeedback();
    document.getElementById("inviaFeedback").addEventListener("click", () => {
      let textArea = document.getElementById("textareabox");
      let textAreaValue = textArea.value.trim();
      if (!textAreaValue) {
        textArea.classList.add("textarea-error");
      } else {
        textArea.classList.remove("textarea-error");
        const listOfStar = [
          ...document
            .getElementsByClassName("class-rating")[0]
            .getElementsByTagName("span"),
        ];
        const starSelected = listOfStar.filter((star) =>
          star.classList.contains("checked")
        ).length;
        // TODO: allegare la chiamata per il salvataggio del feedback
        console.log({ textAreaValue, starSelected });
        backToFirstView();
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
      createCustomHeader("Pillole");
      conversationContainer.appendChild(containerCustom);
      containerCustom.innerHTML = `<div id="container-custom"></div>`;
      const pillole = [
        {
          title: "Prima pillola",
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        },
        {
          title: "Seconda pillola",
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        },
        {
          title: "Terza pillola",
          content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
        },
      ];
      const domPillole = document.createElement("ul");
      pillole.forEach((pillola) => {
        const contentLi = document.createElement("div");
        contentLi.classList.add("container-collapse");
        contentLi.innerHTML = `
                                <button type="button" class="collapsible">${pillola.title}</button>
                                <div class="content">
                                    <p>${pillola.content}</p>
                                </div>`;
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
    backToFirstView();
  });
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

// // Avatar title
// const avatar = document.createElement('img');
// avatar.setAttribute('src', './images/favicon.png');
// avatar.setAttribute('alt', 'chat avatar');
// avatar.classList.add('rw-avatar');
// document.getElementsByClassName('rw-header rw-with-subtitle')[0].insertBefore(avatar, document.getElementsByClassName('rw-header-buttons')[0]);
