// Loading Screen
window.addEventListener("load", function () {
  const loadingScreen = document.querySelector(".loading-screen");
  setTimeout(() => {
    loadingScreen.classList.add("hidden");
  }, 1000);
});

// Back to Top Button
const backToTopButton = document.getElementById("backToTop");
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;

    e.preventDefault();
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const header = document.querySelector("header");
      const headerHeight = header.offsetHeight;
      const elementPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });

      // Close mobile menu if open
      const navLinksEl = document.querySelector(".nav-links");
      const burgerEl = document.querySelector(".burger");
      if (navLinksEl.classList.contains("active")) {
        navLinksEl.classList.remove("active", "nav-active");
        burgerEl.classList.remove("active", "toggle");
      }
    }
  });
});

// Burger Menu
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  navLinks.classList.toggle("nav-active");
  burger.classList.toggle("active");
  burger.classList.toggle("toggle");
});

// Close menu when clicking on a link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active", "nav-active");
    burger.classList.remove("active", "toggle");
  });
});

// Sticky Header on Scroll
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.pageYOffset > 100) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// Typing Effect
const typingText = document.getElementById("typing");
const professions = [
  "Web Developer",
  "UI/UX Designer",
  "Flutter Developer",
  "Laravel Developer",
];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentProfession = professions[professionIndex];

  if (isDeleting) {
    typingText.textContent = currentProfession.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingText.textContent = currentProfession.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentProfession.length) {
    isDeleting = true;
    setTimeout(type, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    setTimeout(type, 500);
  } else {
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typingSpeed);
  }
}

setTimeout(type, 1000);

// Animate Skills on Scroll
function animateSkills() {
  const keahlianLevels = document.querySelectorAll(".keahlian-level");
  keahlianLevels.forEach((keahlianLevel) => {
    const level = keahlianLevel.dataset.level;
    keahlianLevel.style.width = level + "%";
  });
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver(function (entries, obs) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "keahlian") {
        animateSkills();
      }
      entry.target.classList.add("animate__animated", "animate__fadeInUp");
      obs.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    this.classList.add("active");

    const filterValue = this.dataset.filter;

    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
        item.style.animation = "fadeIn 0.5s ease forwards";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Pastikan link GitHub di portfolio bisa diklik
document.querySelectorAll(".portfolio-link").forEach((link) => {
  link.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const subjek = document.getElementById("subjek").value.trim();
  const pesan = document.getElementById("pesan").value.trim();
  const messageElement = document.getElementById("form-message");

  if (nama === "" || email === "" || subjek === "" || pesan === "") {
    messageElement.textContent = "Harap isi semua bidang.";
    messageElement.className = "error";
    messageElement.style.display = "block";
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageElement.textContent = "Harap masukkan alamat email yang valid.";
    messageElement.className = "error";
    messageElement.style.display = "block";
    return;
  }

  messageElement.textContent =
    "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.";
  messageElement.className = "success";
  messageElement.style.display = "block";

  this.reset();

  setTimeout(() => {
    messageElement.style.display = "none";
  }, 5000);
});

// Newsletter Form
document
  .getElementById("newsletterForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const email = this.querySelector("input").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "" || !emailRegex.test(email)) {
      alert("Harap masukkan alamat email yang valid.");
      return;
    }

    alert("Terima kasih! Pesan Anda akan segera direspon.");
    this.reset();
  });

// Music Control
document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("background-music");
  const musicToggle = document.getElementById("music-toggle");
  const musicIcon = document.getElementById("music-icon");

  if (musicToggle && audio && musicIcon) {
    musicToggle.addEventListener("click", function () {
      if (audio.paused) {
        audio
          .play()
          .then(() => {
            musicIcon.classList.remove("fa-play");
            musicIcon.classList.add("fa-pause");
          })
          .catch((error) => {
            console.error("Gagal memutar musik:", error);
          });
      } else {
        audio.pause();
        musicIcon.classList.remove("fa-pause");
        musicIcon.classList.add("fa-play");
      }
    });
  }
});

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const body = document.body;

  let currentTheme = "light";
  try {
    currentTheme = localStorage.getItem("theme");
  } catch (e) {
    // localStorage not available
  }

  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "dark");
    if (themeIcon) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const isDark = body.getAttribute("data-theme") === "dark";

      if (isDark) {
        body.removeAttribute("data-theme");
        if (themeIcon) {
          themeIcon.classList.remove("fa-sun");
          themeIcon.classList.add("fa-moon");
        }
        try { localStorage.setItem("theme", "light"); } catch (e) {}
      } else {
        body.setAttribute("data-theme", "dark");
        if (themeIcon) {
          themeIcon.classList.remove("fa-moon");
          themeIcon.classList.add("fa-sun");
        }
        try { localStorage.setItem("theme", "dark"); } catch (e) {}
      }
    });
  }
});
