// ============================================
// PRELOADER
// ============================================
const preloader = document.getElementById('preloader');
const preloaderProgress = document.getElementById('preloader-progress');
const preloaderPercent = document.getElementById('preloader-percent');
const preloaderLogo = document.getElementById('preloader-logo');

// Split logo text into chars
const logoText = preloaderLogo.textContent;
preloaderLogo.innerHTML = '';
logoText.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char === ' ' ? ' ' : char;
    preloaderLogo.appendChild(span);
});

let progress = 0;
const loadInterval = setInterval(() => {
    progress += Math.random() * 15;
    if (progress >= 100) {
        progress = 100;
        clearInterval(loadInterval);
        setTimeout(finishPreloader, 300);
    }
    preloaderProgress.style.width = progress + '%';
    preloaderPercent.textContent = Math.floor(progress) + '%';
}, 200);

function finishPreloader() {
    const chars = preloaderLogo.querySelectorAll('span');
    chars.forEach((span, i) => {
        setTimeout(() => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
        }, i * 30);
    });

    setTimeout(() => {
        preloader.style.transition = 'transform 1s cubic-bezier(0.76, 0, 0.24, 1)';
        preloader.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            preloader.style.display = 'none';
            initAnimations();
        }, 1000);
    }, 600);
}

// Animate logo chars initially
preloaderLogo.querySelectorAll('span').forEach((span, i) => {
    setTimeout(() => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
        span.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    }, 200 + i * 50);
});

// ============================================
// CUSTOM CURSOR
// ============================================
const cursor = document.querySelector('.cursor');
const cursorDot = document.querySelector('.cursor-dot');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.15;
    cursorY += (mouseY - cursorY) * 0.15;
    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effects
const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card, .software-item, .gallery-item, .filter-btn, .stat-card');
hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

// ============================================
// NAVIGATION
// ============================================
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menu-btn');
const fullscreenMenu = document.getElementById('fullscreen-menu');
const menuLinks = document.querySelectorAll('.menu-link');

// Scroll detection for nav background
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Menu toggle
function toggleMenu() {
    menuBtn.classList.toggle('active');
    fullscreenMenu.classList.toggle('active');

    if (fullscreenMenu.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
        menuLinks.forEach((link, i) => {
            setTimeout(() => {
                link.style.opacity = '1';
                link.style.transform = 'translateY(0)';
            }, 300 + i * 50);
        });
    } else {
        document.body.style.overflow = '';
        menuLinks.forEach((link) => {
            link.style.opacity = '0';
            link.style.transform = 'translateY(40px)';
        });
    }
}

// ============================================
// SCROLL PROGRESS
// ============================================
const scrollProgressBar = document.querySelector('.scroll-progress-bar');
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgressBar.style.width = progress + '%';
});

// ============================================
// PAGE SWITCHING
// ============================================
function showPage(page) {
    const homePage = document.getElementById('page-home');
    const page3D = document.getElementById('page-3d');

    if (page === 'home') {
        homePage.style.display = 'block';
        page3D.style.display = 'none';
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        // Re-init scroll progress
        scrollProgressBar.style.width = '0%';
    } else if (page === '3d') {
        homePage.style.display = 'none';
        page3D.style.display = 'block';
        document.body.style.overflow = '';
        window.scrollTo(0, 0);
        scrollProgressBar.style.width = '0%';
        // Init Three.js scene
        setTimeout(initThreeScene, 100);
    }
}

function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// ============================================
// HERO ANIMATIONS
// ============================================
function initAnimations() {
    // Hero name character animation
    const heroName = document.getElementById('hero-name');
    const heroText = heroName.textContent;
    heroName.innerHTML = '';
    heroText.split('').forEach(char => {
        const span = document.createElement('span');
        span.className = 'char';
        span.textContent = char === ' ' ? ' ' : char;
        heroName.appendChild(span);
    });

    heroName.querySelectorAll('.char').forEach((char, i) => {
        setTimeout(() => {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
            char.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }, 200 + i * 40);
    });

    // Section title animations
    document.querySelectorAll('.section-title').forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        text.split(' ').forEach((word, i, arr) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            const inner = document.createElement('span');
            inner.className = 'word-inner';
            inner.textContent = word;
            wordSpan.appendChild(inner);
            title.appendChild(wordSpan);
            if (i < arr.length - 1) {
                title.appendChild(document.createTextNode(' '));
            }
        });
    });

    // Section reveal with IntersectionObserver
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Animate title words
                const title = entry.target.querySelector('.section-title');
                if (title) {
                    title.querySelectorAll('.word-inner').forEach((word, i) => {
                        setTimeout(() => {
                            word.style.transform = 'translateY(0)';
                            word.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                        }, i * 100);
                    });
                }

                // Animate bio lines
                const bioLines = entry.target.querySelectorAll('.line-inner');
                bioLines.forEach((line, i) => {
                    setTimeout(() => {
                        line.style.transform = 'translateY(0)';
                        line.style.transition = 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, 300 + i * 80);
                });

                // Animate skill bars
                entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                    const width = bar.dataset.width;
                    setTimeout(() => {
                        bar.style.width = width + '%';
                    }, 500);
                });

                // Animate stat numbers
                entry.target.querySelectorAll('.stat-number').forEach(stat => {
                    const target = parseInt(stat.dataset.target);
                    animateNumber(stat, target);
                });

                // Animate timeline items
                entry.target.querySelectorAll('.timeline-item').forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, i * 150);
                });

                // Animate distinction items
                entry.target.querySelectorAll('.distinction-item').forEach((item, i) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                        item.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
                    }, i * 150);
                });

                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Image reveal
    const imgObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                imgObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.img-reveal').forEach(img => {
        imgObserver.observe(img);
    });

    // Parallax on images
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        document.querySelectorAll('.parallax-img').forEach(img => {
            const parent = img.parentElement;
            const rect = parent.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const speed = 0.15;
                img.style.transform = `translateY(${(scrolled - parent.offsetTop) * speed}px)`;
            }
        });
    });

    // Hero parallax
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            heroImage.style.transform = `translateY(calc(-50% + ${scrolled * 0.2}px))`;
        });
    }

    // Skill card mouse tracking
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });
}

// Number animation
function animateNumber(element, target) {
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 33);
}

// ============================================
// PROJECTS FILTER
// ============================================
const projectsData = [
    { id: '1', folder: '3d', type: 'video', file: 'promo.mp4', title: 'Promo', category: '3d' },
    { id: '2', folder: '3d', type: 'video', file: 'dambela.mp4', title: 'Dambela', category: '3d' },
    { id: '3', folder: '3d', type: 'video', file: '22 septembre.mp4', title: '22 Septembre', category: '3d' },
    { id: '17', folder: 'concept', type: 'video', file: 'wave 2.mp4', title: 'Wave', category: '3d' },
    { id: '18', folder: 'galerie', type: 'video', file: 'Mars colony first contact.mp4', title: 'Mars Colony', category: '3d' },
    { id: '4', folder: 'animation 2d', type: 'video', file: 'Nana avant première A NE PAS PUBLIER.mp4', title: 'Nana — Avant Première', category: 'animation' },
    { id: '5', folder: 'Illustration animé', type: 'video', file: 'ibo yoro documentaire Abrahame kamara  partie illustré A NE PAS PUBLIER.mp4', title: 'Ibo Yoro — Documentaire', category: 'animation' },
    { id: '6', folder: 'Illustration animé', type: 'video', file: 'TIMBOUCTOU documentaire   partie illustré A NE PAS PUBLIER.mp4', title: 'Timbouctou — Documentaire', category: 'animation' },
    { id: '7', folder: 'motion', type: 'video', file: 'parfum.mp4', title: 'Parfum', category: 'motion' },
    { id: '8', folder: 'motion', type: 'video', file: 'bientot.mp4', title: 'Bientôt', category: 'motion' },
    { id: '9', folder: 'motion', type: 'video', file: 'course d_afrique generique.mp4', title: "Course d'Afrique — Générique", category: 'motion' },
    { id: '19', folder: 'motion', type: 'video', file: 'ensemble.mp4', title: 'Ensemble', category: 'motion' },
    { id: '20', folder: 'motion', type: 'video', file: 'reseaux sociaux.mp4', title: 'Réseaux Sociaux', category: 'motion' },
    { id: '21', folder: 'motion', type: 'video', file: 'Animation logo Compter.mp4', title: 'Animation Logo Compter', category: 'motion' },
    { id: '22', folder: 'motion', type: 'video', file: 'motion unesco.mp4', title: 'Motion UNESCO', category: 'motion' },
    { id: '23', folder: 'motion', type: 'video', file: 'basilique côte d_ivoire.mp4', title: 'Basilique Côte d’Ivoire', category: '3d' },
    { id: '10', folder: 'billichi', type: 'image', file: 'poster 2.png', title: 'Bilichi — Affiche', category: 'film' },
    { id: '12', folder: 'concept', type: 'video', file: 'poison.mp4', title: 'Poison', category: 'film' },
    { id: '13', folder: 'concept', type: 'video', file: 'facebooui.mp4', title: 'Facebooui', category: 'film' },
    { id: '14', folder: 'kondekiè', type: 'video', file: 'kondekiè trailer fini .mp4', title: 'Kondekiè — Trailer', category: 'film' },
    { id: '15', folder: 'spot', type: 'video', file: 'Dikashop spot.mp4', title: 'Dikashop — Spot', category: 'film' },
    { id: '16', folder: 'kondekiè', type: 'image', file: 'affiche kondekiè.jpg', title: 'Bilichi — Trailer', category: 'film' },
];

function renderProjects(filter = 'all') {
    const masonry = document.getElementById('projects-masonry');
    if (!masonry) return;

    masonry.innerHTML = '';

    const filtered = filter === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === filter);

    const verticalProjects = ['3', '8', '12', '15']; // 22 septembre, bientôt, poison, dikashop-spot

    filtered.forEach((project, i) => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.dataset.category = project.category;
        if (verticalProjects.includes(project.id)) card.style.gridRow = 'span 2';

        const overlay = document.createElement('div');
        overlay.className = 'project-card-overlay';

        const catSpan = document.createElement('span');
        catSpan.className = 'project-card-category';
        catSpan.textContent = project.category === '3d' ? '3D' : project.category === 'film' ? 'Film' : project.category === 'motion' ? 'Motion Design' : 'Animation';

        const h3 = document.createElement('h3');
        h3.className = 'project-card-title';
        h3.textContent = project.title;

        overlay.appendChild(catSpan);
        overlay.appendChild(h3);

        if (project.type === 'video') {
            const video = document.createElement('video');
            video.src = `image/${project.folder}/${project.file}`;
            video.muted = true;
            video.loop = true;
            video.autoplay = true;
            video.playsInline = true;
            video.className = 'project-card-img';
            video.preload = 'metadata';
            video.addEventListener('click', () => openVideoPlayer(video.src, project.title));
            card.appendChild(video);
        } else {
            const img = document.createElement('img');
            img.src = `image/${project.folder}/${project.file}`;
            img.alt = project.title;
            img.className = 'project-card-img';
            card.appendChild(img);
        }

        card.appendChild(overlay);
        masonry.appendChild(card);
    });
}

function filterProjects(filter) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === filter) btn.classList.add('active');
    });
    renderProjects(filter);
}

// Initial render
renderProjects();

// ============================================
// VIDEO PLAYER
// ============================================
function openVideoPlayer(src, title) {
    const overlay = document.getElementById('video-overlay');
    const player = document.getElementById('video-player');
    const titleEl = document.getElementById('video-title');

    player.src = src;
    titleEl.textContent = title;
    overlay.classList.add('active');
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeVideoPlayer() {
    const overlay = document.getElementById('video-overlay');
    const player = document.getElementById('video-player');

    player.pause();
    player.src = '';
    overlay.classList.remove('active');
    overlay.style.display = 'none';
    document.body.style.overflow = '';
}

// ============================================
// THREE.JS — MODÈLES GLTF PERSONNALISÉS
// ============================================
const modelScenes = [];

function initThreeScene() {
    if (modelScenes.length > 0) return;

    const models = [
        { id: 'canvas-1', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFF6B35, name: 'Basillic' },
        { id: 'canvas-2', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFFC857, name: 'Basillic' },
        { id: 'canvas-3', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFF6B35, name: 'Basillic' },
        { id: 'canvas-4', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFFC857, name: 'Basillic' },
        { id: 'canvas-5', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFF6B35, name: 'Basillic' },
        { id: 'canvas-6', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFFC857, name: 'Basillic' },
        { id: 'canvas-7', type: 'gltf', modelPath: 'assets/Models/basillic.gltf', color: 0xFF6B35, name: 'Basillic' },
    ];

    models.forEach((model, index) => {
        createModelScene(model, index);
    });
}

function createModelScene(config, index) {
    const canvas = document.getElementById(config.id);
    if (!canvas) return;

    const container = canvas.parentElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x121212);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(3, 5, 3);
    dirLight.castShadow = true;
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(config.color, 2, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);

    const rimLight = new THREE.PointLight(0xFFC857, 1, 10);
    rimLight.position.set(-3, 1, -2);
    scene.add(rimLight);

    const gridHelper = new THREE.GridHelper(8, 8, config.color, 0x333333);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    const particleCount = 50;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
        size: 0.03,
        color: config.color,
        transparent: true,
        opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    let mesh = null;
    let isHovered = false;
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let rotationX = 0, rotationY = 0;
    let targetRotationX = 0, targetRotationY = 0;
    let mouseX = 0, mouseY = 0;

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function setMeshEmissive(object, intensity) {
        object.traverse((child) => {
            if (!child.isMesh || !child.material) return;
            const material = child.material;
            if (material.emissive) {
                material.emissive.setHex(intensity ? config.color : 0x000000);
                material.emissiveIntensity = intensity ? 0.35 : 0;
            }
        });
    }

    function setupObject(object) {
        mesh = object;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            mouse.x = mouseX;
            mouse.y = mouseY;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObject(mesh, true);

            if (intersects.length > 0) {
                if (!isHovered) {
                    isHovered = true;
                    container.style.cursor = 'pointer';
                    setMeshEmissive(mesh, true);
                }
            } else if (isHovered) {
                isHovered = false;
                container.style.cursor = 'grab';
                setMeshEmissive(mesh, false);
            }

            if (isDragging) {
                const deltaX = e.clientX - previousMousePosition.x;
                const deltaY = e.clientY - previousMousePosition.y;
                targetRotationY += deltaX * 0.01;
                targetRotationX += deltaY * 0.01;
                previousMousePosition = { x: e.clientX, y: e.clientY };
            }
        });

        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            previousMousePosition = { x: e.clientX, y: e.clientY };
            container.style.cursor = 'grabbing';
        });

        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = isHovered ? 'pointer' : 'grab';
        });

        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'default';
        });

        container.addEventListener('wheel', (e) => {
            camera.position.z += e.deltaY * 0.01;
            camera.position.z = Math.max(3, Math.min(10, camera.position.z));
        });

        let isVisible = false;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                isVisible = entry.isIntersecting;
            });
        }, { threshold: 0.1 });
        observer.observe(container);

        function animate() {
            requestAnimationFrame(animate);
            if (!isVisible || !mesh) return;

            const time = Date.now() * 0.001;
            rotationX += (targetRotationX - rotationX) * 0.05;
            rotationY += (targetRotationY - rotationY) * 0.05;

            mesh.rotation.x = rotationX + time * 0.2;
            mesh.rotation.y = rotationY + time * 0.3;
            mesh.position.y = Math.sin(time + index) * 0.15;

            const targetScale = isHovered ? 1.15 : 1.0;
            mesh.scale.x += (targetScale - mesh.scale.x) * 0.1;
            mesh.scale.y += (targetScale - mesh.scale.y) * 0.1;
            mesh.scale.z += (targetScale - mesh.scale.z) * 0.1;

            particles.rotation.y = time * 0.03;
            particles.rotation.x = time * 0.01;
            gridHelper.position.y = -2 + Math.sin(time * 0.5 + index) * 0.1;
            pointLight.position.x = 2 + mouseX * 2;
            pointLight.position.y = 2 + mouseY * 2;

            renderer.render(scene, camera);
        }
        animate();
    }

    function createFallbackObject() {
        const geometry = new THREE.IcosahedronGeometry(1.3, 0);
        const material = new THREE.MeshStandardMaterial({
            color: config.color,
            roughness: 0.2,
            metalness: 0.8,
            emissive: config.color,
            emissiveIntensity: 0.08,
            transparent: true,
            opacity: 0.95,
        });
        const fallbackMesh = new THREE.Mesh(geometry, material);
        setupObject(fallbackMesh);
    }

    if (config.type === 'gltf' && config.modelPath && window.THREE && THREE.GLTFLoader) {
        const loader = new THREE.GLTFLoader();
        loader.load(
            config.modelPath,
            (gltf) => {
                const model = gltf.scene;
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.castShadow = true;
                        child.receiveShadow = true;
                        if (child.material) {
                            child.material = child.material.clone();
                            if (child.material.emissive) {
                                child.material.emissive.setHex(config.color);
                                child.material.emissiveIntensity = 0.08;
                            }
                            if (child.material.color) {
                                child.material.color.setHex(config.color);
                            }
                        }
                    }
                });

                const box = new THREE.Box3().setFromObject(model);
                const size = box.getSize(new THREE.Vector3());
                const maxDim = Math.max(size.x, size.y, size.z) || 1;
                const scale = 1.8 / maxDim;
                model.scale.setScalar(scale);
                model.position.set(0, 0, 0);
                setupObject(model);
            },
            undefined,
            () => {
                console.warn(`Impossible de charger ${config.modelPath}; affichage d'un fallback.`);
                createFallbackObject();
            }
        );
    } else {
        createFallbackObject();
    }

    const resizeObserver = new ResizeObserver(() => {
        const w = container.clientWidth;
        const h = container.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    modelScenes.push({ scene, camera, renderer, mesh });
}
