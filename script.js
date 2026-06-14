const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach(item => observer.observe(item));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', event => {
    const id = anchor.getAttribute('href');
    const target = document.querySelector(id);

    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

async function applyLanguage(language) {
  try {
    const response = await fetch(`i18n/${language}.json`);
    const dictionary = await response.json();

    document.documentElement.lang = language;

    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;

      if (dictionary[key]) {
        element.textContent = dictionary[key];
      }
    });

    localStorage.setItem('ipsos-language', language);
  } catch (error) {
    console.warn('Language file not found:', language);
  }
}

const languageSelect = document.getElementById('languageSelect');
const savedLanguage = localStorage.getItem('ipsos-language') || 'en';

if (languageSelect) {
  languageSelect.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSelect.addEventListener('change', event => {
    applyLanguage(event.target.value);
  });
}
