// Audio player
var audio = new Audio();
var bismillah = new Audio();
var ayat = 1;
var verses = 0;
var link = '';
var playing = false;
var ini = true;
var file_name = '';
var autoplay = true;
var offline = true;
var autoscroll = true;

function autoPlay() {
    if (autoplay) {
        autoplay = false;
        document.querySelector(".fa-toggle-on").classList.add("fa-toggle-off");
        document.querySelector(".fa-toggle-on").classList.remove("fa-toggle-on");
    } else {
        autoplay = true;
        document.querySelector(".fa-toggle-off").classList.add("fa-toggle-on");
        document.querySelector(".fa-toggle-off").classList.remove("fa-toggle-off");
    }
}

function autoScroll() {
    if (autoscroll) {
        autoscroll = false;
        document.querySelector(".fa-angles-down").classList.add("fa-arrow-down");
        document.querySelector(".fa-angles-down").classList.remove("fa-angles-down");
    } else {
        autoscroll = true;
        document.querySelector(".fa-arrow-down").classList.add("fa-angles-down");
        document.querySelector(".fa-arrow-down").classList.remove("fa-arrow-down");
    }
}
// Auto next on finish
audio.addEventListener('ended', function() {
    finished();
    if (ayat < verses) {
        if (autoplay) {
            playNext();
        }
    } else if (ayat == verses && autoplay) {
        if (sura < 114) {
            stopAudio();
            sura = sura - 1 + 2;
            createDOM();
            playPause();
        }
    }
});

// Load audio with link
function loadAudio() {
    // Online link
    getFileName(sura, ayat);
    link = base_link + file_name;
    audio.src = link;
    audio.load();
}

// Onclick function Play/Pause
function playPause() {
    if (playing) {
        audio.pause();
        playing = false;
        // Not playing - show play button
        showPlay();
    } else {
        if (ini && sura > 1 && !playing) {
            playing = true;
            if (offline) {
                bismillah.src = base_link + '1/1.mp3';
            } else {
                bismillah.src = base_link + '001001.ogg';
            }
            bismillah.load();
            bismillah.play();
            bismillah.addEventListener('ended', function() {
                playAudio();
                playing = true;
                ini = false;
            });
        } else if (ini && sura > 1 && playing) {
            bismillah.pause();
            playing = false;
            showPlay();
        } else {
            playAudio();
            playing = true;
            ini = false;
        }
        // Playing - show pause button
        showPause();
    }
}

function playCurrent(num) {
    if (playing) {
        stopAudio();
        ayat = (num.id).slice(1);
        playAudio();
        playing = true;

    } else {
        ayat = (num.id).slice(1);
        playAudio();
        playing = true;
        ini = false;
    }
    // Playing - show pause button
    showPause();
}

function playAudio() {
    loadAudio();
    highLight();
    playing = true;
    audio.play();
}

// Stop audio & reset
function stopAudio() {
    finished();
    audio.pause();
    ayat = 1;
    link = '';
    playing = false;
    ini = true;
    // Not playing - show play button
    showPlay();

}

function playNext() {
    if (ayat < verses && !ini) {
        finished();
        audio.pause();
        ayat = ayat - 1 + 2;
        playAudio();
    }
}

function playPrev() {
    if (ayat > 1 && !ini) {
        finished();
        audio.pause();
        ayat -= 1;
        playAudio();
    }
}

// Highlight current ayat
function highLight() {
    var id = 'a' + ayat;
    var a_ayat = document.getElementById(id);
    a_ayat.className = 'a_ayat';
    if (autoscroll) {
        a_ayat.scrollIntoView(false);
    }
    document.getElementById('loader').style.width = (ayat / verses) * 100 + '%';
}

function finished() {
    var id = 'a' + ayat;
    document.getElementById(id).className = 'ayat';
    document.getElementById('loader').style.width = 0 + '%';
}

function getFileName(sura, ayat) {
    if (offline) {
        file_name = sura + '/' + ayat + '.mp3';
    } else {
        var sl = '';
        var al = '';
        if (sura < 10) {
            sl = '00' + sura;
        } else if (sura < 100 && sura > 9) {
            sl = '0' + sura;
        } else {
            sl = sura;
        }
        if (ayat < 10) {
            al = '00' + ayat;
        } else if (ayat < 100 && ayat > 9) {
            al = '0' + ayat;
        } else {
            al = ayat;
        }
        file_name = sl + al + '.ogg'
    }
}

function showPause() {
    document.getElementById("btnPlay").classList.add('fa-pause');
    document.getElementById("btnPlay").classList.remove('fa-play');
}

function showPlay() {
    document.getElementById("btnPlay").classList.add('fa-play');
    document.getElementById("btnPlay").classList.remove('fa-pause');
}

// Set Audio Source
var base_link = '';
if (offline) {
    base_link = './audio/';
} else {
    base_link = 'https://download.quranicaudio.com/verses/Alafasy/ogg/';
}


function setAudioSource(data) {
    if (data.value == "alafasy_offline") {
        offline = true;
        base_link = './audio/';
    } else {
        offline = false;
        switch (data.value) {
            case "AbdulBaset":
                base_link = "https://download.quranicaudio.com/verses/AbdulBaset/ogg/";
                break;
            case "Alafasy":
                base_link = "https://download.quranicaudio.com/verses/Alafasy/ogg/";
                break;
            case "Husary":
                base_link = "https://download.quranicaudio.com/verses/Husary/ogg/";
                break;
            case "Jibreel":
                base_link = "https://download.quranicaudio.com/verses/Jibreel/ogg/";
                break;
            case "Minshawi":
                base_link = "https://download.quranicaudio.com/verses/Minshawi/ogg/";
                break;
            case "Rifai":
                base_link = "https://download.quranicaudio.com/verses/Rifai/ogg/";
                break;
            case "Shatri":
                base_link = "https://download.quranicaudio.com/verses/Shatri/ogg/";
                break;
            case "Shuraym":
                base_link = "https://download.quranicaudio.com/verses/Shuraym/ogg/";
                break;
            case "Sudais":
                base_link = "https://download.quranicaudio.com/verses/Sudais/ogg/";
                break;
            case "Tunaiji":
                base_link = "https://download.quranicaudio.com/verses/Tunaiji/ogg/";
                break;
        }
    }
    hideOptions(data.id);
}

// Key binding
window.addEventListener('keydown', function(e) {
    // this.alert(e.key);
    switch (e.key) {
        case "p":
            playPause();
            break;
        case 's':
            settingsToggle();
            break;
        case 'i':
            indexToggle();
            break;
        case 'b':
            toggleBg();
            break;
        case 'q':
            darkLight();
            break;
        case 'f':
            fullScreen();
            break;
        case 'ArrowRight':
            playNext();
            break;
        case 'ArrowLeft':
            playPrev();
            break;
    }

});