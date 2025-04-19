var darkLightBtn = document.getElementById('darkLight');
var mood = 'light';
var theme = document.getElementById('theme');
var star_color = document.getElementById('star_color');

function darkLight(data) {
    if (mood == 'dark') {
        darkLightBtn.classList.add('fa-sun');
        darkLightBtn.classList.remove('fa-moon');
        mood = 'light';
        theme.href = './css/light.css';
    } else {
        darkLightBtn.classList.add('fa-moon');
        darkLightBtn.classList.remove('fa-sun');
        mood = 'dark';
        theme.href = './css/dark.css';
    }
}


// Background
var body = document.getElementById('body');
var bg_img = document.getElementById('bg_img');
var bg = 2;

function toggleBg() {
    var bg_url = 'url(./img/bg_' + bg + '.jpg)';
    body.style.backgroundImage = bg_url;
    bg_img.src = './img/bg_' + bg + '.jpg';
    bg++;
    if (bg > 87) {
        bg = 1;
    }
}

function randomStar() {
    var color = 'rgb(' + getColorCode() + ', ' + getColorCode() + ', ' + getColorCode() + ')';
    star_color.innerHTML = ':root {--sc: ' + color + ';}';
}

function getColorCode() {
    var code = Math.random() * 255;
    code = Math.round(code);
    return code;
}

function changeFont(data) {
    if (data.id == 'ar') {
        var elm = '.ar {font-family: ' + data.value + ';}';
    } else if (data.id == 'bn') {
        var elm = '#index h2,#settings h2,#index ol li,.ayat,.a_ayat,.name h2 {font-family: ' + data.value + ';}';
    }
    var ID = data.id + '_font';
    document.getElementById(ID).innerHTML = elm;
    hideOptions(data.id);
}

// Show and Hide Options

function showOptions(data) {
    var ID = data.id + '_options';
    document.getElementById(ID).style.display = 'block';
    var sel = data.id + '_arrow';
    if (document.getElementById(sel)) {
        document.getElementById(sel).classList.add('fa-caret-down');
        document.getElementById(sel).classList.remove('fa-caret-right');

    }
}

function hideOptions(data) {
    var ID = data + '_options';
    document.getElementById(ID).style.display = 'none';
    var sel = data + '_arrow';
    document.getElementById(sel).classList.add('fa-caret-right');
    document.getElementById(sel).classList.remove('fa-caret-down');
}

function changeFontSize(data) {
    var ar_size_style = document.getElementById("ar_size_style");
    var bn_size_style = document.getElementById("bn_size_style");
    var ar_size = document.getElementById("ar_size");
    var bn_size = document.getElementById("bn_size");
    var arFontSize = data.value;
    var bnFontSize = data.value;
    if (data.name == 'ar_font') {
        ar_size_style.innerHTML = '.ar{font-size: ' + arFontSize + 'px;}';
        ar_size.innerText = data.value;
    } else if (data.name == 'bn_font') {
        bn_size_style.innerHTML = '.bn,.pr {font-size: ' + bnFontSize + 'px;}';
        bn_size.innerText = data.value;
    }
}

// Show and Hide Info
var info_vis = false;

function showHideInfo(data) {
    if (!info_vis) {
        var ID = data.id + '_options';
        document.getElementById(ID).style.display = 'block';
        info_vis = true;
    } else {
        var ID = data.id + '_options';
        document.getElementById(ID).style.display = 'none';
        info_vis = false;
    }
}
// Fullscreen
var fullscreen = false;

function fullScreen() {
    var full = document.getElementById('full');
    if (fullscreen) {
        document.exitFullscreen();
        if (!index_hidden) {
            indexToggle();
        }
        if (!settings_hidden) {
            settingsToggle();
        }
        fullscreen = false;
        full.classList.add('fa-expand');
        full.classList.remove('fa-compress');
    } else {
        document.getElementById('body').requestFullscreen();
        if (window.innerWidth > 900) {
            index_hidden = false;
            settings_hidden = true;
        }
        fullscreen = true;
        full.classList.add('fa-compress');
        full.classList.remove('fa-expand');
    }
}