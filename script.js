// Footer year
const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// Typing animation
const typingElement = document.getElementById("typingText");

if (typingElement) {
    const words = [
        "Aspiring Developer",
        "Problem Solver",
        "Tech Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = words[0].length;
    let deleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];

        if (deleting) {
            charIndex--;
        } else {
            charIndex++;
        }

        typingElement.textContent = currentWord.substring(0, charIndex);

        let delay = deleting ? 45 : 85;

        if (!deleting && charIndex === currentWord.length) {
            deleting = true;
            delay = 1400;
        } else if (deleting && charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            delay = 350;
        }

        window.setTimeout(typeEffect, delay);
    }

    // Begin after the initial text has been displayed
    window.setTimeout(typeEffect, 1800);
}

// Scroll reveal animations
const revealElements = document.querySelectorAll(".reveal, .project-card, .skill-card");

if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach((element) => {
        element.classList.add("reveal");
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}

// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Highlight the navigation link for the visible section
const sections = document.querySelectorAll("main section[id]");
const sectionLinks = document.querySelectorAll(".nav-links a");

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                sectionLinks.forEach((link) => {
                    const matches = link.getAttribute("href") ===
                        `#${entry.target.id}`;

                    link.classList.toggle("active", matches);
                });
            }
        });
    }, {
        rootMargin: "-25% 0px -60% 0px"
    });

    sections.forEach((section) => sectionObserver.observe(section));
}

// Contact form setup check
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        const action = contactForm.getAttribute("action") || "";

        if (action.includes("YOUR_FORM_ID")) {
            event.preventDefault();

            if (formStatus) {
                formStatus.textContent =
                    "Contact form setup is incomplete. Configure your Formspree form ID first.";
            }

            return;
        }

        // Form submits normally to Formspree after configuration.
    });
}