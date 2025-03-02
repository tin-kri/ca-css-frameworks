/**
* Initializes all footer functionality including copyright year, scroll-to-top button, and newsletter form.
* This function serves as the main entry point for setting up all interactive elements within the footer.
* 
* @function initializeFooter
* @returns {void}
* 
* @example
* // Call the function to initialize all footer components
* initializeFooter();
*/
export function initializeFooter() {
    updateCopyrightYear();
    setupScrollToTop();
    setupNewsletterForm();
   }
   
   /**
   * Updates the copyright year element with the current year.
   * 
   * @function updateCopyrightYear
   * @private
   * @returns {void}
   */
   function updateCopyrightYear() {
    const yearElement = document.getElementById('copyrightYear');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
   }
   
   /**
   * Sets up the scroll-to-top button functionality.
   * Adds a click event listener that smoothly scrolls the page to the top.
   * 
   * @function setupScrollToTop
   * @private
   * @returns {void}
   */
   function setupScrollToTop() {
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
      scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
   }
   
   /**
   * Sets up the newsletter subscription form with validation and submission handling.
   * Manages form submission, loading states, success/error feedback, and form reset.
   * 
   * @function setupNewsletterForm
   * @private
   * @returns {void}
   */
   function setupNewsletterForm() {
    const newsletterForm = document.querySelector('footer form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        if (!emailInput || !submitButton) return;
        
        try {
          // Disable form while submitting
          emailInput.disabled = true;
          submitButton.disabled = true;
          const originalButtonText = submitButton.textContent;
          submitButton.textContent = 'Subscribing...';
          
          // simulate a successful subscription
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
          
          // Show success message
          emailInput.value = '';
          submitButton.textContent = 'Subscribed!';
          
          // Reset button after 2 seconds
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            emailInput.disabled = false;
            submitButton.disabled = false;
          }, 2000);
        } catch (error) {
          console.error('Newsletter subscription error:', error);
          submitButton.textContent = 'Error! Try again';
          
          // Reset form after error
          setTimeout(() => {
            submitButton.textContent = originalButtonText;
            emailInput.disabled = false;
            submitButton.disabled = false;
          }, 2000);
        }
      });
    }
   }