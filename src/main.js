/* ApolloDataScrap - site behaviour (menu, sample tabs, contact form).
   All page content is plain HTML, so the site is fully readable without this file. */
(function () {
  'use strict';

  /* contact details used by the form fallback */
  var CONTACT_EMAIL = document.documentElement.getAttribute('data-email') || 'hello@apollodatascrap.com';

  /* ---------- mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var header = document.getElementById('siteHeader');
  if (menuBtn && header) {
    menuBtn.addEventListener('click', function () {
      var open = header.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  /* ---------- sample sheet tabs (home page) ---------- */
  var tabs = document.querySelectorAll('[role="tab"][data-tab]');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        var panel = document.getElementById(t.getAttribute('aria-controls'));
        if (panel) { panel.hidden = !on; }
      });
    });
  });

  /* ---------- contact form ---------- */
  var send = document.getElementById('sendBtn');
  if (send) {
    var params = new URLSearchParams(window.location.search);
    var pre = params.get('service');
    var select = document.getElementById('cService');
    if (pre && select) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.getAttribute('data-slug') === pre) { select.value = o.value; }
      });
    }
    send.addEventListener('click', function () {
      var val = function (id) { return document.getElementById(id).value.trim(); };
      var name = val('cName'), email = val('cEmail'), service = val('cService'), msg = val('cMsg');
      var note = document.getElementById('formNote');
      if (!name || !email || !msg) {
        note.className = 'note note--err';
        note.textContent = 'Add your name, email and a short message so we can reply.';
        return;
      }
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        note.className = 'note note--err';
        note.textContent = 'Check your email address. It should look like name@company.com.';
        return;
      }
      var subject = encodeURIComponent('Request: ' + service);
      var body = encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\nService: ' + service + '\n\n' + msg);
      note.className = 'note note--ok';
      note.innerHTML = 'Your email app should open with your request. If it does not, write to <a href="mailto:' + CONTACT_EMAIL + '">' + CONTACT_EMAIL + '</a>.';
      window.location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + subject + '&body=' + body;
    });
  }
})();
