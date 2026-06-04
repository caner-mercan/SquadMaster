// ==========================================
// GLOBALS & STATE (Efsaneler Veri Tabanı)
// ==========================================
let allPosts = []; 
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Her mevkiden dünya futbol tarihinin en büyük 8 efsanesi (Nokta atışı yönetim)
const LEGENDS_BY_POSITION = {
    kaleci: [
        { name: "Lev Yashin", country: "Sovyetler Birliği", detail: "Futbol tarihinde Ballon d'Or kazanan tek kaleci. İnanılmaz refleksleri ve penaltı kurtarma yüzdesi." },
        { name: "Gianluigi Buffon", country: "İtalya", detail: "İstikrar abidesi. Dünya Kupası şampiyonu, Juventus ve İtalya tarihinin en güvenilir eldiveni." },
        { name: "Iker Casillas", country: "İspanya", detail: "Real Madrid ve İspanya ile kazanılabilecek tüm uluslararası ve yerel kupaları kaldıran kaptan." },
        { name: "Oliver Kahn", country: "Almanya", detail: "Korkusuz tarzı, güçlü fiziği ve agresif liderliğiyle Dünya Kupası'nda Altın Top kazanan ilk kaleci." },
        { name: "Peter Schmeichel", country: "Danimarka", detail: "Manchester United efsanesi. Geniş vücut yapısıyla kaleyi tamamen kapatan devasa eldiven." },
        { name: "Manuel Neuer", country: "Almanya", detail: "Modern futbolun 'Süper Libero' kaleci tarzını başlatan, ayaklarına hakim oyun kurucu kaleci." },
        { name: "Dino Zoff", country: "İtalya", detail: "40 yaşında Dünya Kupası kaldıran, futbol tarihinin en soğukkanlı ve pozisyon bilgisi yüksek kalecisi." },
        { name: "Edwin van der Sar", country: "Hollanda", detail: "Ajax ve Manchester United ile Şampiyonlar Ligi kazanan, kusursuz oyun kurma becerisine sahip dev." }
    ],
    defans: [
        { name: "Paolo Maldini", country: "İtalya", detail: "Sol bek ve stoper mevkilerinin kusursuz ikonu. Milan formasıyla 5 Şampiyonlar Ligi şampiyonluğu." },
        { name: "Franz Beckenbauer", country: "Almanya", detail: "Futbola 'Libero' kavramını getiren, savunmadan oyun kuran iki Ballon d'Or sahibi 'İmparator'." },
        { name: "Franco Baresi", country: "İtalya", detail: "Milan savunmasının beyni. Ofsayt taktiğini ve alan savunmasını dünyaya ezberleten lider." },
        { name: "Roberto Carlos", country: "Brezilya", detail: "Futbol tarihinin en ikonik sol beki. Devasa hızı, bindirmeleri ve fiziken imkansız falsolu frikikleri." },
        { name: "Cafu", country: "Brezilya", detail: "Sağ bek pozisyonunun bitmek bilmeyen enerjisi. Üst üste 3 Dünya Kupası finali oynayan tek futbolcu." },
        { name: "Sergio Ramos", country: "İspanya", detail: "Modern dönemin en golcü ve hırslı stoperi. Real Madrid'in kritik finallerdeki kurtarıcısı." },
        { name: "Carles Puyol", country: "İspanya", detail: "Barcelona ruhunun tanımı. Asla pes etmeyen karakteri, harika zamanlamalı müdahaleleri." },
        { name: "Fabio Cannavaro", country: "İtalya", detail: "2006 Dünya Kupası'ndaki geçilmez performansıyla Ballon d'Or kazanan nadir savunma oyuncularından biri." }
    ],
    "orta-saha": [
        { name: "Zinedine Zidane", country: "Fransa", detail: "Futbolu sanata dönüştüren adam. Dünya Kupası, EURO ve Şampiyonlar Ligi finallerinin büyücüsü." },
        { name: "Diego Maradona", country: "Arjantin", detail: "Tek başına Dünya Kupası kazanan dahi. Benzersiz dripling yeteneği ve futbol tarihinin en asi efsanesi." },
        { name: "Johan Cruyff", country: "Hollanda", detail: "Total Futbol felsefesinin sahadaki beyni. Ajax, Barcelona ve dünya futbolunun vizyoner lideri." },
        { name: "Andrés Iniesta", country: "İspanya", detail: "Dar alandan top çıkarma ustası. İspanya'ya Dünya Kupası'nı getiren altın golün sahibi." },
        { name: "Xavi Hernandez", country: "İspanya", detail: "Sahayı yukarıdan görüyormuş gibi pas atan, oyunun temposunu tek başına belirleyen pas senfoni şefi." },
        { name: "Andrea Pirlo", country: "İtalya", detail: "Derin oyun kurucu (Regista) kavramının üstadı. Milimetrik uzun pasları ve soğukkanlı penaltıları." },
        { name: "Ronaldinho", country: "Brezilya", detail: "Futboldan saf keyif alan, izleyenleri büyüleyen çalımı ve joga bonito felsefesinin kralı." },
        { name: "Michel Platini", country: "Fransa", detail: "Üst üste 3 kez Ballon d'Or kazanan, Juventus ve Fransa tarihinin en golcü oyun kurucusu." }
    ],
    forvet: [
        { name: "Pelé", country: "Brezilya", detail: "Futbolun Kralı. Tam 3 Dünya Kupası kazanan tek oyuncu ve kariyerindeki 1000'den fazla gol." },
        { name: "Lionel Messi", country: "Arjantin", detail: "Futbol tarihinin istatistikleri ve kupaları altüst eden, rekor sayıda Ballon d'Or sahibi uzaylısı." },
        { name: "Cristiano Ronaldo", country: "Portekiz", detail: "Kusursuz atletizm, Şampiyonlar Ligi tarihinin en golcü ismi ve tarihin gördüğü en büyük gol makinesi." },
        { name: "Ronaldo Nazário", country: "Brezilya", detail: "Gerçek 'Fenomen'. Kimsenin durduramadığı hızı, çalımları ve bitiriciliğiyle tarihin en iyi saf 9 numarası." },
        { name: "Thierry Henry", country: "Fransa", detail: "Arsenal tarihinin en büyüğü. Sol kanattan içeri kat ederek attığı plase gollerin mucidi." },
        { name: "Marco van Basten", country: "Hollanda", detail: "Kusursuz santrafor. EURO 88 finalinde attığı imkansız vole golüyle hafızalara kazınan golcü." },
        { name: "Gerd Müller", country: "Almanya", detail: "Ceza sahası içinde affı olmayan 'Bay Gol'. Almanya ve Bayern Münih tarihinin en büyük bitiricisi." },
        { name: "Gheorghe Hagi", country: "Romanya", detail: "Karpatların Maradonası. Galatasaray ve Romanya tarihinin sol ayağıyla harikalar yaratan efsane 10 numarası." }
    ]
};

const CATEGORIES = ['kaleci', 'defans', 'orta-saha', 'forvet'];

// ==========================================
// DOM ELEMENT SELECTIONS
// ==========================================
const postsContainer = document.getElementById('posts-container');
const loadingElement = document.getElementById('loading');
const toastContainer = document.getElementById('toast-container');
const themeToggleBtn = document.getElementById('theme-toggle');
const searchInput = document.getElementById('search-input');
const filterButtons = document.querySelectorAll('.btn-filter');

const modal = document.getElementById('post-modal');
const openModalBtn = document.getElementById('btn-open-modal');
const closeModalSpan = document.querySelector('.close-modal');
const postForm = document.getElementById('post-form');
const modalTitle = document.getElementById('modal-title');
const formPostId = document.getElementById('post-id');
const formTitle = document.getElementById('form-title');
const formBody = document.getElementById('form-body');

// ==========================================
// EVENT LISTENERS (Zorunlu Yapı)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initTheme(); 
    getLegends(); // API'den verileri çek (Read)
});

openModalBtn.addEventListener('click', () => openModal('create'));
closeModalSpan.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
postForm.addEventListener('submit', handleFormSubmit);
searchInput.addEventListener('input', filterAndSearchPlayers);

filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        filterButtons.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        filterAndSearchPlayers();
    });
});

themeToggleBtn.addEventListener('click', toggleTheme);

// ==========================================
// CORE CRUD OPERATIONS (Fetch & Async-Await)
// ==========================================

// 1. VERİ LİSTELEME (READ)
async function getLegends() {
    try {
        toggleLoading(true);
        
        const response = await fetch(`${API_URL}?_limit=32`); 
        if (!response.ok) throw new Error('Efsaneler veritabanı senkronize edilemedi!');
        
        const data = await response.json();
        
        allPosts = data.map((item, index) => {
            const categoryIndex = Math.floor(index / 8); 
            const playerIndex = index % 8;
            
            const category = CATEGORIES[categoryIndex];
            const playerData = LEGENDS_BY_POSITION[category][playerIndex];

            return {
                id: item.id,
                title: playerData.name,
                body: `Ülke: ${playerData.country}\n\nTeknik Analiz: ${playerData.detail}`,
                category: category
            };
        });

        renderDOM(allPosts);
        showToast('32 Dünya Efsanesi mevkilerine göre başarıyla listelendi.', 'success');
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

// FORM KONTROLÜ (CREATE / UPDATE SEÇİMİ)
async function handleFormSubmit(e) {
    e.preventDefault();
    const id = formPostId.value;
    const title = formTitle.value.trim();
    const body = formBody.value.trim();
    
    if (!title || !body) return;

    if (id === '') {
        await createPlayer(title, body);
    } else {
        await updatePlayer(Number(id), title, body);
    }
    closeModal();
}

// 2. VERİ EKLEME (CREATE)
async function createPlayer(title, body) {
    const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const newPlayer = {
        title: title,
        body: body,
        userId: 1,
        category: randomCategory
    };

    try {
        toggleLoading(true);
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newPlayer),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (!response.ok) throw new Error('Efsane kaydı oluşturulamadı!');
        const createdData = await response.json();
        
        createdData.id = allPosts.length > 0 ? Math.max(...allPosts.map(p => p.id)) + 1 : 1;
        
        allPosts.unshift(createdData); 
        filterAndSearchPlayers();
        showToast(`'${title}' efsaneler kadrosuna dahil edildi!`, 'success');
    } catch (error) {
        showToast(error.message, 'error');
    } finally {
        toggleLoading(false);
    }
}

// 3. VERİ GÜNCELLEME (UPDATE)
async function updatePlayer(id, title, body) {
    const original = allPosts.find(p => p.id === id);
    const category = original ? original.category : 'forvet';

    try {
        toggleLoading(true);
        await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, body, category }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        allPosts = allPosts.map(player => player.id === id ? { ...player, title, body } : player);
        filterAndSearchPlayers();
        showToast('Efsane oyuncu profili başarıyla güncellendi.', 'success');
    } catch (error) {
        showToast('Güncelleme başarısız.', 'error');
    } finally {
        toggleLoading(false);
    }
}

// 4. VERİ SİLME (DELETE)
async function deletePlayer(id) {
    if (!confirm('Bu efsane oyuncuyu kadrodan çıkartmak istediğinize emin misiniz?')) return;

    try {
        toggleLoading(true);
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });

        allPosts = allPosts.filter(player => player.id !== id);
        filterAndSearchPlayers();
        showToast('Oyuncu kadrodan kaldırıldı.', 'warning');
    } catch (error) {
        showToast('Silme işlemi başarısız.', 'error');
    } finally {
        toggleLoading(false);
    }
}

// ==========================================
// DOM MANIPULATION & HELPERS
// ==========================================
function renderDOM(array) {
    postsContainer.innerHTML = '';

    if (array.length === 0) {
        postsContainer.innerHTML = '<p class="no-data">// Seçilen kriterlere uygun efsane bulunamadı.</p>';
        return;
    }

    array.forEach(player => {
        const card = document.createElement('div');
        card.className = `post-card ${player.category}`;
        
        let catName = "";
        if (player.category === 'kaleci') catName = "🧤 KALECİ";
        if (player.category === 'defans') catName = "🛡️ DEFANS";
        if (player.category === 'orta-saha') catName = "🧠 ORTA SAHA";
        if (player.category === 'forvet') catName = "🔥 FORVET";

        card.innerHTML = `
            <span class="badge">${catName}</span>
            <h3 class="post-title">${escapeHTML(player.title)}</h3>
            <div class="post-body">${escapeHTML(player.body).replace(/\n/g, '<br>')}</div>
            <div class="card-actions">
                <button class="btn-action btn-edit" onclick="prepareUpdate(${player.id})">📝 Düzenle</button>
                <button class="btn-action btn-delete" onclick="deletePlayer(${player.id})">🗑️ Sil</button>
            </div>
        `;
        postsContainer.appendChild(card);
    });
}

function prepareUpdate(id) {
    const player = allPosts.find(p => p.id === id);
    if (!player) return;

    formPostId.value = player.id;
    formTitle.value = player.title;
    formBody.value = player.body;
    openModal('update');
}

// Canlı Arama ve Filtreleme Motoru (GELİŞTİRİLMİŞ SÜRÜM)
function filterAndSearchPlayers() {
    const query = searchInput.value.toLowerCase().trim(); 
    const activeCat = document.querySelector('.btn-filter.active').getAttribute('data-category');

    const filtered = allPosts.filter(player => {
        // Hem isme, hem içeriğe, hem de 'defans', 'forvet' gibi gizli kategorilere bakar
        const matchSearch = player.title.toLowerCase().includes(query) || 
                            player.body.toLowerCase().includes(query) || 
                            player.category.toLowerCase().includes(query);
                            
        const matchCat = (activeCat === 'all') || (player.category === activeCat);
        return matchSearch && matchCat;
    });

    renderDOM(filtered);
}

// ==========================================
// BONUS FEATURES (Ödevi Parlatan Yapılar)
// ==========================================
function toggleLoading(isLoading) {
    isLoading ? loadingElement.classList.remove('hidden') : loadingElement.classList.add('hidden');
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.5s ease-out forwards';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('squad-theme', isDark ? 'dark' : 'light');
    themeToggleBtn.innerText = isDark ? '☀️ Gündüz Modu' : '🌙 Gece Modu';
}

function initTheme() {
    const saved = localStorage.getItem('squad-theme');
    if (saved === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggleBtn.innerText = '☀️ Gündüz Modu';
    }
}

function openModal(mode) {
    modal.classList.remove('hidden');
    if (mode === 'create') {
        modalTitle.innerText = 'Yeni Efsane Oyuncu Kaydı';
        postForm.reset();
        formPostId.value = '';
    } else {
        modalTitle.innerText = 'Efsane Profilini Düzenle';
    }
}

function closeModal() { modal.classList.add('hidden'); }

function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, t => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[t] || t));
}