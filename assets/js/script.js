'use strict';

/* ----------------------------------------------
    ELEMENT TOGGLE FUNCTION
---------------------------------------------- */
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

/* ----------------------------------------------
    SIDEBAR TOGGLE (Mobile)
---------------------------------------------- */
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
  sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));
}

/* ----------------------------------------------
    MODAL (Used for Coding Profiles)
---------------------------------------------- */
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalHandle = document.querySelector(".modal-handle");
const modalDesc = document.querySelector(".modal-desc");
const modalStats = document.querySelector(".modal-stats");
const modalLink = document.querySelector("[data-modal-link]");

function openModal() {
  modalContainer.classList.add("active");
  overlay.classList.add("active");
  document.body.classList.add("no-scroll");   // Prevent background scrolling
}

function closeModal() {
  modalContainer.classList.remove("active");
  overlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

// Close modal on overlay or close button
modalCloseBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

// Close modal on ESC key
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

/* ----------------------------------------------
    CODING PROFILE CARDS (Replace Testimonials)
---------------------------------------------- */
const profileItems = document.querySelectorAll(".profile-item"); // <li class="profile-item">

profileItems.forEach(item => {
  item.addEventListener("click", () => {
    const raw = item.getAttribute("data-profile");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);

      // Modal image
      if (modalImg) {
        modalImg.src = data.img;
        modalImg.alt = data.platform;
      }

      // Title + handle
      modalTitle.textContent = data.platform || "Profile";
      modalHandle.textContent = data.handle || "";

      // Description
      modalDesc.textContent = data.desc || "";

      // Link button
      if (modalLink) {
        modalLink.href = data.link;
        modalLink.setAttribute("target", "_blank");
        modalLink.setAttribute("rel", "noopener noreferrer");
      }

      // Stats (optional)
      if (modalStats) modalStats.innerHTML = "";

      openModal();

    } catch (e) {
      console.error("Invalid JSON inside data-profile:", raw);
    }
  });

  // Accessibility: open modal by pressing Enter
  item.addEventListener("keydown", ev => {
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      item.click();
    }
  });
});

/* ----------------------------------------------
    CUSTOM SELECT & FILTER
---------------------------------------------- */
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", () => elementToggleFunc(select));
}

// Select dropdown items
selectItems.forEach(item => {
  item.addEventListener("click", () => {
    const selectedValue = item.innerText.toLowerCase();
    selectValue.innerText = item.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// Filtering function
function filterFunc(selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all" || selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// Filter buttons (desktop)
let lastClickedBtn = filterBtns[0];

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;

    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
});

/* ----------------------------------------------
    CONTACT FORM VALIDATION
---------------------------------------------- */
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

/* ----------------------------------------------
    PAGE NAVIGATION
---------------------------------------------- */
const navLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navLinks.forEach((link, index) => {
  link.addEventListener("click", function () {
    const targetPage = this.innerHTML.toLowerCase();

    pages.forEach((page, i) => {
      if (page.dataset.page === targetPage) {
        page.classList.add("active");
        navLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
        navLinks[i].classList.remove("active");
      }
    });
  });
});
