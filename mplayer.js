let wrapper = document.querySelector(".wrapper"),
    musicimage = wrapper.querySelector("img"),
    musicname = wrapper.querySelector(".name"),
    musicartist = wrapper.querySelector(".artists"),
    playpausebtn = wrapper.querySelector(".play-pause"),
    prevbtn = wrapper.querySelector("#prev"),
    nextbtn = wrapper.querySelector("#next"),
    maudio = wrapper.querySelector("#m-audio"),
    progressarea = wrapper.querySelector(".progress-area"),
    progressbar = wrapper.querySelector(".progressbar"),
    start = wrapper.querySelector(".current-time"),
    end = wrapper.querySelector(".max-duration"),
    musiclist = wrapper.querySelector(".music-list"),
    menulistbtn = wrapper.querySelector("#menu-list"),
    closemusicbtn = wrapper.querySelector("#close");

let musicall = [
    {
        id: "music-1",
        name: "Let Me Down Slowly",
        artist: "Alec Benjamin",
        img: "./images/letmedown_slowly.jpg",
        link: "./musicname/Let_me_down_slowly.mp3"
    },
    {
        id: "music-2",
        name: "Baby",
        artist: "Justin Bieber, Ludacris",
        img: "./images/baby_song.jpg",
        link: "./musicname/Baby_song.mp3"
    },
    {
        id: "music-3",
        name: "Shape Of You",
        artist: "Ed Sheeran",
        img: "./images/Shapeof_you.jpg",
        link: "./musicname/Shape_of_you.mp3"
    },
    {
        id: "music-4",
        name: "Safari",
        artist: "Serena",
        img: "./images/safari.jpg",
        link: "./musicname/Safari_song.mp3"
    },
    {
        id: "music-5",
        name: "Sugar & Brownies",
        artist: "Dharia",
        img: "./images/sugar_brownies.jpg",
        link: "./musicname/Sugar_brownies_song.mp3"
    },
    {
        id: "music-6",
        name: "Hass Hass",
        artist: "Diljit Dosanjh",
        img: "./images/hass_hass_song.jpg",
        link: "./musicname/hass_hass_song.mp3"
    },
    {
        id: "music-7",
        name: "Admiring You",
        artist: "Karan Aujla",
        img: "./images/admirin_you_song.jpg",
        link: "./musicname/admirin_song.mp3"
    }
];

let musicIndex = 0;
window.addEventListener("load", function () {
    loadMusic(musicIndex);
    playingSong();
})
// load Music function
function loadMusic(indexNumb) {
    musicimage.src = musicall[indexNumb].img;
    maudio.src = musicall[indexNumb].link;
    musicname.innerHTML = musicall[indexNumb].name;
    musicartist.innerHTML = musicall[indexNumb].artist;
}
// play Music function
function playMusic() {
    wrapper.classList.add("paused")
    musicimage.classList.add("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    maudio.play();
}
// pause Music function
function pauseMusic() {
    wrapper.classList.remove("paused")
    musicimage.classList.remove("rotate");
    playpausebtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    maudio.pause();
}
// play or music button event
playpausebtn.addEventListener("click", function () {
    if (wrapper.classList.contains("paused")) {
        pauseMusic();
    }
    else {
        playMusic();
    }

})
//prev button event
prevbtn.addEventListener("click", function () {
    prevMusic();
})
// prev music function
function prevMusic() {
    musicIndex--;
    if (musicIndex < 0) {
        musicIndex = musicall.length - 1;
    }
    loadMusic(musicIndex);
    playMusic();
}
//next button event
nextbtn.addEventListener("click", function () {
    nextMusic();
})
// next music function
function nextMusic() {
    musicIndex++;
    if (musicIndex > musicall.length - 1) {
        musicIndex = 0;
    }
    loadMusic(musicIndex);
    playMusic();
}
maudio.onloadedmetadata = function () {
    //update music total duration
    progressbar.max = maudio.duration;
    progressbar.value = maudio.currentTime;

    setInterval(() => {
        let min = Math.floor(maudio.duration / 60);
        let sec = Math.floor(maudio.duration % 60);
        let curMin = Math.floor(maudio.currentTime / 60);
        let curSec = Math.floor(maudio.currentTime % 60);

        if (sec < 10) { //if sec is less than 10 then add 0 before it
            sec = "0" + sec;
        }
        if (curSec < 10) {
            curSec = "0" + curSec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (curMin < 10) {
            curMin = "0" + curMin;
        }

        let total_duration= min + ":" + sec;
        start.innerHTML = curMin + ":" + curSec;
        if(maudio.duration){
            end.innerHTML =   `${total_duration}`;
        }
    }, 1000);
};

//  update progressbar width according to music current time
maudio.addEventListener("timeupdate", (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    let progressWidth = (currentTime / duration) * 100;
    progressbar.style.width = `${progressWidth}%`;
});

// update playing song current width according to the progress bar width
progressarea.addEventListener("click", (e) => {
    let progressWidth = progressarea.clientWidth; //getting width of porgress bar
    let poffsetX = e.offsetX; //getting offset x value
    let songDuration = maudio.duration; //getting song total duration

    maudio.currentTime = (poffsetX / progressWidth) * songDuration;
    playMusic();
})

// When music ended
maudio.addEventListener("ended", () => {
    nextMusic();
})

// Show the music list
menulistbtn.addEventListener("click", () => {
    musiclist.classList.toggle("show");
})

// Close button in music list
closemusicbtn.addEventListener("click", () => {
    menulistbtn.click();
})

const ultag = wrapper.querySelector("ul")
// create li tags according to array length for list
for (let i = 0; i < musicall.length; i++) {
    let litag = `<li  li-index="${i}">
    <div class="row">
        <span>${musicall[i].name}</span>
        <p>${musicall[i].artist}</p>
    </div>
    <audio  class="${musicall[i].id}" src="${musicall[i].link}" type="audio/mp3"></audio>
    <span id="${musicall[i].id}" class="audio-duration m-list">02:49</span>
</li>`
    ultag.insertAdjacentHTML("beforeend", litag);

    let liaudiodurationtag = ultag.querySelector(`#${musicall[i].id}`)
    let liaudiotag = ultag.querySelector(`.${musicall[i].id}`)
    liaudiotag.addEventListener("loadeddata", () => {
        let duration = liaudiotag.duration;
        let min = Math.floor(duration / 60);
        let sec = Math.floor(duration % 60);
        if (sec < 10) {
            sec = "0" + sec;
        }
        liaudiodurationtag.innerHTML = min + ":" + sec;
    })
    
}

//play particular song from the list
let litags = ultag.querySelectorAll("li")
function playingSong() {
    for (let j = 0; j < litags.length; j++) {
        let audioTag = litags[j].querySelector(".audio-duration");
        if (litags[j].classList.contains("playing")) {
            litags[j].classList.remove("playing")
            audioTag.innerHTML="";
        }
        if (litags[j].getAttribute("li-index") == musicIndex) {
            litags[j].classList.add("playing");
            audioTag.innerHTML = `<iconify-icon icon="streamline:music-equalizer" style="color: #72a2ea;" width="20" height="20"></iconify-icon>`
        }
        // adding on click attribute in all li
        litags[j].setAttribute("onclick", "clicked(this)");
    }
}

// play song on click li
function clicked(element) {
    //getting li index of particular clicked li tag
    let getliindex = element.getAttribute("li-index");
    musicIndex = getliindex;
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}



