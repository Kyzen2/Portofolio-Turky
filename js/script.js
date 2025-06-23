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
    e.preventDefault();

    const targetId = this.getAttribute("href");
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
      if (nav.classList.contains("nav-active")) {
        nav.classList.remove("nav-active");
        burger.classList.remove("toggle");
        navLinks.forEach((link) => {
          link.style.animation = "";
        });
      }
    }
  });
});

// Burger Menu
const navSlide = () => {
  const burger = document.querySelector(".burger");
  const nav = document.querySelector(".nav-links");
  const navLinks = document.querySelectorAll(".nav-links li");

  burger.addEventListener("click", () => {
    // Toggle nav
    nav.classList.toggle("nav-active");

    // Animate Links
    navLinks.forEach((link, index) => {
      if (link.style.animation) {
        link.style.animation = "";
      } else {
        link.style.animation = `navLinkFade 0.5s ease forwards ${
          index / 7 + 0.3
        }s`;
      }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
  });
};

// Burger Menu Functionality
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

burger.addEventListener("click", () => {
  // Toggle nav
  navLinks.classList.toggle("active");
  burger.classList.toggle("active");

  // Animate links
  if (navLinks.classList.contains("active")) {
    navLinks.classList.add("nav-active");
  } else {
    navLinks.classList.remove("nav-active");
    navItems.forEach((item) => {
      item.style.animation = "";
    });
  }
});

// Close menu when clicking on a link
navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navLinks.classList.remove("active");
    burger.classList.remove("active");
    navLinks.classList.remove("nav-active");
  });
});

navSlide();

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
  "Programmer",
  "Frontend Developer",
];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isEnd = false;

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
    isEnd = true;
    isDeleting = true;
    setTimeout(type, 1500); // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    professionIndex = (professionIndex + 1) % professions.length;
    setTimeout(type, 500); // Pause before typing next
  } else {
    const typingSpeed = isDeleting ? 100 : 150;
    setTimeout(type, typingSpeed);
  }
}

// Start typing effect
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
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver(function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      if (entry.target.id === "keahlian") {
        animateSkills();
      }

      entry.target.classList.add("animate__animated", "animate__fadeInUp");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe sections
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section);
});

// Portfolio Filter
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    // Add active class to clicked button
    this.classList.add("active");

    const filterValue = this.dataset.filter;

    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.dataset.category === filterValue) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll(".testimoni-item");
const dots = document.querySelectorAll(".dot");

function showTestimonial(index) {
  testimonials.forEach((testimonial) => testimonial.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  testimonials[index].classList.add("active");
  dots[index].classList.add("active");
  currentTestimonial = index;
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => showTestimonial(index));
});

document
  .querySelector(".testimoni-prev")
  .addEventListener("click", function () {
    let newIndex = currentTestimonial - 1;
    if (newIndex < 0) newIndex = testimonials.length - 1;
    showTestimonial(newIndex);
  });

document
  .querySelector(".testimoni-next")
  .addEventListener("click", function () {
    let newIndex = currentTestimonial + 1;
    if (newIndex >= testimonials.length) newIndex = 0;
    showTestimonial(newIndex);
  });

// Auto rotate testimonials
setInterval(() => {
  let newIndex = currentTestimonial + 1;
  if (newIndex >= testimonials.length) newIndex = 0;
  showTestimonial(newIndex);
}, 5000);

// Portfolio Modal
const portfolioItemsModal = document.querySelectorAll(".portfolio-item");
const modal = document.getElementById("portfolioModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalLiveLink = document.getElementById("modalLiveLink");
const modalCodeLink = document.getElementById("modalCodeLink");
const modalClose = document.querySelector(".modal-close");

portfolioItemsModal.forEach((item) => {
  item.addEventListener("click", function (e) {
    e.preventDefault();

    const imgSrc = this.querySelector("img").src;
    const title = this.querySelector("h3").textContent;
    const description = this.querySelector("p").textContent;
    const githubLink = this.getAttribute("data-link"); // Ambil link GitHub dari data-link

    modalImage.src = imgSrc;
    modalTitle.textContent = title;
    modalDescription.textContent = description;

    // Set link GitHub sesuai dengan proyek yang dipilih
    modalLiveLink.href = "#"; // Ganti dengan link live proyek jika ada
    modalCodeLink.href = githubLink; // Gunakan link GitHub dari data-link

    modal.style.display = "block";
    document.body.style.overflow = "hidden";
  });
});

modalClose.addEventListener("click", function () {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", function (e) {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Form Submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const subjek = document.getElementById("subjek").value.trim();
  const pesan = document.getElementById("pesan").value.trim();

  const messageElement = document.getElementById("form-message");

  // Simple validation
  if (nama === "" || email === "" || subjek === "" || pesan === "") {
    messageElement.textContent = "Harap isi semua bidang.";
    messageElement.className = "error";
    messageElement.style.display = "block";
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    messageElement.textContent = "Harap masukkan alamat email yang valid.";
    messageElement.className = "error";
    messageElement.style.display = "block";
    return;
  }

  // Simulate form submission
  messageElement.textContent =
    "Pesan Anda telah terkirim! Kami akan segera menghubungi Anda.";
  messageElement.className = "success";
  messageElement.style.display = "block";

  // Reset form
  this.reset();

  // Hide message after 5 seconds
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

    // Simulate subscription
    alert("Terima kasih telah berlangganan newsletter kami!");
    this.reset();
  });

// Initialize animations when page loads
window.addEventListener("DOMContentLoaded", function () {
  // Animate hero elements
  document
    .querySelector(".hero-content")
    .classList.add("animate__animated", "animate__fadeInLeft");
  document
    .querySelector(".hero-image")
    .classList.add("animate__animated", "animate__fadeInRight");
});
