// -------------------- Smooth Scrolling --------------------
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        target?.scrollIntoView({ behavior: 'smooth' });
    });
});

// -------------------- Contact Form Validation --------------------
document.addEventListener('DOMContentLoaded', () => {
    if (!window.emailjs) {
        console.error("EmailJS SDK not loaded!");
        return;
    }

    emailjs.init("jSYh1Pi075tl4-OUL");

    const form = document.getElementById('contactForm');
    const msg = form.querySelector('.form-msg');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        if (!name || !email || !message) {
            msg.textContent = "⚠️ Please fill out all fields.";
            msg.style.color = "#f55";
            return;
        }

        emailjs.send('service_s9az6ir', 'template_y4xkt1n', { from_name: name, from_email: email, message })
            .then(() => {
                msg.textContent = "✅ Message sent! Thank you.";
                msg.style.color = "#4caf50";
                form.reset();
            })
            .catch((err) => {
                console.error("EmailJS error:", err);
                msg.textContent = "❌ Something went wrong. Try again later.";
                msg.style.color = "#f55";
            });
    });
});



// -------------------- Typed Text Effect --------------------
document.addEventListener('DOMContentLoaded', () => {
    const typedText = document.querySelector('.typed-text');
    if (!typedText) return;

    const phrases = [
        "Hi, I'm Joshua Wilson",
        "Game Developer",
        "Software Enthusiast"
    ];

    let i = 0, j = 0, current = "", deleting = false;

    function type() {
        if (!deleting && j < phrases[i].length) {
            current += phrases[i][j];
            j++;
        } else if (deleting && j > 0) {
            current = current.slice(0, -1);
            j--;
        } else if (!deleting && j === phrases[i].length) {
            deleting = true;
            setTimeout(type, 1200); // pause before deleting
            return;
        } else if (deleting && j === 0) {
            deleting = false;
            i = (i + 1) % phrases.length;
        }

        typedText.textContent = current;
        setTimeout(type, deleting ? 80 : 200); // slower typing speed
    }

    type();
});

// -------------------- Fade-in on Scroll --------------------
const faders = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

faders.forEach(fader => observer.observe(fader));

// -------------------- Light/Dark Mode Toggle --------------------
const modeBtn = document.getElementById('modeToggle');
modeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('light');
    modeBtn.textContent = document.body.classList.contains('light')
        ? "🌙 Dark Mode"
        : "☀️ Light Mode";
});

// -------------------- THREE.js Spinning Cube --------------------
function initCube() {
    const container = document.getElementById('hero-3d');
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshNormalMaterial();
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        controls.update();
        renderer.render(scene, camera);
    }
    animate();

    window.addEventListener('resize', () => {
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    });
}

document.addEventListener('DOMContentLoaded', initCube);

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('header nav'); // be specific

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active'); // hamburger animation
    nav.classList.toggle('show');
});
