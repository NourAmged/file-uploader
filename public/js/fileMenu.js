document.querySelectorAll(".file-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    const file = btn.closest(".file");
    const menu = file.querySelector(".download-menu");

    // Hide all other menus
    document.querySelectorAll(".download-menu").forEach((m) => {
      if (m !== menu) {
        m.style.display = "none";
      }
    });

    // Toggle current menu
    if (menu.style.display === "none") {
      menu.style.display = "block";
    } else {
      menu.style.display = "none";
    }
  });
});

document.addEventListener("click", () => {
  document.querySelectorAll(".download-menu").forEach((menu) => {
    menu.style.display = "none";
  });
});
