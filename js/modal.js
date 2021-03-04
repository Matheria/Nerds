const writeUsLink = document.querySelector(".popup__button");
const writeUsPopup = document.querySelector(".modal");
const writeUsClose = writeUsPopup.querySelector(".modal__close-button");
const writeUsModalButton = writeUsPopup.querySelector(".write-us-modal__button");

const writeUsForm = writeUsPopup.querySelector(".write-us-modal__form");
const writeUsName = writeUsPopup.querySelector(".write-us-modal__name");
const writeUsEmail = writeUsPopup.querySelector(".write-us-modal__email");
const writeUsLetter = writeUsPopup.querySelector(".input-text_message-text");

let isStorageSupport = true;
let storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

writeUsLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  writeUsPopup.classList.add("modal_visible");

  if (storage) {
    writeUsName.value = storage;
    writeUsEmail.focus();
  } else {
  writeUsName.focus();
  }
});

writeUsClose.addEventListener("click", function (evt) {
  if (writeUsPopup.classList.contains("modal_visible")) {
    evt.preventDefault();
    writeUsPopup.classList.remove("modal_visible");
    writeUsPopup.classList.remove("modal_error");
  }
});

writeUsForm.addEventListener("submit", function (evt) {
  if (!writeUsName.value || !writeUsEmail.value || !writeUsLetter.value) {
    evt.preventDefault();

    writeUsPopup.classList.add("modal_error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", writeUsName.value);
    }
  }
});

writeUsModalButton.addEventListener("click", function (evt) {
  if (!writeUsForm.checkValidity()) {
    writeUsPopup.classList.add("modal_error");

    setTimeout(() => {
      writeUsPopup.classList.remove("modal_error");
    }, 600);
  }
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    if (writeUsPopup.classList.contains("modal_visible")) {
      evt.preventDefault();
      writeUsPopup.classList.remove("modal_visible");
      writeUsPopup.classList.remove("modal_error");
    }
  }
});
