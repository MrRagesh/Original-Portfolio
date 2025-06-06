// Form Handling JavaScript
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic form validation
      if (!name || !email || !subject || !message) {
        showFormNotification('Please fill in all fields', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormNotification('Please enter a valid email address', 'error');
        return;
      }
      
      // Simulate form submission (replace with actual form submission)
      simulateFormSubmission(name, email, subject, message);
    });
  }
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Simulate form submission (replace with actual form submission code)
  function simulateFormSubmission(name, email, subject, message) {
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate network request
    setTimeout(() => {
      // Show success message
      showFormNotification('Your message has been sent successfully!', 'success');
      
      // Reset form
      contactForm.reset();
      
      // Reset button
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }, 2000);
  }
  
  // Show notification message
  function showFormNotification(message, type) {
    // Remove any existing notification
    const existingNotification = document.querySelector('.form-notification');
    if (existingNotification) {
      existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('form-notification', type);
    
    // Add icon based on type
    let icon = '';
    if (type === 'success') {
      icon = '<i class="fas fa-check-circle"></i> ';
    } else if (type === 'error') {
      icon = '<i class="fas fa-exclamation-circle"></i> ';
    }
    
    notification.innerHTML = icon + message;
    
    // Add notification to the DOM
    contactForm.parentNode.insertBefore(notification, contactForm.nextSibling);
    
    // Add CSS for notification
    const style = document.createElement('style');
    style.innerHTML = `
      .form-notification {
        padding: 1rem;
        border-radius: var(--border-radius);
        margin-top: 1rem;
        display: flex;
        align-items: center;
        animation: fadeInUp 0.3s ease forwards;
      }
      
      .form-notification i {
        margin-right: 0.5rem;
        font-size: 1.25rem;
      }
      
      .form-notification.success {
        background-color: rgba(76, 175, 80, 0.1);
        border-left: 3px solid var(--success-color);
        color: var(--success-color);
      }
      
      .form-notification.error {
        background-color: rgba(255, 82, 82, 0.1);
        border-left: 3px solid var(--error-color);
        color: var(--error-color);
      }
    `;
    
    if (!document.head.querySelector('style[data-notification-styles]')) {
      style.setAttribute('data-notification-styles', 'true');
      document.head.appendChild(style);
    }
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateY(-10px)';
      notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }
  
  // Real-time form validation
  const formInputs = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formInputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateInput(this);
    });
  });
  
  function validateInput(input) {
    const parent = input.parentElement;
    
    // Remove any existing error message
    const existingError = parent.querySelector('.input-error');
    if (existingError) {
      existingError.remove();
    }
    
    // Check if input is empty
    if (!input.value.trim()) {
      addErrorMessage(input, 'This field is required');
      return false;
    }
    
    // Email validation
    if (input.type === 'email' && !isValidEmail(input.value)) {
      addErrorMessage(input, 'Please enter a valid email address');
      return false;
    }
    
    return true;
  }
  
  function addErrorMessage(input, message) {
    const parent = input.parentElement;
    const errorMessage = document.createElement('div');
    errorMessage.classList.add('input-error');
    errorMessage.textContent = message;
    parent.appendChild(errorMessage);
    
    // Add CSS for error message
    const style = document.createElement('style');
    style.innerHTML = `
      .input-error {
        color: var(--error-color);
        font-size: 0.75rem;
        margin-top: 0.25rem;
        animation: fadeIn 0.2s ease forwards;
      }
      
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    `;
    
    if (!document.head.querySelector('style[data-error-styles]')) {
      style.setAttribute('data-error-styles', 'true');
      document.head.appendChild(style);
    }
  }
  
  // Character counter for message textarea
  const messageTextarea = document.getElementById('message');
  
  if (messageTextarea) {
    // Create character counter element
    const charCounter = document.createElement('div');
    charCounter.classList.add('char-counter');
    messageTextarea.parentElement.appendChild(charCounter);
    
    // Update counter on input
    messageTextarea.addEventListener('input', function() {
      const currentLength = this.value.length;
      const maxLength = 500; // Set your desired max length
      const remainingChars = maxLength - currentLength;
      
      charCounter.textContent = `${currentLength}/${maxLength} characters`;
      
      if (remainingChars < 50) {
        charCounter.classList.add('warning');
      } else {
        charCounter.classList.remove('warning');
      }
      
      if (remainingChars < 0) {
        charCounter.classList.add('error');
        this.value = this.value.substring(0, maxLength);
        charCounter.textContent = `${maxLength}/${maxLength} characters`;
      } else {
        charCounter.classList.remove('error');
      }
    });
    
    // Add CSS for character counter
    const style = document.createElement('style');
    style.innerHTML = `
      .char-counter {
        font-size: 0.75rem;
        color: var(--text-dark);
        text-align: right;
        margin-top: 0.25rem;
      }
      
      .char-counter.warning {
        color: var(--warning-color);
      }
      
      .char-counter.error {
        color: var(--error-color);
      }
    `;
    
    if (!document.head.querySelector('style[data-counter-styles]')) {
      style.setAttribute('data-counter-styles', 'true');
      document.head.appendChild(style);
    }
  }
});