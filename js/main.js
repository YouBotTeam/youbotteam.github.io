// TODO: quando la chiamata del socket va in errore (net::ERR_TIMED_OUT) far ripartire lo script

var webchat = window.WebChat;

var form;
var token = "";
var mainContainer;
var chatContainer;
var inputChat = "";
var lastSearch = "";
var containerCustom;
var showPopup = true;
var project_id = null;
var storageType = "";
var typingTimer = null;
var autocompleteElement;
var configuration = {};
var customPopupClassList;
var conversationContainer;
var listOfFileSelected = [];
var commanderResponse = null;
const fullScreenOpen =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTY0IDM3MS4yaDc2Ljc5NVY0NDhIMTkyVjMyMEg2NHY1MS4yem03Ni43OTUtMjMwLjRINjRWMTkyaDEyOFY2NGgtNTEuMjA1djc2Ljh6TTMyMCA0NDhoNTEuMnYtNzYuOEg0NDhWMzIwSDMyMHYxMjh6bTUxLjItMzA3LjJWNjRIMzIwdjEyOGgxMjh2LTUxLjJoLTc2Ljh6Ii8+PC9zdmc+";
const fullScreenClose =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cGF0aCBmaWxsPSJ3aGl0ZSIgZD0iTTM5Ni43OTUgMzk2LjhIMzIwVjQ0OGgxMjhWMzIwaC01MS4yMDV6TTM5Ni44IDExNS4yMDVWMTkySDQ0OFY2NEgzMjB2NTEuMjA1ek0xMTUuMjA1IDExNS4ySDE5MlY2NEg2NHYxMjhoNTEuMjA1ek0xMTUuMiAzOTYuNzk1VjMyMEg2NHYxMjhoMTI4di01MS4yMDV6Ii8+PC9zdmc+";
const iconDone = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>`;
const iconError = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ff0000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8 0-1.85.63-3.55 1.69-4.9L16.9 18.31C15.55 19.37 13.85 20 12 20zm6.31-3.1L7.1 5.69C8.45 4.63 10.15 4 12 4c4.42 0 8 3.58 8 8 0 1.85-.63 3.55-1.69 4.9z"/></svg>`;
const iconDoubleDone = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"/></svg>`;

function YouaiWebChat() {}

YouaiWebChat.configuration = (config) => {
  const {
    title,
    subtitle,
    inputTextFieldHint,
    profileAvatar,
    customData,
    socketUrl,
    socketPath,
    showFullScreenButton,
    showBadge,
    docViewer,
    hideWhenNotConnected,
    openAutomatically,
    initPayload,
    selector,
    storage,
    elementTriggerResetChat,
    elementTriggerOpenChat,
  } = config.webchat;
  storageType = storage;
  token = config.token;
  webchat.default({
    customData: {
      ...customData,
      token: config.token,
    },
    socketUrl,
    socketPath,
    showBadge,
    selector,
    docViewer,
    initPayload,
    showFullScreenButton,
    hideWhenNotConnected,
    openAutomatically,
    title,
    subtitle,
    inputTextFieldHint,
    profileAvatar,
    elementTriggerOpenChat,
    elementTriggerResetChat,
    params: { storage },
  });
  configuration = config.custom;
  project_id = configuration.project_id || null;
  getStorage();
};

document.addEventListener("readystatechange", () => {
  if (document.readyState === "interactive") {
    setCustomStyleOfPage();
    if (configuration.clearCacheOnRefresh) {
      getStorage().clear();
    }

    checkElement("#rasaWebchatPro").then(() => {
      const mutationObserverParent = new MutationObserver(() => {
        mainContainer = document.getElementsByClassName(
          "rw-widget-container"
        )[0];
        webChatOperation();
      });

      const parentContainer =
        document.getElementById("rasaWebchatPro")?.children[0];

      mutationObserverParent.observe(parentContainer, {
        childList: true,
      });

      checkElement(".rw-widget-container").then(() => {
        const mutationObserver = new MutationObserver(() => {
          webChatOperation();
        });

        mutationObserver.observe(mainContainer, { attributes: true });
      });
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
  const color = configuration?.color;
  if (color) {
    const primary = color?.primary;
    const message = color?.message;
    const sendButton = color?.sendButton;

    const messageBot = message?.bot;
    const messageUser = message?.user;
    if (primary) {
      styleOfDocument.setProperty("--youai-primary-color", primary);
    }
    if (messageUser) {
      const backgroundColor = messageUser?.backgroundColor;
      const color = messageUser?.color;
      if (backgroundColor) {
        styleOfDocument.setProperty(
          "--youai-msg-user-bg-color",
          backgroundColor
        );
      }
      if (color) {
        styleOfDocument.setProperty("--youai-msg-user-text-color", color);
      }
    }
    if (messageBot) {
      const backgroundColor = messageBot?.backgroundColor;
      const color = messageBot?.color;
      if (backgroundColor) {
        styleOfDocument.setProperty(
          "--youai-msg-bot-bg-color",
          backgroundColor
        );
      }
      if (color) {
        styleOfDocument.setProperty("--youai-msg-bot-text-color", color);
        styleOfDocument.setProperty("--youai-color-wave-dot", color);
      }
    }
    if (sendButton) {
      styleOfDocument.setProperty("--youai-button-send-color", sendButton);
    }
  }
  const mainButtonDimension = configuration?.mainButtonDimension;
  if (mainButtonDimension) {
    const width = mainButtonDimension?.width;
    const height = mainButtonDimension?.height;
    if (width) {
      styleOfDocument.setProperty("--youai-width-button", width);
    }
    if (height) {
      styleOfDocument.setProperty("--youai-height-button", height);
    }
  }
  const widget = configuration?.section?.widget;
  if (widget) {
    styleOfDocument.setProperty("-rw-widget-container-width", widget?.width);
  }
}

function createAutocomplete() {
  if (!document.querySelector(".autocomplete")) {
    const containerForm = document.createElement("div");
    containerForm.classList.add("autocomplete", "youai-container-input");

    const textArea = document.getElementsByClassName("rw-new-message")[0];
    textArea.setAttribute("id", "autocomplete");
    const rwSend = document.getElementsByClassName("rw-send")[0];

    containerForm.appendChild(textArea);
    containerForm.appendChild(rwSend);

    if (configuration?.section?.attachments?.show) {
      const attachments = `
      <button id="youai-btn-attachments">
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#808080"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z"/></svg>
      </button>`;
      containerForm.insertAdjacentHTML("afterbegin", attachments);
      handleInputFileModal();
    }

    form.setAttribute("autocomplete", "off");
    form.appendChild(containerForm);
  }
}

function handleInputFileModal() {
  const iconFileUpload = `<svg xmlns="http://www.w3.org/2000/svg" class="youai-icon-upload" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>`;
  setTimeout(() => {
    document
      .getElementById("youai-btn-attachments")
      .addEventListener("click", () => {
        if (!document.querySelector(".youai-modal-attachments")) {
          chatContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="youai-container-modal-attachments" data-keyboard="false" data-backdrop="static">
              <div class="youai-modal-attachments">
                <div class="youai-input-file-container">
                  ${iconFileUpload}
                  <input type="file" id="youai-input-file-attachments" accept="${
                    configuration?.section?.attachments?.accept || null
                  }" multiple/>
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
            `
          );

          const cancelAttachmetsEl = document.getElementById(
            "youai-cancel-attachments"
          );

          const confirmAttachmetsEl = document.getElementById(
            "youai-confirm-attachments"
          );

          const inputFileAttachmentsEl = document.getElementById(
            "youai-input-file-attachments"
          );

          inputFileAttachmentsEl.addEventListener("change", (event) => {
            listOfFileSelected = Object.values(event.target.files).map(
              (item) => item
            );
            generateUIListFileSelected(confirmAttachmetsEl);
          });

          cancelAttachmetsEl.addEventListener("click", () => {
            removeAttachmentsSection();
          });

          confirmAttachmetsEl.addEventListener("click", () => {
            const formData = new FormData();
            listOfFileSelected.forEach((file, index) =>
              formData.append(`file##${index}`, file, file.name)
            );
            uploadMedia(formData).then(
              (res) => {
                generateMessage(res, false);
              },
              (err) => generateMessage(null, true)
            );
            removeAttachmentsSection();
          });
        }
      });
  }, 500);
}

function generateMessage(nameOfFileSelected, error) {
  const rwFromResponse = document.getElementsByClassName(
    "rw-group-message rw-from-response"
  );
  const groupMessage = chatContainer.getElementsByClassName(
    "rw-group-message rw-from-response"
  )[rwFromResponse.length - 1];
  groupMessage.insertAdjacentHTML(
    "beforeend",
    `<div class="rw-group-message rw-from-client">
      <div class="rw-message rw-with-avatar">
        <div class="rw-client">
          <div class="rw-message-text">
            ${
              error
                ? `Errore nell'invio dei file`
                : `<h1> File caricati: </h1> ${generateListOfNameFileUploaded(
                    nameOfFileSelected
                  )} `
            }
          </div>
        </div>
      </div>
    </div>`
  );
  chatContainerScrollBottom();
}

function generateListOfNameFileUploaded(nameOfFileSelected) {
  return `${
    nameOfFileSelected !== null
      ? `
  <div class="youai-list-file-uploaded">${nameOfFileSelected
    .map(
      (item) =>
        `<div class="youai-item-file-uploaded">
          <div id="${item.filename}" class="youai-item-file-uploaded-status">
            ${item.success ? iconDoubleDone : iconError}
          </div>
          <div class="youai-item-file-upload-name">
            ${item.filename}
          </div>
        </div>`
    )
    .toString()
    .replaceAll(",", "")}
  </div>`
      : ``
  }`;
}

function removeAttachmentsSection() {
  listOfFileSelected = [];
  chatContainer.removeChild(
    chatContainer.getElementsByClassName("youai-container-modal-attachments")[0]
  );
}

function generateUIListFileSelected(confirmAttachmetsEl) {
  const inputFileContainerEl = document.getElementsByClassName(
    "youai-input-file-container"
  )[0];

  const fileSelectedContainerEl = document.getElementsByClassName(
    "youai-file-selected-container"
  )[0];

  if (listOfFileSelected.length) {
    const formData = new FormData();
    var li = "";
    listOfFileSelected.forEach((file, index) => {
      const cancelButton = `<svg xmlns="http://www.w3.org/2000/svg" onclick="fileSelezionato('${file.name}##${index}')" class="youai-delete-file" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"/></svg>`;
      formData.append(`file-${index}`, file);
      li += `
        <li class="youai-file-selected" id="${file.name}##${index}">
          ${cancelButton}
          <p class="youai-name-file">
            ${file.name}
          </p>
        </li>
      `;
    });
    fileSelectedContainerEl.innerHTML = `
      <ul class="youai-ul youai-ul-file-selected">
        ${li}
      <ul>
    `;
    confirmAttachmetsEl.removeAttribute("disabled");
    inputFileContainerEl.style.display = "none";
    fileSelectedContainerEl.style.display = "";
  } else {
    inputFileContainerEl.style.display = "";
    fileSelectedContainerEl.style.display = "none";
  }
}

function fileSelezionato(indentifier) {
  const indentifierSplitted = indentifier.split("##");
  listOfFileSelected = listOfFileSelected.filter(
    (item) => item.name !== indentifierSplitted[0]
  );
  document
    .getElementsByClassName("youai-ul-file-selected")[0]
    .removeChild(document.getElementById(indentifier));
  generateUIListFileSelected(
    document.getElementById("youai-confirm-attachments")
  );
}

function webChatOperation() {
  if (mainContainer) {
    const containerAutoComplete = document.getElementsByClassName(
      "autocomplete youai-container-input"
    )[0];
    switch (statusChat()) {
      case statusWebChat.OPEN:
        form = document.getElementsByClassName("rw-sender")[0];
        if (configuration?.section?.autocomplete?.enable) {
          createAutocomplete();
          autocomplete();
        }
        const section = configuration?.section;
        const buttonMenu = section?.buttonMenu.enable;
        if (
          configuration?.baseUrl &&
          buttonMenu &&
          (section?.pillole?.enable || section?.resetChat?.enable)
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
        if (document.querySelector(".youai-container-custom")) {
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
        customPopupClassList?.add("youai-display-none");
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
        if (
          localStorage.getItem("interaction") &&
          configuration?.section?.feedback?.enable
        ) {
          openFeedbackSection();
        }
        localStorage.setItem("position", "popup");
        const popup = configuration?.section?.popup;
        if (
          showPopup &&
          localStorage.getItem("position") === "popup" &&
          popup?.show &&
          !localStorage.getItem("interaction")
        ) {
          createCustomPopup(
            popup?.text || "Clicca sul bottone per inziare la chat"
          );
          customPopupClassList.add("youai-fade-in");
          customPopupClassList.remove("youai-display-none");
          showPopup = false;
        }
        localStorage.removeItem("interaction");
        localStorage.setItem("position", "close");
        break;
    }

    const pillole = configuration?.section?.pillole;

    if (
      document.querySelector(".rw-toggle-fullscreen-button") &&
      document.querySelector(".custom-header") &&
      pillole?.enableFullScreen &&
      pillole?.filename
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
  return configuration?.section?.pillole?.enableFullScreen
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
  if (!document.querySelector(".youai-popup-custom")) {
    document
      .getElementsByClassName("rw-widget-container")[0]
      .insertAdjacentHTML(
        "beforeend",
        `<div class="youai-popup-custom">${contentPopup}</div>`
      );
    customPopupClassList =
      document.getElementsByClassName("youai-popup-custom")[0].classList;
  }
}

function buttonMenuToggle() {
  if (!document.getElementsByClassName("youai-dropdown").length) {
    const section = configuration?.section;
    const showResetChat = section?.resetChat?.enable;
    const showPilloleSection = section?.pillole?.enable;
    document.getElementsByClassName("rw-header-buttons")[0].insertAdjacentHTML(
      "beforeend",
      `
        <div class="youai-dropdown">
          <button class="youai-button-menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#ffffff" class="bi bi-three-dots-vertical rw-default youai-icon-button-menu" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            </svg>
          </button>
          <div id="youai-dropdown-content">
          ${
            showPilloleSection
              ? `<a
              id="pillole"
              class="${
                configuration?.section?.pillole?.disableButton
                  ? "youai-disabled-link"
                  : ""
              }">
                Pillole
              </a>`
              : ``
          }
            ${showResetChat ? `<a id="reset-chat">Reset chat</a>` : ``}
          </div>
        </div>`
    );

    if (showPilloleSection) {
      document.getElementById("pillole").addEventListener("click", () => {
        showOrHideChatContainer(false);
        showOrHideHeaderContainer(false);
        containerCustom = document.createElement("div");
        containerCustom.classList.add(
          "rw-messages-container",
          "youai-container-custom"
        );
        pilloleSection();
      });
    }
  }
}

function openFeedbackSection() {
  createConversationContainer();
  containerCustom = document.createElement("div");
  containerCustom.classList.add(
    "rw-messages-container",
    "youai-container-custom"
  );
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
  const listOfImageTag = document.querySelectorAll(".rw-image-frame");
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
  if (!document.querySelector("#youai-container-custom")) {
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
      </div>`;
    createCustomHeader(
      configuration?.section.feedback?.title || "Lascia un feedback"
    );
    const classRating =
      document.getElementsByClassName("youai-class-rating")[0];
    starSvglist.forEach((star) =>
      classRating.insertAdjacentHTML("afterbegin", star)
    );
    handleStarFeedback();
    document
      .getElementById("youAiSendFeedback")
      .addEventListener("click", () => {
        let textArea = document.getElementById("youai-textareabox");
        let textAreaValue = textArea.value.trim();
        const listOfStar = [...classRating.getElementsByTagName("svg")];
        const starSelected = listOfStar.filter((star) =>
          star.classList.contains("youai-checked")
        ).length;
        submitFeedback(textAreaValue, starSelected);
        removeConversationContainer();
      });
  }
}

function handleStarFeedback() {
  const listOfStar = [
    ...document
      .getElementsByClassName("youai-class-rating")[0]
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
      listOfStar[index].classList.add("youai-checked");
    });
  });
}

function starRemoveChecked(listOfStar) {
  listOfStar.forEach((starFiltered) => {
    starFiltered.classList.remove("youai-checked");
  });
}

function starAddChecked(listOfStar) {
  listOfStar.forEach((starFiltered) => {
    starFiltered.classList.add("youai-checked");
  });
}

function pilloleSection() {
  if (!conversationContainer.querySelector(".container-pillole")) {
    if (!document.querySelector(".youai-container-custom")) {
      localStorage.setItem("position", "pillole");
      createCustomHeader("Pillole");
      conversationContainer.appendChild(containerCustom);
      containerCustom.innerHTML = `<div id="youai-container-custom"></div>`;
      getPillole()
        .then((response) => {
          const { content } = response;
          const domPillole = document.createElement("ul");
          domPillole.classList.add("youai-ul");
          content.forEach((pillola) => {
            const contentLi = document.createElement("div");
            contentLi.classList.add("youai-container-collapse");
            const { multimedia } = pillola;
            const multimideaTypeVideo = multimedia?.find(
              (multi) => multi.type === "video"
            );
            const multimideaTypeIcon = multimedia?.find(
              (multi) => multi.type === "icon"
            );
            contentLi.innerHTML = `<button type="button" class="youai-collapsible">
                                    <div class="youai-collapsibile-icon-img">
                                      ${
                                        multimideaTypeIcon
                                          ? `
                                      <img class="youai-pillole-icon" src="${multimideaTypeIcon.link}" />`
                                          : ``
                                      }
                                      <h1 class="youai-pillole-title">
                                        ${pillola.title}
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
                                    ${
                                      pillola.title === pillola.content
                                        ? ""
                                        : ` <p>${pillola.content}</p>
                                    `
                                    }  
                                    ${
                                      multimideaTypeVideo
                                        ? `<iframe class="youai-yt"
                                      src="${
                                        multimideaTypeVideo.link
                                      }" title="YouTube video player" frameborder="0"
                                      style="${
                                        statusChat() ===
                                        statusWebChat.FULLSCREEN
                                          ? "height: 33rem;"
                                          : ""
                                      }"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowfullscreen>
                                      </iframe>`
                                        : ``
                                    }
                                    <div>${pillola?.description}</div>
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
              if (!arrow.contains("youai-rotate-arrow")) {
                arrow.add("youai-rotate-arrow");
              } else {
                arrow.remove("youai-rotate-arrow");
              }
              var content = this.nextElementSibling;
              if (content.style.display === "block") {
                content.style.display = "none";
              } else {
                content.style.display = "block";
              }
            });
          });
          document
            .getElementById("youai-container-custom")
            .appendChild(domPillole);
        })
        .catch((err) => {
          backToFirstView();
          localStorage.setItem("position", "close");
          console.log(`Erorr: ${err}`);
        });
    }
  }
}

function createCustomHeader(title) {
  conversationContainer.insertAdjacentHTML(
    "afterbegin",
    `
    <div class="rw-header custom-header">
      <h4 class="rw-title">${title}</h4>
      <div class="youai-container-close">
        <svg xmlns="http://www.w3.org/2000/svg" id="youai-close-icon" width="24" height="24" fill="#ffffff" class="bi bi-x-lg" viewBox="0 0 16 16">
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
  document.getElementById("youai-close-icon").addEventListener("click", () => {
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
    chatContainer.classList.remove("youai-display-none");
    formContainer.classList.remove("youai-display-none");
  } else {
    chatContainer.classList.add("youai-display-none");
    formContainer.classList.add("youai-display-none");
  }
}

function showOrHideHeaderContainer(show) {
  const headerContainer = document.getElementsByClassName(
    "rw-header-and-loading"
  )[0];
  if (show) {
    headerContainer.classList.remove("youai-display-none");
  } else {
    headerContainer.classList.add("youai-display-none");
  }
}

function removeContainerCustom() {
  conversationContainer.removeChild(
    document.getElementsByClassName("youai-container-custom")[0]
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
  if (configuration?.baseUrl) {
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
              commanderResponse = response;
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
  var automCompleteItemsList = document.getElementsByClassName(
    "youai-autocomplete-items"
  );
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

function getStorage() {
  return storageType === "session" ? sessionStorage : localStorage;
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
  divWrapper.setAttribute("class", "youai-autocomplete-items");
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
    "recommend",
    JSON.stringify({
      text,
    }),
    { ...(project_id && { project_id }) }
  );
}

async function getRecommender() {
  return this.optionSharedCall("nlu/recommender", null, {
    ...(project_id && { project_id }),
  });
}

async function submitFeedback(message, rating) {
  return this.optionSharedCall(
    "feedback",
    JSON.stringify(
      {
        message,
        rating,
        channel: "webchat",
        channel_session_id: getSessionId(),
      },
      { ...(project_id && { project_id }) }
    )
  );
}

function getSessionId() {
  const key = "chat_session";
  const chat_session = getStorage().getItem(key);
  return JSON.parse(chat_session).session_id;
}

async function getPillole() {
  return this.optionSharedCall("load/file", null, {
    filename: configuration?.section?.pillole?.filename,
    ...(project_id && { project_id }),
  });
}

async function uploadMedia(formData) {
  return this.optionSharedCall(
    "upload/media",
    formData,
    {
      conversation_id: getSessionId(),
      ...(project_id && { project_id }),
    },
    false
  );
}

async function optionSharedCall(endpoint, body, parameters, jsonType = true) {
  var baseUrl = `${configuration?.baseUrl}${endpoint}`;
  if (baseUrl && token) {
    const headers = new Headers();
    headers.append("token", token);
    if (jsonType) {
      headers.append("Content-Type", "application/json");
    }

    var requestOptions = {
      headers,
      method: body ? "POST" : "GET",
      ...(body && { body, redirect: "follow" }),
    };

    if (JSON.stringify(parameters) !== JSON.stringify({})) {
      baseUrl = `${baseUrl}?${new URLSearchParams({ ...parameters })}`;
    }

    const call = await fetch(baseUrl, requestOptions);
    const response = await call.json();
    return response.value || response.matches;
  }
  return null;
}

function chatContainerScrollBottom() {
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.onbeforeunload = () => {
  localStorage.removeItem("interaction");
};

const statusWebChat = {
  OPEN: "OPEN",
  CLOSE: "CLOSE",
  FULLSCREEN: "FULLSCREEN",
};
