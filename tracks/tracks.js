let width = 0;
let orienationVar;

function layout () {
  // Redefine 'vh' in CSS based on what's actually available (excluding address bar).
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  // Determine what orientation device has.
  // We add +1 to gutter lengths to avoid layout bugs that I don't quite understand.
  if (window.innerWidth <= window.innerHeight) {
    let aspectRatio = window.innerHeight / window.innerWidth;
    if (aspectRatio < 1.777) {
      width = ((0.5625 * window.innerHeight) / window.innerWidth) * window.innerWidth;
      document.documentElement.style.setProperty("--w", `${width}px`);
      document.documentElement.style.setProperty("--h", `${window.innerHeight}px`);
      document.documentElement.style.setProperty("--gh", `${window.innerHeight + 1}px`);
      document.documentElement.style.setProperty("--gw", `${((window.innerWidth - width)/2) + 1}px`);
    }
    else {
      width = window.innerWidth;
      document.documentElement.style.setProperty("--h", `${window.innerWidth * 1.777}px`);
      document.documentElement.style.setProperty("--w", `${window.innerWidth}px`);
      document.documentElement.style.setProperty("--gh", `${((window.innerHeight - (window.innerWidth * 1.777))/2) + 1}px`);
      document.documentElement.style.setProperty("--gw", `${window.innerWidth + 1}px`);
    };
    orientationVar = "portrait";
    // document.documentElement.style.setProperty("--orientation", "portrait");
  }
  else {
    let aspectRatio = window.innerWidth / window.innerHeight;
    if(aspectRatio < 1.6) {
      let height = ((0.625 * window.innerWidth) / window.innerHeight) * window.innerHeight;
      width = window.innerWidth;
      document.documentElement.style.setProperty("--h", `${height}px`);
      document.documentElement.style.setProperty("--w", `${window.innerWidth}px`);
      document.documentElement.style.setProperty("--gh", `${((window.innerHeight - height)/2)+1}px`);
      document.documentElement.style.setProperty("--gw", `${(window.innerWidth) + 1}px`);
    }
    else {
      width = vh * 100 * 1.6;
      document.documentElement.style.setProperty("--h", `${window.innerHeight}px`);
      document.documentElement.style.setProperty("--w", `${width}px`);
      document.documentElement.style.setProperty("--gh", `${window.innerHeight + 1}px`);
      document.documentElement.style.setProperty("--gw", `${((window.innerWidth - width)/2) + 1}px`);
    }
    orientationVar = "landscape";
    document.documentElement.style.setProperty("--orientation", "landscape");
  }
}

layout();

function resize() {
  resizeReady = true;
  layout();
}

let resizeReady = true;
window.addEventListener("resize", ()=> {
  if(resizeReady) {
    resizeReady = false;
    setTimeout(resize, 2000);
  }
});

// TRACK ANIMATIONS /////////////////////////////////////////
let currentAnimation = tl1;
let currentAnimationElement = document.getElementById("track-animation1");
currentAnimationElement.style.display = "block";

// AUDIO ELEMENT /////////////////////////////////////////////
const audioPlayer = document.getElementById("audio-player");
audioPlayer.addEventListener("ended", ()=> {
  currentAnimation.restart();
  currentAnimation.pause();
  switchToPlay();
});

// TRACK NAME //////////////////////////////////////////////
let trackNameElement = document.getElementById("track-name");
trackNameElement.innerHTML = "Hunger";

function switchTrackName(trackName) {
  const tl = gsap.timeline();
  tl.to(trackNameElement, {
    duration: 1,
    transform: "rotateY(90deg)", 
  });
  tl.to(trackNameElement, {
    duration: 1,
    transform: "rotateY(0deg)",
  })
  setTimeout(()=> {
    trackNameElement.innerHTML = trackName; 
  }, 1000);
}

// PLAY-PAUSE-BUTTON //////////////////////////////////////////
let buttonState = "play";
function switchToPause() {
  buttonState = "pause";
  currentAnimation.play();
  gsap.to("#pause-play-icon1", {
    duration: 1,
    attr: {
      d: "M 20,20 L 40,20 L 40,80 L 20,80",
    },
  });
  
  gsap.to("#pause-play-icon2", {
    duration: 1,
    attr: {
      d: "M 55,20 L 75,20 L 75,80 L 55,80 Z",
    },
  });
};

function switchToPlay() {
  buttonState = "play";
  currentAnimation.pause();
  gsap.to("#pause-play-icon1", {
    duration: 1,
    attr: {
      d: "M 30,20 L 55,35 L 55,65 L 30,80 Z",
    },
  });
  
  gsap.to("#pause-play-icon2", {
    duration: 1,
    attr: {
      d: "M 55,35 L 80,50 L 55,65 L 54,65 Z",
    },
  });
};

document.getElementById("pause-play-button").addEventListener("click", e => {
  if (buttonState === "play") {
    switchToPause();
    audioPlayer.play();
  } else {
    switchToPlay();
    audioPlayer.pause();
  }
});

// TRACK BUTTONS ////////////////////////////////////////////
for (let trackButton of document.getElementsByClassName("track-button")) {
  trackButton.addEventListener("click", e => {
    currentAnimationElement.style.display = "none";
    currentAnimation.restart();
    currentAnimation.pause();
    if (e.target.id === "hunger") {
      currentAnimationElement = document.getElementById("track-animation1");
      currentAnimation = tl1;
      switchTrackName("Hunger");
      audioPlayer.src = "./assets/audio/hunger.mp3";
    } else if (e.target.id === "can") {
      currentAnimationElement = document.getElementById("track-animation2");
      currentAnimation = tl2;
      switchTrackName("Can");
      audioPlayer.src = "./assets/audio/can.mp3";
    } else if (e.target.id === "empty-mirror") {
      currentAnimationElement = document.getElementById("track-animation3");
      currentAnimation = tl3;
      switchTrackName("Empty Mirror");
      audioPlayer.src = "./assets/audio/empty-mirror.mp3";
    } else if (e.target.id === "black-rainbow") {
      currentAnimationElement = document.getElementById("track-animation4");
      currentAnimation = tl4;
      switchTrackName("Black Rainbow / Black Gold");
      audioPlayer.src = "./assets/audio/black-rainbow-black-gold.mp3";
    } else if (e.target.id === "police-truck") {
      currentAnimationElement = document.getElementById("track-animation5");
      currentAnimation = tl5;
      switchTrackName("Police Truck");
      audioPlayer.src = "./assets/audio/police-truck.mp3"
    };
    if (buttonState = "pause") {
      switchToPlay();
    };
    currentAnimationElement.style.display = "block";
  });
}

// ABOUT LINK ///////////////////////////////////////////////////
document.getElementById("about-link").addEventListener("click", e => {
  e.preventDefault();
  gsap.to(".vp", {
    duration: 5,
    filter: `blur(${width/20}px)`,
  });
  setTimeout(()=> {
    window.location.href="./about.html";
  },5000)
});



