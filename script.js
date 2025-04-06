document.addEventListener("DOMContentLoaded", () => {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');

    window.addEventListener('scroll', scrollFunction);

    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            scrollToTopBtn.style.display = "block";
        } else {
            scrollToTopBtn.style.display = "none";
        }
    }

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    const statisticsSection = document.getElementById("statistics");

    if (statisticsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    console.log("Statistics section is in view");
                    animateCounter("experience-counter", 0, 4, 2000);
                    animateCounter("projects-counter", 0, 90, 2000);
                    animateCounter("clients-counter", 0, 118, 2000);
                    observer.unobserve(statisticsSection);
                }
            });
        });

        observer.observe(statisticsSection);
    } else {
        console.log("Statistics section not found");
    }

    const workVideos = document.querySelectorAll(".work-video");

    workVideos.forEach((video) => {
        video.addEventListener("mouseover", () => {
            video.play();
        });
        video.addEventListener("mouseout", () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    const certificationCards = document.querySelectorAll(".certification-card");

    const cardObserver = new IntersectionObserver((entries, cardObserver) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    certificationCards.forEach((card) => {
        cardObserver.observe(card);
    });

    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    const track = document.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const slideWidth = slides[0].getBoundingClientRect().width;

    let currentSlideIndex = 0;

    const moveToSlide = (index) => {
        const targetOffset = index * slideWidth;
        track.style.transform = 'translateX(-' + targetOffset + 'px)';
        currentSlideIndex = index;
    };

    nextButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        moveToSlide(currentSlideIndex);
    });

    prevButton.addEventListener('click', () => {
        currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
        moveToSlide(currentSlideIndex);
    });

    window.addEventListener('resize', () => moveToSlide(currentSlideIndex));

    moveToSlide(currentSlideIndex);

    
    function animateCounter(id, start, end, duration) {
        const element = document.getElementById(id);
        let startTime = null;

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.innerText = value + "+";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(event.target);

            formData.append("access_key", "b258a824-a139-4d33-bd92-6164c33102c2");

            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                },
                body: json
            }).then((res) => res.json());

            if (res.success) {
                alert(res.message);
            } else {
                alert("Failed to send message.");
            }
        });
    }

    const logo = document.getElementById('logo1');
    if (logo) {
        logo.addEventListener('click', () => {
            document.querySelector('.hero').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    function toggleMenu() {
        const navLinks = document.getElementById('nav-links');
        navLinks.classList.toggle('active');
    }
});
