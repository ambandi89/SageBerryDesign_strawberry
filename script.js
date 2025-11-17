const hamMenu = document.querySelector(".ham-menu");
const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", (e) => {
  e.stopPropagation();
  // Only toggle on small screens
  if (window.innerWidth < 800) {
    hamMenu.classList.toggle("active");
    offScreenMenu.classList.toggle("active");
  }
});

// Submenu dropdown (mobile click version)
const submenuParents = document.querySelectorAll(".off-screen-menu .has-submenu");

submenuParents.forEach((parent) => {
  const submenu = parent.querySelector(".submenu");

  parent.addEventListener("click", (e) => {
    if (window.innerWidth < 800) {
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
  if (window.innerWidth >= 800) return; // ignore on desktop

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



// contact form on home page

const form = document.getElementById('contactForm');
        const successMessage = document.getElementById('successMessage');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            successMessage.classList.add('show');
            
            // Hide the form
            form.classList.add('hidden');
            
            // Optional: Reset form after submission
            form.reset();
            
            // Optional: Hide success message and show form again after 3 seconds
            setTimeout(() => {
                successMessage.classList.remove('show');
                form.classList.remove('hidden');
            }, 3000);
        });

// testimonial section on home page

// animated text
const rows = [
            document.getElementById('row1'),
            document.getElementById('row2'),
            document.getElementById('row3')
        ];

        const colors = ['#af090b', '#f00b0d', '#ffe3e7', "#1800ad"];

        rows.forEach((row, index) => {
            let colorIndex = index % colors.length;
            
            // Set initial color
            row.style.color = colors[colorIndex];
            
            // Change color independently with staggered timing
            setInterval(() => {
                colorIndex = (colorIndex + 1) % colors.length;
                row.style.color = colors[colorIndex];
            }, 1500);
        });


        