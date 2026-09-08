// =========================
// GENERAL ELEMENTS
// =========================

const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const year = document.querySelector('#year');
const discordCopy = document.querySelector('.discord-copy');


// =========================
// YEAR
// =========================

if (year) {
  year.textContent = new Date().getFullYear();
}


// =========================
// DISCORD COPY
// =========================

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

      setTimeout(() => {
        discordCopy.textContent = 'COPY';
      }, 1500);

    }

  });

}


// =========================
// MOBILE MENU
// =========================

if (menuToggle && mobileMenu) {

  menuToggle.addEventListener('click', () => {

    const open = mobileMenu.classList.toggle('open');

    menuToggle.setAttribute(
      'aria-expanded',
      open
    );

  });


  mobileMenu.querySelectorAll('a').forEach(link => {

    link.addEventListener('click', () => {

      mobileMenu.classList.remove('open');

      menuToggle.setAttribute(
        'aria-expanded',
        'false'
      );

    });

  });

}


// =========================
// HEADER HIDE / SHOW
// =========================

if (header) {

  let lastScroll = 0;

  window.addEventListener(
    'scroll',
    () => {

      const current = window.scrollY;

      if (
        current > 120 &&
        current > lastScroll &&
        !mobileMenu?.classList.contains('open')
      ) {

        header.style.transform =
          'translateY(-100%)';

      } else {

        header.style.transform =
          'translateY(0)';

      }

      lastScroll = current;

    },
    { passive: true }
  );

}


// =========================
// PROJECT ELEMENTS
// =========================

const projectGrid =
  document.querySelector('#project-grid');

const featuredGrid =
  document.querySelector('#featured-project-grid');

const filters =
  document.querySelectorAll('.filter');


// =========================
// PROJECT MODAL ELEMENTS
// =========================

const modal =
  document.querySelector('.modal');

const modalClose =
  document.querySelector('.modal-close');

const modalImg =
  modal?.querySelector('.modal-image img');

const modalTitle =
  document.querySelector('#modal-title');

const modalType =
  document.querySelector('#modal-type');

const modalDescription =
  document.querySelector('#modal-description');


// =========================
// CREATE PROJECT CARD
// =========================

function createProjectCard(project, number) {

  const article =
    document.createElement('article');

  article.className = 'project';

  article.dataset.id =
    project.id;

  article.dataset.category =
    project.category;

  article.dataset.title =
    project.title;

  article.dataset.type =
    project.type;

  article.dataset.description =
    project.description;


  article.innerHTML = `

    <button
      class="project-image"
      type="button"
      data-project
    >

      <img
        src="${project.image}"
        alt="${project.title}"
      >

      <span class="project-overlay">

        <b>
          View project
        </b>

        <i>
          ↗
        </i>

      </span>

    </button>


    <div class="project-meta">

      <div>

        <span>
          ${String(number).padStart(2, '0')}
        </span>

        <h3>
          ${project.title}
        </h3>

      </div>

      <p>
        ${project.type}
      </p>

    </div>

  `;


  return article;

}


// =========================
// PROJECT MODAL
// =========================

function setupProjectModals() {

  document
    .querySelectorAll('[data-project]')
    .forEach(button => {

      button.addEventListener('click', () => {

        const card =
          button.closest('.project');

        if (!card) return;

        const projectId =
          card.dataset.id;

        window.location.href =
          `project.html?id=${projectId}`;

      });

    });

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects(category) {

  if (!projectGrid) return;


  projectGrid.innerHTML = '';


  const filteredProjects =
    projectData.filter(
      project =>
        project.category === category
    );


  filteredProjects.forEach(
    (project, index) => {

      const card =
        createProjectCard(
          project,
          index + 1
        );

      projectGrid.appendChild(card);

    }
  );


  setupProjectModals();

}


// =========================
// PROJECT FILTERS
// =========================

if (projectGrid) {

  filters.forEach(filter => {

    filter.addEventListener(
      'click',
      () => {

        filters.forEach(item => {

          item.classList.remove(
            'active'
          );

        });


        filter.classList.add(
          'active'
        );


        renderProjects(
          filter.dataset.filter
        );

      }
    );

  });


  /*
    Maps is the default category.
  */

  renderProjects('maps');

}


// =========================
// FEATURED PROJECTS
// =========================

if (featuredGrid) {

  featuredGrid.innerHTML = '';


  const featuredProjects =
    projectData.filter(
      project => project.featured
    );


  featuredProjects.forEach(
    (project, index) => {

      const card =
        createProjectCard(
          project,
          index + 1
        );

      featuredGrid.appendChild(card);

    }
  );


  setupProjectModals();

}


// =========================
// CLOSE MODAL
// =========================

function closeModal() {

  if (!modal) return;

  modal.classList.remove('open');

  modal.setAttribute(
    'aria-hidden',
    'true'
  );

  document.body.classList.remove(
    'modal-open'
  );

}


// =========================
// MODAL CONTACT BUTTON
// =========================

const modalContact =
  document.querySelector('.modal-contact');


if (modalContact) {

  modalContact.addEventListener(
    'click',
    event => {

      event.preventDefault();


      closeModal();


      setTimeout(() => {

        const target =
          document.querySelector('#contact');


        if (target) {

          window.scrollTo({
            top: target.offsetTop,
            behavior: 'instant'
          });

        } else {

          window.location.href =
            'index.html#contact';

        }

      }, 200);

    }
  );

}


// =========================
// MODAL CLOSE BUTTON
// =========================

if (modalClose) {

  modalClose.addEventListener(
    'click',
    closeModal
  );

}


// =========================
// CLICK OUTSIDE MODAL
// =========================

if (modal) {

  modal.addEventListener(
    'click',
    event => {

      if (
        event.target === modal
      ) {

        closeModal();

      }

    }
  );

}


// =========================
// ESCAPE KEY
// =========================

document.addEventListener(
  'keydown',
  event => {

    if (
      event.key === 'Escape'
    ) {

      closeModal();

    }

  }
);


// =========================
// ACTIVE NAVIGATION
// =========================

const sections =
  document.querySelectorAll(
    'main section[id]'
  );

const navLinks =
  document.querySelectorAll(
    '.desktop-nav a'
  );


if (
  sections.length &&
  navLinks.length
) {

  const observer =
    new IntersectionObserver(
      entries => {

        entries.forEach(entry => {

          if (
            entry.isIntersecting
          ) {

            navLinks.forEach(link => {

              link.classList.toggle(
                'active',
                link.getAttribute(
                  'href'
                ) ===
                `#${entry.target.id}`
              );

            });

          }

        });

      },
      {
        rootMargin:
          '-35% 0px -55% 0px'
      }
    );


  sections.forEach(section => {

    observer.observe(section);

  });

}
// =========================
// DARK MODE
// =========================

const themeToggle = document.querySelector('#theme-toggle');
const themeLabel = document.querySelector('#theme-label');

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');

  if (themeToggle) {
    themeToggle.classList.add('active');
    themeToggle.setAttribute('aria-pressed', 'true');
  }

  if (themeLabel) {
    themeLabel.textContent = 'ON';
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {

    const darkMode = document.body.classList.toggle('dark-mode');

    localStorage.setItem(
      'theme',
      darkMode ? 'dark' : 'light'
    );

    themeToggle.classList.toggle(
      'active',
      darkMode
    );

    themeToggle.setAttribute(
      'aria-pressed',
      darkMode
    );

    themeLabel.textContent =
      darkMode ? 'ON' : 'OFF';
  });
}