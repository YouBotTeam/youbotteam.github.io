var mainContainer;
var containerCustom;
var customPopupClassList;
var conversationContainer;
var showPopup = true;

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

  getHintComplete();

  // Operazioni di editing web chat
  setTimeout(() => {
    mainContainer = document.getElementsByClassName("rw-widget-container")[0];
    webChatOperation();
    createAutocomplete();
    const mutationObserver = new MutationObserver((mutationsList) => {
      // var mutationsListClassList = mutationsList[0].target.classList;
      webChatOperation();
    });

    mutationObserver.observe(mainContainer, { attributes: true });
  }, 500);
});

function createAutocomplete() {
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

  autocomplete(document.getElementById("autocomplete"), countries);
}

function webChatOperation() {
  if (mainContainer.classList.contains("rw-chat-open")) {
    localStorage.setItem("position", "open");
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
    document
      .getElementsByClassName("rw-close rw-default")[0]
      .addEventListener("click", () => {
        localStorage.setItem("position", "close");
      });
    document
      .getElementsByClassName("rw-close-launcher rw-default")[0]
      .addEventListener("click", () => {
        localStorage.setItem("position", "close");
      });
    // TODO: implementare logica per Enter button
    // inputConversation.addEventListener("keyup", (event) => {
    //   if (event.key === "Enter") {
    //     inputConversationMthd(inputConversation.value);
    //   }
    // });
  } else {
    localStorage.setItem("position", "close");
    if (localStorage.getItem("interaction")) {
      openFeedbackSection();
    }
    localStorage.removeItem("interaction");
  }
  if (localStorage.getItem("position") === "close") {
    if (showPopup) {
      createCustomPopup("Clicca sul bottone per inziare la chat");
      customPopupClassList.add("fade-in");
      customPopupClassList.remove("display-none");
      showPopup = false;
    }
  } else {
    customPopupClassList?.add("display-none");
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
  document.getElementsByClassName("image")[0]?.addEventListener(
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
      if (!textAreaValue) {
        // textArea.classList.add("textarea-error");
        // document.getElementById("error-feedback").innerText =
        //   "Errore: scrivere una descrizione.";
      } else {
        // textArea.classList.remove("textarea-error");
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
                                <div class="content">
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

function getHintComplete() {
  // const headers = new Headers();
  // headers.append("Access-Control-Allow-Origin", null);
  // headers.append("Content-Type", "application/json");
  // // headers.append("Origin", "*");
  // headers.append(
  //   "Authorization",
  //   `Basic RdXRlbnRlOjQ0YzJkYmUyYzI0NzE5YWFlNjRlZDQyOTg5YzllM2YxZTUwNDQ3NGQwZjQ4NzFiYzI2YmFiNjY5NWY5NWQ5MTI=`
  // );

  // const request = new Request("https://weai.it/service/recommend/cattolica", {
  //   method: "POST",
  //   headers,
  //   // credentials: "same-origin",
  //   body: JSON.stringify({ text: "la colonna iniz. agenzia" }),
  // });

  // fetch(request).then((res) => {
  //   if (res.ok) {
  //     console.log(res.json());
  //   }
  // });
  fetch("https://weai.it/service", {
    method: "GET",
  }).then((res) => {
    console.log(res);
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

// // Avatar title
// const avatar = document.createElement('img');
// avatar.setAttribute('src', './images/favicon.png');
// avatar.setAttribute('alt', 'chat avatar');
// avatar.classList.add('rw-avatar');
// document.getElementsByClassName('rw-header rw-with-subtitle')[0].insertBefore(avatar, document.getElementsByClassName('rw-header-buttons')[0]);

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function (e) {
    var a,
      b,
      i,
      val = this.value;
    /*close any already open lists of autocompleted values*/
    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        /*create a DIV element for each matching element:*/
        b = document.createElement("DIV");
        /*make the matching letters bold:*/
        b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
        b.innerHTML += arr[i].substr(val.length);
        /*insert a input field that will hold the current array item's value:*/
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        /*execute a function when someone clicks on the item value (DIV element):*/
        b.addEventListener("click", function (e) {
          /*insert the value for the autocomplete text field:*/
          inp.value = this.getElementsByTagName("input")[0].value;
          /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
          closeAllLists();
        });
        a.appendChild(b);
      }
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 38) {
      //up
      /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

/*An array containing all the country names in the world:*/
var countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antigua & Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia & Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central Arfrican Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Cote D Ivoire",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Polynesia",
  "French West Indies",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kosovo",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macau",
  "Macedonia",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauro",
  "Nepal",
  "Netherlands",
  "Netherlands Antilles",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Reunion",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Pierre & Miquelon",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "St Kitts & Nevis",
  "St Lucia",
  "St Vincent",
  "Sudan",
  "Suriname",
  "Swaziland",
  "Sweden",
  "Switzerland",
  "Syria",
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];
