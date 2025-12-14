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

      // image spin
// Make sure GSAP and ScrollTrigger are loaded
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
// <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

gsap.registerPlugin(ScrollTrigger);

// Create the scroll-triggered spin animation
ScrollTrigger.create({
  trigger: "#chromeflower",
  start: "top center",
  onEnter: () => {
    // Fast spin for 1.5 seconds
    gsap.to("#chromeflower", {
      rotation: 360 * 4, 
      duration: 1.5,
      ease: "none",
      onComplete: () => {
        // Slow down to a stop
        gsap.to("#chromeflower", {
          rotation: 360 * 5, // One more rotation while slowing
          duration: 2,
          ease: "power3.out"
        });
      }
    });
  },
  once: true // Only trigger once per page load
});

// Optional: Reset on scroll back up
ScrollTrigger.create({
  trigger: "#chromeflower",
  start: "top bottom",
  onLeaveBack: () => {
    gsap.set("#chromeflower", { rotation: 0 });
  }
});

// Chromesmiley animation - appear and turn towards the page
gsap.set("#chromesmiley", { opacity: 0, rotationY: -90 });

ScrollTrigger.create({
  trigger: ".intro-image",
  start: "top 60%",
  onEnter: () => {
    gsap.to("#chromesmiley", {
      opacity: 1,
      rotationY: 0,
      duration: 1.5,
      ease: "power2.out"
    });
  },
  once: true
});



// GSAP ScrollTrigger animation for "pop!" text
// Make sure GSAP and ScrollTrigger are loaded in your HTML

document.addEventListener('DOMContentLoaded', function() {
    const popText = document.querySelector('.intro-home span');
    
    if (popText) {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger);
        
        // Create the smooth pop animation that triggers once on scroll
        gsap.fromTo(popText,
            {
                scale: 1,
                rotation: 0
            },
            {
                scale: 1.25,
                rotation: 2.5,
                duration: 0.5,
                ease: "back.out(1.4)",
                scrollTrigger: {
                    trigger: popText,
                    start: "top 80%", // Animation starts when element is 80% down the viewport
                    once: true, // Only animate once
                    toggleActions: "play none none none"
                },
                onComplete: function() {
                    // Settle back to slightly larger size
                    gsap.to(popText, {
                        scale: 1.2,
                        rotation: 0,
                        duration: 0.5,
                        ease: "power1.out"
                    });
                }
            }
        );
    }
});