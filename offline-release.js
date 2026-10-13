(() => {
  const dialog = document.querySelector('.overview-dialog');
  const open = document.querySelector('[data-overview-open]');
  const close = document.querySelector('[data-overview-close]');
  if (!dialog || !open || !close) return;
  const movie = dialog.querySelector('video');
  let mediaFailed = false;
  const status = document.createElement('p');
  status.dataset.overviewStatus = '';
  status.setAttribute('role', 'status');
  status.setAttribute('aria-live', 'polite');
  status.textContent = 'Video unavailable. Close and reopen to retry.';
  status.hidden = true;
  movie.before(status);
  movie.addEventListener('error', () => {
    mediaFailed = true;
    movie.pause();
    status.hidden = false;
  }, true);
  const closeMovie = () => {
    movie.pause();
    dialog.close();
  };
  open.addEventListener('click', () => {
    document.querySelector('.hero-film-video')?.pause();
    dialog.showModal();
    if (mediaFailed) movie.load();
    mediaFailed = false;
    status.hidden = true;
    if (!document.hidden) movie.play().catch(() => {});
  });
  close.addEventListener('click', closeMovie);
  dialog.addEventListener('cancel', () => movie.pause());
  dialog.addEventListener('close', () => movie.pause());
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeMovie();
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) movie.pause();
  });
})();
