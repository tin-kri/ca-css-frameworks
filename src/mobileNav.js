export function mobileNavigation() {
  const button = document.querySelector("#menu-button");
  const mobileNav = document.querySelector("#mobile-nav");

  button.addEventListener("click", () => {
    mobileNav.classList.toggle("hidden");
  });
}
