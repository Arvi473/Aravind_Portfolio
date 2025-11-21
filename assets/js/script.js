'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


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
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
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

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
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

// add event to all nav link
navigationLinks.forEach(function(navLink) {
  navLink.addEventListener("click", function () {

    const targetPage = this.innerHTML.trim().toLowerCase();

    pages.forEach(function(page) {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });

    navigationLinks.forEach(function(link) {
      if (link.innerHTML.trim().toLowerCase() === targetPage) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });

  });
});


// #Contact

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-form]');
  const inputs = form ? form.querySelectorAll('[data-form-input]') : [];
  const submitBtn = document.querySelector('[data-form-btn]');

  if (!form || !submitBtn) {
    console.warn('Contact form or submit button not found.');
    return;
  }

  // Enable/disable button based on native validity
  const updateBtn = () => {
    try {
      submitBtn.disabled = !form.checkValidity();
    } catch (e) {
      // fallback: enable if all required inputs have some value
      const allFilled = Array.from(inputs).every(i => i.value.trim() !== '');
      submitBtn.disabled = !allFilled;
    }
  };

  // initial state
  updateBtn();

  // update on input
  inputs.forEach(input => input.addEventListener('input', updateBtn));

  // optional: show browser validation UI on submit if invalid
  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      form.reportValidity();
    } // else allow submit to formsubmit.co
  });
});
