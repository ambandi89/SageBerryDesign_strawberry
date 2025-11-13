const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  // Only toggle on small screens
  if (window.innerWidth < 992) {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  }
});

// Submenu dropdown (mobile click version)
const submenuParents = document.querySelectorAll(".off-screen-menu .has-submenu");

submenuParents.forEach((parent) => {
  const submenu = parent.querySelector(".submenu");

  parent.addEventListener("click", (e) => {
    if (window.innerWidth < 992) {
      e.preventDefault();
      e.stopPropagation();

      if (submenu.classList.contains("open")) {
        submenu.style.maxHeight = null;
        submenu.classList.remove("open");
      } else {
        document.querySelectorAll(".submenu.open").forEach((openMenu) => {
          openMenu.style.maxHeight = null;
          openMenu.classList.remove("open");
        });
        submenu.classList.add("open");
        submenu.style.maxHeight = submenu.scrollHeight + "px";
      }
    }
  });
});

// Click outside to close (mobile only)
document.addEventListener("click", (e) => {
  if (window.innerWidth >= 992) return; // ignore on desktop

  const isClickInsideMenu = offScreenMenu.contains(e.target);
  const isClickOnHam = hamMenu.contains(e.target);

  if (!isClickInsideMenu && !isClickOnHam) {
    offScreenMenu.classList.remove("active");
    hamMenu.classList.remove("active");

    document.querySelectorAll(".submenu.open").forEach((submenu) => {
      submenu.style.maxHeight = null;
      submenu.classList.remove("open");
    });
  }
});


const overlay = document.querySelector(".menu-overlay");

// Close menu when clicking overlay
overlay.addEventListener("click", () => {
  offScreenMenu.classList.remove("active");
  hamMenu.classList.remove("active");

  document.querySelectorAll(".submenu.open").forEach((submenu) => {
    submenu.style.maxHeight = null;
    submenu.classList.remove("open");
  });
});
