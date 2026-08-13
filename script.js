// 1. Configuración del Formulario Funcional con Apps Script
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwb_5XJ17tLaO6biYL-WW0tvJtprkaMGKdx_DzEoNKB3XwpG5AqaCm80EqNiWVqZLqJ/exec";

const form = document.getElementById('script-contact-form');
const responseText = document.getElementById('form-response');
const btnSubmit = document.getElementById('btn-submit');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    
    btnSubmit.disabled = true;
    btnSubmit.innerText = "Enviando...";
    
    const formData = new FormData(form);

    fetch(SCRIPT_URL, { 
      method: 'POST', 
      body: formData
    })
    .then(response => {
      responseText.style.display = "block";
      responseText.style.color = "#059669";
      responseText.innerText = "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.";
      form.reset();
      btnSubmit.disabled = false;
      btnSubmit.innerText = "Enviar Mensaje";
    })
    .catch(error => {
      responseText.style.display = "block";
      responseText.style.color = "#dc2626";
      responseText.innerText = "Hubo un error al enviar el mensaje. Por favor intenta de nuevo o escríbenos por WhatsApp.";
      btnSubmit.disabled = false;
      btnSubmit.innerText = "Enviar Mensaje";
    });
  });
}

// 2. Menú Hamburguesa en Móvil
const hamburgerBtn = document.getElementById('hamburger-btn');
const navMenu = document.getElementById('nav-menu');

if (hamburgerBtn && navMenu) {
  hamburgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
  });

  document.querySelectorAll('#nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

// 3. Filtro de Categorías en Galería
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    const filterValue = button.getAttribute('data-filter');

    galleryItems.forEach(item => {
      if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// 4. Modal / Lightbox para Fotos
function openModal(imgSrc, title, desc) {
  document.getElementById('modalImg').src = imgSrc;
  document.getElementById('modalTitle').innerText = title;
  document.getElementById('modalDesc').innerText = desc;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
}

window.onclick = function(event) {
  const modal = document.getElementById('imageModal');
  if (event.target === modal) {
    closeModal();
  }
};

// 5. Animación Dinámica para los Contadores Numéricos al hacer Scroll
let animated = false;
window.addEventListener('scroll', () => {
  const counterSection = document.getElementById('contadores');
  if (!counterSection) return;

  const sectionPos = counterSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos && !animated) {
    animated = true;
    document.querySelectorAll('.counter').forEach(counter => {
      const target = +counter.getAttribute('data-target');
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          counter.innerText = Math.ceil(count);
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }
});

// 6. Scrollspy: Resalta la sección activa en el menú mientras navegas
const sections = document.querySelectorAll('section, div[id="inicio"], div[id="servicios"]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});