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

function setCustomStyleOfPage() {
  const { colorCustom, mainButtonDimension } = configuration;
  const styleOfDocument = document.documentElement.style;
  if (colorCustom) {
    const { primary, messageUser, sendButton, messageBot } = colorCustom;
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
  if (mainButtonDimension) {
    const { width, height } = mainButtonDimension;
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

    const form = document.getElementsByClassName("rw-sender")[0];
    form.setAttribute("autocomplete", "off");

    form.appendChild(containerForm);
  }
}

function webChatOperation() {
  const { enableClickOnImage, enableAutoComplete, popupSection } =
    configuration;
  if (mainContainer?.classList.contains("rw-chat-open")) {
    if (enableAutoComplete) {
      createAutocomplete();
      autocomplete();
    }
    buttonMenu();
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
    if (enableClickOnImage) {
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
    const listImage = [...document.getElementsByClassName("rw-image-details")];
    listImage.forEach((image) => {
      const imageStyle = image.children[0].style;
      imageStyle.width = mainContainer?.classList.contains("rw-full-screen")
        ? "30rem"
        : "";
      imageStyle.height = mainContainer?.classList.contains("rw-full-screen")
        ? "20rem"
        : "";
    });
  } else {
    if (localStorage.getItem("interaction")) {
      openFeedbackSection();
    }
    localStorage.setItem("position", "popup");
    if (
      showPopup &&
      localStorage.getItem("position") === "popup" &&
      popupSection?.showPopup &&
      !localStorage.getItem("interaction")
    ) {
      createCustomPopup(
        popupSection?.popupText ||
          "Clicca sul bottone per inziare la chat"
      );
      customPopupClassList.add("fade-in");
      customPopupClassList.remove("display-none");
      showPopup = false;
    }
    localStorage.removeItem("interaction");
    localStorage.setItem("position", "close");
  }

  if (
    !(
      localStorage.getItem("hint") &&
      (mainContainer.classList.contains("rw-full-screen") ||
        mainContainer?.classList.contains("rw-chat-open")) &&
      autocompleteElement?.value &&
      lastSearch &&
      commanderResponse &&
      autocompleteElement.value === lastSearch
    )
  ) {
    createListToComplete(autocompleteElement, commanderResponse);
  }
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

function buttonMenu() {
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
            <a id="reset-chat">Reset chat</a>
            <a id="pillole">Pillole</a>
          </div>
        </div>`
    );

    document.getElementById("reset-chat").addEventListener("click", () => {
      /* Lato FE la chat si puo svuotare ma al refresh della 
      pagina viene ricaricato lo storico del web-socket
      */
      // clearHistoryChat();
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

function mutationObserverChatContainer() {
  const mutationObserverChat = new MutationObserver(() => {
    clickOnImage();
  });
  mutationObserverChat.observe(chatContainer, { childList: true });
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
  for (var message of msgReponse) {
    const child = message.getElementsByClassName("rw-message")[0];
    child.classList.remove("rw-with-avatar");
    child.removeChild(message.getElementsByTagName("img")[0]);
  }
}

function feedbackSection() {
  const containsFullScreen = mainContainer.classList.contains("rw-full-screen");
  if (!document.querySelector("#container-custom")) {
    if (containsFullScreen) {
      mainContainer.classList.remove("rw-full-screen");
    }
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
    createCustomHeader(
      configuration?.feedbackSection?.title || "Lascia un feedback"
    );
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
      getPillole().then((response) => {
        const { value } = response;
        const domPillole = document.createElement("ul");
        value.forEach((pillola) => {
          const contentLi = document.createElement("div");
          contentLi.classList.add("container-collapse");
          contentLi.innerHTML = `
                                <button type="button" class="collapsible">
                                  <div class="collapsibile-icon-img">
                                    <img class="pillole-icon" src="${
                                      pillola.multimedia.find(
                                        (multi) => multi.type === "icon"
                                      ).link
                                    }"/>
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
      }).catch(err=> console.log(`Erorr: ${err}`));
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
        <svg xmlns="http://www.w3.org/2000/svg" id="close-icon" width="16" height="16" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">
          <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
        </svg>
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

function autocomplete() {
  autocompleteElement = document.getElementById("autocomplete");
  if (configuration?.autoFocusOnInput) {
    autocompleteElement.focus();
  }
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
            createListToComplete(this, response.matches);
          })
          .catch((error) => console.log(`Error: ${error}`));
      }
    }, 1000);
  });

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
    switch (list.length) {
      case 1:
        divWrapper.style.marginTop = "-3.4rem";
        break;
      case 2:
        divWrapper.style.marginTop = "-5.9rem";
        break;
      case 3:
        divWrapper.style.marginTop = "-8.37rem";
        break;
      default:
        divWrapper.style.marginTop = "-10.9rem";
        divWrapper.style.height = "10rem";
        break;
    }
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
      context.parentNode.appendChild(divWrapper);
    });
  }
}

function clearHistoriesChat() {
  chatContainer.innerHTML = "";
}

const checkElement = async (selector) => {
  while (document.querySelector(selector) === null) {
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  return document.querySelector(selector);
};

async function getHintComplete(text) {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic dXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI="
  );
  headers.append("Content-Type", "application/json");

  var body = JSON.stringify({
    text,
  });

  var requestOptions = {
    method: "POST",
    headers,
    body,
    redirect: "follow",
  };

  const call = await fetch(
    "https://weai.it/service/recommend/cattolica",
    requestOptions
  );
  const response = await call.json();
  return response;
}

async function getPillole() {
  const headers = new Headers();
  headers.append(
    "Authorization",
    "Basic dXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI="
  );
  headers.append("Content-Type", "application/json");

  var requestOptions = {
    method: "GET",
    headers,
    // redirect: "follow",
  };

  const call = await fetch(
    "https://weai.it/service/load/pillole_ref",
    requestOptions
  );
  const response = await call.json();
  return response;
}

window.onbeforeunload = () => {
  localStorage.removeItem("interaction");
};

// // Avatar title
// const avatar = document.createElement('img');
// avatar.setAttribute('src', './images/favicon.png');
// avatar.setAttribute('alt', 'chat avatar');
// avatar.classList.add('rw-avatar');
// document.getElementsByClassName('rw-header rw-with-subtitle')[0].insertBefore(avatar, document.getElementsByClassName('rw-header-buttons')[0]);
