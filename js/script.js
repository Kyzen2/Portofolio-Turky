// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const header = document.querySelector('header');
            const headerHeight = header.offsetHeight;
            const elementPosition = targetElement.offsetTop - headerHeight + -10;

            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Burger Menu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle nav
        nav.classList.toggle('nav-active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

navSlide();

// Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const nama = document.getElementById('nama').value;
    const email = document.getElementById('email').value;
    const pesan = document.getElementById('pesan').value;

    // Contoh validasi sederhana
    if (nama === '' || email === '' || pesan === '') {
        document.getElementById('form-message').innerText = 'Harap isi semua bidang.';
        return;
    }

    // Kirim data (simulasi)
    document.getElementById('form-message').innerText = 'Pesan Anda telah terkirim!';
    document.getElementById('contactForm').reset();
});

// Animasi Skill Bar
const animateSkills = () => {
    const keahlianLevels = document.querySelectorAll('.keahlian-level');
    keahlianLevels.forEach(keahlianLevel => {
        const level = keahlianLevel.dataset.level;
        keahlianLevel.style.width = level + '%';
    });
}

// Panggil fungsi animateSkills saat halaman dimuat
window.addEventListener('load', animateSkills);