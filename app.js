document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const clearSearch = document.getElementById('clearSearch');
    const genderFilter = document.getElementById('genderFilter');
    const characterList = document.getElementById('characterList');
    const loadMoreBtn = document.getElementById('loadMoreBtn');
  
    let page = 1;
    let currentSearch = '';
    let currentGenderFilter = '';
  
    function fetchCharacters() {
      const apiUrl = `https://rickandmortyapi.com/api/character/?page=${page}&name=${currentSearch}&gender=${currentGenderFilter}`;
  
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          const characters = data.results;
          characters.forEach(character => {
            const card = document.createElement('div');
            card.classList.add('character-card');
            card.innerHTML = `<img src="${character.image}" alt="${character.name}">
                              <p>${character.name}</p>`;
            characterList.appendChild(card);
          });
        })
        .catch(error => console.error('Error fetching characters:', error));
    }

    function saveLanguageToLocalStorage(lang) {
      localStorage.setItem('selectedLanguage', lang);
    }
    
    function changeLanguage() {
      const langSelect = document.getElementById('langSelect');
      const selectedLang = langSelect.value;
      getTranslate(selectedLang);
      saveLanguageToLocalStorage(selectedLang);
      langSelect.value = selectedLang;
    }
// смена темы
    function toggleTheme() {
      const body = document.body;
      const themeContainers = document.querySelectorAll('.theme-container');
  
      body.classList.toggle('light-theme');
      body.classList.toggle('dark-theme');
  
      themeContainers.forEach(container => {
        container.classList.toggle('light-theme');
        container.classList.toggle('dark-theme');
        updateThemeToggleIcon(savedTheme);
      });
  
      // Сохранение текущей темы в localStorage
      const currentTheme = body.classList.contains('dark-theme') ? 'dark' : 'light';
      saveThemeToLocalStorage(currentTheme);
    }

    function saveThemeToLocalStorage(theme) {
      localStorage.setItem('selectedTheme', theme);
    }

    function updateThemeToggleIcon() {
      const themeToggleIcon = document.getElementById('themeToggleIcon');
      const currentTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  
      themeToggleIcon.src = currentTheme === 'dark' ? 'moon.svg' : 'sun.svg';
    }
  
  
    function clearCharacterList() {
      characterList.innerHTML = '';
    }
  
    function loadMoreCharacters() {
      page++;
      fetchCharacters();
    }
  
    function handleSearch() {
      clearCharacterList();
      currentSearch = searchInput.value.trim();
      page = 1;
      fetchCharacters();
    }
  
    function handleGenderFilter() {
      clearCharacterList();
      currentGenderFilter = genderFilter.value;
      page = 1;
      fetchCharacters();
    }
  
    function clearSearchInput() {
      searchInput.value = '';
      clearSearch.style.display = 'none';
      searchInput.focus();
    }
  
    // Event Listeners
    searchInput.addEventListener('input', function () {
      clearSearch.style.display = this.value.trim() !== '' ? 'block' : 'none';
    });
  
    clearSearch.addEventListener('click', function () {
        clearSearchInput();
        searchInput.focus();
      });
  
    searchInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        handleSearch();
      }
    });
  
    genderFilter.addEventListener('change', handleGenderFilter);
    
    loadMoreBtn.addEventListener('click', loadMoreCharacters);

    loadMoreBtn.addEventListener('mouseover', function () {
        this.style.backgroundColor = '#0056b3';
      });
    
    loadMoreBtn.addEventListener('mouseout', function () {
        this.style.backgroundColor = '#007bff';
      });

      document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);
      document.getElementById('langSelect').addEventListener('change', changeLanguage);

      const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    document.body.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
    const themeContainers = document.querySelectorAll('.theme-container');
    themeContainers.forEach(container => {
      container.classList.add(savedTheme === 'dark' ? 'dark-theme' : 'light-theme');
    });

    // Установка иконки в зависимости от сохраненной темы
    updateThemeToggleIcon(savedTheme);
  }
    // Initial fetch
    fetchCharacters();
  });
  