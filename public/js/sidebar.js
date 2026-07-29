document.addEventListener("DOMContentLoaded", () => {
  const createBtn = document.querySelector(".create-btn");
  const createMenu = document.querySelector(".create-menu");

  createBtn.addEventListener("click", () => {
    createMenu.style.display =
      createMenu.style.display == "none" ? "flex" : "none";
  });
});
