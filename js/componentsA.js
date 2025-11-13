// ================= Hamburger Menu =================
const hamburger = document.getElementById("hamburger");
const mainNav = document.querySelector(".main-nav");

hamburger.addEventListener("click", () => {
  mainNav.classList.toggle("active");
});

// ================= Tabs =================
const tabButtons = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const target = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(target).classList.add("active");
  });
});

// ================= Accordion =================
const accordions = document.querySelectorAll(".accordion-btn");

accordions.forEach(btn => {
  btn.addEventListener("click", () => {
    const panel = btn.nextElementSibling;
    btn.classList.toggle("active");
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    }
  });
});

// ================= Progress Bar Animation =================
document.addEventListener("DOMContentLoaded", () => {
  const progressFills = document.querySelectorAll(".progress-fill");
  progressFills.forEach(fill => {
    fill.style.width = fill.style.width || "60%";
  });
});

// ================= Carousel =================
const track = document.querySelector('.carousel-track');
const slides = Array.from(track?.children || []);
const nextBtn = document.querySelector('.carousel-btn.next');
const prevBtn = document.querySelector('.carousel-btn.prev');
let currentIndex = 0;

function updateCarousel() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
}

nextBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

prevBtn?.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// ================= Modal =================
const modal = document.getElementById('modal');
const openModal = document.getElementById('openModal');
const closeModal = document.querySelector('.close-btn');

openModal?.addEventListener('click', () => { modal.style.display = 'flex'; });
closeModal?.addEventListener('click', () => { modal.style.display = 'none'; });
window.addEventListener('click', e => { if(e.target === modal) modal.style.display='none'; });

// ================= Toast Notifications =================
const toast = document.getElementById('toast');
const toastBtn = document.getElementById('toastBtn');

toastBtn?.addEventListener('click', () => {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3000);
});

// ================= Pagination =================
const pageButtons = document.querySelectorAll('.page-btn');
pageButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    pageButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ================= Multi-step Form =================
const multiForm = document.querySelector('.multi-step-form');
if(multiForm){
  const steps = multiForm.querySelectorAll('.step');
  let currentStep = 0;
  const nextBtns = multiForm.querySelectorAll('.next-step');
  const prevBtns = multiForm.querySelectorAll('.prev-step');

  function showStep(index){
    steps.forEach((s,i) => s.classList.toggle('active', i===index));
  }

  nextBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(currentStep < steps.length-1){
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  prevBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      if(currentStep > 0){
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  showStep(currentStep);
}

// ================= Search Auto-suggestions =================
const searchInput = document.querySelector('.search-demo input');
const searchResults = document.querySelector('.search-results');
const sampleSuggestions = ["Apple","Banana","Orange","Grapes","Pineapple","Mango"];

searchInput?.addEventListener('input',()=>{
  const query = searchInput.value.toLowerCase();
  searchResults.innerHTML = '';
  if(query){
    const matches = sampleSuggestions.filter(item=>item.toLowerCase().includes(query));
    matches.forEach(match=>{
      const li = document.createElement('li');
      li.textContent = match;
      li.addEventListener('click',()=>{
        searchInput.value = match;
        searchResults.style.display = 'none';
      });
      searchResults.appendChild(li);
    });
    searchResults.style.display = matches.length ? 'block' : 'none';
  } else {
    searchResults.style.display = 'none';
  }
});

// ================= Lightbox =================
const lightboxImages = document.querySelectorAll('.media-img');
let lightboxOverlay;

lightboxImages.forEach(img=>{
  img.addEventListener('click', ()=>{
    lightboxOverlay = document.createElement('div');
    lightboxOverlay.style.position='fixed';
    lightboxOverlay.style.top='0';
    lightboxOverlay.style.left='0';
    lightboxOverlay.style.width='100%';
    lightboxOverlay.style.height='100%';
    lightboxOverlay.style.background='rgba(0,0,0,0.8)';
    lightboxOverlay.style.display='flex';
    lightboxOverlay.style.justifyContent='center';
    lightboxOverlay.style.alignItems='center';
    lightboxOverlay.style.zIndex='2000';
    
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.style.maxWidth='90%';
    imgEl.style.maxHeight='90%';
    imgEl.style.borderRadius='5px';
    
    lightboxOverlay.appendChild(imgEl);
    document.body.appendChild(lightboxOverlay);

    lightboxOverlay.addEventListener('click',()=>{
      document.body.removeChild(lightboxOverlay);
    });
  });
});
