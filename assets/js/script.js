// ===== HAMBURGER MENU =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const navbarLinks = document.querySelector('.navbar__links');

if (hamburgerBtn && navbarLinks) {
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navbarLinks.classList.toggle('active');
    });

    const dropdownItems = document.querySelectorAll('.navbar__item--dropdown');
    dropdownItems.forEach(item => {
        const link = item.querySelector('.navbar__link');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                if (!item.classList.contains('open')) {
                    e.preventDefault();
                    item.classList.add('open');
                }
            }
        });
    });

    const subItems = document.querySelectorAll('.dropdown__item--sub');
    subItems.forEach(item => {
        const link = item.querySelector('a');
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('open');
            }
        });
    });
}
// ===== END HAMBURGER MENU =====

// ===== REVOLUTION BIKE SCROLL ANIMATION =====
const revolutionBike = document.querySelector('.revolution__bike');

if (revolutionBike) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                revolutionBike.classList.add('slide-in');
            }
        });
    }, { threshold: 0.3 });

    observer.observe(revolutionBike);
}
// ===== END 
// ===== TESTIMONIALS SLIDER =====
const testimonialItems = document.querySelectorAll('.testimonial-item');
const prevBtn = document.querySelector('.testimonials__arrow--prev');
const nextBtn = document.querySelector('.testimonials__arrow--next');

if (testimonialItems.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;

    function showTestimonial(index) {
        testimonialItems.forEach(item => item.classList.remove('active'));
        testimonialItems[index].classList.add('active');
    }

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % testimonialItems.length;
        showTestimonial(currentIndex);
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
        showTestimonial(currentIndex);
    });
}
// ===== END TESTIMONIALS SLIDER =====
// ===== BIKES SLIDER =====
(function () {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.bike-card');
    const prevBtn = document.querySelector('.slider-btn--prev');
    const nextBtn = document.querySelector('.slider-btn--next');

    if (!track || cards.length === 0) return;

    let current = 0;

    function updateSlider() {
        cards.forEach((card, i) => {
            card.classList.toggle('active', i === current);
        });

        const cardWidth = cards[0].offsetWidth + 30;
        const viewport = track.parentElement;
        const viewportCenter = viewport.offsetWidth / 2;
        const offset = current * cardWidth - viewportCenter + cards[0].offsetWidth / 2;

        track.style.transform = `translateX(${-offset}px)`;
    }

    nextBtn.addEventListener('click', () => {
        current = (current + 1) % cards.length;
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + cards.length) % cards.length;
        updateSlider();
    });

    updateSlider();
})();
// ===== END 
// ===== BLOG PAGINATION =====
if (document.querySelector('.blog__pagination')) {
    const page1Cards = document.querySelectorAll('.blog-card:not(.blog-card--page2)');
    const page2Cards = document.querySelectorAll('.blog-card--page2');
    const paginationBtns = document.querySelectorAll('.blog__pagination .blog__pagination-btn');
    const blogPrevBtn = document.querySelector('.blog__pagination .blog__pagination-btn--prev');
    const blogNextBtn = document.querySelector('.blog__pagination .blog__pagination-btn--next');
    let currentPage = 1;

    function goToPage(page) {
        if (page === 1) {
            page1Cards.forEach(card => card.style.display = 'flex');
            page2Cards.forEach(card => card.style.display = 'none');
        } else if (page === 2) {
            page1Cards.forEach(card => card.style.display = 'none');
            page2Cards.forEach(card => card.style.display = 'flex');
        }

        paginationBtns.forEach(btn => {
            if (btn.textContent.trim() == page) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        currentPage = page;
    }

    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const page = parseInt(btn.textContent.trim());
            if (!isNaN(page)) goToPage(page);
        });
    });

    if (blogPrevBtn) {
        blogPrevBtn.addEventListener('click', () => {
            if (currentPage > 1) goToPage(currentPage - 1);
        });
    }

    if (blogNextBtn) {
        blogNextBtn.addEventListener('click', () => {
            if (currentPage < 2) goToPage(currentPage + 1);
        });
    }
}
// ===== END 

//صفحة الشوب
let currentCategory = 'all';
let currentPage = 1;
let perPage = 6;
let currentSort = 'Default';
let currentCols = 3;

const allProducts = Array.from(document.querySelectorAll('.product-card'));

function filterCategory(cat, btn) {
    currentCategory = cat;
    currentPage = 1;

    document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    const titleEl = document.getElementById('pageTitle');
    if (cat === 'all') {
        titleEl.textContent = 'Shop';
    } else {
        titleEl.textContent = cat;
    }

    renderProducts();
}

function getFilteredProducts() {
    return allProducts.filter(card => {
        if (currentCategory === 'all') return true;
        const cats = card.getAttribute('data-cat') || '';
        return cats.split(' ').some(c => c === currentCategory.replace(' ', '_') || cats.includes(currentCategory));
    });
}

function getSortedProducts(products) {
    const sorted = [...products];
    switch (currentSort) {
        case 'Price low to high':
            sorted.sort((a, b) => +a.dataset.price - +b.dataset.price);
            break;
        case 'Price high to low':
            sorted.sort((a, b) => +b.dataset.price - +a.dataset.price);
            break;
        case 'Alphabetically, A-Z':
            sorted.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
            break;
        case 'Alphabetically, Z-A':
            sorted.sort((a, b) => b.dataset.name.localeCompare(a.dataset.name));
            break;
        default:
            break;
    }
    return sorted;
}
if (document.getElementById('productsGrid')) {
    document.querySelectorAll('.sale-ticker').forEach(ticker => {
        const span = ticker.querySelector('span');
        ticker.innerHTML = '';
        const text = '⚡ HOT SALE 22% OFF ⚡ HOT SALE 22% OFF ⚡ HOT SALE 22% OFF ⚡ ';
        const el = document.createElement('span');
        el.textContent = text + text;
        ticker.appendChild(el);
        let pos = 0;
        const speed = 0.5;
        const half = el.scrollWidth / 2;
        function animate() {
            pos -= speed;
            if (Math.abs(pos) >= half) pos = 0;
            el.style.transform = `translateX(${pos}px)`;
            requestAnimationFrame(animate);
        }
        animate();
    });
}
function renderProducts() {
    const grid = document.getElementById('productsGrid');
    const filtered = getSortedProducts(getFilteredProducts());
    const total = filtered.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));

    if (currentPage > totalPages) currentPage = totalPages;

    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    const pageProducts = filtered.slice(start, end);

    allProducts.forEach(card => {
        card.style.display = 'none';
        grid.appendChild(card);
    });

    pageProducts.forEach(card => {
        card.style.display = '';
    });

    const countEl = document.getElementById('resultsCount');
    if (total === 0) {
        countEl.textContent = 'No results';
        document.getElementById('noResults').style.display = 'block';
    } else {
        document.getElementById('noResults').style.display = 'none';
        const from = start + 1;
        const to = Math.min(end, total);
        if (total === pageProducts.length && totalPages === 1) {
            countEl.textContent = total === 1 ? 'Showing the single result' : `Showing all ${total} results`;
        } else {
            countEl.textContent = `Showing ${from}–${to} of ${total} results`;
        }
    }

    renderPagination(totalPages);
}

// ========== Pagination ==========
function renderPagination(totalPages) {
    const container = document.getElementById('pageNumbers');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    container.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.className = 'page-btn' + (i === currentPage ? ' active' : '');
        btn.textContent = i;
        btn.onclick = () => { currentPage = i; renderProducts(); };
        container.appendChild(btn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.style.display = '';
    prevBtn.style.display = '';
    nextBtn.disabled = currentPage === totalPages;

    const pag = document.getElementById('pagination');
    pag.style.display = totalPages <= 1 ? 'none' : 'flex';
    pag.style.position = 'relative';
    pag.style.zIndex = '10';
}

function changePage(dir) {
    const filtered = getFilteredProducts();
    const totalPages = Math.ceil(filtered.length / perPage);
    currentPage = Math.max(1, Math.min(totalPages, currentPage + dir));
    renderProducts();
}

document.querySelectorAll('.grid-btn').forEach(btn => {
    btn.addEventListener('click', function () {
        document.querySelectorAll('.grid-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentCols = +this.dataset.cols;
        const grid = document.getElementById('productsGrid');
        grid.className = `products-grid cols-${currentCols}`;
    });
});

function selectPerPage(n, li) {
    perPage = n;
    currentPage = 1;
    document.getElementById('perPageLabel').textContent = n + ' Products';
    document.querySelectorAll('#perPageMenu li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    closeAllDropdowns();
    renderProducts();
}

function selectSort(val, li) {
    currentSort = val;
    document.getElementById('sortLabel').textContent = val;
    document.querySelectorAll('#sortMenu li').forEach(el => el.classList.remove('active'));
    li.classList.add('active');
    closeAllDropdowns();
    renderProducts();
}

function toggleDropdown(id) {
    const el = document.getElementById(id);
    const isOpen = el.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) el.classList.add('open');
}

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
}

document.addEventListener('click', function (e) {
    if (!e.target.closest('.dropdown')) closeAllDropdowns();
});

document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        const card = this.closest('.product-card');
        const name = card.dataset.name;
        const originalText = this.innerHTML;
        this.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Added!`;
        this.style.background = 'var(--accent)';
        this.style.borderColor = 'var(--accent)';
        this.style.color = '#fff';
        setTimeout(() => {
            this.innerHTML = originalText;
            this.style.background = '';
            this.style.borderColor = '';
            this.style.color = '';
        }, 1500);
    });
});

if (document.getElementById('productsGrid')) {
    renderProducts();
}
