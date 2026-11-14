'use strict';

// Keep the title and play control visible if a cover fails to load.
document.querySelectorAll('.project-image img').forEach(image => {
  const showFallback = () => { image.hidden = true; };
  image.addEventListener('error', showFallback, { once: true });
  if (image.complete && image.naturalWidth === 0) showFallback();
});

const work = document.getElementById('work');
const cards = [...document.querySelectorAll('.project-card')];
const buttons = [...document.querySelectorAll('.filters button')];
const brandFilter = document.getElementById('brand-filter');
const searchInput = document.getElementById('work-search');
const resultsStatus = document.getElementById('work-status');
const loadMore = document.getElementById('load-more');
const emptyState = document.getElementById('work-empty');
const clearFilters = document.getElementById('clear-filters');
const pageSize = 12;
let activeCategory = 'all';
let visibleLimit = pageSize;

function matchingCards() {
  const query = searchInput.value.trim().toLowerCase();
  return cards.filter(card =>
    (activeCategory === 'all' || card.dataset.categories.split(' ').includes(activeCategory)) &&
    (brandFilter.value === 'all' || card.dataset.brand === brandFilter.value) &&
    (!query || card.dataset.search.includes(query))
  );
}
function renderProjects(resetLimit = true) {
  if (resetLimit) visibleLimit = pageSize;
  const matches = matchingCards();
  const visible = new Set(matches.slice(0, visibleLimit));
  cards.forEach(card => { card.hidden = !visible.has(card); });
  const count = Math.min(visibleLimit, matches.length);
  resultsStatus.textContent = `Showing ${count} of ${matches.length} ${matches.length === 1 ? 'video' : 'videos'}`;
  emptyState.hidden = matches.length > 0;
  loadMore.hidden = count >= matches.length;
  loadMore.textContent = `Load ${Math.min(pageSize, matches.length - count)} more videos`;
  clearFilters.hidden = activeCategory === 'all' && brandFilter.value === 'all' && !searchInput.value;
  work.dataset.activeFilter = activeCategory;
  buttons.forEach(button => {
    const selected = button.dataset.f === activeCategory;
    button.classList.toggle('on', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
}
document.querySelector('.work-controls').hidden = false;
buttons.forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.f;
  renderProjects();
}));
brandFilter.addEventListener('change', () => renderProjects());
searchInput.addEventListener('input', () => renderProjects());
clearFilters.addEventListener('click', () => {
  activeCategory = 'all';
  brandFilter.value = 'all';
  searchInput.value = '';
  renderProjects();
  buttons[0].focus();
});
loadMore.addEventListener('click', () => {
  const firstNewCard = matchingCards()[visibleLimit];
  visibleLimit += pageSize;
  renderProjects(false);
  // Keep keyboard focus within the newly revealed work, even on the final page.
  if (firstNewCard) firstNewCard.focus({preventScroll:true});
});
renderProjects();

// Stream one original Vimeo video at a time; thumbnails are stored locally.
const dialog = document.getElementById('video-dialog');
const playerHost = document.getElementById('video-player');
const playerTitle = document.getElementById('video-title');
const originalLink = document.getElementById('video-original');
const closePlayer = document.getElementById('close-player');
let activeCard = null;
if (dialog && typeof dialog.showModal === 'function') {
  cards.forEach(card => card.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    activeCard = card;
    playerTitle.textContent = `${card.dataset.brand} — ${card.dataset.title}`;
    originalLink.href = card.href;
    playerHost.style.setProperty('--video-ratio', card.dataset.ratio);
    const frame = document.createElement('iframe');
    const source = new URL(card.dataset.embed);
    source.searchParams.set('autoplay', '1');
    source.searchParams.set('playsinline', '1');
    source.searchParams.set('dnt', '1');
    source.searchParams.set('title', '0');
    source.searchParams.set('byline', '0');
    source.searchParams.set('portrait', '0');
    frame.src = source.href;
    frame.title = `${card.dataset.brand} — ${card.dataset.title}`;
    frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    playerHost.replaceChildren(frame);
    dialog.showModal();
    document.body.classList.add('video-open');
    closePlayer.focus();
  }));
  closePlayer.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    playerHost.replaceChildren();
    document.body.classList.remove('video-open');
    activeCard?.focus({preventScroll:true});
  });
}

const menu = document.querySelector('.menu');
const nav = document.getElementById('site-nav');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', String(nav.classList.toggle('open'))));
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); }
});
document.addEventListener('click', event => { if (!nav.contains(event.target) && !menu.contains(event.target)) closeMenu(); });
window.matchMedia('(min-width:1001px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

// The visitor reviews and sends their prepared message in WhatsApp.
const inquiry = document.getElementById('project-inquiry');
inquiry.hidden = false;
inquiry.addEventListener('submit', event => {
  event.preventDefault();
  if (!inquiry.reportValidity()) return;
  const data = new FormData(inquiry);
  const phone = String(data.get('phone') || '').trim();
  const message = [
    `Hi Israr, I'm ${String(data.get('name') || '').trim()}.`,
    `I'm interested in ${data.get('service')}.`,
    ...(phone ? [`Phone / WhatsApp: ${phone}`] : []),
    '', String(data.get('message') || '').trim()
  ].join('\n');
  window.location.assign(`https://wa.me/923043778769?text=${encodeURIComponent(message)}`);
});
