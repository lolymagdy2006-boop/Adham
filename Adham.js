/* ================= STATS COUNTER ================= */
const counters = document.querySelectorAll(".stat-number");
let statsPlayed = false;

function runCounters() {
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    let current = 0;
    const increment = Math.ceil(target / 40);

    const update = () => {
      current += increment;
      if (current >= target) {
        counter.textContent = target;
      } else {
        counter.textContent = current;
        requestAnimationFrame(update);
      }
    };
    update();
  });
}

/* Observer عشان يشغل العداد مرة واحدة */
const statsSection = document.querySelector(".stats");

if (statsSection) {
  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !statsPlayed) {
        statsPlayed = true;
        runCounters();
      }
    });
  }, { threshold: 0.4 });

  statsObserver.observe(statsSection);
}

/* ================= AUTO CAROUSEL ================= */
const track = document.getElementById("autoCarousel");

if (track) {
  // نكرّر المحتوى عشان يعمل loop
  track.innerHTML += track.innerHTML;

  let position = 0;
  const speed = 0.4;

  function moveCarousel() {
    position -= speed;

    if (Math.abs(position) >= track.scrollWidth / 2) {
      position = 0;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(moveCarousel);
  }

  moveCarousel();
}