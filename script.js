const modal = document.querySelector("#bookingModal");
const bookingForm = document.querySelector("#bookingForm");
const formStatus = document.querySelector("#formStatus");
const openButtons = document.querySelectorAll(".open-booking");
const closeTargets = document.querySelectorAll("[data-close-modal]");

const openModal = () => {
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.setTimeout(() => {
    modal.querySelector("input")?.focus();
  }, 120);
};

const closeModal = () => {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
};

openButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

closeTargets.forEach((target) => {
  target.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeModal();
  }
});

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(bookingForm));
  console.info("Booking request prepared for Telegram bot:", data);

  formStatus.textContent =
    "Заявку прийнято. Після підключення Telegram-бота вона надсилатиметься менеджеру автоматично.";
  bookingForm.reset();
});

const animatedItems = document.querySelectorAll("[data-animate]");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    rootMargin: "0px 0px -8% 0px",
    threshold: 0.12,
  },
);

animatedItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 45, 260)}ms`;
  observer.observe(item);
});
