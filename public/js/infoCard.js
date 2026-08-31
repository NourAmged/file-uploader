document.addEventListener("DOMContentLoaded", () => {
  const files = document.querySelectorAll(".file");

  files.forEach((file) => {
    file.addEventListener("click", () => {
      const card = file.querySelector(".card");

      if (card.style.display === "none") {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});
