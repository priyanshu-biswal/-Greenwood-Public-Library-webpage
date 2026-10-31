// Catalog Data for Search Modal
const sampleBooks = [
  { title: "To Kill a Mockingbird", author: "Harper Lee", category: "Fiction", shelf: "A-12" },
  { title: "Principles of Quantum Mechanics", author: "R. Shankar", category: "Sciences", shelf: "S-04" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", category: "Fiction", shelf: "A-08" },
  { title: "A Brief History of Time", author: "Stephen Hawking", category: "Sciences", shelf: "S-10" },
  { title: "Where the Wild Things Are", author: "Maurice Sendak", category: "Children", shelf: "C-02" },
  { title: "Regional Map Collection (1890-1920)", author: "Greenwood Archives", category: "History", shelf: "Vault B" }
];

// Modal Operations
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('hidden');
    if (id === 'search-modal') {
      setTimeout(() => document.getElementById('modal-search-input')?.focus(), 100);
    }
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('hidden');
  }
}

function showToast(message) {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3500);
  }
}

function openEventModal(title, date, location) {
  const modalTitle = document.getElementById('event-modal-title');
  const modalMeta = document.getElementById('event-modal-meta');
  if (modalTitle && modalMeta) {
    modalTitle.textContent = title;
    modalMeta.textContent = `${date} • ${location}`;
  }
  openModal('event-modal');
}

// DOM Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Search Modal Trigger
  const searchBtn = document.getElementById('search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', () => openModal('search-modal'));
  }

  // Catalog Search Functionality
  const searchInput = document.getElementById('modal-search-input');
  const resultsContainer = document.getElementById('search-results-list');

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      resultsContainer.innerHTML = '';

      if (!query) {
        resultsContainer.innerHTML = '<p class="text-xs text-slate-400 italic py-4 text-center">Type to search Greenwood catalog...</p>';
        return;
      }

      const filtered = sampleBooks.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.author.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
      );

      if (filtered.length === 0) {
        resultsContainer.innerHTML = '<p class="text-xs text-slate-400 py-4 text-center">No matching volumes found in library database.</p>';
        return;
      }

      filtered.forEach(book => {
        const item = document.createElement('div');
        item.className = 'p-3 hover:bg-slate-50 rounded-lg flex justify-between items-center transition-colors cursor-pointer border border-slate-100';
        item.innerHTML = `
          <div>
            <div class="text-xs font-semibold text-slate-800">${book.title}</div>
            <div class="text-[11px] text-slate-500">${book.author} • ${book.category}</div>
          </div>
          <span class="text-[10px] font-mono bg-slate-100 text-slate-600 px-2 py-1 rounded">Shelf ${book.shelf}</span>
        `;
        resultsContainer.appendChild(item);
      });
    });
  }

  // Section Filtering Pills
  const filterButtons = document.querySelectorAll('#section-filters .filter-btn');
  const sectionCards = document.querySelectorAll('#sections-grid .section-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => {
        b.classList.remove('bg-brand-900', 'text-white');
        b.classList.add('bg-slate-200/70', 'text-slate-700');
      });
      btn.classList.remove('bg-slate-200/70', 'text-slate-700');
      btn.classList.add('bg-brand-900', 'text-white');

      const filter = btn.getAttribute('data-filter');

      sectionCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Forms Event Handling
  const joinForm = document.getElementById('join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('join-modal');
      showToast('Card application submitted! Please bring photo ID on your first visit.');
      joinForm.reset();
    });
  }

  const eventForm = document.getElementById('event-form');
  if (eventForm) {
    eventForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('event-modal');
      showToast('Seat reserved successfully! Confirmation sent to your email.');
      eventForm.reset();
    });
  }

  const bulletinForm = document.getElementById('bulletin-form');
  if (bulletinForm) {
    bulletinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for subscribing to the Patron Bulletin.');
      bulletinForm.reset();
    });
  }
});