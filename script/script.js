// initialize variables
let slideIndex, slides, dots, captionText;

// function that initiate slide show
const initGallery = () => {
  slideIndex = 0;
  slides = document.getElementsByClassName("imageHolder");
  slides[slideIndex].style.opacity = 1;

  captionText = document.querySelector(".captionTextHolder .captionText");
  captionText.innerText =
    slides[slideIndex].querySelector(".captionText").innerText;

  //add dots
  dots = [];
  let dotsContainer = document.getElementById("dotsContainer");
  for (let i = 0; i < slides.length; i++) {
    let dot = document.createElement("span");
    dot.classList.add("dots");
    dotsContainer.append(dot);
    dot.setAttribute("onclick", "moveSlide(" + i + ")");
    dots.push(dot);
  }
  dots[slideIndex].classList.add("active");
};

initGallery();

const plusSlides = (n) => {
  moveSlide(slideIndex + n);
};

const moveSlide = (n) => {
  let current, next;
  let moveSlideAnimClass = {
    forCurrent: "",
    forNext: "",
  };

  let slideTextAnimClass;

  if (n > slideIndex) {
    if (n >= slides.length) {
      n = 0;
    }
    moveSlideAnimClass.forCurrent = "moveLeftCurrentSlide";
    moveSlideAnimClass.forNext = "moveLeftNextSlide";
    slideTextAnimClass = "slideTextFromTop";
  } else if (n < slideIndex) {
    if (n < 0) {
      n = slides.length - 1;
    }
    moveSlideAnimClass.forCurrent = "moveRightCurrentSlide";
    moveSlideAnimClass.forNext = "moveRightPrevSlide";
    slideTextAnimClass = "slideTextFromBottom";
  }

  if (n != slideIndex) {
    next = slides[n];
    current = slides[slideIndex];
    for (let i = 0; i < slides.length; i++) {
      slides[i].className = "imageHolder";
      slides[i].style.opacity = 0;
      dots[i].classList.remove("active");
    }
    current.classList.add(moveSlideAnimClass.forCurrent);
    next.classList.add(moveSlideAnimClass.forNext);

    dots[n].classList.add("active");
    slideIndex = n;
    captionText.style.display = "none";
    captionText.className = "captionText " + slideTextAnimClass;
    captionText.innerText = slides[n].querySelector(".captionText").innerText;
    captionText.style.display = "block";
  }
};

let timer = null;

const setTimer = () => {
  timer = setInterval(() => {
    plusSlides(1);
  }, 3000);
};

setTimer();

const playPauseSlides = () => {
  let playPauseBtn = document.getElementById("playPause");
  if (timer == null) {
    setTimer();
    playPauseBtn.style.backgroundPositionY = "0px";
  } else {
    clearInterval(timer);
    timer = null;
    playPauseBtn.style.backgroundPositionY = "-33px";
  }
};
