(function () {
  function updateButtons(scroller, previous, next) {
    var maxLeft = scroller.scrollWidth - scroller.clientWidth - 1;
    previous.disabled = scroller.scrollLeft <= 1;
    next.disabled = scroller.scrollLeft >= maxLeft;
  }

  function scrollByCard(scroller, direction) {
    var card = scroller.querySelector('.link-card');
    var amount = card ? card.getBoundingClientRect().width + 8 : 240;
    scroller.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  function initCarousel(scroller) {
    if (scroller.dataset.carouselReady === 'true') return;
    if (scroller.scrollWidth <= scroller.clientWidth) return;

    var shell = document.createElement('div');
    shell.className = 'card-carousel-shell';
    scroller.parentNode.insertBefore(shell, scroller);

    var previous = document.createElement('button');
    previous.className = 'card-carousel-button card-carousel-button--previous';
    previous.type = 'button';
    previous.setAttribute('aria-label', 'Previous cards');
    previous.textContent = '\u2039';

    var next = document.createElement('button');
    next.className = 'card-carousel-button card-carousel-button--next';
    next.type = 'button';
    next.setAttribute('aria-label', 'Next cards');
    next.textContent = '\u203a';

    shell.appendChild(previous);
    shell.appendChild(scroller);
    shell.appendChild(next);

    previous.addEventListener('click', function () {
      scrollByCard(scroller, -1);
    });
    next.addEventListener('click', function () {
      scrollByCard(scroller, 1);
    });
    scroller.addEventListener('scroll', function () {
      updateButtons(scroller, previous, next);
    }, { passive: true });
    window.addEventListener('resize', function () {
      updateButtons(scroller, previous, next);
    });

    scroller.dataset.carouselReady = 'true';
    updateButtons(scroller, previous, next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.link-cards.card-carousel').forEach(initCarousel);
  });
}());
