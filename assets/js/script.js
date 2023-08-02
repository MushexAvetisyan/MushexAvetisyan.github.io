// 'use strict';

const elementToggleFunc = function (elem) { elem.classList.toggle("activePage"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");


// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("activePage");
  overlay.classList.toggle("activePage");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("activePage");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("activePage");
    } else {
      filterItems[i].classList.remove("activePage");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];
for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    lastClickedBtn.classList.remove("activePage");
    this.classList.add("activePage");
    lastClickedBtn = this;
  });
}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const selectedPage = this.innerHTML.toLowerCase();
    sessionStorage.setItem("activePage", selectedPage); // Store the active page in sessionStorage
    for (let i = 0; i < pages.length; i++) {
      if (selectedPage === pages[i].dataset.page) {
        pages[i].classList.add("activePage");
        navigationLinks[i].classList.add("activePage");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("activePage");
        navigationLinks[i].classList.remove("activePage");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const activePage = sessionStorage.getItem("activePage");

  if (!activePage) {
    const defaultPage = "about";
    sessionStorage.setItem("activePage", defaultPage);
  }
  for (let i = 0; i < pages.length; i++) {
    const pageName = pages[i].dataset.page;
    if (activePage === pageName) {
      pages[i].classList.add("activePage");
      navigationLinks[i].classList.add("activePage");
    } else {
      pages[i].classList.remove("activePage");
      navigationLinks[i].classList.remove("activePage");
    }
  }
});



const texts = [
  " My Name Is Musho",
  " Full Stack Developer",
  " From Armenia",
  " Discover My Portfolio",
  " ..... :)",
];

const typingTarget = document.getElementById("typing-target");
let textIndex = 0;
let charIndex = 0;
let typingAnimation = true;

function typeText() {
  if (!typingAnimation) return;

  if (charIndex < texts[textIndex].length) {
    typingTarget.textContent += texts[textIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(eraseText, 1000);
  }
}

function eraseText() {
  if (!typingAnimation) return;

  if (textIndex === texts.length - 1) {
    typingAnimation = false;
    return;
  }

  if (charIndex > 0) {
    typingTarget.textContent = texts[textIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(eraseText, 50);
  } else {
    textIndex++;
    charIndex = 0;
    typingTarget.textContent = "";
    setTimeout(typeText, 500);
  }
}

typeText();



document.addEventListener("DOMContentLoaded", function () {
  // const postsPerPage = 1;
  let currentPage = parseInt(localStorage.getItem("currentPage")) || 1;

  function showPage(page) {
    const pages = document.querySelectorAll(".page");
    for (const pageElement of pages) {
      pageElement.classList.remove("activePage");
    }

    const targetPage = document.getElementById(`page${page}`);
    targetPage.classList.add("activePage");
  }

  function displayPagination() {
    const totalPages = document.querySelectorAll(".page").length;
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const pageLink = document.createElement("a");
      pageLink.href = `#page${i}`;
      pageLink.textContent = i;

      if (i === currentPage) {
        pageLink.classList.add("activePage");
      }

      pageLink.addEventListener("click", function (event) {
        event.preventDefault();
        currentPage = i;
        localStorage.setItem("currentPage", currentPage);
        showPage(currentPage);
        displayPagination();
      });

      paginationContainer.appendChild(pageLink);
    }
  }

  showPage(currentPage);
  displayPagination();
});
