// ═══════════════════════════════════════════════
//  ADEEB GROUP - LIVE SITE BEHAVIOR
// ═══════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // 0. RENDER SITE CONTENT (From site-content.js)
  function renderSiteContent() {
    const data = getSiteData();
    
    // Render Hero Slides
    const heroContainer = document.getElementById('heroSlides');
    if (heroContainer) {
      heroContainer.innerHTML = data.hero.slides.map((slide, index) => `
        <div class="slide ${index === 0 ? 'active' : ''}">
          <div class="slide-bg" style="background-image: url('${slide.image}');" aria-hidden="true"></div>
          <div class="slide-overlay"></div>
          <div class="container slide-content">
            <p class="slide-subtitle">${slide.subtitle}</p>
            <h1 class="slide-title">${slide.title}</h1>
            <a href="${slide.buttonLink}" class="btn btn-primary">${slide.buttonText}</a>
          </div>
        </div>
      `).join('');
      
      // Re-initialize slider logic if it was already defined
      initHeroSlider();
    }

    // Render Stats
    const statsContainer = document.getElementById('statsList');
    if (statsContainer) {
      statsContainer.innerHTML = data.stats.map(stat => `
        <div class="stat-card">
          <div class="stat-icon" aria-hidden="true">
            ${stat.icon || '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="14" height="12" rx="1" stroke="#fff" stroke-width="1.2"/><path d="M7 8h6" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}
          </div>
          <div>
            <p class="stat-number">${stat.number}</p>
            <p class="stat-label">${stat.label}</p>
          </div>
        </div>
      `).join('');
    }

    // Render Testimonials
    const testimonialsContainer = document.getElementById('testimonialList');
    if (testimonialsContainer) {
      testimonialsContainer.innerHTML = data.testimonials.map(t => `
        <div class="testimonial-card">
          <p class="testimonial-text">${t.text}</p>
          <div class="testimonial-meta">
            <img class="testimonial-avatar" src="${t.avatar}" alt="${t.author}">
            <div>
              <strong>${t.author}</strong>
              <div class="muted">${t.position}</div>
            </div>
          </div>
        </div>
      `).join('');
    }

    // Render Top Bar
    const topPhone = document.querySelector('.tb-item a[href^="tel:"]');
    const topEmail = document.querySelector('.tb-item a[href^="mailto:"]');
    if (topPhone && data.topBar) {
      topPhone.innerText = data.topBar.phone;
      topPhone.href = `tel:${data.topBar.phone.replace(/\D/g,'')}`;
    }
    if (topEmail && data.topBar) {
      topEmail.innerText = data.topBar.email;
      topEmail.href = `mailto:${data.topBar.email}`;
    }

    // Render Footer
    const footerAbout = document.querySelector('.footer-col p');
    if (footerAbout && data.footer) {
      footerAbout.innerHTML = data.footer.aboutText;
    }
    const footerHours = document.querySelector('.footer-col:last-child p');
    if (footerHours && data.footer) {
      footerHours.innerHTML = data.footer.openingHours;
    }

    // Render Services (Services Page)
    const servicesContainer = document.getElementById('servicesList');
    if (servicesContainer && data.services) {
      servicesContainer.innerHTML = data.services.map(s => `
        <article class="service-simple service-detailed">
          <img class="service-card-image" src="${s.image || 'images/hero1.png'}" alt="${s.title}" onerror="this.src='images/hero1.png'">
          <div class="service-card-body">
            <span class="service-kicker">${s.icon}</span>
            <h3>${s.title}</h3>
            <p>${s.description}</p>
          </div>
        </article>
      `).join('');
    }

    // Render News (Media Page)
    const newsContainer = document.getElementById('newsList');
    if (newsContainer && data.media) {
      newsContainer.innerHTML = data.media.news.map(n => `
        <div class="news-card">
          <img class="news-image" src="${n.image}" alt="${n.title}">
          <div class="news-date">${n.date}</div>
          <div class="news-body">
            <h3>${n.title}</h3>
            <p>${n.desc}</p>
            <a class="read-more" href="${n.link}">READ MORE</a>
          </div>
        </div>
      `).join('');
    }

    // Render Videos (Media Page)
    const videoContainer = document.getElementById('videoList');
    if (videoContainer && data.media) {
      videoContainer.innerHTML = data.media.videos.map(v => `
        <div onclick="openVideoLightbox('${v.url}')" class="media-video-card-link" style="cursor:pointer;">
          <article class="media-video-card">
            <div class="media-video-body">
              <h4>${v.title}</h4>
              <p>${v.desc}</p>
            </div>
            <div class="media-video-thumb" style="background-image: url('${v.image || 'images/hero1.png'}'); background-size: cover; background-position: center; position: relative;">
              <div style="position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polygon points="10 8 16 12 10 16 10 8"></polygon></svg>
              </div>
              <span style="position: absolute; bottom: 15px; right: 20px; font-size: 11px; color: #fff; opacity: 0.8; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">Video 0${v.id}</span>
            </div>
          </article>
        </div>
      `).join('');
    }

    // Lightbox Handlers
    window.openVideoLightbox = (url) => {
      const lightbox = document.getElementById('videoLightbox');
      const content = document.getElementById('lightboxContent');
      if (!lightbox || !content) return;

      let html = '';
      if (url.includes('youtube.com') || url.includes('youtu.be')) {
        let videoId = '';
        if (url.includes('v=')) videoId = url.split('v=')[1].split('&')[0];
        else if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1].split('?')[0];
        
        html = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      } else {
        // Assume local file
        html = `<video width="100%" height="100%" controls autoplay style="background:#000;">
                  <source src="${url}" type="video/mp4">
                  Your browser does not support the video tag.
                </video>`;
      }

      content.innerHTML = html;
      lightbox.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    };

    window.closeVideoLightbox = () => {
      const lightbox = document.getElementById('videoLightbox');
      const content = document.getElementById('lightboxContent');
      if (lightbox) {
        lightbox.style.display = 'none';
        content.innerHTML = ''; // Stop video playback
        document.body.style.overflow = 'auto';
      }
    };
  }

  renderSiteContent();

  // 1. NAVIGATION DROPDOWNS (Desktop & Mobile)
  function initNavigationDropdowns() {
    const desktopNav = document.querySelector('.nav-links');
    const mobileNav = document.querySelector('.drawer-nav');

    const dropdownData = [
      {
        id: 'contact',
        label: 'Contact us',
        targetHref: 'contact.html', // Replace Contact us
        insertBefore: false,
        items: [
          { label: 'Careers Management Services', href: 'careers-management-services.html' },
          { label: 'Vendor Registration', href: 'vendor-registration.html' },
          { label: 'Business Enquiry', href: 'business-enquiry.html' }
        ]
      }
    ];

    function createDropdownElement(data, isMobile, isActive) {
      const wrapper = document.createElement('div');
      wrapper.className = 'nav-item-dropdown';
      if (isActive) wrapper.classList.add('active');

      const trigger = document.createElement('a');
      trigger.className = 'nav-dropdown-trigger';
      if (isActive) trigger.classList.add('active');
      trigger.href = '#';
      trigger.textContent = data.label;

      const submenu = document.createElement('div');
      submenu.className = 'nav-submenu';
      submenu.innerHTML = data.items.map(item => `<a href="${item.href}">${item.label}</a>`).join('');

      wrapper.appendChild(trigger);
      wrapper.appendChild(submenu);

      // Toggle behavior
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        // Close other dropdowns in the same nav
        const parent = wrapper.parentElement;
        parent.querySelectorAll('.nav-item-dropdown').forEach(other => {
          if (other !== wrapper) other.classList.remove('open');
        });
        
        wrapper.classList.toggle('open');
      });

      // Global click to close desktop dropdowns
      if (!isMobile) {
        document.addEventListener('click', (e) => {
          if (!wrapper.contains(e.target)) {
            wrapper.classList.remove('open');
          }
        });
      }

      return wrapper;
    }

    dropdownData.forEach(data => {
      // Desktop
      if (desktopNav) {
        const target = desktopNav.querySelector(`a[href="${data.targetHref}"]`);
        if (target) {
          const isActive = target.classList.contains('active');
          const dropdown = createDropdownElement(data, false, isActive);
          if (data.insertBefore) {
            desktopNav.insertBefore(dropdown, target);
          } else {
            target.replaceWith(dropdown);
          }
        }
      }

      // Mobile
      if (mobileNav) {
        const target = mobileNav.querySelector(`a[href="${data.targetHref}"]`);
        if (target) {
          const isActive = target.classList.contains('active');
          const dropdown = createDropdownElement(data, true, isActive);
          if (data.insertBefore) {
            mobileNav.insertBefore(dropdown, target);
          } else {
            target.replaceWith(dropdown);
          }
        }
      }
    });
  }

  initNavigationDropdowns();

  // 1. MOBILE DRAWER
  const hamburger = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileDrawer');
  const overlay = document.getElementById('mobileOverlay');
  const closeBtn = document.getElementById('drawerClose');

  function openDrawer() {
    drawer.classList.add('open');
    overlay.classList.add('open');
  }
  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
  }

  if (hamburger) hamburger.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // 2. HERO SLIDER LOGIC
  function initHeroSlider() {
    const slides = document.querySelectorAll('#heroSlides .slide');
    const prevBtn = document.getElementById('heroPrev');
    const nextBtn = document.getElementById('heroNext');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      if (slides[index]) slides[index].classList.add('active');
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    function prevSlide() {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    }

    if (slides.length > 0) {
      // Remove old listeners if re-initializing
      const newNext = nextBtn.cloneNode(true);
      const newPrev = prevBtn.cloneNode(true);
      nextBtn.replaceWith(newNext);
      prevBtn.replaceWith(newPrev);

      newNext.addEventListener('click', () => { nextSlide(); resetInterval(); });
      newPrev.addEventListener('click', () => { prevSlide(); resetInterval(); });

      function startInterval() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
      }
      function resetInterval() {
        startInterval();
      }
      startInterval();
    }
  }

  initHeroSlider();

  // 3. INFINITE HORIZONTAL SCROLLING FOR CSR (The "Scrolling Element")
  const track = document.querySelector('.scrolling-track');
  if (track) {
    // Clone children to ensure smooth infinite loop
    const children = Array.from(track.children);
    children.forEach(child => {
      const clone = child.cloneNode(true);
      track.appendChild(clone);
    });

    let currentScroll = 0;
    let speed = 1.2; // pixels per frame

    function scrollLoop() {
      currentScroll += speed;
      // If we've scrolled past half the total width (due to duplication), reset
      if (currentScroll >= track.scrollWidth / 2) {
        currentScroll = 0;
      }
      track.style.transform = `translateX(-${currentScroll}px)`;
      requestAnimationFrame(scrollLoop);
    }
    requestAnimationFrame(scrollLoop);
    
    // Pause on hover
    track.addEventListener('mouseenter', () => speed = 0);
    track.addEventListener('mouseleave', () => speed = 1.2);
  }

  // 4. RUNNING SERVICES TICKER (under header)
  const serviceTrack = document.querySelector('.services-track');
  if (serviceTrack) {
    // On wide screens use auto-scroll; on small screens enable native swipe
    const isWide = window.innerWidth > 900;
    if (isWide) {
      // duplicate children to create seamless loop
      const svcChildren = Array.from(serviceTrack.children);
      svcChildren.forEach(child => {
        const c = child.cloneNode(true);
        serviceTrack.appendChild(c);
      });

      let svcScroll = 0;
      let svcSpeed = 0.8; // pixels per frame

      function svcLoop() {
        svcScroll += svcSpeed;
        if (svcScroll >= serviceTrack.scrollWidth / 2) svcScroll = 0;
        serviceTrack.style.transform = `translateX(-${svcScroll}px)`;
        requestAnimationFrame(svcLoop);
      }
      requestAnimationFrame(svcLoop);

      serviceTrack.addEventListener('mouseenter', () => svcSpeed = 0);
      serviceTrack.addEventListener('mouseleave', () => svcSpeed = 0.8);
    } else {
      // mobile: enable native horizontal scrolling / swipe
      serviceTrack.style.overflowX = 'auto';
      serviceTrack.style.webkitOverflowScrolling = 'touch';
      serviceTrack.style.scrollSnapType = 'x mandatory';
      const items = serviceTrack.querySelectorAll('.service-item');
      items.forEach(it => it.style.scrollSnapAlign = 'start');
    }
  }

  // 5. AWARDS PAGE TAB FILTER
  const awardsTabs = document.querySelectorAll('[data-awards-tab]');
  const awardsPanels = document.querySelectorAll('[data-awards-panel]');

  if (awardsTabs.length && awardsPanels.length) {
    function showAwardsPanel(panelId) {
      awardsTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.awardsTab === panelId);
      });

      awardsPanels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.awardsPanel === panelId);
      });
    }

    const initialPanel = window.location.hash
      ? window.location.hash.replace('#', '')
      : 'awards';

    showAwardsPanel(initialPanel);

    awardsTabs.forEach(tab => {
      tab.addEventListener('click', event => {
        event.preventDefault();
        const panelId = tab.dataset.awardsTab;
        showAwardsPanel(panelId);
        window.history.replaceState(null, '', `#${panelId}`);
      });
    });
  }

  // 6. MEDIA CENTER TAB FILTER
  const mediaTabs = document.querySelectorAll('[data-media-tab]');
  const mediaPanels = document.querySelectorAll('[data-media-panel]');

  if (mediaTabs.length && mediaPanels.length) {
    function showMediaPanel(panelId) {
      mediaTabs.forEach(tab => {
        tab.classList.toggle('active', tab.dataset.mediaTab === panelId);
      });

      mediaPanels.forEach(panel => {
        panel.classList.toggle('active', panel.dataset.mediaPanel === panelId);
      });
    }

    const initialMediaPanel = window.location.hash
      ? window.location.hash.replace('#', '')
      : 'news-events';

    showMediaPanel(initialMediaPanel);

    mediaTabs.forEach(tab => {
      tab.addEventListener('click', event => {
        event.preventDefault();
        const panelId = tab.dataset.mediaTab;
        showMediaPanel(panelId);
        window.history.replaceState(null, '', `#${panelId}`);
      });
    });
  }

  // 7. CAREERS PAGE DYNAMIC JOBS
  const jobList = document.getElementById('jobList');
  const searchInput = document.getElementById('jobSearchInput');
  const locationInput = document.getElementById('jobLocationInput');

  if (jobList) {
    const defaultJobs = [
      { id: 1, title: 'Lead HVAC Engineer', location: 'Dubai', type: 'Full-time', date: 'Apr 2026' },
      { id: 2, title: 'Facilities Manager', location: 'Abu Dhabi', type: 'Full-time', date: 'Apr 2026' },
      { id: 3, title: 'Senior MEP Project Manager', location: 'Sharjah', type: 'Full-time', date: 'Apr 2026' },
      { id: 4, title: 'Electrical Technician', location: 'Dubai', type: 'Full-time', date: 'Mar 2026' }
    ];

    function getJobs() {
      const storedJobs = localStorage.getItem('adeeb_jobs');
      return storedJobs ? JSON.parse(storedJobs) : defaultJobs;
    }

    function renderJobs(filteredJobs) {
      const jobs = filteredJobs || getJobs();
      jobList.innerHTML = '';
      
      if (jobs.length === 0) {
        jobList.innerHTML = '<p class="text-center" style="grid-column: 1/-1; padding: 40px; color: var(--text-light);">No matching vacancies found.</p>';
        return;
      }

      jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
          <div class="job-card-header">
            <h3>${job.title}</h3>
          </div>
          <div class="job-meta">
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> ${job.location}</span>
            <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg> ${job.type}</span>
          </div>
          <p class="job-date">Date Posted: ${job.date}</p>
          <button onclick="openApplyModal('${job.title}')" class="btn btn-primary btn-full apply-btn">Apply Now</button>
        `;
        jobList.appendChild(card);
      });
    }

    // Modal Global Handlers
    window.openApplyModal = (jobTitle) => {
      const modal = document.getElementById('applyModal');
      const posName = document.getElementById('applyPositionName');
      const form = document.getElementById('applyForm');
      const success = document.getElementById('applySuccess');
      
      if (modal && posName) {
        posName.innerText = jobTitle;
        form.style.display = 'block';
        success.style.display = 'none';
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden'; // prevent scroll
      }
    };

    window.closeApplyModal = () => {
      const modal = document.getElementById('applyModal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    };

    const applyForm = document.getElementById('applyForm');
    if (applyForm) {
      applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate submission
        applyForm.style.display = 'none';
        document.getElementById('applySuccess').style.display = 'block';
      });
    }

    function filterJobs() {
      const titleQuery = searchInput.value.toLowerCase();
      const locationQuery = locationInput.value.toLowerCase();
      const allJobs = getJobs();

      const filtered = allJobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(titleQuery);
        const matchesLocation = job.location.toLowerCase().includes(locationQuery);
        return matchesTitle && matchesLocation;
      });

      renderJobs(filtered);
    }

    if (searchInput) searchInput.addEventListener('input', filterJobs);
    if (locationInput) locationInput.addEventListener('input', filterJobs);

    renderJobs();
  }

});
