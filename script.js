// Luz que sigue al ratón
const root = document.documentElement;
if (matchMedia('(pointer: fine)').matches) {
  addEventListener('pointermove', (e) => {
    root.style.setProperty('--x', e.clientX + 'px');
    root.style.setProperty('--y', e.clientY + 'px');
  });
}

// Modo claro / oscuro
const isDark = () => {
  const t = root.dataset.theme;
  return t ? t === 'dark' : !matchMedia('(prefers-color-scheme: light)').matches;
};
document.getElementById('theme').addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  try { localStorage.setItem('tema', next); } catch (e) {}
});

// La estrella del logo gira al pulsarla
const logo = document.getElementById('logo');
logo.addEventListener('click', () => {
  logo.classList.remove('spin');
  void logo.offsetWidth;
  logo.classList.add('spin');
});

// Resalta en el menú la sección visible
const links = [...document.querySelectorAll('.nav a')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('.section').forEach((s) => spy.observe(s));

// Aparición suave al hacer scroll
const items = document.querySelectorAll('.section > *:not(.sec-title), .timeline > li, .grid > *');
const reveal = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      reveal.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
items.forEach((el) => { el.classList.add('reveal'); reveal.observe(el); });

// Copiar el correo
const copy = document.getElementById('copy');
const copied = document.getElementById('copied');
copy.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(copy.dataset.email);
    copied.textContent = '✓ Correo copiado';
  } catch (e) {
    copied.textContent = 'No se pudo copiar: ' + copy.dataset.email;
  }
  setTimeout(() => (copied.textContent = ''), 2500);
});
