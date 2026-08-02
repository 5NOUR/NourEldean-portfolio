// =============================================
//          GLOBAL VARIABLES & UTILS
// =============================================

function debounce(func, wait = 10) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
// =============================================
//          SIDE MENU FUNCTIONALITY (FINAL)
// =============================================

(function () {
  const hamburger = document.getElementById("hamburgerMenu");
  const navbar = document.getElementById("navbar");

  if (!hamburger || !navbar) return;

  hamburger.addEventListener("click", function (e) {
    e.stopPropagation();
    if (navbar.classList.contains("active")) {
      closeMenu();
    } else {
      navbar.classList.add("active");
      document.body.style.overflow = "hidden";
      hamburger.classList.add("active");
    }
  });

  function closeMenu() {
    navbar.classList.remove("active");
    document.body.style.overflow = "";
    hamburger.classList.remove("active");
  }

  const links = navbar.querySelectorAll("a");
  links.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = this.getAttribute("href");
      closeMenu();
      setTimeout(function () {
        window.location.href = href;
      }, 200);
    });
  });

  document.addEventListener("click", function (e) {
    if (
      navbar.classList.contains("active") &&
      !navbar.contains(e.target) &&
      e.target !== hamburger &&
      !hamburger.contains(e.target)
    ) {
      closeMenu();
    }
  });

  // ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && navbar.classList.contains("active")) {
      closeMenu();
    }
  });
})();

// =============================================
//          LOGO CLICK - GO TO HOME
// =============================================

const logo = document.querySelector(".logo");

if (logo) {
  logo.addEventListener("click", () => {
    window.location.href = "index.html";
  });
  logo.setAttribute("role", "button");
  logo.setAttribute("tabindex", "0");
  logo.setAttribute("aria-label", "Go to Home Page");

  logo.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.location.href = "index.html";
    }
  });
}

// =============================================
//          LET'S TALK BUTTON - GO TO CONTACT
// =============================================

const letTalkButtons = document.querySelectorAll(".let-talk");

letTalkButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "contact.html";
  });
});

// =============================================
//          ACTIVE NAV LINK - HIGHLIGHT CURRENT PAGE
// =============================================

function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navItems = document.querySelectorAll(".nav li");

  navItems.forEach((item) => item.classList.remove("active"));

  const pageMap = {
    "index.html": ".nav-home",
    "services.html": ".nav-services",
    "about.html": ".nav-about",
    "skills.html": ".nav-skills",
    "projects.html": ".nav-projects",
    "contact.html": ".nav-contact",
  };

  const activeClass = pageMap[currentPage];
  if (activeClass) {
    const activeItem = document.querySelector(activeClass);
    if (activeItem) {
      activeItem.classList.add("active");
    }
  }
}

setActiveNavLink();

// =============================================
//          SCROLL TO TOP BUTTON
// =============================================

const scrollToTopBtn = document.createElement("button");
scrollToTopBtn.classList.add("scroll-to-top");
scrollToTopBtn.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
scrollToTopBtn.setAttribute("aria-label", "Scroll to top");
scrollToTopBtn.setAttribute("title", "Back to top");
document.body.appendChild(scrollToTopBtn);

window.addEventListener(
  "scroll",
  debounce(() => {
    if (window.scrollY > 400) {
      scrollToTopBtn.classList.add("show");
    } else {
      scrollToTopBtn.classList.remove("show");
    }
  }, 10),
);

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// =============================================
//          SMOOTH SCROLL FOR ALL ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// =============================================
//          CV DOWNLOAD BUTTON
// =============================================

const cvButton = document.querySelector(".cv");

if (cvButton) {
  cvButton.addEventListener("click", async () => {
    const cvUrl = "assets/NourEldean-CV.pdf";

    try {
      const response = await fetch(cvUrl, { method: "HEAD" });

      if (!response.ok) {
        throw new Error("CV file not found");
      }

      const link = document.createElement("a");
      link.href = cvUrl;
      link.download = "NourEldean-CV.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      window.open(cvUrl, "_blank");
    }
  });
}

// =============================================
//          SOCIAL ICONS CLICK
// =============================================

const whatsappIcons = document.querySelectorAll(".fa-whatsapp");
const githubIcons = document.querySelectorAll(".fa-github");

whatsappIcons.forEach((icon) => {
  if (!icon.closest(".social-link") && !icon.closest(".quick-icon")) {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open("https://wa.me/201554042400", "_blank");
    });
  }
});

githubIcons.forEach((icon) => {
  if (!icon.closest(".social-link") && !icon.closest(".quick-icon")) {
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      window.open("https://github.com/5NOUR", "_blank");
    });
  }
});

// =============================================
//          FORM VALIDATION (CONTACT PAGE)
// =============================================

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  // Live validation أثناء الكتابة
  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    input.addEventListener("input", () => {
      removeError(input);
    });

    input.addEventListener("blur", () => {
      validateField(input);
    });
  });

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    formInputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false;
      }
    });

    if (isValid) {
      showSuccessMessage(contactForm);
      contactForm.reset();

      // إزالة كل الإيرورات
      formInputs.forEach((input) => removeError(input));
    }
  });
}

function validateField(input) {
  const value = input.value.trim();

  switch (input.id) {
    case "name":
      if (!value) {
        showError(input, "Name is required");
        return false;
      }
      break;
    case "email":
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailPattern.test(value)) {
        showError(input, "Please enter a valid email");
        return false;
      }
      break;
    case "subject":
      if (!value) {
        showError(input, "Subject is required");
        return false;
      }
      break;
    case "message":
      if (!value) {
        showError(input, "Message is required");
        return false;
      }
      if (value.length < 10) {
        showError(input, "Message must be at least 10 characters");
        return false;
      }
      break;
  }

  removeError(input);
  return true;
}

function showError(input, message) {
  const formGroup = input.parentElement;
  const existingError = formGroup.querySelector(".error-message");

  if (!existingError) {
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.setAttribute("role", "alert");
    errorElement.textContent = message;
    formGroup.appendChild(errorElement);
  }

  input.style.borderColor = "#ff4444";
  input.style.boxShadow = "0 0 0 3px rgba(255, 68, 68, 0.15)";
  input.setAttribute("aria-invalid", "true");
}

function removeError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  if (errorElement) {
    errorElement.remove();
  }

  input.style.borderColor = "#2d2d2d";
  input.style.boxShadow = "none";
  input.removeAttribute("aria-invalid");
}

function showSuccessMessage(form) {
  const existingSuccess = form.querySelector(".success-message");
  if (existingSuccess) existingSuccess.remove();

  const successElement = document.createElement("div");
  successElement.classList.add("success-message");
  successElement.setAttribute("role", "status");
  successElement.innerHTML = `
    <i class="fa-solid fa-circle-check"></i>
    <span>Message sent successfully! I'll get back to you soon.</span>
  `;

  form.appendChild(successElement);

  setTimeout(() => {
    successElement.style.opacity = "0";
    successElement.style.transform = "translateY(-10px)";
    setTimeout(() => successElement.remove(), 300);
  }, 5000);
}

// =============================================
//          COUNTER ANIMATION (ABOUT PAGE)
// =============================================

function animateCounters() {
  const counters = document.querySelectorAll(".numbers");

  counters.forEach((counter) => {
    const targetText = counter.textContent.replace("+", "");
    const target = parseInt(targetText);

    if (isNaN(target)) return;

    const duration = 1500;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current < target) {
        counter.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
}

if (document.querySelector(".stats")) {
  const statsSection = document.querySelector(".stats");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.5 },
  );

  observer.observe(statsSection);
}

// =============================================
//          PROJECTS & SKILLS FILTER (MERGED)
// =============================================

document.addEventListener("DOMContentLoaded", () => {
  // Projects Filter
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");
  const noProjectsMessage = document.getElementById("noProjectsMessage");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filterValue = button.getAttribute("data-filter");
        let visibleCount = 0;

        projectCards.forEach((card, index) => {
          const cardCategory = card.getAttribute("data-category");

          if (filterValue === "all" || cardCategory === filterValue) {
            card.classList.remove("hidden");

            card.style.animation = "none";
            card.offsetHeight;
            card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s forwards`;
            visibleCount++;
          } else {
            card.classList.add("hidden");
          }
        });

        if (noProjectsMessage) {
          if (visibleCount === 0) {
            noProjectsMessage.classList.add("show");
          } else {
            noProjectsMessage.classList.remove("show");
          }
        }
      });
    });
  }

  // Skills Filter
  const skillCards = document.querySelectorAll(".skills .skill-card");
  const skillIcons = document.querySelectorAll(".icon-top img, .icon-but img");

  if (skillCards.length > 0) {
    skillCards.forEach((card) => {
      card.addEventListener("click", () => {
        skillCards.forEach((c) => c.classList.remove("active"));
        card.classList.add("active");

        const filterValue = card.getAttribute("data-filter");

        skillIcons.forEach((icon) => {
          const iconCategory = icon.getAttribute("data-category");

          icon.classList.remove("active-icon");

          if (iconCategory === filterValue) {
            icon.style.animation = "none";
            icon.offsetHeight;
            icon.style.animation = "";
            icon.classList.add("active-icon");
          }
        });
      });
    });
  }
});

// =============================================
//          CONSOLE EASTER EGG 😎
// =============================================

console.log(
  "%c👋 Welcome to my portfolio!",
  "font-size: 20px; font-weight: bold; color: #e9b002; padding: 10px;",
);
console.log(
  "%cThanks for checking out my code. Feel free to reach out!",
  "font-size: 14px; color: #cccccc;",
);
console.log(
  "%cBuilt with ❤️ by Nour Eldean",
  "font-size: 14px; color: #e9b002;",
);
console.log(
  "%c💡 Tip: Try typing 'theme' in the console!",
  "font-size: 12px; color: #666; font-style: italic;",
);

// =============================================
//          SHOOTING STARS ANIMATION
// =============================================

const starsCanvas = document.getElementById("starsCanvas");

if (starsCanvas) {
  const ctx = starsCanvas.getContext("2d");

  let width, height;
  let shootingStarGroups = [];
  let animationFrameId;

  // =============================================
  //          RESIZE CANVAS
  // =============================================

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    starsCanvas.width = width;
    starsCanvas.height = height;
  }

  window.addEventListener("resize", resizeCanvas);

  // =============================================
  //          CREATE SHOOTING STAR GROUP
  // =============================================

  function createShootingStarGroup() {
    const group = [];

    const leaderX = Math.random() * (width * 0.8) + width * 0.1;
    const leaderY = Math.random() * (height * 0.25);

    const angle = (Math.random() * 20 + 12) * (Math.PI / 180);
    const directionX = Math.random() > 0.5 ? 1 : -1;

    const leaderSpeed = Math.random() * 2 + 3;

    const starCount = Math.floor(Math.random() * 4) + 3;

    for (let i = 0; i < starCount; i++) {
      const offsetX = (Math.random() - 0.5) * 80;
      const offsetY = (Math.random() - 0.5) * 40;
      const delay = i * (Math.random() * 40 + 20);

      let size;
      if (i === 0) {
        size = "large";
      } else if (i <= 2) {
        size = "medium";
      } else {
        size = "small";
      }

      let length, speed, lineWidth, headRadius;
      switch (size) {
        case "large":
          length = Math.random() * 70 + 100;
          speed = leaderSpeed;
          lineWidth = 2;
          headRadius = 2;
          break;
        case "medium":
          length = Math.random() * 20 + 30;
          speed = leaderSpeed * (0.85 + Math.random() * 0.1);
          lineWidth = 1.5;
          headRadius = 1.5;
          break;
        case "small":
          length = Math.random() * 15 + 15;
          speed = leaderSpeed * (0.7 + Math.random() * 0.15);
          lineWidth = 1;
          headRadius = 1;
          break;
      }

      group.push({
        x: leaderX + offsetX,
        y: leaderY + offsetY,
        length: length,
        speed: speed,
        angle: angle,
        directionX: directionX,
        lineWidth: lineWidth,
        headRadius: headRadius,
        size: size,
        life: 1,
        decay: Math.random() * 0.006 + 0.004,
        delay: delay,
        initialDelay: delay,
      });
    }

    shootingStarGroups.push(group);
  }

  // =============================================
  //          DRAW SHOOTING STAR GROUPS
  // =============================================

  function drawShootingStarGroups() {
    for (let g = shootingStarGroups.length - 1; g >= 0; g--) {
      const group = shootingStarGroups[g];
      let allDead = true;

      for (let i = group.length - 1; i >= 0; i--) {
        const star = group[i];

        if (star.delay > 0) {
          star.delay -= 16;
          allDead = false;
          continue;
        }

        star.x += Math.cos(star.angle) * star.speed * star.directionX;
        star.y += Math.sin(star.angle) * star.speed;
        star.life -= star.decay;

        if (
          star.life <= 0 ||
          star.x < -150 ||
          star.x > width + 150 ||
          star.y > height + 150
        ) {
          group.splice(i, 1);
          continue;
        }

        allDead = false;

        const tailX =
          star.x - Math.cos(star.angle) * star.length * star.directionX;
        const tailY = star.y - Math.sin(star.angle) * star.length;

        const gradient = ctx.createLinearGradient(star.x, star.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 255, 255, ${star.life * 0.9})`);
        gradient.addColorStop(0.3, `rgba(255, 255, 255, ${star.life * 0.6})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = star.lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.life})`;
        ctx.fill();

        if (star.size === "large" && star.life > 0.3) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.headRadius * 3, 0, Math.PI * 2);
          const glowGradient = ctx.createRadialGradient(
            star.x,
            star.y,
            star.headRadius * 0.5,
            star.x,
            star.y,
            star.headRadius * 3,
          );
          glowGradient.addColorStop(
            0,
            `rgba(255, 255, 255, ${star.life * 0.4})`,
          );
          glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)");
          ctx.fillStyle = glowGradient;
          ctx.fill();
        }
      }

      if (group.length === 0) {
        shootingStarGroups.splice(g, 1);
      }
    }
  }

  // =============================================
  //          SCHEDULE SHOOTING STAR GROUPS
  // =============================================

  function scheduleShootingStarGroup() {
    const delay = Math.random() * 10000 + 3000;

    setTimeout(() => {
      createShootingStarGroup();
      scheduleShootingStarGroup();
    }, delay);
  }

  // =============================================
  //          ANIMATION LOOP
  // =============================================

  function animate() {
    ctx.clearRect(0, 0, width, height);
    drawShootingStarGroups();
    animationFrameId = requestAnimationFrame(animate);
  }

  // =============================================
  //          INITIALIZATION
  // =============================================

  function initStars() {
    resizeCanvas();
    scheduleShootingStarGroup();
    animate();
  }

  // =============================================
  //          PAGE VISIBILITY
  // =============================================

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      animate();
    }
  });

  initStars();
}
