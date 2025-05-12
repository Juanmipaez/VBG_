document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const main = document.getElementById('main-content');
  setTimeout(() => {
    loader.style.display = 'none';
    main.classList.replace('hidden', 'visible');
  }, 1000);

  const markers = document.querySelectorAll('.marker');
  const popup = document.getElementById('popup');
  const titleEl = document.getElementById('popup-title');
  const textEl = document.getElementById('popup-testimony');
  const closeBtn = document.getElementById('close-popup');
  const supportBtn = document.getElementById('support-btn');
  const shareBtn = document.getElementById('share-btn');
  const supportCountEl = document.getElementById('support-count');
  let currentSupport = 0;

  markers.forEach(m => {
    m.addEventListener('click', () => {
      titleEl.textContent = m.dataset.title;
      textEl.innerHTML = m.dataset.testimony;
      popup.classList.remove('hidden');
    });
  });

  closeBtn.addEventListener('click', () => popup.classList.add('hidden'));
  popup.addEventListener('click', e => {
    if (e.target === popup) popup.classList.add('hidden');
  });

  supportBtn.addEventListener('click', () => {
    currentSupport++;
    supportCountEl.textContent = currentSupport;
    supportBtn.classList.add('liked');
    supportBtn.addEventListener('animationend', () => supportBtn.classList.remove('liked'), { once: true });
  });

  shareBtn.addEventListener('click', () => {
    const shareData = {
      title: titleEl.textContent,
      text: textEl.textContent,
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).catch(console.error);
    } else {
      prompt('Copia este texto para compartir:', `${shareData.text}\n${shareData.url}`);
    }
  });

  const filters = document.querySelectorAll('#filters input[type="checkbox"]');
  filters.forEach(box => box.addEventListener('change', () => {
    const active = Array.from(filters).filter(i => i.checked).map(i => i.value);
    markers.forEach(m => m.style.display = active.includes(m.dataset.type) ? 'block' : 'none');
  }));
});
