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
  webChatOperation();

  const mutationObserver = new MutationObserver(function (mutationsList) {
    console.log("Mutations:", mutationsList);
    webChatOperation();
  });

  mutationObserver.observe(
    document.getElementsByClassName("rw-widget-container")[0],
    { attributes: true }
  );

  function webChatOperation() {
    if (
      document
        .getElementById("rasaWebchatPro")
        .getElementsByClassName("rw-widget-container")[0]
        .classList.contains("rw-chat-open")
    ) {
      // Intercept click event on image
      document.getElementsByClassName("image")[0].addEventListener(
        "click",
        function (ev) {
          window.open(ev.srcElement.currentSrc, "_blank");
        },
        false
      );

      // Button reset
      if (!document.getElementsByClassName("button-reset").length) {
        var buttonReset = document.createElement("button");
        buttonReset.classList.add("button-reset");
        var iconButtonReset = document.createElement("img");
        iconButtonReset.classList.add("rw-default", "icon-reset");
        iconButtonReset.setAttribute("src", "./images/resetIcon.png");
        buttonReset.appendChild(iconButtonReset);
        document
          .getElementsByClassName("rw-header-buttons")[0]
          .insertBefore(
            buttonReset,
            document.getElementsByClassName("rw-toggle-fullscreen-button")[0]
          );
        buttonReset.addEventListener("click", function () {
          console.log("/reset");
        });
      }

      // Remove avatar on any msg
      var messages = document.getElementById("rw-messages");
      var messagesList = messages.getElementsByClassName("rw-message");
      for (var message of messagesList) {
        message.classList.remove("rw-with-avatar");
        if (message.querySelector(".rw-avatar") !== null) {
          const img = message.getElementsByTagName("img");
          if (img.length) {
            message.removeChild(img[0]);
          }
        }
      }

      // Custom container
      var conversationContainer = document.getElementsByClassName(
        "rw-conversation-container"
      )[0];
      showOrHideChatContainer(conversationContainer, false);
      showOrHideHeaderContainer(false);
      const containerCustom = document.createElement("div");
      containerCustom.classList.add(
        "rw-messages-container",
        "container-custom"
      );
      // Pillole
      //   pilloleSection(conversationContainer, containerCustom);
      feedbackSection(conversationContainer, containerCustom);
    }
  }

  function feedbackSection(conversationContainer, containerCustom) {
    if (document.querySelector(".container-custom") === null) {
      console.log(document.querySelector(".container-custom"));
      conversationContainer.appendChild(containerCustom);
      containerCustom.innerHTML = `
      <div id="container-custom">
        <div class="container-close">
            <img id="close-icon" src="./images/x-lg.svg"/>
        </div>
        <h1 class="title-feedback rw-title">Lascia un feedback</h1>
        <div class="container-textarea">
            <textarea id="textareabox" name="textarea1" placeholder="Lascia un feedback..."></textarea>
        </div>
        <input type="button" value="Invia" id="inviaFeedback" />
      </div>`;
      document.getElementById("close-icon").addEventListener("click", () => {
        hideContainerCustom();
        showOrHideChatContainer(conversationContainer, true);
        showOrHideHeaderContainer(true);
      });
    }
  }

  document.getElementById("inviaFeedback").addEventListener("click", () => {
    console.log(document.getElementById("textareabox").value);
  });

  function pilloleSection(conversationContainer, containerCustom) {
    if (conversationContainer.querySelector(".container-pillole") === null) {
      if (document.querySelector(".container-custom") === null) {
        conversationContainer.appendChild(containerCustom);
        containerCustom.innerHTML = `
                            <div id="container-custom">
                                <img class="arrow-left" src="./images/arrow-left.svg"/>
                            </div>`;
        document
          .getElementsByClassName("arrow-left")[0]
          .addEventListener("click", () => {
            hideContainerCustom();
            showOrHideChatContainer(conversationContainer, true);
          });
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

  function showOrHideChatContainer(conversationContainer, show) {
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

  function hideContainerCustom() {
    document
      .getElementsByClassName("container-custom")[0]
      .classList.add("display-none");
  }
  // // Avatar title
  // const avatar = document.createElement('img');
  // avatar.setAttribute('src', './images/favicon.png');
  // avatar.setAttribute('alt', 'chat avatar');
  // avatar.classList.add('rw-avatar');
  // document.getElementsByClassName('rw-header rw-with-subtitle')[0].insertBefore(avatar, document.getElementsByClassName('rw-header-buttons')[0]);
}, 500);
