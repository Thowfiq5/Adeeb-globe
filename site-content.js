// site-content.js - Central Data Store for Adeeb Group Website

const siteData = {
  hero: {
    slides: [
      {
        id: 1,
        subtitle: 'Company Profile / Brochure',
        title: '28+ Years of Expertise<br>in United Arab Emirates',
        image: 'images/hero1.png',
        buttonText: 'Discover More',
        buttonLink: 'about.html'
      },
      {
        id: 2,
        subtitle: 'Our Impact',
        title: '10000+ Satisfied<br>Clients and Customers',
        image: 'images/hero2.png',
        buttonText: 'Our Services',
        buttonLink: 'services.html'
      },
      {
        id: 3,
        subtitle: 'Global Workforce',
        title: '3000+ Employees Across<br>20 Nationalities',
        image: 'images/hero3.png',
        buttonText: 'Join Us',
        buttonLink: 'contact.html'
      }
    ]
  },
  stats: [
    { id: 1, number: '28+', label: 'Years of Expertise in<br>United Arab Emirates', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>' },
    { id: 2, number: '10000+', label: 'Satisfied clients and<br>customers', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>' },
    { id: 3, number: '3000+', label: 'Employees across<br>20 nationalities', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>' },
    { id: 4, number: '10000+', label: 'sq. meter', icon: '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#fff" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>' }
  ],
  testimonials: [
    {
      id: 1,
      text: '“Adeeb Group delivered exceptional facility management services — professionalism and responsiveness were outstanding.”',
      author: 'John Doe',
      position: 'Facilities Manager, ACME Corp',
      avatar: 'images/avatar1.svg'
    },
    {
      id: 2,
      text: '“Their MEP team exceeded expectations and completed the project ahead of schedule.”',
      author: 'Sarah Lee',
      position: 'Operations Head, Green Towers',
      avatar: 'images/avatar2.svg'
    },
    {
      id: 3,
      text: '“Reliable, safety-first approach and excellent post-delivery support — highly recommended.”',
      author: 'Mohamed Khan',
      position: 'Property Director, Gulf Estates',
      avatar: 'images/avatar3.svg'
    }
  ],
  footer: {
    aboutText: 'A leading IMS-certified Organization providing Facilities Management and MEP Contracting Services across the UAE.',
    locations: [
      'Abu Dhabi (Corporate Office)',
      'Dubai (Branch Office)',
      'Sharjah (Branch Office)',
      'Al Ain (Branch Office)'
    ],
    openingHours: 'Monday to Friday: 8:00 AM to 5:30 PM<br>Saturday: 8:00 AM to 2:00 PM<br>Sunday: Closed'
  },
  topBar: {
    phone: '800 ADEEB (23332)',
    email: 'post@adeebgroup.com'
  },
  services: [
    { id: 1, title: 'Facilities Management Services', description: 'Integrated hard and soft FM solutions that improve building performance, reliability and user experience.', icon: '01', image: 'images/service-fm.jpg' },
    { id: 2, title: 'MEP Contracting', description: 'Specialized mechanical, electrical and plumbing services delivered with strong technical planning and control.', icon: '02', image: 'images/service-mep.jpg' },
    { id: 3, title: 'ELV Systems', description: 'Low-voltage system solutions supporting safety, connectivity, monitoring and operational efficiency.', icon: '03', image: 'images/hero1.png' },
    { id: 4, title: 'Specialized System', description: 'Customized technical systems designed to address unique operational, building and infrastructure requirements.', icon: '04', image: 'images/hero2.png' },
    { id: 5, title: 'Fit Out Services', description: 'Functional and high-quality fit out solutions tailored to commercial, institutional and workplace environments.', icon: '05', image: 'images/hero3.png' },
    { id: 6, title: 'Soft Services', description: 'Support services that enhance cleanliness, comfort, presentation and day-to-day operational standards.', icon: '06', image: 'images/values-vision-mission.png' },
    { id: 7, title: 'ICT Solution', description: 'Technology-enabled solutions that improve communication, systems integration and service responsiveness.', icon: '07', image: 'images/FM Consultancy of the Year.png' }
  ],
  media: {
    news: [
      { id: 1, title: 'Adeeb Group Participates in Abu Dhabi University Career Fair 2025', date: '27 May 2025', desc: 'Adeeb Group Participates in Abu Dhabi University Career Fair 2025...', image: 'images/career-fair-2025.png', link: 'career-fair-2025.html' },
      { id: 2, title: 'GPSSA 2025', date: '03 May 2025', desc: 'Special recognition and awards obtained during the GPSSA 2025 gathering...', image: 'images/avatar1.svg', link: 'gpssa-2025.html' },
      { id: 3, title: 'Einstein World Record 2025', date: '16 Apr 2025', desc: 'Adeeb Group breaks the operational standards in regional FM capabilities...', image: 'images/avatar2.svg', link: 'einstein-world-record-2025.html' }
    ],
    videos: [
      { id: 1, title: 'Corporate Overview', desc: 'A short visual introduction to Adeeb Group\'s services, teams and operational strength.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'images/hero1.png' },
      { id: 2, title: 'CSR Highlights', desc: 'A collection of community engagement and environmental responsibility initiatives.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'images/hero2.png' },
      { id: 3, title: 'Training & Development', desc: 'Highlights from internal learning, safety awareness and capability-building programs.', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', image: 'images/hero3.png' }
    ]
  }
};

// Function to get active data (from localStorage if exists)
const DATA_VERSION = '2.2';
function getSiteData() {
  const storedVersion = localStorage.getItem('adeeb_data_version');
  const storedData = localStorage.getItem('adeeb_site_data');
  // If version mismatch or no cache, clear and use fresh data
  if (!storedData || storedVersion !== DATA_VERSION) {
    localStorage.removeItem('adeeb_site_data');
    localStorage.setItem('adeeb_data_version', DATA_VERSION);
    return siteData;
  }
  // Merge: ensure image fields from siteData are always applied
  const parsed = JSON.parse(storedData);
  if (parsed.services) {
    parsed.services = parsed.services.map((s, i) => ({
      ...s,
      image: s.image || (siteData.services[i] && siteData.services[i].image)
    }));
  }
  if (parsed.stats) {
    parsed.stats = parsed.stats.map((s, i) => ({
      ...s,
      icon: s.icon || (siteData.stats[i] && siteData.stats[i].icon)
    }));
  }
  return parsed;
}
