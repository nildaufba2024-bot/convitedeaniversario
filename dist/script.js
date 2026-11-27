(() => {
  const $ = id => document.getElementById(id);
  const experience = $('experience');
  const intro = $('intro');
  const videoScreen = $('videoScreen');
  const video = $('invitationVideo');
  const invitation = $('invitation');
  const trigger = $('openInvite');
  const eventAt = Date.parse('2026-12-15T20:00:00-03:00');
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
    invitation.hidden = false;
    experience.classList.add('is-transitioning');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    transitionTimer = window.setTimeout(() => {
      videoScreen.hidden = true;
      experience.classList.remove('is-transitioning');
      window.scrollTo({ top: 0, behavior: 'instant' });
    }, reduced ? 10 : 300);
  }

  trigger.addEventListener('click', () => {
    if (!videoScreen.hidden) return;
    showingInvitation = false;
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

  video.addEventListener('ended', reveal);
  video.addEventListener('error', reveal);
  $('skipVideo').addEventListener('click', reveal);

  $('replayButton').addEventListener('click', () => {
    window.clearTimeout(transitionTimer);
    experience.classList.remove('is-transitioning');
    video.pause();
    video.currentTime = 0;
    invitation.hidden = true;
    videoScreen.hidden = true;
    intro.hidden = false;
    showingInvitation = false;
    window.scrollTo({ top: 0, behavior: 'instant' });
    trigger.focus({ preventScroll: true });
  });

  $('calendarButton').addEventListener('click', () => {
    const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}Z$/, 'Z');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Convite Camila Godoy//PT-BR',
      'BEGIN:VEVENT',
      'UID:camila-godoy-20261215@example.invalid',
      'DTSTAMP:' + stamp,
      'DTSTART:20261215T230000Z',
      'SUMMARY:Aniversário de Camila Godoy - Coquette Pink Party',
      'LOCATION:Rua E\\, Zona Oeste\\, nº 225',
      'DESCRIPTION:Conto com a sua presença para celebrarmos juntos mais um ano de vida!',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'aniversario-camila-godoy.ics';
    document.body.append(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });

  updateCountdown();
  window.setInterval(updateCountdown, 1000);
})();
