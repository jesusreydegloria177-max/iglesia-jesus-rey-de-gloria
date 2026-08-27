document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Año en footer ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header sticky ---------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('is-scrolled');
    else header.classList.remove('is-scrolled');

  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Selector de WhatsApp ---------- */
  const whatsappFloat = document.getElementById('whatsappFloat');
  const whatsappButton = document.getElementById('whatsappButton');
  const whatsappMenu = document.getElementById('whatsappMenu');
  const setWhatsappMenu = (open) => {
    whatsappMenu.classList.toggle('is-open', open);
    whatsappMenu.setAttribute('aria-hidden', String(!open));
    whatsappButton.setAttribute('aria-expanded', String(open));
  };
  whatsappButton.addEventListener('click', () => {
    setWhatsappMenu(!whatsappMenu.classList.contains('is-open'));
  });
  document.addEventListener('click', (event) => {
    if (!whatsappFloat.contains(event.target)) setWhatsappMenu(false);
  });

  /* ---------- Menú móvil ---------- */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
  });
  mainNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('is-open');
      navToggle.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- Contador animado de estadísticas ---------- */
  const statEls = document.querySelectorAll('.stat-num');
  if ('IntersectionObserver' in window && statEls.length) {
    const statObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        const duration = 1200;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          el.textContent = Math.floor(progress * target);
          if (progress < 1) requestAnimationFrame(animate);
          else el.textContent = target;
        };
        requestAnimationFrame(animate);
        statObserver.unobserve(el);
      });
    }, { threshold: 0.4 });
    statEls.forEach(el => statObserver.observe(el));
  }

  /* ---------- Contador para el próximo culto (domingo 09:00) ---------- */
  function nextSunday9am() {
    const now = new Date();
    const target = new Date(now);
    target.setHours(9, 0, 0, 0);
    const day = now.getDay(); // 0 = domingo
    let daysUntilSunday = (7 - day) % 7;
    if (day === 0 && now < target) daysUntilSunday = 0;
    else if (day === 0) daysUntilSunday = 7;
    target.setDate(now.getDate() + daysUntilSunday);
    return target;
  }

  function updateCountdown() {
    const target = nextSunday9am();
    const now = new Date();
    let diff = Math.max(0, target - now);

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    diff -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(diff / (1000 * 60 * 60));
    diff -= hours * (1000 * 60 * 60);
    const mins = Math.floor(diff / (1000 * 60));
    diff -= mins * (1000 * 60);
    const secs = Math.floor(diff / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    document.getElementById('cd-days').textContent = pad(days);
    document.getElementById('cd-hours').textContent = pad(hours);
    document.getElementById('cd-mins').textContent = pad(mins);
    document.getElementById('cd-secs').textContent = pad(secs);
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);

  /* ---------- Versículo del día ---------- */
  const verses = [
    { text: 'Todo lo puedo en Cristo que me fortalece.', ref: 'Filipenses 4:13' },
    { text: 'El Señor es mi pastor, nada me faltará.', ref: 'Salmos 23:1' },
    { text: 'Porque yo sé los planes que tengo para vosotros, planes de bienestar y no de calamidad.', ref: 'Jeremías 29:11' },
    { text: 'No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios.', ref: 'Isaías 41:10' },
    { text: 'Encomienda a Jehová tu camino, y confía en él; y él hará.', ref: 'Salmos 37:5' },
    { text: 'Y sabemos que a los que aman a Dios, todas las cosas les ayudan a bien.', ref: 'Romanos 8:28' },
    { text: 'Este es el día que hizo Jehová; nos gozaremos y alegraremos en él.', ref: 'Salmos 118:24' }
  ];

  const verseText = document.getElementById('verseText');
  const verseRef = document.getElementById('verseRef');
  const newVerseBtn = document.getElementById('newVerseBtn');

  function showVerse(index) {
    const v = verses[index];
    verseText.style.opacity = 0;
    setTimeout(() => {
      verseText.textContent = `"${v.text}"`;
      verseRef.textContent = v.ref;
      verseText.style.opacity = 1;
    }, 200);
  }

  // Versículo determinado por el día del año, para que sea "del día"
  const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  let currentVerseIndex = dayOfYear % verses.length;
  verseText.style.transition = 'opacity .2s ease';
  showVerse(currentVerseIndex);

  newVerseBtn.addEventListener('click', () => {
    currentVerseIndex = (currentVerseIndex + 1) % verses.length;
    showVerse(currentVerseIndex);
  });

  /* ---------- Carrusel de testimonios ---------- */
  const track = document.getElementById('testimonialTrack');
  const slides = track ? Array.from(track.querySelectorAll('.testimonial-slide')) : [];
  const dotsWrap = document.getElementById('testimonialDots');
  let activeSlide = 0;
  let slideTimer;

  if (slides.length) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', `Ver testimonio ${i + 1}`);
      if (i === 0) dot.classList.add('is-active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsWrap.appendChild(dot);
    });

    function goToSlide(index) {
      slides[activeSlide].classList.remove('is-active');
      dotsWrap.children[activeSlide].classList.remove('is-active');
      activeSlide = index;
      slides[activeSlide].classList.add('is-active');
      dotsWrap.children[activeSlide].classList.add('is-active');
    }

    function nextSlide() {
      goToSlide((activeSlide + 1) % slides.length);
    }

    function startAutoplay() {
      slideTimer = setInterval(nextSlide, 6000);
    }
    function stopAutoplay() {
      clearInterval(slideTimer);
    }
    startAutoplay();
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
  }

  /* ---------- Formulario de oración (demo local) ---------- */
  const prayerForm = document.getElementById('prayerForm');
  const prayerNote = document.getElementById('prayerNote');
  if (prayerForm) {
    prayerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Aquí se puede conectar a un backend real (PHP, formularios, etc.)
      prayerNote.textContent = '¡Recibimos tu petición! Nuestro equipo orará por ti esta semana.';
      prayerForm.reset();
    });
  }

});
