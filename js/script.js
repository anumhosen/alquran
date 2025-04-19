var xhr = new XMLHttpRequest();
var xhri = new XMLHttpRequest();
var index = document.getElementById('index');
var docs = document.getElementById('main');
var settings = document.getElementById('settings');
var sura = 1;

xhri.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        var index_elem = '<h2>সূচিপত্র</h2><button onclick="indexToggle()"><i class="fas fa-x"></i></button><ol>';
        for (i in data) {
            index_elem += '<li onclick="loadSura(this)" id="' + data[i].id + '"><p>' + (i - 1 + 2) + '.</p>' + data[i].bn + '</li>';
        }
        index_elem += '</ol>';
        index.innerHTML = index_elem;
        createDOM();
    }
};
xhri.open("GET", "json/sura_names.json", true);
xhri.send();

// Onclick function
function loadSura(ind) {
    stopAudio();
    sura = ind.id;
    createDOM();
    if (window.innerWidth < 901) {
        toggle();
    }
}

function createDOM() {
    var sura_link = 'json/sura_' + sura + '.json';
    var text = '<div class="sura" id="' + sura + '"><div class="name"></div>';
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = JSON.parse(this.responseText);
            if (sura != 1) {
                text += '<div class="ayat">';
                if (arabic) {
                    text += '<p class="ar">بِسْمِ اللَّهِ الرَّحْمٰنِ الرَّحِيمِ</p>';
                }
                if (pronunciation) {
                    text += '<p class="pr">বিছমিল্লাহির রাহমানির রাহিম।</p>';
                }
                if (translation) {
                    text += '<p class="bn">শুরু করছি আল্লাহর নামে যিনি পরম করুণাময়, অতি দয়ালু।</p>';
                }
                text += '</div>';
            }
            for (i in data) {
                if (data[i].sura_id == sura) {
                    text += '<div class="ayat" id="a' + data[i].ayat_id + '"><span><h1 class="ayat_num">' + data[i].ayat_id + '</h1><button id="b' + data[i].ayat_id + '" onclick="playCurrent(this)"><i class="fas fa-play"></i></button></span>';
                    if (arabic) {
                        text += '<p class="ar">' + data[i].ar + '</p>';
                    }
                    if (pronunciation) {
                        text += '<p class="pr">' + data[i].pr + '</p>';
                    }
                    if (translation) {
                        text += '<p class="bn">' + data[i].bn + '</p>';
                    }
                    text += "</div>";
                    verses = data[i].ayat_id;
                }
            }
            text += '</div>';
            docs.innerHTML = text;
            //Adding Name
            xhri.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    var data = JSON.parse(this.responseText);
                    document.getElementsByClassName('name')[0].innerHTML = '<h2>' + data[sura - 1].bn + ' (' + data[sura - 1].m_bn + ') - ' + data[sura - 1].ar + '</h2>';
                }
            };
            xhri.open("GET", "json/sura_names.json", true);
            xhri.send();
            docs.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    };
    xhr.open("GET", sura_link, true);
    xhr.send();
}

// Show - Hide index
var index_hidden = true;
var settings_hidden = true;
if (window.innerWidth > 900) {
    index_hidden = false;
    settings_hidden = true;
}

function indexToggle() {
    if (window.innerWidth < 901) {
        if (index_hidden) {
            index.style.display = 'block';
            docs.style.display = 'none';
            settings.style.display = 'none';
            index_hidden = false;
            settings_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.display = 'block';
            docs.style.width = '100%';
            index_hidden = true;
        }
    } else {
        if (index_hidden) {
            index.style.display = 'block';
            settings.style.display = 'none';
            if (window.innerWidth > 1200) {
                docs.style.width = '75%';
            } else {
                docs.style.width = '70%';
            }
            index_hidden = false;
            settings_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.width = '100%';
            index_hidden = true;
        }
    }
}

function settingsToggle() {
    if (window.innerWidth < 901) {
        if (settings_hidden) {
            settings.style.display = 'block';
            docs.style.display = 'none';
            index.style.display = 'none';
            settings_hidden = false;
            index_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.display = 'block';
            docs.style.width = '100%';
            settings_hidden = true;
        }
    } else {
        if (settings_hidden) {
            settings.style.display = 'block';
            index.style.display = 'none';
            if (window.innerWidth > 1200) {
                docs.style.width = '75%';
            } else {
                docs.style.width = '70%';
            }
            settings_hidden = false;
            index_hidden = true;
        } else {
            index.style.display = 'none';
            settings.style.display = 'none';
            docs.style.width = '100%';
            settings_hidden = true;
        }
    }
}
// Show Hide Element
var arabic = true;
var pronunciation = true;
var translation = true;

function showHideElm(data) {
    var ID = data.id + "_box";
    if (data.id == "translation") {
        if (translation == true) {
            translation = false;
            document.getElementById(ID).classList.add("fa-square");
            document.getElementById(ID).classList.remove("fa-square-check");
            createDOM();
            if (pronunciation) {
                document.getElementById("pr_style").innerText = '';
            }
        } else {
            translation = true;
            document.getElementById(ID).classList.add("fa-square-check");
            document.getElementById(ID).classList.remove("fa-square");
            createDOM();
            if (pronunciation) {
                document.getElementById("pr_style").innerText = '.pr {background: var(--secondary-color);}';
            }
        }
    } else if (data.id == "pronunciation") {
        if (pronunciation) {
            pronunciation = false;
            document.getElementById(ID).classList.add("fa-square");
            document.getElementById(ID).classList.remove("fa-square-check");
            createDOM();
        } else {
            pronunciation = true;
            document.getElementById(ID).classList.add("fa-square-check");
            document.getElementById(ID).classList.remove("fa-square");
            createDOM();
            if (translation) {
                document.getElementById("pr_style").innerText = '.pr {background: var(--secondary-color);}';
            } else {
                document.getElementById("pr_style").innerText = '';
            }
        }
    } else if (data.id == "arabic") {
        if (arabic) {
            arabic = false;
            document.getElementById(ID).classList.add("fa-square");
            document.getElementById(ID).classList.remove("fa-square-check");
            createDOM();
            if (pronunciation) {
                document.getElementById("pr_style").innerText = '';
            }
        } else {
            arabic = true;
            document.getElementById(ID).classList.add("fa-square-check");
            document.getElementById(ID).classList.remove("fa-square");
            createDOM();
            if (pronunciation && translation) {
                document.getElementById("pr_style").innerText = '.pr {background: var(--secondary-color);}';
            }
        }
    }
}