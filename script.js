document.addEventListener('DOMContentLoaded', () => {
    
    // Animate on scroll logic
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // FAQ Accordion logic
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // Fix Pixel tracking delay for checkout links
    const checkoutLinks = document.querySelectorAll('a[href*="chk.eduzz.com"]');
    checkoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop immediate redirection
            const targetUrl = this.href;
            
            // Ensure event is fired
            if(typeof fbq === 'function') {
                fbq('track', 'InitiateCheckout');
            }
            
            // Wait 500ms for the Pixel request to complete, then navigate
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    });
});

window.slideCarousel = function(direction) {
    const carousel = document.getElementById('moduleCarousel');
    if(carousel) {
        const cardWidth = carousel.querySelector('.module-card').offsetWidth;
        const gap = 20;
        carousel.scrollBy({ left: (cardWidth + gap) * direction, behavior: 'smooth' });
    }
};
