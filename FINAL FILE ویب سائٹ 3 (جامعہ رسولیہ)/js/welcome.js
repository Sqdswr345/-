// Welcome Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add animation to the welcome message
    const welcomeContainer = document.querySelector('.welcome-container');
    welcomeContainer.style.opacity = '0';
    welcomeContainer.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        welcomeContainer.style.transition = 'all 0.8s ease';
        welcomeContainer.style.opacity = '1';
        welcomeContainer.style.transform = 'translateY(0)';
    }, 100);

    // Add smooth scroll to the continue button
    const continueButton = document.querySelector('.continue-button');
    if (continueButton) {
        continueButton.addEventListener('click', function(e) {
            e.preventDefault();
            const targetUrl = this.getAttribute('href');
            
            // Add fade out animation
            welcomeContainer.style.opacity = '0';
            
            // Redirect after animation
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500);
        });
    }

    // Add animation on hover for the continue button
    const button = document.querySelector('.continue-button');
    if (button) {
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translateY(0)';
        });
    }

    // Automatically redirect to main page after 3 seconds
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 3000); // Redirect after 3 seconds
});
