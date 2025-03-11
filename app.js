document.addEventListener("DOMContentLoaded", () => {
  emailjs.init("sEHhmXz6wP9YZcoOl");

  // Form Handling
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const { name, email, message } = form.elements;

      if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
        alert("Please fill in all fields.");
        return;
      }

      emailjs
        .send("service_wzazcz9", "template_rlisvpr", {
          from_name: name.value.trim(),
          from_email: email.value.trim(),
          message: message.value.trim(),
        })
        .then(() => {
          alert("Message sent successfully!");
          form.reset();
        })
        .catch((error) => {
          console.error("Error sending message:", error);
          alert("Failed to send message. Please try again.");
        });
    });
  }

  // Loader Handling
  const loader = document.getElementById("loader");
  if (loader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.addEventListener("transitionend", () => loader.remove());
      }, 1000);
    });
  }

  // Mobile Menu
  const button = document.getElementById("mobile-menu-button");
  const menu = document.getElementById("mobile-menu");

  if (button && menu) {
    const toggleMenu = () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", !isExpanded);
      menu.classList.toggle("hidden");
      menu.setAttribute("aria-hidden", isExpanded);

      if (!isExpanded) {
        document.addEventListener("click", outsideClickListener);
      } else {
        document.removeEventListener("click", outsideClickListener);
      }
    };

    const outsideClickListener = (e) => {
      if (!menu.contains(e.target) && !button.contains(e.target)) {
        button.setAttribute("aria-expanded", "false");
        menu.classList.add("hidden");
        menu.setAttribute("aria-hidden", "true");
        document.removeEventListener("click", outsideClickListener);
      }
    };

    button.addEventListener("click", toggleMenu);
  }

  // Smooth Scroll
  const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        const offset = 70;
        if (target) {
          const topOffset =
            target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: topOffset, behavior: "smooth" });
        }
      });
    });
  };
  smoothScroll();

  // Touch Handling (Debounced)
  const debounce = (func, delay = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  document.addEventListener(
    "touchstart",
    debounce((e) => {
      const target = e.target.closest(".group");
      if (target) {
        target.classList.add("hover-effect");
        // Set a timer to remove the hover effect after 5 seconds
        setTimeout(() => {
          target.classList.remove("hover-effect");
        }, 1500); // 5000ms = 5 seconds
      }
    })
  );

  document.addEventListener(
    "touchend",
    debounce(() => {
      // No need to remove hover effect here, as it's managed in the touchstart handler.
    })
  );

  // Intersection Observer for animations
  const elements = document.querySelectorAll(".animate-on-scroll");
  if (elements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
  }
});
