// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Preloader
  const preloader = document.querySelector('.preloader');
  const counter = document.querySelector('.counter');
  let count = 0;
  
  const interval = setInterval(() => {
    if (count < 100) {
      count++;
      counter.textContent = count;
    } else {
      clearInterval(interval);
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  }, 20);
  
  // Initialize Particles.js
  particlesJS('particles-js', {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: '#00A3FF'
      },
      shape: {
        type: 'circle',
        stroke: {
          width: 0,
          color: '#000000'
        },
        polygon: {
          nb_sides: 5
        }
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#00A3FF',
        opacity: 0.4,
        width: 1
      },
      move: {
        enable: true,
        speed: 2,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: {
          enable: true,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'grab'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        grab: {
          distance: 140,
          line_linked: {
            opacity: 1
          }
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3
        },
        repulse: {
          distance: 200,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        },
        remove: {
          particles_nb: 2
        }
      }
    },
    retina_detect: true
  });
  
  // Typed.js Initialization
  const options = {
    strings: [
      'Full Stack Developer',
      'Graphic Designer',
      'UI/UX Designer',
      'Video Editor',
      'Freelancer'
    ],
    typeSpeed: 80,
    backSpeed: 50,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    cursorChar: '|'
  };
  
  new Typed('.typing', options);
  
  // Custom Cursor
  const cursor = document.querySelector('.cursor');
  const cursorFollower = document.querySelector('.cursor-follower');
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorFollower.style.left = e.clientX + 'px';
      cursorFollower.style.top = e.clientY + 'px';
    }, 50);
  });
  
  document.addEventListener('mousedown', () => {
    cursor.style.width = '12px';
    cursor.style.height = '12px';
    cursorFollower.style.width = '30px';
    cursorFollower.style.height = '30px';
  });
  
  document.addEventListener('mouseup', () => {
    cursor.style.width = '8px';
    cursor.style.height = '8px';
    cursorFollower.style.width = '40px';
    cursorFollower.style.height = '40px';
  });
  
  // Detect when cursor hovers over links or buttons
  const hoverElements = document.querySelectorAll('a, button, .btn, .project-item, .skill-item, .social-icon');
  
  hoverElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.width = '0px';
      cursor.style.height = '0px';
      cursorFollower.style.width = '50px';
      cursorFollower.style.height = '50px';
      cursorFollower.style.borderColor = 'var(--primary-color)';
      cursorFollower.style.backgroundColor = 'rgba(0, 163, 255, 0.1)';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.width = '8px';
      cursor.style.height = '8px';
      cursorFollower.style.width = '40px';
      cursorFollower.style.height = '40px';
      cursorFollower.style.borderColor = 'var(--primary-color)';
      cursorFollower.style.backgroundColor = 'transparent';
    });
  });
  
  // Scroll to section when clicking on navigation links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const target = document.querySelector(this.getAttribute('href'));
      const offsetTop = target.offsetTop;
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Close mobile menu when clicking on a link
      document.querySelector('.nav-menu').classList.remove('active');
      document.querySelector('.menu-toggle').classList.remove('active');
    });
  });
  
  // Toggle mobile menu
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
  });
  
  // Sticky navigation
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    // Back to top button visibility
    const backToTop = document.querySelector('.back-to-top');
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
    
    // Active navigation link based on scroll position
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;
      
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
    
    // Animate elements on scroll
    animateOnScroll();
  });
  
  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      const filterValue = this.getAttribute('data-filter');
      
      projectItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 100);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 500);
        }
      });
    });
  });
  
  // Tab switching for timeline
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Show corresponding content
      const tabId = this.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('active');
      
      // Reset and trigger animations for the active tab
      const activeTab = document.getElementById(tabId);
      const timelineItems = activeTab.querySelectorAll('.timeline-item');
      
      timelineItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
      });
      
      setTimeout(() => {
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }, 50);
    });
  });
  
  // Skill Progress Bar Animation
  function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
      const progressFill = item.querySelector('.skill-progress-fill');
      const skillValue = item.getAttribute('data-skill');
      
      progressFill.style.width = skillValue + '%';
    });
  }
  
  // Animation on scroll
  function animateOnScroll() {
    const animElements = document.querySelectorAll('.section-header, .skill-item, .project-item, .timeline-item, .tool-item, .about-content');
    const windowHeight = window.innerHeight;
    
    animElements.forEach(element => {
      const elementPosition = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementPosition < windowHeight - elementVisible) {
        element.classList.add('show');
        
        // Animate skill bars when they come into view
        if (element.classList.contains('skill-item')) {
          const progressFill = element.querySelector('.skill-progress-fill');
          const skillValue = element.getAttribute('data-skill');
          
          progressFill.style.width = skillValue + '%';
        }
      }
    });
  }
  
  // Back to top functionality
  document.querySelector('.back-to-top').addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Parallax effect
  document.addEventListener('mousemove', parallax);
  
  function parallax(e) {
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.getAttribute('data-speed') || 0.1;
      const x = (window.innerWidth - e.pageX * speed) / 100;
      const y = (window.innerHeight - e.pageY * speed) / 100;
      
      element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
  }
  
  // Call animations on page load
  setTimeout(() => {
    animateSkills();
    animateOnScroll();
  }, 1500);
});