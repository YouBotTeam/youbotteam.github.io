// TODO: quando la chiamata del socket va in errore (net::ERR_TIMED_OUT) chiudere la chat
// TODO: fixare il double click sull'uscita del
// fullscreen quando abilitato il tasto nella sezione delle pillole

var form;
var mainContainer;
var chatContainer;
var inputChat = "";
var lastSearch = "";
var containerCustom;
var showPopup = true;
var configuration = {};
var typingTimer = null;
var autocompleteElement;
var customPopupClassList;
var conversationContainer;
var commanderResponse = null;
const fullScreenOpen =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTY0IDM3MS4yaDc2Ljc5NVY0NDhIMTkyVjMyMEg2NHY1MS4yem03Ni43OTUtMjMwLjRINjRWMTkyaDEyOFY2NGgtNTEuMjA1djc2Ljh6TTMyMCA0NDhoNTEuMnYtNzYuOEg0NDhWMzIwSDMyMHYxMjh6bTUxLjItMzA3LjJWNjRIMzIwdjEyOGgxMjh2LTUxLjJoLTc2Ljh6Ii8+PC9zdmc+";
const fullScreenClose =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTM5Ni43OTUgMzk2LjhIMzIwVjQ0OGgxMjhWMzIwaC01MS4yMDV6TTM5Ni44IDExNS4yMDVWMTkySDQ0OFY2NEgzMjB2NTEuMjA1ek0xMTUuMjA1IDExNS4ySDE5MlY2NEg2NHYxMjhoNTEuMjA1ek0xMTUuMiAzOTYuNzk1VjMyMEg2NHYxMjhoMTI4di01MS4yMDV6Ii8+PC9zdmc+";

function ChatCustomization() {}

ChatCustomization.configuration = (config) => {
  configuration = config;
};

document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    setCustomStyleOfPage();
    if (configuration.clearCacheOnRefresh) {
      sessionStorage.clear();
    }
    checkElement(".rw-widget-container").then(() => {
      mainContainer = document.getElementsByClassName("rw-widget-container")[0];
      webChatOperation();

      const mutationObserver = new MutationObserver(() => {
        webChatOperation();
      });

      mutationObserver.observe(mainContainer, { attributes: true });
    });
  }
});

var statusChat = () =>
  mainContainer?.classList.contains("rw-chat-open")
    ? mainContainer?.classList.contains("rw-full-screen")
      ? statusWebChat.FULLSCREEN
      : statusWebChat.OPEN
    : statusWebChat.CLOSE;

function setCustomStyleOfPage() {
  const styleOfDocument = document.documentElement.style;
  const colorCustom = configuration?.colorCustom;
  if (colorCustom) {
    const primary = colorCustom?.primary;
    const messageUser = colorCustom?.messageUser;
    const sendButton = colorCustom?.sendButton;
    const messageBot = colorCustom?.messageBot;
    if (primary) {
      styleOfDocument.setProperty("--primary-color", primary);
    }
    if (messageUser) {
      const { backgroundColor, textColor } = messageUser;
      if (backgroundColor) {
        styleOfDocument.setProperty("--msg-user-bg-color", backgroundColor);
      }
      if (textColor) {
        styleOfDocument.setProperty("--msg-user-text-color", textColor);
      }
    }
    if (messageBot) {
      const { backgroundColor, textColor } = messageBot;
      if (backgroundColor) {
        styleOfDocument.setProperty("--msg-bot-bg-color", backgroundColor);
      }
      if (textColor) {
        styleOfDocument.setProperty("--msg-bot-text-color", textColor);
      }
    }
    if (sendButton) {
      styleOfDocument.setProperty("--button-send-color", sendButton);
    }
  }
  if (configuration?.mainButtonDimension) {
    const width = configuration?.mainButtonDimension?.width;
    const height = configuration?.mainButtonDimension?.height;
    if (width) {
      styleOfDocument.setProperty("--width-button", width);
    }
    if (height) {
      styleOfDocument.setProperty("--height-button", height);
    }
  }
}

function createAutocomplete() {
  if (!document.querySelector(".autocomplete")) {
    const containerForm = document.createElement("div");
    containerForm.classList.add("autocomplete", "container-input");

    const textArea = document.getElementsByClassName("rw-new-message")[0];
    textArea.setAttribute("id", "autocomplete");
    const rwSend = document.getElementsByClassName("rw-send")[0];

    containerForm.appendChild(textArea);
    containerForm.appendChild(rwSend);

    form.setAttribute("autocomplete", "off");
    form.appendChild(containerForm);
  }
}

function webChatOperation() {
  const containerAutoComplete = document.getElementsByClassName(
    "autocomplete container-input"
  )[0];
  switch (statusChat()) {
    case statusWebChat.OPEN:
      form = document.getElementsByClassName("rw-sender")[0];
      if (configuration?.enableAutoComplete) {
        createAutocomplete();
        autocomplete();
      }
      if (
        configuration?.baseUrl &&
        configuration?.project_name &&
        configuration?.buttonMenu?.enableSection
      ) {
        buttonMenuToggle();
      }
      // TODO: capire se da rimuovere nel caso mettere un mutationObserver sul change
      // removeAvatarOnMsg();
      conversationContainer = document.getElementsByClassName(
        "rw-conversation-container"
      )[0];
      chatContainer = conversationContainer.getElementsByClassName(
        "rw-messages-container"
      )[0];
      if (document.querySelector(".container-custom")) {
        removeConversationContainer();
      }
      if (configuration?.enableClickOnImage) {
        mutationObserverChatContainer();
        clickOnImage();
      }
      const inputConversation =
        document.getElementsByClassName("rw-new-message")[0];
      inputConversation.addEventListener("input", (event) => {
        inputChat = event.srcElement.value;
        document
          .getElementsByClassName("rw-send")[0]
          .addEventListener("click", () => {
            inputConversationMthd(event.target.value);
          });
      });
      customPopupClassList?.add("display-none");
      inputConversation.addEventListener("keyup", (event) => {
        if (event.key === "Enter" && inputChat) {
          inputConversationMthd(inputChat);
        }
      });
      if (containerAutoComplete) {
        containerAutoComplete.style.removeProperty("height");
      }
      const toggleFullscreenButton = [
        ...document.getElementsByClassName("rw-header"),
      ]
        .filter((header) => !header.classList.contains("custom-header"))[0]
        .getElementsByClassName("rw-toggle-fullscreen-button");
      if (toggleFullscreenButton.length) {
        toggleFullscreenButton[0].addEventListener("click", (e) => {
          mainContainer.classList.toggle("rw-full-screen");
        });
      }
      setSizeOfImage(null, null);
      setHeightOfIframe(null);
      break;
    case statusWebChat.FULLSCREEN:
      if (containerAutoComplete) containerAutoComplete.style.height = "3rem";
      setHeightOfIframe("30rem");
      setSizeOfImage("30rem", "20rem");
      break;
    case statusWebChat.CLOSE:
      if (localStorage.getItem("interaction")) {
        openFeedbackSection();
      }
      localStorage.setItem("position", "popup");
      if (
        showPopup &&
        localStorage.getItem("position") === "popup" &&
        configuration?.popupSection?.showPopup &&
        !localStorage.getItem("interaction")
      ) {
        createCustomPopup(
          configuration?.popupSection?.popupText ||
            "Clicca sul bottone per inziare la chat"
        );
        customPopupClassList.add("fade-in");
        customPopupClassList.remove("display-none");
        showPopup = false;
      }
      localStorage.removeItem("interaction");
      localStorage.setItem("position", "close");
      break;
  }

  if (
    document.querySelector(".rw-toggle-fullscreen-button") &&
    document.querySelector(".custom-header") &&
    configuration?.pilloleSection?.enableFullScreen
  ) {
    const buttonFullScreen = document.getElementsByClassName(
      "rw-toggle-fullscreen-button"
    );
    const iconButtonFullScreen =
      buttonFullScreen[0].getElementsByTagName("img")[0];
    const iconButtonFullScreenP =
      buttonFullScreen[1].getElementsByTagName("img")[0];
    setIconToButtonFullScreen(iconButtonFullScreen);
    setIconToButtonFullScreen(iconButtonFullScreenP);
    iconButtonFullScreen.classList.add(
      "rw-toggle-fullscreen",
      "rw-fullScreenImage"
    );
    iconButtonFullScreenP.classList.add(
      "rw-toggle-fullscreen",
      "rw-fullScreenExitImage"
    );
    iconButtonFullScreenP.classList.remove("rw-fullScreenImage");
  }

  if (
    !(
      localStorage.getItem("hint") &&
      (statusChat() === statusWebChat.FULLSCREEN ||
        statusChat() === statusWebChat.OPEN) &&
      autocompleteElement?.value &&
      lastSearch &&
      commanderResponse &&
      autocompleteElement.value === lastSearch
    )
  ) {
    createListToComplete(autocompleteElement, commanderResponse);
  }
}

function setSizeOfImage(width, height) {
  const listImage = [...document.getElementsByClassName("rw-image-details")];
  listImage.forEach((image) => {
    const imageStyle = image.children[0].style;
    imageStyle.width = width;
    imageStyle.height = height;
  });
}

function setHeightOfIframe(height) {
  [...document.getElementsByTagName("iframe")].forEach((iframe) => {
    iframe.style.height = height;
  });
}

function setIconToButtonFullScreen(iconButtonFullScreen) {
  if (statusChat() === statusWebChat.FULLSCREEN) {
    iconButtonFullScreen.setAttribute("src", fullScreenOpen);
  } else {
    iconButtonFullScreen.setAttribute("src", fullScreenClose);
  }
}

function fullScreenButton() {
  return configuration?.pilloleSection?.enableFullScreen
    ? `
  <button class="rw-toggle-fullscreen-button" id="customFullScreenButton">
    <img class="rw-toggle-fullscreen rw-fullScreenImage" alt="toggle fullscreen">
  </button>
  `
    : "";
}

function inputConversationMthd(value) {
  if (value.trim()) {
    localStorage.setItem("interaction", true);
  }
}

function createCustomPopup(contentPopup) {
  if (!document.querySelector(".popup-custom")) {
    document
      .getElementsByClassName("rw-widget-container")[0]
      .insertAdjacentHTML(
        "beforeend",
        `<div class="popup-custom">${contentPopup}</div>`
      );
    customPopupClassList =
      document.getElementsByClassName("popup-custom")[0].classList;
  }
}

function buttonMenuToggle() {
  if (!document.getElementsByClassName("dropdown").length) {
    document.getElementsByClassName("rw-header-buttons")[0].insertAdjacentHTML(
      "beforeend",
      `
        <div class="dropdown">
          <button class="button-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-three-dots-vertical rw-default icon-button-menu" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <div id="dropdown-content">
            <a id="pillole">Pillole</a>
          </div>
        </div>`
    );

    if (configuration?.buttonMenu?.enableResetChat) {
      document
        .getElementById("dropdown-content")
        .insertAdjacentHTML("beforeend", ` <a id="reset-chat">Reset chat</a>`);

      document.getElementById("reset-chat").addEventListener("click", () => {});
    }

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

function mutationObserverChatContainer() {
  const mutationObserverChat = new MutationObserver(() => {
    clickOnImage();
  });
  mutationObserverChat.observe(chatContainer, { childList: true });
}

function clickOnImage() {
  const listOfImageTag = document.querySelectorAll("img");
  listOfImageTag.forEach((image) => {
    if (image.parentNode.nodeName !== "BUTTON") {
      image.addEventListener(
        "click",
        (ev) => {
          window.open(ev.srcElement.currentSrc, "_blank");
        },
        false
      );
    }
  });
}

function removeAvatarOnMsg() {
  const messages = document.getElementById("rw-messages");
  const msgReponse = messages.getElementsByClassName("rw-from-response");
  for (var message of msgReponse) {
    const child = message.getElementsByClassName("rw-message")[0];
    child.classList.remove("rw-with-avatar");
    child.removeChild(message.getElementsByTagName("img")[0]);
  }
}

function feedbackSection() {
  const containsFullScreen = statusChat() === statusWebChat.FULLSCREEN;
  if (!document.querySelector("#container-custom")) {
    if (containsFullScreen) {
      mainContainer.classList.remove("rw-full-screen");
    }
    localStorage.setItem("position", "feedback");
    conversationContainer.appendChild(containerCustom);
    const starSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>`;
    const starSvglist = Array(5).fill(`${starSvg}`);
    containerCustom.innerHTML = `
      <div id="container-custom">
        <div class="class-rating">
        </div>
        <div class="container-textarea">
            <textarea id="textareabox" placeholder="Lascia un feedback..."></textarea>
        </div>
        <p id="error-feedback"></p>
        <div class="container-button">
          <input type="button" value="Invia" id="inviaFeedback" />
        </div>
      </div>`;
    createCustomHeader(
      configuration?.feedbackSection?.title || "Lascia un feedback"
    );
    const classRating = document.getElementsByClassName("class-rating")[0];
    starSvglist.forEach((star) =>
      classRating.insertAdjacentHTML("afterbegin", star)
    );
    handleStarFeedback();
    document.getElementById("inviaFeedback").addEventListener("click", () => {
      let textArea = document.getElementById("textareabox");
      let textAreaValue = textArea.value.trim();
      const listOfStar = [...classRating.getElementsByTagName("svg")];
      const starSelected = listOfStar.filter((star) =>
        star.classList.contains("checked")
      ).length;
      // TODO: allegare la chiamata per il salvataggio del feedback
      console.log({ textAreaValue, starSelected });
      removeConversationContainer();
    });
  }
}

function handleStarFeedback() {
  const listOfStar = [
    ...document
      .getElementsByClassName("class-rating")[0]
      .getElementsByTagName("svg"),
  ];
  listOfStar.forEach((star, index) => {
    let recordLastStatus = "";
    star.addEventListener("mouseover", () => {
      if (recordLastStatus !== "click") {
        recordLastStatus = "mouseover";
        starAddChecked(listOfStar.slice(0, index + 1));
        starRemoveChecked(listOfStar.slice(index + 1, listOfStar.length));
      }
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
      getPillole()
        .then((response) => {
          const { value } = response;
          const domPillole = document.createElement("ul");
          value.forEach((pillola) => {
            const contentLi = document.createElement("div");
            contentLi.classList.add("container-collapse");
            const { multimedia } = pillola;
            const multimideaTypeVideo = multimedia?.find(
              (multi) => multi.type === "video"
            );
            const multimideaTypeIcon = multimedia?.find(
              (multi) => multi.type === "icon"
            );
            contentLi.innerHTML = `
                                <button type="button" class="collapsible">
                                  <div class="collapsibile-icon-img">
                                  ${
                                    multimideaTypeIcon
                                      ? `  <img class="pillole-icon" src="${multimideaTypeIcon.link}"/>`
                                      : ``
                                  }
                                    <h1 class="pillole-title">${
                                      pillola.title
                                    }</h1>
                                  </div>
                                  <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="#000" class="bi bi-chevron-down arrow-down" viewBox="0 0 16 16">
                                      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
                                    </svg>
                                  </div>
                                </button>
                                <div class="content">
                                    ${
                                      pillola.title === pillola.content
                                        ? ""
                                        : `<p>${pillola.content}</p>`
                                    }
                                    ${
                                      multimideaTypeVideo
                                        ? `                                    <iframe src="${multimideaTypeVideo.link}"
                                    title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`
                                        : ``
                                    }
                                    <div>
                                      ${pillola?.description}
                                    </div>
                                </div>
                                    `;
            const li = document.createElement("li");
            li.appendChild(contentLi);
            domPillole.appendChild(li);
          });
          [...domPillole.getElementsByTagName("button")].forEach((button) => {
            button.addEventListener("click", function () {
              this.classList.toggle("active");
              const arrow =
                button.getElementsByClassName("arrow-down")[0].classList;
              if (!arrow.contains("rotate-arrow")) {
                arrow.add("rotate-arrow");
              } else {
                arrow.remove("rotate-arrow");
              }
              var content = this.nextElementSibling;
              if (content.style.display === "block") {
                content.style.display = "none";
              } else {
                content.style.display = "block";
              }
            });
          });
          document.getElementById("container-custom").appendChild(domPillole);
        })
        .catch((err) => console.log(`Erorr: ${err}`));
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
        <svg xmlns="http://www.w3.org/2000/svg" id="close-icon" width="24" height="24" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg>
        ${localStorage.getItem("interaction") ? "" : fullScreenButton()}
      </div>
    </div>
        `
  );
  let iconButtonFullScreen = document.getElementById("customFullScreenButton");
  if (iconButtonFullScreen) {
    iconButtonFullScreen = iconButtonFullScreen.getElementsByTagName("img")[0];
    setIconToButtonFullScreen(iconButtonFullScreen);
    iconButtonFullScreen.addEventListener("click", () => {
      mainContainer.classList.toggle("rw-full-screen");
      const classButton = ["rw-full-screen", "rw-hide"];
      // this.toggleClassList(
      //   document.getElementsByClassName("rw-open-launcher__container")[0],
      //   classButton
      // );
      this.toggleClassList(
        document.getElementsByClassName("rw-launcher rw-hide-sm")[0],
        classButton
      );
    });
  }
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
  let customContainer = document.getElementsByClassName("custom-container")[0];
  if (customContainer) {
    mainContainer.removeChild(customContainer);
  }
}

function autocomplete() {
  autocompleteElement = document.getElementById("autocomplete");
  if (configuration?.autoFocusOnInput) {
    autocompleteElement.focus();
  }
  if (configuration?.baseUrl && configuration?.project_name) {
    autocompleteElement.addEventListener("input", function (e) {
      let input = e.target.value;
      input = input.trimStart();
      clearTimeout(typingTimer);
      if (commanderResponse && lastSearch !== input) {
        closeAllLists();
        localStorage.setItem("hint", false);
      }
      typingTimer = setTimeout(() => {
        if (input.length > 5 && [...input].find((char) => char === " ")) {
          lastSearch = input;
          localStorage.setItem("hint", true);
          getHintComplete(input)
            .then((response) => {
              commanderResponse = response.matches;
              if (commanderResponse.length) {
                createListToComplete(this, commanderResponse);
              }
            })
            .catch((error) => console.log(`Error: ${error}`));
        }
      }, 1000);
    });
  }

  autocompleteElement.addEventListener("keyup", (event) => {
    if (event.code === "Enter") {
      closeAllLists();
      localStorage.setItem("hint", false);
    }
  });

  document
    .getElementsByClassName("rw-messages-container")[0]
    .addEventListener("click", (e) => {
      localStorage.setItem("hint", false);
      closeAllLists(e.target);
    });
}

function closeAllLists(element) {
  var automCompleteItemsList =
    document.getElementsByClassName("autocomplete-items");
  for (var i = 0; i < automCompleteItemsList.length; i++) {
    if (
      element != automCompleteItemsList[i] &&
      element != autocompleteElement
    ) {
      automCompleteItemsList[i].parentNode.removeChild(
        automCompleteItemsList[i]
      );
    }
  }
}

function toggleClassList(element, classList) {
  [...classList].map((e) => {
    element?.classList?.toggle(e);
  });
}

function createListToComplete(context, list) {
  var divWrapper,
    child,
    val = context?.value;
  closeAllLists();
  if (!val) {
    return false;
  }
  divWrapper = document.createElement("div");
  divWrapper.setAttribute("id", `${context.id}autocomplete-list`);
  divWrapper.setAttribute("class", "autocomplete-items");
  if (list) {
    if (list.length > 3) {
      divWrapper.style.height = "10rem";
    }
    divWrapper.style.bottom = "4rem";
    for (item in list) {
      child = document.createElement("div");
      child.innerText += list[item];
      child.addEventListener("click", function (e) {
        autocompleteElement.value = this.innerText;
        localStorage.setItem("hint", false);
        closeAllLists();
      });
      divWrapper.appendChild(child);
    }
    setTimeout(() => {
      conversationContainer.insertBefore(divWrapper, form);
    });
  }
}

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

async function getHintComplete(text) {
  return this.optionSharedCall(
    "service/recommend",
    JSON.stringify({
      text,
    })
  );
}

async function getPillole() {
  return this.optionSharedCall("service/load/file", null, {
    filename: "pillole_ref.json",
  });
}

async function optionSharedCall(endpoint, body, parameters) {
  const baseUrl = configuration?.baseUrl;
  const project_name = configuration?.project_name;
  if (project_name && baseUrl) {
    const headers = new Headers();
    headers.append(
      "Authorization",
      "Basic dXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI="
    );
    headers.append("Content-Type", "application/json");
    var requestOptions = {
      headers,
      method: body ? "POST" : "GET",
      ...(body && { body, redirect: "follow" }),
    };

    const call = await fetch(
      `${baseUrl}${endpoint}?${new URLSearchParams({
        project_name,
        ...(parameters && { ...parameters }),
      })}`,
      requestOptions
    );
    const response = await call.json();
    return response;
  }
  return null;
}

window.onbeforeunload = () => {
  localStorage.removeItem("interaction");
};

const statusWebChat = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  FULLSCREEN: "FULLSCREEN",
};
