// admin.js - Unified Site Manager Logic

document.addEventListener('DOMContentLoaded', () => {
  let currentData = getSiteData();
  
  // 1. TAB SWITCHING
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.tab-panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      navItems.forEach(n => n.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      
      item.classList.add('active');
      document.getElementById(item.dataset.tab).classList.add('active');
    });
  });

  // 2. RENDERERS
  function renderAll() {
    renderHeroManager();
    renderStatsManager();
    renderCareersManager();
    renderFooterManager();
    renderServicesManager();
    renderNewsManager();
  }

  // --- Services Section ---
  function renderServicesManager() {
    const container = document.getElementById('services-tab');
    if (!container) return;
    const list = currentData.services || [];
    container.querySelector('.glass-card').innerHTML = `
      <h3>Main Services</h3>
      <div id="serviceListAdmin">
        ${list.map((s, i) => `
          <div class="list-item">
            <div style="flex:1;">
              <strong>${s.title}</strong>
              <p class="muted" style="font-size:12px;">${s.description}</p>
            </div>
            <div class="actions">
              <button class="btn btn-outline btn-sm" onclick="editService(${i})">Edit</button>
              <button class="btn btn-outline btn-sm btn-delete" onclick="deleteService(${i})">Delete</button>
            </div>
          </div>
        `).join('')}
      </div>
      <button class="btn btn-outline btn-sm" style="margin-top:20px;" onclick="addService()">+ Add Service</button>
    `;
  }

  // --- Media/News Section ---
  function renderNewsManager() {
    const newsCont = document.getElementById('newsListAdmin');
    const videoCont = document.getElementById('videoListAdmin');
    if (!newsCont || !videoCont) return;

    const news = currentData.media.news || [];
    newsCont.innerHTML = news.map((n, i) => `
      <div class="list-item">
        <div style="flex:1;">
          <strong>${n.title}</strong>
          <p class="muted" style="font-size:12px;">${n.date} | ${n.desc}</p>
        </div>
        <button class="btn btn-outline btn-sm btn-delete" onclick="deleteNews(${i})">Delete</button>
      </div>
    `).join('');

    const videos = currentData.media.videos || [];
    videoCont.innerHTML = videos.map((v, i) => `
      <div class="list-item">
        <div style="flex:1;">
          <strong>${v.title}</strong>
          <p class="muted" style="font-size:12px;">${v.url}</p>
        </div>
        <div class="actions">
          <button class="btn btn-outline btn-sm" onclick="editVideo(${i})">Edit</button>
          <button class="btn btn-outline btn-sm btn-delete" onclick="deleteVideo(${i})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- Video Modal Actions ---
  const videoModal = document.getElementById('videoModal');
  window.addVideo = () => {
    document.getElementById('vModalTitle').innerText = 'Add Video Link';
    document.getElementById('vEditIndex').value = '';
    document.getElementById('vTitle').value = '';
    document.getElementById('vDesc').value = '';
    document.getElementById('vImage').value = '';
    document.getElementById('vUrl').value = '';
    document.getElementById('vFile').value = ''; 
    videoModal.style.display = 'flex';
  };

  window.editVideo = (index) => {
    const video = currentData.media.videos[index];
    document.getElementById('vModalTitle').innerText = 'Edit Video';
    document.getElementById('vEditIndex').value = index;
    document.getElementById('vTitle').value = video.title;
    document.getElementById('vDesc').value = video.desc;
    document.getElementById('vImage').value = video.image || '';
    document.getElementById('vUrl').value = video.url;
    document.getElementById('vFile').value = ''; 
    videoModal.style.display = 'flex';
  };

  window.closeVideoModal = () => {
    videoModal.style.display = 'none';
  };

  window.confirmVideoSave = () => {
    const index = document.getElementById('vEditIndex').value;
    const fileInput = document.getElementById('vFile');
    let videoUrl = document.getElementById('vUrl').value;

    if (fileInput.files && fileInput.files[0]) {
      videoUrl = 'videos/' + fileInput.files[0].name;
    }

    const vData = {
      id: index === '' ? Date.now() : currentData.media.videos[index].id,
      title: document.getElementById('vTitle').value,
      desc: document.getElementById('vDesc').value,
      image: document.getElementById('vImage').value,
      url: videoUrl
    };

    if (index === '') {
      currentData.media.videos.push(vData);
    } else {
      currentData.media.videos[index] = vData;
    }

    renderNewsManager();
    closeVideoModal();
  };

  window.deleteVideo = (index) => {
    if (confirm('Delete this video?')) {
      currentData.media.videos.splice(index, 1);
      renderNewsManager();
    }
  };

  // --- Hero Section ---
  function renderHeroManager() {
    const container = document.getElementById('heroList');
    if (!container) return;
    container.innerHTML = currentData.hero.slides.map((slide, index) => `
      <div class="list-item glass-card" style="margin-bottom: 10px; padding: 15px;">
        <div style="flex: 1;">
          <small class="muted">Slide ${index + 1}</small>
          <div style="font-weight:700;">${slide.title.replace('<br>', ' ')}</div>
        </div>
        <div class="actions">
          <button class="btn btn-outline btn-sm" onclick="editHero(${index})">Edit</button>
          <button class="btn btn-outline btn-sm btn-delete" onclick="deleteHero(${index})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- Stats Section ---
  function renderStatsManager() {
    const container = document.getElementById('statsListAdmin');
    if (!container) return;
    container.innerHTML = currentData.stats.map((stat, index) => `
      <div class="form-group">
        <label>Stat ${index + 1} Number</label>
        <input type="text" value="${stat.number}" onchange="updateStat(${index}, 'number', this.value)">
      </div>
      <div class="form-group">
        <label>Stat ${index + 1} Label</label>
        <input type="text" value="${stat.label.replace('<br>', ' ')}" onchange="updateStat(${index}, 'label', this.value)">
      </div>
    `).join('');
  }

  // --- Careers Section ---
  function renderCareersManager() {
    const container = document.getElementById('adminJobList');
    if (!container) return;
    const jobs = getJobs(); // Fallback to current careers logic or integrate
    container.innerHTML = jobs.map(job => `
      <div class="list-item">
        <div>
          <div style="font-weight:700;">${job.title}</div>
          <small class="muted">${job.location} | ${job.type}</small>
        </div>
        <div class="actions">
          <button class="btn btn-outline btn-sm" onclick="deleteJob(${job.id})">Delete</button>
        </div>
      </div>
    `).join('');
  }

  // --- Footer/Global Section ---
  function renderFooterManager() {
    document.getElementById('footerAbout').value = currentData.footer.aboutText;
    document.getElementById('footerHours').value = currentData.footer.openingHours.replace('<br>', ' ');
    document.getElementById('topPhone').value = currentData.topBar.phone;
    document.getElementById('topEmail').value = currentData.topBar.email;
  }

  // --- Hero Modal Actions ---
  const heroModal = document.getElementById('heroModal');
  window.addHeroSlide = () => {
    document.getElementById('modalTitle').innerText = 'Add New Slide';
    document.getElementById('editIndex').value = '';
    document.getElementById('hSubtitle').value = '';
    document.getElementById('hTitle').value = '';
    document.getElementById('hImage').value = 'images/hero1.png';
    document.getElementById('hBtnText').value = 'Discover More';
    document.getElementById('hBtnLink').value = 'about.html';
    heroModal.style.display = 'flex';
  };

  window.editHero = (index) => {
    const slide = currentData.hero.slides[index];
    document.getElementById('modalTitle').innerText = 'Edit Slide';
    document.getElementById('editIndex').value = index;
    document.getElementById('hSubtitle').value = slide.subtitle;
    document.getElementById('hTitle').value = slide.title;
    document.getElementById('hImage').value = slide.image;
    document.getElementById('hBtnText').value = slide.buttonText;
    document.getElementById('hBtnLink').value = slide.buttonLink;
    heroModal.style.display = 'flex';
  };

  window.closeHeroModal = () => {
    heroModal.style.display = 'none';
  };

  window.confirmHeroSave = () => {
    const index = document.getElementById('editIndex').value;
    const slideData = {
      subtitle: document.getElementById('hSubtitle').value,
      title: document.getElementById('hTitle').value,
      image: document.getElementById('hImage').value,
      buttonText: document.getElementById('hBtnText').value,
      buttonLink: document.getElementById('hBtnLink').value
    };

    if (index === '') {
      currentData.hero.slides.push(slideData);
    } else {
      currentData.hero.slides[index] = slideData;
    }

    renderHeroManager();
    closeHeroModal();
  };

  window.saveGlobalData = () => {
    // Collect footer & global data
    currentData.footer.aboutText = document.getElementById('footerAbout').value;
    currentData.footer.openingHours = document.getElementById('footerHours').value;
    currentData.topBar.phone = document.getElementById('topPhone').value;
    currentData.topBar.email = document.getElementById('topEmail').value;

    localStorage.setItem('adeeb_site_data', JSON.stringify(currentData));
    localStorage.setItem('adeeb_data_version', '2.2'); // Keep in sync with site-content.js
    showToast();
  };

  window.deleteNews = (i) => {
    currentData.media.news.splice(i, 1);
    renderNewsManager();
  };

  window.addNews = () => {
    const title = prompt('News Title:');
    if (title) {
      currentData.media.news.unshift({ id: Date.now(), title, date: 'Today', desc: 'Enter description...', image: 'images/avatar1.svg', link: '#' });
      renderNewsManager();
    }
  };

  window.deleteService = (i) => {
    if (confirm('Delete this service?')) {
      currentData.services.splice(i, 1);
      renderServicesManager();
    }
  };

  const serviceModal = document.getElementById('serviceModal');
  window.addService = () => {
    document.getElementById('sModalTitle').innerText = 'Add New Service';
    document.getElementById('sEditIndex').value = '';
    document.getElementById('sTitle').value = '';
    document.getElementById('sDesc').value = '';
    document.getElementById('sImage').value = 'images/hero1.png';
    serviceModal.style.display = 'flex';
  };

  window.editService = (index) => {
    const service = currentData.services[index];
    document.getElementById('sModalTitle').innerText = 'Edit Service';
    document.getElementById('sEditIndex').value = index;
    document.getElementById('sTitle').value = service.title;
    document.getElementById('sDesc').value = service.description;
    document.getElementById('sImage').value = service.image || '';
    serviceModal.style.display = 'flex';
  };

  window.closeServiceModal = () => {
    serviceModal.style.display = 'none';
  };

  window.confirmServiceSave = () => {
    const index = document.getElementById('sEditIndex').value;
    const sData = {
      id: index === '' ? Date.now() : currentData.services[index].id,
      title: document.getElementById('sTitle').value,
      description: document.getElementById('sDesc').value,
      image: document.getElementById('sImage').value,
      icon: index === '' ? '00' : currentData.services[index].icon
    };

    if (index === '') {
      currentData.services.push(sData);
    } else {
      currentData.services[index] = sData;
    }

    renderServicesManager();
    closeServiceModal();
  };

  window.updateStat = (index, field, value) => {
    currentData.stats[index][field] = value;
  };

  function showToast() {
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // Initialize
  renderAll();
});

// Helper for careers (keeping it separate for now or integrating)
function getJobs() {
  const stored = localStorage.getItem('adeeb_jobs');
  const defaultJobs = [
    { id: 1, title: 'Lead HVAC Engineer', location: 'Dubai', type: 'Full-time', date: 'Apr 2026' },
    { id: 2, title: 'Facilities Manager', location: 'Abu Dhabi', type: 'Full-time', date: 'Apr 2026' }
  ];
  return stored ? JSON.parse(stored) : defaultJobs;
}
window.deleteJob = (id) => {
  const jobs = getJobs().filter(j => j.id !== id);
  localStorage.setItem('adeeb_jobs', JSON.stringify(jobs));
  location.reload(); // Simple refresh for now
};
