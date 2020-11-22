/////// GRID ///////
var screenWidth = (window.innerWidth) / 10;
var ScreenHeigth = (window.innerHeight) / 10;

colContainer = document.querySelector('.colContainer')
rowContainer = document.querySelector('.rowContainer')

for (let col = 0; col < screenWidth; col++) {
    let drawCol = document.createElement("div");
    colContainer.appendChild(drawCol).className = "col";
};
for (let row = 0; row < ScreenHeigth; row++) {
    let drawRaw = document.createElement("div");
    rowContainer.appendChild(drawRaw).className = "row";
};

let bgCol = document.querySelectorAll('.colContainer .col');
let bgRow = document.querySelectorAll('.rowContainer .row');
let soundBtn = document.querySelector('.soundBtn');
let line = document.querySelector('.soundBtn .line');

soundBtn.addEventListener('click', function() {
    line.classList.toggle('switch');
})

if (window.matchMedia("(max-width: 1024px)").matches) {
    window.addEventListener('load', function() {
        TweenMax.to('h1', { duration: 2.5, opacity: '.5', filter: 'blur(0px)' })
        TweenMax.to('h1', { duration: 1.5, ease: "power3.inOut", left: '3%', top: '1%', transform: 'translate(0, 0)', fontSize: '1.9vh', delay: 2.5 })
        TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02, delay: 3 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02, delay: 4 });
        TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to('.container__logo', { duration: 2, opacity: '1', filter: 'blur(2px)', delay: 4 })
        TweenMax.to('.container__rs--all', { duration: .025, transform: 'translateX(0)', stagger: .1, delay: 3 })
        TweenMax.to('.container__compteur', { duration: 2.5, opacity: '.5', filter: 'blur(0px)', delay: 5 })
    })
} else if (window.matchMedia("(max-width: 700px)").matches) {
    window.addEventListener('load', function() {
        TweenMax.to('h1', { duration: 2.5, opacity: '.5', filter: 'blur(0px)' })
        TweenMax.to('h1', { duration: 1.5, ease: "power3.inOut", left: '3%', top: '1%', transform: 'translate(0, 0)', delay: 2.5 })
        TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02, delay: 3 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02, delay: 4 });
        TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to('.container__logo', { duration: 2, opacity: '1', filter: 'blur(2px)', delay: 4 })
        TweenMax.to('.container__rs--all', { duration: .025, transform: 'translateY(0)', stagger: .1, delay: 3 })
        TweenMax.to('.container__compteur', { duration: 2.5, opacity: '.5', filter: 'blur(0px)', delay: 5 })
    })
} else {
    window.addEventListener('load', function() {
        TweenMax.to('h1', { duration: 2.5, opacity: '.5', filter: 'blur(0px)' })
        TweenMax.to('h1', { duration: 1.5, ease: "power3.inOut", left: '1.5%', top: '1%', transform: 'translate(0, 0)', fontSize: '2.5vh', delay: 2.5 })
        TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02, delay: 3 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02, delay: 4 });
        TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555, delay: 3 });
        TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555, delay: 4 });
        TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 6 });
        TweenMax.to('.container__logo', { duration: 2, opacity: '1', filter: 'blur(2px)', delay: 4 })
        TweenMax.to('.container__rs--all', { duration: .025, transform: 'translateX(0)', stagger: .1, delay: 3 })
        TweenMax.to('.container__compteur', { duration: 2.5, opacity: '.5', filter: 'blur(0px)', delay: 5 })
    })
}

setTimeout(function() {
    anime({
        targets: '.M-bleu, .I-rouge',
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 5000,
        delay: function(el, i) { return i * 300 },
        direction: 'alternate',
        loop: true
    });
}, 3000)

function compte_a_rebours() {
    var compte_a_rebours = document.getElementById("container__compteur");

    var date_actuelle = new Date();
    var date_evenement = new Date("Jan 29 00:00:00 2021");
    var total_secondes = (date_evenement - date_actuelle) / 1000;

    if (total_secondes > 0) {
        var jours = Math.floor(total_secondes / (60 * 60 * 24));
        var heures = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
        var minutes = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
        var secondes = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

        var mot_jour = "Jours";
        var mot_heure = "Heures";
        var mot_minute = "Minutes";
        var mot_seconde = "Secondes";

        if (jours == 0) {
            jours = '0';
            mot_jour = 'Jour';
        } else if (jours == 1) {
            mot_jour = "Jour";
        }

        if (heures == 0) {
            heures = '0';
            mot_heure = 'Heure';
        } else if (heures == 1) {
            mot_heure = "Heure";
        }

        if (minutes == 0) {
            minutes = '0';
            mot_minute = 'Minute';
        } else if (minutes == 1) {
            mot_minute = "Minute";
        }

        if (secondes == 0) {
            secondes = '0';
            mot_seconde = 'Seconde';
        } else if (secondes == 1) {
            mot_seconde = "Seconde";
        }

        compte_a_rebours.innerHTML = jours + ' ' + mot_jour + ' ' + heures + ' ' + mot_heure + ' ' + minutes + ' ' + mot_minute + ' ' + secondes + ' ' + mot_seconde;
    } else {
        compte_a_rebours.innerHTML = 'Compte à rebours terminé.';
    }

    var actualisation = setTimeout("compte_a_rebours();", 1000);
}

compte_a_rebours();