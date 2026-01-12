
const motoriLanding = [
    { ime: "Ducati Streetfighter V4", cena: "21.500 €", opis: "V4 Desmosedici Stradale" },
    { ime: "Kawasaki Z H2 SE", cena: "19.800 €", opis: "Supercharged Engine" },
    { ime: "Yamaha MT-10 SP", cena: "17.200 €", opis: "Öhlins Electronic Suspension" },
    { ime: "BMW S1000R", cena: "16.800 €", opis: "M Package / Akrapovič" }
];

const shopProizvodi = [
    { ime: "Ducati Panigale V4", cena: "25.900 €", slika: "assets/ducati-panigale-v4.png" },
    { ime: "BMW R 1250 GS", cena: "19.200 €", slika: "assets/bmw-r-1250-gs.png" },
    { ime: "Yamaha R1M", cena: "29.999 €", slika: "assets/yamaha-r1m.png" },
    { ime: "Kawasaki Ninja H2", cena: "31.000 €", slika: "assets/Kawasaki-Ninja-H2.png" },
    { ime: "Honda CBR 1000 RR", cena: "16.999  €", slika: "assets/honda-cbr1000rr.png" },
    { ime: "Ktm 1290 super duke R", cena: "12.999€", slika: "assets/ktm-1290-super-duke-r.png" }

];

const blogPostovi = [
    { naslov: "Održavanje lanca", autor: "Nikola M.", datum: "15.12.2025.", tekst: "Saveti za duži vek trajanja pogonskog lanca.", slika: "assets/blog-1.png" },
    { naslov: "Zimska oprema", autor: "Jovan P.", datum: "10.12.2025.", tekst: "Šta vam je potrebno za vožnju u hladnim danima.", slika: "assets/blog-2.png" }
];

const brendovi = ["Yamaha", "Ducati", "Honda", "Kawasaki", "BMW", "Suzuki", "Triumph", "KTM", "Aprilia"];


async function loadComponent(elementId, filePath, callback) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Greška pri učitavanju: ${filePath}`);
        const content = await response.text();
        const el = document.getElementById(elementId);
        if (el) {
            el.innerHTML = content;
            if (callback) callback();
        }
    } catch (err) { console.error(err); }
}

function postaviMenuLogic() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const overlay = document.getElementById('overlay');
    const navLinks = document.querySelectorAll('.nav-links a');
    if (!hamburger || !navMenu) return;

    const toggle = () => {
        hamburger.classList.toggle('open');
        navMenu.classList.toggle('active');
        if (overlay) overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
    };

    hamburger.onclick = toggle;
    if (overlay) overlay.onclick = toggle;
    navLinks.forEach(link => link.onclick = () => { if (navMenu.classList.contains('active')) toggle(); });
}

 // Index.html 

function renderujSve() {
   
    const landingContainer = document.getElementById('motorcycle-container');
    if (landingContainer) {
        landingContainer.innerHTML = '';

        motoriLanding.slice(0, 3).forEach(m => {
            const div = document.createElement('div');
            div.className = 'motor-card';
            div.innerHTML = `
                <h3>${m.ime}</h3>
                <p style="color:#666">${m.opis}</p>
                <p class="cena">${m.cena}</p>
            `;
            landingContainer.appendChild(div);
        });
    }


    // Shop.html
    const shopContainer = document.getElementById('shop-container');
    if (shopContainer) {
        shopProizvodi.forEach(p => {
            const div = document.createElement('div');
            div.className = 'motor-card';
            div.innerHTML = `
                <img src="${p.slika}" style="width:100%; height:200px; object-fit:cover; border-radius:5px; margin-bottom:15px;">
                <h3>${p.ime}</h3>
                <p class="cena">${p.cena}</p>
                <button class="btn btn-primary" onclick="window.location.href='kontakt.html'" style="width:100%; margin-top:15px;">POSALJI UPIT</button>
            `;
            shopContainer.appendChild(div);
        });
    }

    // Blog.html
    const blogContainer = document.getElementById('blog-container');
    if (blogContainer) {
        blogPostovi.forEach(post => {
            const div = document.createElement('div');
            div.className = 'motor-card';
            div.style.textAlign = 'left';
            div.innerHTML = `
                <img src="${post.slika}" style="width:100%; height:180px; object-fit:cover; border-radius:5px;">
                <p style="color:var(--accent); font-size:0.8rem; margin:10px 0;">${post.datum} | ${post.autor}</p>
                <h3>${post.naslov}</h3>
                <p style="color:#888; margin:10px 0;">${post.tekst}</p>
                <button class="btn btn-outline" style="padding:10px 20px; font-size:0.8rem;">PROČITAJ VIŠE</button>
            `;
            blogContainer.appendChild(div);
        });
    }
}

function renderujBrendove() {
    const track = document.getElementById('carousel-track');
    if (!track) return;
    [...brendovi, ...brendovi, ...brendovi].forEach(b => {
        const span = document.createElement('span');
        span.innerText = b;
        track.appendChild(span);
    });
}

function azurirajCountdown() {
    const target = new Date("January 20, 2026 00:00:00").getTime();
    const sada = new Date().getTime();
    const diff = target - sada;
    if (diff > 0 && document.getElementById("days")) {
        document.getElementById("days").innerText = Math.floor(diff / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
        document.getElementById("hours").innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, '0');
        document.getElementById("minutes").innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        document.getElementById("seconds").innerText = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
    }
}

function postaviValidaciju() {
    const form = document.querySelector('form');
    if (!form) return;
    form.onsubmit = (e) => {
        e.preventDefault();
        const msg = document.getElementById('form-message');
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && /^3816[0-9]{7,9}$/.test(phone)) {
            msg.innerHTML = '<span class="success">Uspešno poslato!</span>';
            form.reset();
        } else {
            msg.innerHTML = '<span class="error">Proverite email i telefon (3816...).</span>';
        }
    };
}


document.addEventListener('DOMContentLoaded', () => {
    loadComponent('header-placeholder', 'header.html', postaviMenuLogic);
    loadComponent('footer-placeholder', 'footer.html', () => {
        renderujBrendove();
        postaviValidaciju();
    });

    renderujSve();
    setInterval(azurirajCountdown, 1000);
});