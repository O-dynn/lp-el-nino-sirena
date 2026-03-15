const $ = (selector, el = document) => el.querySelector(selector);
const $$ = (selector, el = document) => Array.from(el.querySelectorAll(selector));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  });
}, { threshold: 0.12 });

$$(".reveal").forEach((el) => revealObserver.observe(el));

const modal = $("#modal");
const modalImg = $("#modalImg");
const modalTitle = $("#modalTitle");
const modalDesc = $("#modalDesc");
const modalClose = $("#modalClose");

function openModal(src, title, desc) {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  modalImg.src = src;
  modalImg.alt = title;
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.src = "";
  modalImg.alt = "";
  document.body.style.overflow = "";
}

$$("[data-open]").forEach((item) => {
  item.addEventListener("click", () => {
    openModal(
      item.getAttribute("data-open"),
      item.getAttribute("data-title") || "Imagem",
      item.getAttribute("data-desc") || ""
    );
  });
});

modal.addEventListener("click", (e) => {
  if (e.target.dataset.close === "true") {
    closeModal();
  }
});

modalClose.addEventListener("click", closeModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});