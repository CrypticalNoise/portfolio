const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const year = document.querySelector('#year');
const discordCopy = document.querySelector('.discord-copy');

if (discordCopy) {
  discordCopy.addEventListener('click', async () => {
    const username = discordCopy.dataset.discord;

    try {
      await navigator.clipboard.writeText(username);
      discordCopy.textContent = 'COPIED';

      setTimeout(() => {
        discordCopy.textContent = 'COPY';
      }, 1500);
    } catch {
      discordCopy.textContent = 'COPY FAILED';
    }
  });
}

year.textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Hide the header while scrolling down, reveal it while scrolling up.
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 120 && current > lastScroll && !mobileMenu.classList.contains('open')) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = current;
}, { passive: true });

// Project filtering.
const filters = document.querySelectorAll('.filter');
const projects = document.querySelectorAll('.project');

filters.forEach(filter => {
  filter.addEventListener('click', () => {
    filters.forEach(item => item.classList.remove('active'));
    filter.classList.add('active');

    const value = filter.dataset.filter;
    projects.forEach(project => {
      project.classList.toggle('hidden', value !== 'all' && project.dataset.category !== value);
    });
  });
});

// Project modal.
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const modalImg = modal.querySelector('.modal-image img');
const modalTitle = document.querySelector('#modal-title');
const modalType = document.querySelector('#modal-type');

document.querySelectorAll('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.project');
    const image = button.querySelector('img');

    modalImg.src = image.src;
    modalImg.alt = image.alt;
    modalTitle.textContent = card.dataset.title;
    modalType.textContent = card.dataset.type;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

// Subtle active navigation state.
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.desktop-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });

sections.forEach(section => observer.observe(section));
