---
layout: page
title: Let’s talk
permalink: /contact/
plain_title: true
description: Get in touch for collaborations, writing, research, speaking, or coffee.
---

<style>
#contact-form {
  display: grid;
  gap: 1rem;
}

#contact-form .form-row-cols-2 {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  margin: 0;
  width: 100%;
}

#contact-form .form-field {
  margin: 0 !important;
}

#contact-form .button {
  align-items: center;
  display: inline-flex;
  gap: 0.45rem;
  font-family: inherit;
  font-weight: 400;
  justify-self: start;
  line-height: 1.2;
}

.contact-form-actions {
  align-items: center;
  display: flex;
  gap: 0.75rem;
}

.contact-button-shortcut {
  align-items: center;
  display: inline-flex;
  font-family: inherit;
  font-size: 0.9em;
  font-weight: 400;
  gap: 0.2rem;
  line-height: 1;
  opacity: 0.9;
}

@media (max-width: 52rem) {
  #contact-form .form-row-cols-2 {
    grid-template-columns: 1fr;
  }
}

#contact-form .form-field input,
#contact-form .form-field textarea {
  background-color: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(125, 120, 181, 0.32);
  padding: 0.6rem 0.75rem;
}

#contact-form .form-field input:focus,
#contact-form .form-field textarea:focus {
  border-color: #7d78b5;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 0 2px rgba(125, 120, 181, 0.08);
}

#contact-form .form-field input::placeholder,
#contact-form .form-field textarea::placeholder {
  color: #888;
}

#contact-form .contact-field-label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
</style>

<p><span class="highlight-text">Get in touch for collaborations, writing, research, speaking, or to get coffee. ☕</span></p>

<form id="contact-form" class="form" data-contact-form method="POST" action="https://form-djpardis.pardis-noorzad.workers.dev/submit/contact">
  <input type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" hidden>

  <div class="form-row-cols-2">
    <div class="form-field">
      <label class="contact-field-label" for="contact-name">Name</label>
      <input id="contact-name" name="name" type="text" required autocomplete="name" placeholder="Name">
    </div>

    <div class="form-field">
      <label class="contact-field-label" for="contact-email">Email</label>
      <input id="contact-email" name="email" type="email" required autocomplete="email" placeholder="Email">
    </div>
  </div>

  <div class="form-row-cols-2">
    <div class="form-field">
      <label class="contact-field-label" for="contact-subject">Subject</label>
      <input id="contact-subject" name="subject" type="text" autocomplete="off" placeholder="Subject (optional)">
    </div>

    <div class="form-field">
      <label class="contact-field-label" for="contact-location">Location</label>
      <input id="contact-location" name="location" type="text" autocomplete="address-level2" placeholder="Location (optional)">
    </div>
  </div>

  <div class="form-field">
    <label class="contact-field-label" for="contact-message">Message. > 20 characters</label>
    <textarea id="contact-message" name="message" rows="5" required minlength="20" placeholder="Message (> 20 characters)"></textarea>
  </div>

  <div class="contact-form-actions">
    <button class="button" type="submit">Send <span class="contact-button-shortcut" aria-hidden="true"><span>⌘</span><span>↵</span></span></button>
  </div>
</form>
<p data-contact-status role="status" aria-live="polite"></p>

<script>
(function () {
  var form = document.querySelector("[data-contact-form]");
  if (!form) return;
  var status = document.querySelector("[data-contact-status]");
  var button = form.querySelector('button[type="submit"]');
  var message = form.querySelector("#contact-message");
  var isLocalPreview = /^(localhost|127\.0\.0\.1|0\.0\.0\.0)$/.test(window.location.hostname);
  var endpoint = isLocalPreview ? "http://localhost:8787/submit/contact" : form.action;

  if (message) {
    message.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.metaKey) {
        e.preventDefault();
        form.requestSubmit();
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    if (status) status.textContent = "Sending\u2026";
    if (button) button.disabled = true;

    fetch(endpoint, { method: "POST", body: new FormData(form) })
      .then(function (r) {
        return r.json().catch(function () { return {}; }).then(function (b) {
          return { status: r.status, body: b };
        });
      })
      .then(function (r) {
        if (r.body.ok) {
          form.reset();
          if (status) status.textContent = "Thank you, your message was sent.";
        } else {
          if (status) status.textContent = r.body.error || "Something went wrong. Please try again.";
        }
        if (button) button.disabled = false;
      })
      .catch(function () {
        if (status) status.textContent = "Could not reach the form service. Please try again.";
        if (button) button.disabled = false;
      });
  });
})();
</script>
