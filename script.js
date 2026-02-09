(() => {
  const body = document.body;
  const year = document.getElementById('year');
  year.textContent = new Date().getFullYear();

  // Smooth nav
  document.querySelectorAll('.nav a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector(a.getAttribute('href')).scrollIntoView({behavior:'smooth'});
    });
  });

  // Filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.card');
  filters.forEach(f => f.addEventListener('click', () => {
    filters.forEach(x=>x.classList.remove('active'));
    f.classList.add('active');
    const filter = f.dataset.filter;
    cards.forEach(c => {
      c.style.display = (filter === 'all' || c.dataset.type === filter) ? '' : 'none';
    });
  }));

  // Modal preview
  const modal = document.getElementById('modal');
  const modalBody = document.getElementById('modalBody');
  const modalClose = document.getElementById('modalClose');
  document.getElementById('grid').addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    if (!card) return;
    const title = card.dataset.title || card.querySelector('h3').textContent;
    modalBody.innerHTML = `<h3>${title}</h3><p>${card.querySelector('p').textContent}</p>`;
    modal.setAttribute('aria-hidden','false');
  });
  modalClose.addEventListener('click', ()=> modal.setAttribute('aria-hidden','true'));
  modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden','true'); });

  // Contact form
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    // simple validation
    if (!data.get('name') || !data.get('email') || !data.get('message')) return showToast('Please fill all fields');
    showToast('Thanks — message sent!');
    form.reset();
  });

  function showToast(msg){
    toast.textContent = msg; toast.classList.add('show');
    setTimeout(()=> toast.classList.remove('show'), 2600);
  }

})();
