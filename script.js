// navbar


// Basic Image Carousel Functionality
const slides = document.querySelectorAll('.carousel img');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.remove('active-slide');
    if (i === index) {
      slide.classList.add('active-slide');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Auto-play every 5 seconds
setInterval(nextSlide, 5000);

// Optional: Add buttons for manual navigation (if needed)
const leftArrow = document.createElement('button');
leftArrow.innerText = '<';
leftArrow.className = 'carousel-arrow left';
leftArrow.addEventListener('click', prevSlide);

// document.querySelector('.carousel').appendChild(leftArrow);

const rightArrow = document.createElement('button');
rightArrow.innerText = '>';
rightArrow.className = 'carousel-arrow right';
rightArrow.addEventListener('click', nextSlide);

// document.querySelector('.carousel').appendChild(rightArrow);

const slideshowImages = document.querySelectorAll(".intro-slideshow img");

const nextImageDelay = 5000;
let currentImageCounter = 0; // setting a variable to keep track of the current image (slide)

// slideshowImages[currentImageCounter].style.display = "block";
slideshowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {
  slideshowImages[currentImageCounter].classList.remove("active");

  currentImageCounter = (currentImageCounter + 1) % slideshowImages.length;

  slideshowImages[currentImageCounter].classList.add("active");
}
document.getElementById('prev-btn').addEventListener('click', () => {
  manualSlide((currentImageCounter - 1 + slideshowImages.length) % slideshowImages.length);
});

document.getElementById('next-btn').addEventListener('click', () => {
  manualSlide((currentImageCounter + 1) % slideshowImages.length);
});

function manualSlide(index) {
  slideshowImages[currentImageCounter].classList.remove("active");
  currentImageCounter = index;
  slideshowImages[currentImageCounter].classList.add("active");
  updateDots(); // Update the dots
}


function updateDots() {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentImageCounter].classList.add('active');
}

/*meet our new batch */



// profiles

// gallery
const IMAGES = [
  {
    img: "./assets/gallery/04.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/sports.JPG",
    title: "",
  },
  {
    img: "./assets/gallery/1.jpeg",
    title: "",
  },
  {
    img: "./assets/gallery/a.jpeg",
    title: "",
  },
  {
    img: "./assets/gallery/b.jpeg",
    title: "",
  },
  {
    img: "./assets/gallery/c.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/grp.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/grp2.JPG",
    title: "",
  },
  {
    img: "./assets/gallery/grp3.JPG",
    title: "",
  },
  {
    img: "./assets/gallery/2.jpeg",
    title: "",
  },
  {
    img: "./assets/gallery/03.jpg",
    title: "",
  },
  
  {
    img: "./assets/gallery/5.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/06.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/GROUP_PIC3.jpeg",
    title: "",
  },
  {
    img: "./assets/gallery/8.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/9.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/gallery4.jpg",
    title: "",
  },
  
 
  {
    img: "./assets/gallery/WIN4.jpg",
    title: "",
  },
  {
    img: "./assets/gallery/grp.jpg",
    title: "",
  }
  
]

// selectors
const galleryMainImg = document.getElementById("gallery-main-img");
const galleryThumbsEl = document.getElementById("gallery-thumbs");
const slider = document.getElementById("slider");
const sliderButtons = document.querySelectorAll("[btn-slider]");
const dialogEl = document.getElementById('slider-dialog');
const dialogBtnOpen = document.getElementById('gallery-main-img');
const dialogBtnClose = document.getElementById('btn-dialog-close');

// settings
const animationTime = 320;

// function - render thumbnails
function renderThumbs() {
  galleryThumbsEl.innerHTML = "";

  IMAGES.forEach((el, index) => {
    // Create and append the thumbnail button
    const btn = document.createElement("button");
    btn.type = "button";
    const img = document.createElement("img");
    img.src = el.img;
    img.alt = el.title;
    btn.append(img);
    galleryThumbsEl.append(btn);

    // Set up the thumbnail click event to open the slideshow
    btn.addEventListener("click", () => openSlideShow(index));
  });
}

// add thumbmnails to page
renderThumbs();

// function - click outside dialog
function handleDialogClickOutside(event) {
    if (event.target === dialogEl) {
        dialogEl.close();
    }
}
// function - open slideshow at specified image 
function openSlideShow(startImg = 0) {
  // Ensure the `startImg` index is within bounds
  if (startImg < 0 || startImg >= IMAGES.length) return;

  slider.innerHTML = "";

  // Reorder the IMAGES array to start from the specified image
  const reorderedImages = [
    ...IMAGES.slice(startImg),
    ...IMAGES.slice(0, startImg) 
  ];

  // add images to slideshow
  reorderedImages.forEach(el => {
    const d = document.createElement("div");
    d.dataset.title = el.title;
    const img = document.createElement("img");
    img.src = el.img;
    img.alt = el.title;
    d.append(img);
    slider.append(d);
  });

  // Open the slideshow dialog
  dialogEl.showModal();
  // add the eventhandler to close the dialog when clicking outside
  dialogEl.addEventListener("click", handleDialogClickOutside);
}

// event handlers
dialogBtnOpen.addEventListener('click', openSlideShow);
dialogBtnClose.addEventListener('click', () => dialogEl.close());
dialogEl.addEventListener('close', () => dialogEl.removeEventListener('click', handleDialogClickOutside));

/* SLIDER */
/* slider code adapted from https://codepen.io/cbolson/pen/vYoZQme*/

// slider navigation 
function slideShowControls(){
  sliderButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      // disable all buttons during the animation
      sliderButtons.forEach(button => button.disabled = true);

      const isNext = btn.getAttribute("btn-slider") === "next";
      const el = isNext ? slider.querySelector("div:first-child") : slider.querySelector("div:last-child");
      const animationClass = isNext ? "slider-next" : "slider-prev";

      // move element immediately for "prev"
      if (!isNext) slider.prepend(el); 

      el.classList.add(animationClass);
      requestAnimationFrame(() => {
        setTimeout(() => { /* yes, I know that this would be better using transitionEnd but I was having issue when trying to use the "prev" button */
          // move element after animation for "next"
          if (isNext) slider.append(el); 

          // remove class
          el.classList.remove(animationClass);

          // re-enable the buttons
          sliderButtons.forEach(button => button.disabled = false);
        }, isNext ? animationTime : 1); // delay for each direction
      });
    });
  });
}
slideShowControls();

// recrut section
function recruitAction() {
  alert("Thank you for your interest! We’ll get back to you soon.");
}

// meet