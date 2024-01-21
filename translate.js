function getCurrentLanguage() {
    return localStorage.getItem('selectedLanguage') || 'en';
  }
  
  const i18nObj = {
    'ru': {
      'header': 'Персонажи Рика и Морти',
      'main-tag': 'Рикипедия',
      'load-more-btn': 'Загрузить еще',
      'footer': '\u00A9 2024 Алексей Савельев | <a href="https://github.com/GeTRenTeD" target="_blank">GitHub</a>',
      'github-link': 'GitHub',
      'allOption' : 'Все',
      'maleOption' : 'Мужчины',
      'femaleOption' : 'Женщины',
      'unknownOption' : 'Неизвестно',
      'genderlessOption' : 'Бесполые',
      'search-input': 'Поиск персонажей...'
    },
    'en': {
      'header': 'Rick and Morty Characters',
      'main-tag': 'Rickipedia',
      'load-more-btn': 'Load more',
      'footer': '\u00A9 2024 Aleksey Savelev | <a href="https://github.com/GeTRenTeD" target="_blank">GitHub</a>',
      'github-link': 'GitHub',
      'allOption' : 'All',
      'maleOption' : 'Male',
      'femaleOption' : 'Female',
      'unknownOption' : 'Unknown',
      'genderlessOption' : 'Genderless',
      'search-input': 'Search characters...'
    }
  };
  
  function getTranslate(lang) {
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.dataset.i18n;
      if (element.tagName === 'INPUT' && element.placeholder) {
        element.placeholder = i18nObj[lang][key] || '';
      } else if (i18nObj[lang] && i18nObj[lang][key]) {
        element.innerHTML = i18nObj[lang][key];
      }
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    const currentLanguage = getCurrentLanguage();
    getTranslate(currentLanguage);
  
    // Отображаем текущий выбранный язык в панели смены языка
    document.getElementById('langSelect').value = currentLanguage;
  });
  