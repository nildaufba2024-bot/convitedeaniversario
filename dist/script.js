(() => {
  const $ = id => document.getElementById(id);
  const experience = $('experience');
  const intro = $('intro');
  const videoScreen = $('videoScreen');
  const video = $('invitationVideo');
  const invitation = $('invitation');
  const trigger = $('openInvite');
  const eventAt = Date.parse('2026-12-15T20:00:00-03:00');
  const confirmationMessages = [
    'Oi, Camila! Presença confirmada! Mal posso esperar para comemorar esse dia especial com você!',
    'Camila, pode contar comigo! Estarei lá para celebrar seu aniversário!',
    'Oii, Camila! Já reservei essa data. Não vou perder sua festa por nada!',
    'Camila, estarei presente! Que seja uma noite incrível e cheia de momentos especiais!',
    'Oi, Camila! Presença confirmada! Bora comemorar seu aniversário em grande estilo!',
    'Camila, pode preparar a festa porque eu vou! Vai ser maravilhoso celebrar com você!',
    'Oii, Camila! Minha presença está garantida. Já estou na expectativa para esse grande dia!',
    'Camila, não poderia faltar nesse momento tão especial. Pode contar comigo!',
    'Oi, Camila! Convite aceito e presença confirmada! Que venha essa festa maravilhosa!',
    'Camila, dia 15 de dezembro temos um encontro marcado! Estarei lá para comemorar com você!'
  ];
  let showingInvitation = false;
  let blendFrame;

  function clearBlend() {
    window.cancelAnimationFrame(blendFrame);
    experience.classList.remove('is-video-ending');
    experience.style.removeProperty('--video-opacity');
  }

  function blendVideo() {
    if (showingInvitation || video.ended || videoScreen.hidden) return;
    const remaining = Math.max(0, video.duration - video.currentTime);
    const progress = Math.min(1, Math.max(0, 1 - remaining / 3));
    experience.style.setProperty('--video-opacity', String(1 - progress));
    blendFrame = window.requestAnimationFrame(blendVideo);
  }

  function updateCountdown() {
    const remaining = Math.max(0, Math.ceil((eventAt - Date.now()) / 1000));
    const values = [
      Math.floor(remaining / 86400),
      Math.floor(remaining % 86400 / 3600),
      Math.floor(remaining % 3600 / 60),
      remaining % 60
    ];
    ['days', 'hours', 'minutes', 'seconds'].forEach((id, index) => {
      $(id).textContent = String(values[index]).padStart(2, '0');
    });
    $('countdown').setAttribute('aria-label', remaining === 0
      ? 'O grande dia chegou!'
      : `${values[0]} dias, ${values[1]} horas, ${values[2]} minutos e ${values[3]} segundos para a festa`);
  }

  function reveal() {
    if (showingInvitation) return;
    showingInvitation = true;
    video.pause();
    clearBlend();
    videoScreen.hidden = true;
    invitation.hidden = false;
    updateCountdown();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  trigger.addEventListener('click', () => {
    if (!videoScreen.hidden) return;
    showingInvitation = false;
    clearBlend();
    video.currentTime = 0;
    intro.hidden = true;
    invitation.hidden = true;
    videoScreen.hidden = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    video.play().catch(() => {
      video.controls = true;
      video.focus();
    });
  });

  video.addEventListener('timeupdate', () => {
    if (showingInvitation || !Number.isFinite(video.duration) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (video.duration - video.currentTime > 3 || experience.classList.contains('is-video-ending')) return;
    invitation.hidden = false;
    updateCountdown();
    experience.classList.add('is-video-ending');
    blendVideo();
  });
  video.addEventListener('ended', reveal);
  video.addEventListener('error', reveal);
  $('skipVideo').addEventListener('click', reveal);

  $('replayButton').addEventListener('click', () => {
    clearBlend();
    video.pause();
    video.currentTime = 0;
    invitation.hidden = true;
    videoScreen.hidden = true;
    intro.hidden = false;
    showingInvitation = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    trigger.focus({ preventScroll: true });
  });

  $('confirmButton').addEventListener('click', event => {
    const message = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
    event.currentTarget.href = `https://wa.me/5575982116019?text=${encodeURIComponent(message)}`;
  });

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
