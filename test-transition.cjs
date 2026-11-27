const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

const listeners = new Map();
const frames = [];
const classes = new Set();
const properties = new Map();
const elements = new Map();
function element(id) {
  if (!elements.has(id)) elements.set(id, {
    hidden: id !== 'intro',
    currentTime: 0,
    duration: 8,
    ended: false,
    style: {
      setProperty: (name, value) => properties.set(name, value),
      removeProperty: name => properties.delete(name),
    },
    classList: {
      add: name => classes.add(name),
      remove: name => classes.delete(name),
      contains: name => classes.has(name),
    },
    addEventListener: (name, fn) => listeners.set(`${id}:${name}`, fn),
    setAttribute() {},
    pause() {},
    play: () => Promise.resolve(),
    focus() {},
  });
  return elements.get(id);
}
const win = {
  matchMedia: () => ({ matches: false }),
  requestAnimationFrame: fn => frames.push(fn),
  cancelAnimationFrame() {},
  scrollTo() {},
  setInterval() {},
};
vm.runInNewContext(fs.readFileSync('dist/script.js', 'utf8'), {
  document: { getElementById: element }, window: win, Date, Math, Number, String,
});
const fire = (id, name) => listeners.get(`${id}:${name}`)();
fire('openInvite', 'click');
assert.equal(element('invitation').hidden, true);
const video = element('invitationVideo');
video.currentTime = 5.1;
fire('invitationVideo', 'timeupdate');
assert.equal(element('invitation').hidden, false);
assert.equal(classes.has('is-video-ending'), true);
video.currentTime = 6.5;
frames.shift()();
assert.ok(Math.abs(Number(properties.get('--video-opacity')) - 0.5) < 0.01);
video.currentTime = 7.9;
frames.shift()();
assert.ok(Number(properties.get('--video-opacity')) < 0.04);
video.ended = true;
fire('invitationVideo', 'ended');
assert.equal(element('videoScreen').hidden, true);
assert.equal(element('invitation').hidden, false);
assert.equal(classes.has('is-video-ending'), false);
const css = fs.readFileSync('dist/styles.css', 'utf8');
assert.match(css, /is-video-ending \.video-screen\{[^}]*z-index:2;opacity:var\(--video-opacity,1\)/);
assert.match(css, /is-video-ending \.invitation\{[^}]*z-index:1/);
assert.doesNotMatch(css, /transition-shade|cinematic-veil|brightness\(0\)/);
console.log('Transição local verificada.');
