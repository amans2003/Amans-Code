'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function() {elementToggleFunc(sidebar); })

// //Activating Modal-experience

const experienceItem = document.querySelectorAll('[data-experience-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalIcon = document.querySelector('[data-modal-icon]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');
const modalCompany = document.querySelector('[data-modal-company]');

const experienceModalFunc = function () {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
}

for (let i = 0; i < experienceItem.length; i++) {
    experienceItem[i].addEventListener('click', function () {
        // Get the position of the clicked card
        const rect = this.getBoundingClientRect();
        const modal = document.querySelector('.testimonials-modal');
        
        // Set transform origin to the clicked position
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const windowCenterX = window.innerWidth / 2;
        const windowCenterY = window.innerHeight / 2;
        
        const offsetX = (centerX - windowCenterX) / windowCenterX;
        const offsetY = (centerY - windowCenterY) / windowCenterY;
        
        modal.style.transformOrigin = `${50 + offsetX * 20}% ${50 + offsetY * 20}%`;
        
        // Add zoom-in effect to card
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 400);

        const iconElement = this.querySelector('.experience-icon-box ion-icon');
        modalIcon.name = iconElement.name;
        modalTitle.innerHTML = this.querySelector('[data-experience-title]').innerHTML;
        modalText.innerHTML = this.querySelector('[data-experience-text]').innerHTML;
        
        // Update company name in modal
        const companyElement = this.querySelector('.experience-company');
        if (companyElement && modalCompany) {
            modalCompany.innerHTML = companyElement.innerHTML;
        }

        experienceModalFunc();
    })
}

//Activating close button in modal-experience







modalCloseBtn.addEventListener('click', experienceModalFunc);
overlay.addEventListener('click', experienceModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

select.addEventListener('click', function () {elementToggleFunc(this); });

for(let i = 0; i < selectItems.length; i++) {
    selectItems[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        elementToggleFunc(select);
        filterFunc(selectedValue);

    });
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue.toLowerCase() == filterItems[i].dataset.category.toLowerCase()) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
    
    filterBtn[i].addEventListener('click', function() {

        let selectedValue = this.innerText.toLowerCase();
        selectValue.innerText = this.innerText;
        filterFunc(selectedValue);

        lastClickedBtn.classList.remove('active');
        this.classList.add('active');
        lastClickedBtn = this;

    })
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

for(let i = 0; i < formInputs.length; i++) {
    formInputs[i].addEventListener('input', function () {
        if(form.checkValidity()) {
            formBtn.removeAttribute('disabled');
        } else { 
            formBtn.setAttribute('disabled', '');
        }
    })
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

for(let i = 0; i < navigationLinks.length; i++) {
    navigationLinks[i].addEventListener('click', function() {
        
        for(let j = 0; j < pages.length; j++) {
            if(this.innerHTML.toLowerCase() == pages[j].dataset.page.toLowerCase()) {
                pages[j].classList.add('active');
                navigationLinks[i].classList.add('active');
                window.scrollTo(0, 0);
            } else {
                pages[j].classList.remove('active');
            }
        }
        
        // Remove active class from all other navigation links
        for(let k = 0; k < navigationLinks.length; k++) {
            if(k !== i) {
                navigationLinks[k].classList.remove('active');
            }
        }
    });
}

// Interactive Image Functionality
const interactiveImage = document.getElementById('interactiveImage');
const imageStatus = document.getElementById('imageStatus');
const resetBtn = document.getElementById('resetBtn');

let isImageClicked = false;

if (interactiveImage) {
    interactiveImage.addEventListener('click', function() {
        // Add click animation
        this.classList.add('clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 600);
        
        if (!isImageClicked) {
            // Change to clicked state
            this.src = this.getAttribute('data-clicked-src');
            imageStatus.textContent = 'After Click: Transformed Image';
            isImageClicked = true;
        } else {
            // Change back to original state
            this.src = this.getAttribute('data-original-src');
            imageStatus.textContent = 'Before Click: Original Image';
            isImageClicked = false;
        }
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', function() {
        // Reset to original state
        interactiveImage.src = interactiveImage.getAttribute('data-original-src');
        imageStatus.textContent = 'Before Click: Original Image';
        isImageClicked = false;
        
        // Add reset animation
        interactiveImage.classList.add('clicked');
        setTimeout(() => {
            interactiveImage.classList.remove('clicked');
        }, 600);
    });
}

// Skills Click Functionality
const skillsItems = document.querySelectorAll('[data-skill]');

skillsItems.forEach(item => {
    item.addEventListener('click', function() {
        const skillDetails = this.querySelector('.skill-details');
        const allSkillDetails = document.querySelectorAll('.skill-details');
        
        // Close all other skill details
        allSkillDetails.forEach(detail => {
            if (detail !== skillDetails) {
                detail.classList.remove('active');
            }
        });
        
        // Toggle current skill details
        if (skillDetails) {
            skillDetails.classList.toggle('active');
        }
    });
});

// Enhance skills percentage label on progress bars
(function initSkillPercentLabels() {
    const skills = document.querySelectorAll('.skills-item');
    skills.forEach(skill => {
        const dataEl = skill.querySelector('data');
        const fill = skill.querySelector('.skills-progress-fill');
        if (!dataEl || !fill) return;
        const percentText = (dataEl.textContent || '').trim();
        fill.setAttribute('data-label', percentText);
        // ensure pointer exists once
        if (!fill.querySelector('span.pointer')) {
            const pointer = document.createElement('span');
            pointer.className = 'pointer';
            fill.appendChild(pointer);
        }
    });
})();

// Scroll-triggered skills bar animation
(function initSkillsScrollAnimation() {
    const skillItems = document.querySelectorAll('.skills-item');
    if (!skillItems.length) return;

    // Prepare bars: capture target percentages, reset width/label
    skillItems.forEach(item => {
        const dataEl = item.querySelector('data');
        const fill = item.querySelector('.skills-progress-fill');
        if (!dataEl || !fill) return;
        const percentText = (dataEl.textContent || '0%').trim();
        const target = parseInt(percentText.replace(/[^0-9]/g, ''), 10) || 0;
        fill.dataset.target = String(target);
        // set initial state only once
        if (!fill.dataset.prepared) {
            fill.dataset.prepared = 'true';
            fill.style.width = '0%';
            fill.setAttribute('data-label', '0%');
        }
    });

    const animateFill = (fill) => {
        const target = parseInt(fill.dataset.target || '0', 10);
        const durationMs = 1000 + target * 5; // slight scaling with percent
        const startTime = performance.now();

        const startWidth = 0;
        const endWidth = target;

        const step = (now) => {
            const elapsed = now - startTime;
            const t = Math.min(1, elapsed / durationMs);
            // easeOutCubic
            const eased = 1 - Math.pow(1 - t, 3);
            const current = Math.round(startWidth + (endWidth - startWidth) * eased);
            fill.style.width = current + '%';
            fill.setAttribute('data-label', current + '%');
            if (t < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const item = entry.target;
                const fill = item.querySelector('.skills-progress-fill');
                if (fill && fill.dataset.animated !== 'true') {
                    fill.dataset.animated = 'true';
                    animateFill(fill);
                }
            }
        });
    }, { threshold: 0.3 });

    skillItems.forEach(item => io.observe(item));
})();

// Supabase Contact Form Integration
(function initContactFormSupabase(){
    if (!window.supabase) return;

    // TODO: Replace with your Supabase project URL and anon key
    const SUPABASE_URL = 'https://uxiuzveyxxtdxeduxsxx.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV4aXV6dmV5eHh0ZHhlZHV4c3h4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYyMjM4MDEsImV4cCI6MjA3MTc5OTgwMX0.ixV6OSY4GnDgD2k8Ga5_0YGKXdfzxUFdqCKdib-abiM';

    const client = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    const form = document.querySelector('[data-form]');
    const statusEl = document.getElementById('contactStatus');
    const submitBtn = document.querySelector('[data-form-btn]');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!client) return;

        const formData = new FormData(form);
        const fullname = formData.get('fullname');
        const email = formData.get('email');
        const message = formData.get('message');

        // UX: disable button while submitting
        if (submitBtn) submitBtn.setAttribute('disabled', '');
        if (statusEl) {
            statusEl.style.color = 'var(--light-gray)';
            statusEl.textContent = 'Sending...';
        }

        try {
            const { data, error } = await client.from('contact_messages').insert([
                {
                    fullname,
                    email,
                    message,
                    submitted_at: new Date().toISOString(),
                },
            ]);

            if (error) throw error;

            if (statusEl) {
                statusEl.style.color = 'var(--orange-yellow-crayola)';
                statusEl.textContent = 'Thanks! Your message has been sent.';
            }

            form.reset();
            // After reset, keep disabled until inputs typed again
        } catch (err) {
            if (statusEl) {
                statusEl.style.color = 'var(--bittersweet-shimmer)';
                statusEl.textContent = 'Failed to send. Please try again.';
            }
        } finally {
            // Re-enable button if form still valid
            if (form.checkValidity()) {
                if (submitBtn) submitBtn.removeAttribute('disabled');
            }
        }
    });
})();