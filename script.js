const bookingStyle = document.createElement('link');
bookingStyle.rel = 'stylesheet';
bookingStyle.href = 'booking.css';
document.head.appendChild(bookingStyle);

const revealItems = document.querySelectorAll('.reveal');

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

const ownerWhatsAppPhone = '306982875538';
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const nightsCount = document.getElementById('nightsCount');
const selectedPlaceLabel = document.getElementById('selectedPlaceLabel');
const selectedPlaceInput = document.getElementById('selectedPlace');
const selectedPlaceTypeInput = document.getElementById('selectedPlaceType');
const bookingForm = document.getElementById('bookingForm');
const bookingResult = document.getElementById('bookingResult');
const bookingResultText = document.getElementById('bookingResultText');
const bookingWhatsApp = document.getElementById('bookingWhatsApp');
const copyBooking = document.getElementById('copyBooking');

let selectedPitch = null;
let preparedBookingMessage = '';

function getTodayIso() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today.toISOString().split('T')[0];
}

function calculateNights() {
  if (!checkIn?.value || !checkOut?.value) return null;

  const start = new Date(checkIn.value);
  const end = new Date(checkOut.value);
  const difference = end - start;
  const nights = Math.round(difference / (1000 * 60 * 60 * 24));

  return nights > 0 ? nights : null;
}

function updateDateSummary() {
  if (!checkIn || !checkOut || !nightsCount) return;

  if (checkIn.value) {
    checkOut.min = checkIn.value;
  }

  const nights = calculateNights();
  nightsCount.textContent = nights ? `${nights} night${nights === 1 ? '' : 's'}` : 'Select valid dates';
}

function updateSelectedPlace(button) {
  document.querySelectorAll('.pitch.selected').forEach(item => item.classList.remove('selected'));

  selectedPitch = {
    place: button.dataset.place,
    type: button.dataset.type,
  };

  button.classList.add('selected');
  selectedPlaceInput.value = selectedPitch.place;
  selectedPlaceTypeInput.value = selectedPitch.type;
  selectedPlaceLabel.textContent = `${selectedPitch.place} · ${selectedPitch.type}`;
}

function buildBookingMessage() {
  const nights = calculateNights();
  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const email = document.getElementById('guestEmail').value.trim();
  const message = document.getElementById('guestMessage').value.trim();

  return [
    'Hello, I would like to request a booking at Ipsos Camping Corfu.',
    '',
    `Check-in: ${checkIn.value}`,
    `Check-out: ${checkOut.value}`,
    `Nights: ${nights}`,
    `Selected place: ${selectedPitch.place} (${selectedPitch.type})`,
    `Name: ${name}`,
    `Phone / WhatsApp: ${phone}`,
    email ? `Email: ${email}` : 'Email: not provided',
    message ? `Message: ${message}` : 'Message: no extra message',
    '',
    'Please confirm availability and price. Thank you.',
  ].join('\n');
}

function showBookingResult() {
  const nights = calculateNights();
  bookingResultText.textContent = `${selectedPitch.place} (${selectedPitch.type}) · ${checkIn.value} to ${checkOut.value} · ${nights} night${nights === 1 ? '' : 's'}`;
  bookingWhatsApp.href = `https://wa.me/${ownerWhatsAppPhone}?text=${encodeURIComponent(preparedBookingMessage)}`;
  bookingResult.hidden = false;
  bookingResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

if (checkIn && checkOut) {
  const todayIso = getTodayIso();
  checkIn.min = todayIso;
  checkOut.min = todayIso;
  checkIn.addEventListener('change', updateDateSummary);
  checkOut.addEventListener('change', updateDateSummary);
}

document.querySelectorAll('.pitch.available').forEach(button => {
  button.addEventListener('click', () => updateSelectedPlace(button));
});

if (bookingForm) {
  bookingForm.addEventListener('submit', event => {
    event.preventDefault();

    const nights = calculateNights();

    if (!nights) {
      alert('Please select valid check-in and check-out dates.');
      return;
    }

    if (!selectedPitch) {
      alert('Please select an available camping place.');
      return;
    }

    if (!bookingForm.reportValidity()) {
      return;
    }

    preparedBookingMessage = buildBookingMessage();
    showBookingResult();
  });
}

if (copyBooking) {
  copyBooking.addEventListener('click', async () => {
    if (!preparedBookingMessage) return;

    try {
      await navigator.clipboard.writeText(preparedBookingMessage);
      copyBooking.textContent = 'Copied';
      setTimeout(() => {
        copyBooking.textContent = 'Copy request';
      }, 1800);
    } catch (error) {
      alert(preparedBookingMessage);
    }
  });
}
