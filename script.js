const v2Style = document.createElement('link');
v2Style.rel = 'stylesheet';
v2Style.href = 'booking-v2.css';
document.head.appendChild(v2Style);

const mediaStyle = document.createElement('link');
mediaStyle.rel = 'stylesheet';
mediaStyle.href = 'media-update.css';
document.head.appendChild(mediaStyle);

const media = {
  images: {
    entrance: 'assets/images/ipsos-camping-entrance.webp',
    sunset: 'assets/images/ipsos-beach-sunset.webp',
    pizza: 'assets/images/da-marco-pizza.webp',
    camper: 'assets/images/camper-green-area.webp',
    bar: 'assets/images/da-marco-bar.webp',
  },
  videos: {
    entrance: 'assets/videos/entrance-sign-loop.mp4',
    promo: 'assets/videos/ipsos-camping-promo.mp4',
    camper: 'assets/videos/camper-green-area-loop.mp4',
  },
  posters: {
    entrance: 'assets/posters/entrance-sign-poster.webp',
    promo: 'assets/posters/ipsos-camping-promo-poster.webp',
    camper: 'assets/posters/camper-green-area-poster.webp',
  },
};

function hideBrokenMedia(element) {
  element.closest('article, figure, .mini-media-card, .promo-video-card, .real-entrance-card, .restaurant-media-card')?.classList.add('media-missing');
}

window.hideBrokenMedia = hideBrokenMedia;

function observeRevealItems() {
  const revealItems = document.querySelectorAll('.reveal:not(.visible)');
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealItems.forEach(item => observer.observe(item));
}

function enableSmoothAnchors() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const id = anchor.getAttribute('href');
      const target = document.querySelector(id);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function upgradeHero() {
  const hero = document.querySelector('.hero');
  const title = hero?.querySelector('h1');
  const lead = hero?.querySelector('.lead');
  const desc = hero?.querySelector('.desc');
  const actions = hero?.querySelector('.actions');
  const primary = actions?.querySelector('.primary');
  const heroArt = hero?.querySelector('.hero-art');

  hero?.classList.add('cinematic-boost', 'has-real-hero-media');
  hero?.style.setProperty('--hero-photo', `url('${media.images.sunset}')`);
  heroArt?.classList.add('hero-art-v2');

  if (title) title.textContent = 'Wake up near Ipsos Beach';
  if (lead) lead.textContent = 'Camper Van, Caravan & Tent Camping beside Da Marco Restaurant';
  if (desc) desc.textContent = 'A green Mediterranean base for travellers who want trees, sea air, simple camping comfort and fast access to Ipsos Beach.';
  if (primary) primary.textContent = 'Plan Your Stay';

  if (actions && !document.querySelector('.hero-badges')) {
    actions.insertAdjacentHTML('beforebegin', `
      <div class="hero-badges" aria-label="Highlights">
        <span>🚐 Camper friendly</span>
        <span>🌊 Near the beach</span>
        <span>🍕 Da Marco nearby</span>
        <span>🌿 Green atmosphere</span>
      </div>
    `);
    actions.insertAdjacentHTML('beforeend', `<a class="btn ghost" href="#watch-place">Watch Video</a>`);
  }

  if (heroArt && !heroArt.querySelector('.floating-card')) {
    heroArt.insertAdjacentHTML('beforeend', `
      <div class="floating-card float-one">Real media update</div>
      <div class="floating-card float-two">Ipsos Beach nearby</div>
    `);
  }
}

function insertPerfectSection() {
  const facilities = document.getElementById('facilities');
  if (!facilities || document.querySelector('.perfect-section')) return;

  facilities.insertAdjacentHTML('beforebegin', `
    <section class="v2-section reveal perfect-section">
      <p class="eyebrow">Perfect for camper travellers</p>
      <h2>Made for easy arrivals and relaxed stays</h2>
      <div class="v2-grid">
        <article class="v2-card"><b>01</b><h3>Easy arrival</h3><p>Find the real entrance in Ipsos and arrive without overcomplicating your stay.</p></article>
        <article class="v2-card"><b>02</b><h3>Stay under the trees</h3><p>Use the green camper area as your relaxed base near the beach.</p></article>
        <article class="v2-card"><b>03</b><h3>Walk to Ipsos Beach</h3><p>Enjoy sea air, sunset light and local food close to the camping area.</p></article>
      </div>
    </section>
  `);
}

function insertWatchPlaceSection() {
  const booking = document.getElementById('booking');
  if (!booking || document.getElementById('watch-place')) return;

  booking.insertAdjacentHTML('beforebegin', `
    <section class="media-section reveal" id="watch-place">
      <p class="eyebrow">Watch the place</p>
      <h2>Real moments from Ipsos Camping</h2>
      <p class="section-text">A cinematic media preview using the real entrance, camper area and Da Marco atmosphere.</p>
      <div class="watch-place-card">
        <article class="promo-video-card">
          <video src="${media.videos.promo}" poster="${media.posters.promo}" controls preload="metadata" playsinline onerror="hideBrokenMedia(this)"></video>
          <div class="video-overlay"><h3>Camping promo</h3><p>Watch the real atmosphere before you request a stay.</p></div>
        </article>
        <div class="mini-media-stack">
          <article class="mini-media-card">
            <video src="${media.videos.entrance}" poster="${media.posters.entrance}" muted autoplay loop playsinline preload="metadata" onerror="hideBrokenMedia(this)"></video>
            <div class="video-overlay"><h3>Real entrance</h3><p>Find us in Ipsos, Corfu.</p></div>
          </article>
          <article class="mini-media-card">
            <video src="${media.videos.camper}" poster="${media.posters.camper}" muted autoplay loop playsinline preload="metadata" onerror="hideBrokenMedia(this)"></video>
            <div class="video-overlay"><h3>Camper area</h3><p>Grass, trees and simple camping mood.</p></div>
          </article>
        </div>
      </div>
    </section>
  `);
}

function renderBookingV2() {
  const booking = document.getElementById('booking');
  if (!booking) return;

  booking.className = 'booking-v2-shell reveal';
  booking.innerHTML = `
    <div class="booking-v2-panel">
      <div class="booking-v2-heading">
        <p class="eyebrow">Booking V2</p>
        <h2>Choose your place on the campsite map</h2>
        <p>Pick dates, select a real-looking camping zone and prepare a WhatsApp request. Availability is confirmed manually by the owner.</p>
      </div>
      <div class="wizard-steps-v2" aria-label="Booking steps">
        <button class="active" type="button" data-focus="dates">1 · Dates</button>
        <button type="button" data-focus="map">2 · Place</button>
        <button type="button" data-focus="details">3 · Details</button>
        <button type="button" data-focus="send">4 · Send</button>
      </div>
      <div class="booking-media-strip">
        <article class="mini-media-card"><img src="${media.images.camper}" alt="Camper area with grass and trees at Ipsos Camping" loading="lazy" onerror="hideBrokenMedia(this)" /><div class="image-overlay"><h3>Stay under the trees</h3><p>Real camper area media.</p></div></article>
        <article class="mini-media-card"><video src="${media.videos.camper}" poster="${media.posters.camper}" muted autoplay loop playsinline preload="metadata" onerror="hideBrokenMedia(this)"></video><div class="video-overlay"><h3>Camper loop</h3><p>Grass, shade and camping atmosphere.</p></div></article>
      </div>
      <div class="booking-v2-layout">
        <aside class="booking-box" id="dates">
          <p class="eyebrow">Step 1</p><h3>Your stay</h3>
          <label>Check-in<input type="date" id="checkIn" /></label>
          <label>Check-out<input type="date" id="checkOut" /></label>
          <div class="booking-summary-mini"><span id="nightsCount">Select dates</span><span id="selectedPlaceLabel">No place selected</span></div>
          <div class="selected-place-v2" id="selectedCard"><p class="eyebrow">Selected place</p><h3 id="selectedSpotName">Tap an available place</h3><p id="selectedSpotText">Choose a green spot on the campsite map to see details here.</p><div class="spot-features-v2" id="selectedSpotFeatures"><span>🌿 Green zone</span><span>📍 Ipsos</span></div></div>
        </aside>
        <div class="campsite-map-visual" id="map">
          <div class="map-sea-label">🌊 Ipsos Beach</div><div class="map-road-label">Access road</div><div class="map-zone-label">Tent garden</div><div class="visual-road"></div><div class="visual-path"></div>
          <div class="map-building-v2 da-marco-v2"><strong>Da Marco</strong><small>Restaurant</small></div><div class="map-building-v2 reception-v2"><strong>Reception</strong><small>Call first</small></div><div class="map-building-v2 showers-v2"><strong>WC</strong><small>Showers</small></div>
          <div class="map-tree tree-a"></div><div class="map-tree tree-b"></div><div class="map-tree tree-c"></div>
          <button type="button" class="map-spot-v2 available spot-c1" data-place="C1" data-type="Camper" data-feature="Near Da Marco · easy road access" data-status="available">C1<span>Camper</span></button>
          <button type="button" class="map-spot-v2 available spot-c2" data-place="C2" data-type="Camper" data-feature="Under trees · calm side" data-status="available">C2<span>Camper</span></button>
          <button type="button" class="map-spot-v2 booked spot-c3" data-place="C3" data-type="Camper" data-feature="Central camper zone" data-status="booked" disabled>C3<span>Booked</span></button>
          <button type="button" class="map-spot-v2 available spot-c4" data-place="C4" data-type="Camper" data-feature="Close to electricity point" data-status="available">C4<span>Camper</span></button>
          <button type="button" class="map-spot-v2 pending spot-v1" data-place="V1" data-type="Caravan" data-feature="Caravan pitch · pending confirmation" data-status="pending" disabled>V1<span>Pending</span></button>
          <button type="button" class="map-spot-v2 available spot-v2" data-place="V2" data-type="Caravan" data-feature="Spacious caravan area" data-status="available">V2<span>Caravan</span></button>
          <button type="button" class="map-spot-v2 available spot-t1" data-place="T1" data-type="Tent" data-feature="Tent garden · close to trees" data-status="available">T1<span>Tent</span></button>
          <button type="button" class="map-spot-v2 available spot-t2" data-place="T2" data-type="Tent" data-feature="Tent garden · quiet corner" data-status="available">T2<span>Tent</span></button>
          <button type="button" class="map-spot-v2 unavailable spot-t3" data-place="T3" data-type="Tent" data-feature="Closed for maintenance" data-status="closed" disabled>T3<span>Closed</span></button>
          <button type="button" class="map-spot-v2 available spot-t4" data-place="T4" data-type="Tent" data-feature="Close to showers" data-status="available">T4<span>Tent</span></button>
        </div>
        <form class="booking-box" id="bookingForm">
          <p class="eyebrow" id="details">Step 3</p><h3>Guest details</h3><input type="hidden" id="selectedPlace" /><input type="hidden" id="selectedPlaceType" />
          <label>Name<input type="text" id="guestName" placeholder="Your name" required /></label><label>Phone / WhatsApp<input type="tel" id="guestPhone" placeholder="+30 ..." required /></label><label>Email<input type="email" id="guestEmail" placeholder="your@email.com" /></label><label>Vehicle / stay type<select id="stayType"><option>Camper van</option><option>Caravan</option><option>Tent</option><option>Not sure yet</option></select></label><label>Message<textarea id="guestMessage" rows="4" placeholder="Vehicle size, pets, electricity, late arrival or special requests."></textarea></label><button class="btn primary" type="submit" id="send">Prepare request</button><p class="booking-note">This opens WhatsApp with a prepared message. Real database availability can be added later.</p>
        </form>
      </div>
      <div class="booking-result" id="bookingResult" hidden><div><p class="eyebrow">Request ready</p><h3>Your booking request is prepared</h3><p id="bookingResultText"></p></div><div class="booking-result-actions"><a class="btn primary" id="bookingWhatsApp" href="#" target="_blank" rel="noreferrer">Send on WhatsApp</a><button class="btn ghost" id="copyBooking" type="button">Copy request</button></div></div>
    </div>`;
}

function insertHowBookingWorks() {
  const booking = document.getElementById('booking');
  if (!booking || document.querySelector('.how-booking-v2')) return;
  booking.insertAdjacentHTML('afterend', `<section class="v2-section reveal how-booking-v2"><p class="eyebrow">How booking works</p><h2>Simple request, manual confirmation</h2><div class="how-grid-v2"><article class="v2-card"><b>1</b><h3>Choose dates</h3><p>Select arrival and departure dates.</p></article><article class="v2-card"><b>2</b><h3>Pick a place</h3><p>Tap an available place on the campsite map.</p></article><article class="v2-card"><b>3</b><h3>Send request</h3><p>Send the prepared WhatsApp message.</p></article><article class="v2-card"><b>4</b><h3>Wait confirmation</h3><p>Your place is confirmed only after owner reply.</p></article></div></section>`);
}

function upgradeRestaurantMedia() {
  const restaurant = document.getElementById('restaurant');
  if (!restaurant || restaurant.querySelector('.restaurant-media-grid')) return;
  restaurant.insertAdjacentHTML('beforeend', `<div class="restaurant-media-grid"><article class="restaurant-media-card"><img src="${media.images.pizza}" alt="Da Marco pizza at Ipsos Camping restaurant" loading="lazy" onerror="hideBrokenMedia(this)" /><div class="image-overlay"><h3>Da Marco pizza</h3><p>Italian food beside the camping area.</p></div></article><article class="restaurant-media-card"><img src="${media.images.bar}" alt="Da Marco restaurant bar atmosphere" loading="lazy" onerror="hideBrokenMedia(this)" /><div class="image-overlay"><h3>Restaurant bar</h3><p>Evening atmosphere and drinks.</p></div></article></div>`);
}

function insertRealEntrance() {
  const location = document.getElementById('location');
  if (!location || document.querySelector('.real-entrance-card')) return;
  location.insertAdjacentHTML('beforeend', `<article class="real-entrance-card"><img src="${media.images.entrance}" alt="Ipsos Camping Corfu entrance sign" loading="lazy" onerror="hideBrokenMedia(this)" /><video src="${media.videos.entrance}" poster="${media.posters.entrance}" muted autoplay loop playsinline preload="metadata" onerror="hideBrokenMedia(this)"></video><div class="real-entrance-copy"><p class="eyebrow">Real entrance</p><h3>Find us in Ipsos, Corfu</h3><p>Close to Da Marco, the beach road and the green camping area.</p><a class="btn primary" href="https://www.google.com/maps/search/?api=1&query=Da+Marco+Ipsos+Corfu" target="_blank" rel="noreferrer">Open Google Maps</a></div></article>`);
}

function upgradeGallery() {
  const gallery = document.getElementById('gallery');
  if (!gallery) return;
  gallery.innerHTML = `<p class="eyebrow">Travel journal</p><h2>Real photos and videos from the place</h2><p class="section-text">Real entrance, sunset, Da Marco food, camper area and restaurant atmosphere.</p><div class="media-journal-gallery"><figure class="media-journal-card"><img src="${media.images.entrance}" alt="Ipsos Camping entrance sign" loading="lazy" onerror="hideBrokenMedia(this)" /><figcaption>Real entrance</figcaption></figure><figure class="media-journal-card"><img src="${media.images.sunset}" alt="Sunset near Ipsos Beach" loading="lazy" onerror="hideBrokenMedia(this)" /><figcaption>Sunset by the sea</figcaption></figure><figure class="media-journal-card"><img src="${media.images.pizza}" alt="Da Marco pizza" loading="lazy" onerror="hideBrokenMedia(this)" /><figcaption>Da Marco restaurant</figcaption></figure><figure class="media-journal-card"><video src="${media.videos.camper}" poster="${media.posters.camper}" muted autoplay loop playsinline preload="metadata" onerror="hideBrokenMedia(this)"></video><figcaption>Camper area</figcaption></figure><figure class="media-journal-card"><img src="${media.images.bar}" alt="Da Marco bar" loading="lazy" onerror="hideBrokenMedia(this)" /><figcaption>Evening bar</figcaption></figure></div>`;
}

function addStickyBookingCta() {
  document.querySelector('.mobile-contact')?.remove();
  if (document.querySelector('.sticky-booking-cta')) return;
  document.body.insertAdjacentHTML('beforeend', `<div class="sticky-booking-cta"><a href="#booking">Plan your stay</a><a href="#watch-place">Watch video</a><a href="https://wa.me/306982875538" target="_blank" rel="noreferrer">WhatsApp</a></div>`);
}

const ownerWhatsAppPhone = '306982875538';
let selectedPitch = null;
let preparedBookingMessage = '';

function getTodayIso() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
}

function setupBookingV2() {
  const checkIn = document.getElementById('checkIn');
  const checkOut = document.getElementById('checkOut');
  const nightsCount = document.getElementById('nightsCount');
  const selectedPlaceLabel = document.getElementById('selectedPlaceLabel');
  const selectedPlaceInput = document.getElementById('selectedPlace');
  const selectedPlaceTypeInput = document.getElementById('selectedPlaceType');
  const selectedSpotName = document.getElementById('selectedSpotName');
  const selectedSpotText = document.getElementById('selectedSpotText');
  const selectedSpotFeatures = document.getElementById('selectedSpotFeatures');
  const bookingForm = document.getElementById('bookingForm');
  const bookingResult = document.getElementById('bookingResult');
  const bookingResultText = document.getElementById('bookingResultText');
  const bookingWhatsApp = document.getElementById('bookingWhatsApp');
  const copyBooking = document.getElementById('copyBooking');

  function calculateNights() {
    if (!checkIn?.value || !checkOut?.value) return null;
    const nights = Math.round((new Date(checkOut.value) - new Date(checkIn.value)) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : null;
  }

  function updateDateSummary() {
    if (checkIn?.value) checkOut.min = checkIn.value;
    const nights = calculateNights();
    nightsCount.textContent = nights ? `${nights} night${nights === 1 ? '' : 's'}` : 'Select valid dates';
  }

  function selectSpot(button) {
    document.querySelectorAll('.map-spot-v2.selected').forEach(item => item.classList.remove('selected'));
    selectedPitch = { place: button.dataset.place, type: button.dataset.type, feature: button.dataset.feature };
    button.classList.add('selected');
    selectedPlaceInput.value = selectedPitch.place;
    selectedPlaceTypeInput.value = selectedPitch.type;
    selectedPlaceLabel.textContent = `${selectedPitch.place} · ${selectedPitch.type}`;
    selectedSpotName.textContent = `${selectedPitch.place} ${selectedPitch.type} spot`;
    selectedSpotText.textContent = selectedPitch.feature;
    selectedSpotFeatures.innerHTML = `<span>✅ Available</span><span>🌿 Green zone</span><span>📲 Manual confirmation</span>`;
  }

  function buildBookingMessage() {
    const nights = calculateNights();
    const name = document.getElementById('guestName').value.trim();
    const phone = document.getElementById('guestPhone').value.trim();
    const email = document.getElementById('guestEmail').value.trim();
    const stayType = document.getElementById('stayType').value;
    const message = document.getElementById('guestMessage').value.trim();
    return ['Hello, I would like to request a booking at Ipsos Camping Corfu.','',`Check-in: ${checkIn.value}`,`Check-out: ${checkOut.value}`,`Nights: ${nights}`,`Selected place: ${selectedPitch.place} (${selectedPitch.type})`,`Stay type: ${stayType}`,`Name: ${name}`,`Phone / WhatsApp: ${phone}`,email ? `Email: ${email}` : 'Email: not provided',message ? `Message: ${message}` : 'Message: no extra message','','Please confirm availability and price. Thank you.'].join('\n');
  }

  const todayIso = getTodayIso();
  if (checkIn && checkOut) {
    checkIn.min = todayIso;
    checkOut.min = todayIso;
    checkIn.addEventListener('change', updateDateSummary);
    checkOut.addEventListener('change', updateDateSummary);
  }

  document.querySelectorAll('.map-spot-v2.available').forEach(button => button.addEventListener('click', () => selectSpot(button)));
  document.querySelectorAll('.wizard-steps-v2 button').forEach(button => button.addEventListener('click', () => { document.querySelectorAll('.wizard-steps-v2 button').forEach(item => item.classList.remove('active')); button.classList.add('active'); document.getElementById(button.dataset.focus)?.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));

  bookingForm?.addEventListener('submit', event => {
    event.preventDefault();
    const nights = calculateNights();
    if (!nights) return alert('Please select valid check-in and check-out dates.');
    if (!selectedPitch) return alert('Please select an available camping place.');
    if (!bookingForm.reportValidity()) return;
    preparedBookingMessage = buildBookingMessage();
    bookingResultText.textContent = `${selectedPitch.place} (${selectedPitch.type}) · ${checkIn.value} to ${checkOut.value} · ${nights} night${nights === 1 ? '' : 's'}`;
    bookingWhatsApp.href = `https://wa.me/${ownerWhatsAppPhone}?text=${encodeURIComponent(preparedBookingMessage)}`;
    bookingResult.hidden = false;
    bookingResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

  copyBooking?.addEventListener('click', async () => {
    if (!preparedBookingMessage) return;
    try { await navigator.clipboard.writeText(preparedBookingMessage); copyBooking.textContent = 'Copied'; setTimeout(() => { copyBooking.textContent = 'Copy request'; }, 1800); } catch (error) { alert(preparedBookingMessage); }
  });
}

upgradeHero();
insertPerfectSection();
insertWatchPlaceSection();
renderBookingV2();
insertHowBookingWorks();
upgradeRestaurantMedia();
insertRealEntrance();
upgradeGallery();
addStickyBookingCta();
setupBookingV2();
observeRevealItems();
enableSmoothAnchors();
