(() => {
  const $ = id => document.getElementById(id);
  const experience = $('experience');
  const intro = $('intro');
  const videoScreen = $('videoScreen');
  const video = $('invitationVideo');
  const invitation = $('invitation');
  const shade = $('transitionShade');
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
  let transitionTimer;

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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      videoScreen.hidden = true;
      invitation.hidden = false;
      updateCountdown();
      window.scrollTo({ top: 0, behavior: 'instant' });
      return;
    }
    invitation.hidden = false;
    updateCountdown();
    shade.hidden = false;
    experience.classList.add('is-transitioning');
    transitionTimer = window.setTimeout(() => {
      videoScreen.hidden = true;
      experience.classList.remove('is-transitioning');
      shade.hidden = true;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, 4000);
  }

  trigger.addEventListener('click', () => {
    if (!videoScreen.hidden) return;
    showingInvitation = false;
    experience.classList.remove('is-video-ending');
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
    if (!Number.isFinite(video.duration)) return;
    if (video.duration - video.currentTime <= 1.5) {
      experience.classList.add('is-video-ending');
    }
  });
  video.addEventListener('ended', reveal);
  video.addEventListener('error', reveal);
  $('skipVideo').addEventListener('click', reveal);

  $('replayButton').addEventListener('click', () => {
    window.clearTimeout(transitionTimer);
    experience.classList.remove('is-transitioning');
    experience.classList.remove('is-video-ending');
    shade.hidden = true;
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
