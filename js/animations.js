// Animations JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Profile image floating animation
  const profileImg = document.querySelector('.profile-img-wrapper');
  if (profileImg) {
    let floatX = 0;
    let floatY = 0;
    let floatTimer = 0;
    
    function floatAnimation() {
      floatTimer += 0.01;
      floatX = Math.sin(floatTimer) * 10;
      floatY = Math.cos(floatTimer) * 10;
      
      profileImg.style.transform = `translateX(${floatX}px) translateY(${floatY}px)`;
      
      requestAnimationFrame(floatAnimation);
    }
    
    floatAnimation();
  }
  
  // Particle wave animation for section backgrounds
  class Particle {
    constructor(x, y, canvas, ctx) {
      this.x = x;
      this.y = y;
      this.canvas = canvas;
      this.ctx = ctx;
      this.radius = Math.random() * 2 + 1;
      this.speed = Math.random() * 0.5 + 0.2;
      this.directionX = Math.random() * 2 - 1;
      this.directionY = Math.random() * 2 - 1;
      this.color = `rgba(0, 163, 255, ${Math.random() * 0.5 + 0.2})`;
    }
    
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
    
    update() {
      if (this.x + this.radius > this.canvas.width || this.x - this.radius < 0) {
        this.directionX = -this.directionX;
      }
      
      if (this.y + this.radius > this.canvas.height || this.y - this.radius < 0) {
        this.directionY = -this.directionY;
      }
      
      this.x += this.directionX * this.speed;
      this.y += this.directionY * this.speed;
      
      this.draw();
    }
  }
  
  // Add canvas waves to specific sections
  const waveSections = ['about-section', 'skills-section', 'contact-section'];
  
  waveSections.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Create canvas element
      const canvas = document.createElement('canvas');
      canvas.classList.add('wave-canvas');
      canvas.style.position = 'absolute';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.width = '100%';
      canvas.style.height = '100%';
      canvas.style.zIndex = '0';
      canvas.style.opacity = '0.1';
      canvas.style.pointerEvents = 'none';
      
      // Insert canvas as first child of section
      section.style.position = 'relative';
      section.insertBefore(canvas, section.firstChild);
      
      const ctx = canvas.getContext('2d');
      
      // Resize canvas
      function resizeCanvas() {
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
      }
      
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      // Create particles
      const particles = [];
      const particleCount = Math.floor((section.offsetWidth * section.offsetHeight) / 20000);
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(new Particle(x, y, canvas, ctx));
      }
      
      // Animation loop
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
          particle.update();
        });
        
        // Connect particles with lines if they are close enough
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
              ctx.beginPath();
              ctx.strokeStyle = `rgba(0, 163, 255, ${0.1 - distance/1000})`;
              ctx.lineWidth = 0.5;
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.stroke();
            }
          }
        }
        
        requestAnimationFrame(animate);
      }
      
      animate();
    }
  });
  
  // Text reveal animation
  const textElements = document.querySelectorAll('.about-text h3, .about-text p');
  
  textElements.forEach((element, index) => {
    const text = element.textContent;
    element.innerHTML = '';
    
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i] === ' ' ? ' ' : text[i];
      span.style.opacity = '0';
      span.style.transition = 'opacity 0.03s ease';
      span.style.transitionDelay = `${i * 0.03}s`;
      element.appendChild(span);
    }
    
    // Observer to trigger the animation when element is in view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const spans = entry.target.querySelectorAll('span');
          spans.forEach(span => {
            span.style.opacity = '1';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(element);
  });
  
  // Timeline scroll animation
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  timelineItems.forEach(item => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    observer.observe(item);
  });
  
  // Project hover effects enhancement
  const projectItems = document.querySelectorAll('.project-item');
  
  projectItems.forEach(item => {
    const img = item.querySelector('img');
    const overlay = item.querySelector('.project-overlay');
    
    item.addEventListener('mouseenter', (e) => {
      const boundingRect = item.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;
      
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
      
      const moveX = (mouseX - centerX) / 10;
      const moveY = (mouseY - centerY) / 10;
      
      img.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
      overlay.style.background = `linear-gradient(${45 + moveX}deg, rgba(5, 5, 5, 0.5), rgba(0, 163, 255, 0.8))`;
    });
    
    item.addEventListener('mousemove', (e) => {
      const boundingRect = item.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;
      
      const centerX = boundingRect.width / 2;
      const centerY = boundingRect.height / 2;
      
      const moveX = (mouseX - centerX) / 10;
      const moveY = (mouseY - centerY) / 10;
      
      img.style.transform = `scale(1.1) translate(${-moveX}px, ${-moveY}px)`;
      overlay.style.background = `linear-gradient(${45 + moveX}deg, rgba(5, 5, 5, 0.5), rgba(0, 163, 255, 0.8))`;
    });
    
    item.addEventListener('mouseleave', () => {
      img.style.transform = 'scale(1)';
      overlay.style.background = 'linear-gradient(rgba(5, 5, 5, 0.5), rgba(0, 163, 255, 0.8))';
    });
  });
  
  // Add 3D tilt effect to skill items
  const skillItems = document.querySelectorAll('.skill-item');
  
  skillItems.forEach(item => {
    item.addEventListener('mousemove', (e) => {
      const boundingRect = item.getBoundingClientRect();
      const mouseX = e.clientX - boundingRect.left;
      const mouseY = e.clientY - boundingRect.top;
      
      const rotateY = ((mouseX / boundingRect.width) - 0.5) * 10;
      const rotateX = ((0.5 - (mouseY / boundingRect.height)) * 10);
      
      item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      item.style.boxShadow = `0 5px 15px rgba(0, 163, 255, 0.2), 
                             ${rotateY/3}px ${-rotateX/3}px 6px rgba(0, 163, 255, 0.1)`;
    });
    
    item.addEventListener('mouseleave', () => {
      item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
      item.style.boxShadow = 'none';
    });
  });
  
  // Glow effect for buttons
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
      const boundingRect = button.getBoundingClientRect();
      const x = e.clientX - boundingRect.left;
      const y = e.clientY - boundingRect.top;
      
      button.style.setProperty('--x', `${x}px`);
      button.style.setProperty('--y', `${y}px`);
    });
  });
  
  // Form field animation enhancement
  const formFields = document.querySelectorAll('.form-group input, .form-group textarea');
  
  formFields.forEach(field => {
    field.addEventListener('focus', () => {
      field.parentElement.classList.add('focus');
    });
    
    field.addEventListener('blur', () => {
      field.parentElement.classList.remove('focus');
    });
  });
  
  // Add a ripple effect to buttons
  const rippleButtons = document.querySelectorAll('.btn, .filter-btn, .tab-btn');
  
  rippleButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const boundingRect = button.getBoundingClientRect();
      const x = e.clientX - boundingRect.left;
      const y = e.clientY - boundingRect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Add CSS class for ripple effect
  const style = document.createElement('style');
  style.innerHTML = `
    .btn, .filter-btn, .tab-btn {
      position: relative;
      overflow: hidden;
    }
    
    .ripple {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .form-group.focus input,
    .form-group.focus textarea {
      box-shadow: 0 0 0 3px rgba(0, 163, 255, 0.2);
    }
  `;
  document.head.appendChild(style);
});