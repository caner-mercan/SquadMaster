# ⚽ SquadMaster - Dünya Efsaneleri Yönetim Paneli

Bu proje, **Web Tasarım dersi final ödevi** kriterlerine %100 uyumlu olarak; `JSONPlaceholder` Public API'si üzerinden asenkron veri çeken, gelişmiş filtreleme ve kullanıcı dostu arayüz özelliklerine sahip, tam donanımlı bir **Kadro Yönetim Sistemi (CRUD)** otomasyonudur.

## 👥 Geliştiriciler & Proje Sahipleri
* **Caner Mercan**
* **Hamza Uludağ**

---

## 📋 ÖDEV KRİTERLERİ VE TEKNİK AÇIKLAMALARI

Hocamız tarafından belirtilen zorunlu yapılar ve ekstra puan getiren tüm dinamikler mimari olarak aşağıda tek tek açıklanmıştır:

### 📥 1. Public API'den Veri Çekme & Gösterme
* **Kullanılan Servis:** Projede örnek listede yer alan **JSONPlaceholder** (`https://jsonplaceholder.typicode.com/posts`) API'si kullanılmıştır. Educational/Public bir API olduğu için güvenli mimaride **API Key** gerektirmeden herkese açık servis sunmaktadır.
* **Veri Eşleştirme:** API'den gelen ham veriler, projenin futbol konseptine uygun olarak yerel havuzdaki 32 dünya futbol efsanesinin (Messi, Ronaldo, Maradona vb.) gerçek istatistikleri ve mevkileriyle (`category`) JavaScript tarafında dinamik olarak harmanlanarak ekrana basılmaktadır.

### 🔄 2. Zorunlu CRUD İşlemleri (Ekleme, Listeleme, Silme, Güncelleme)
Proje, veri tabanı yönetiminin temel yapı taşı olan 4 ana operasyonu da tarayıcıyı yenilemeye gerek kalmadan (Single Page Application mantığıyla) simüle eder:
* **Veri Listeleme (Read):** Sayfa yüklendiği an API'ye istek atılır ve dönen tüm oyuncular responsive grid kart mimarisiyle vitrine dizilir.
* **Veri Ekleme (Create):** Konsoldaki `+ Yeni Efsane Ekle` butonuyla açılan form, yeni girilen verileri API'ye `POST` isteği atarak doğrular ve yeni oyuncuyu listenin en başına (`unshift`) anlık enjekte eder.
* **Veri Güncelleme (Update):** Bir oyuncu kartındaki `Düzenle` butonuna basıldığında, o oyuncunun benzersiz `id` değeri yakalanır, veriler forma otomatik doldurulur ve `PUT` isteği gönderilerek yerel dizide güncellenir.
* **Veri Silme (Delete):** Kart üzerindeki `Sözleşmeyi Feshet (Sil)` butonuna tıklandığında, JavaScript kullanıcıya bir `confirm` penceresi açar. Onay verilirse API'ye `DELETE` isteği simüle edilir ve oyuncu `.filter()` metoduyla diziden ve ekrandan kalıcı olarak uçurulur.

### 🛠️ 3. Kullanılması Zorunlu Yapılar
* **fetch API:** Sunucuyla olan tüm veri trafiği, geleneksel XMLHttpRequest yerine modern ve performanslı `window.fetch` yapısı kullanılarak yönetilmiştir.
* **async / await:** Asenkron JavaScript operasyonlarının (API istekleri) birbirini bloklamaması ve kodun okunabilirliğinin (Clean Code) en üst düzeyde olması amacıyla `async/await` asenkron yapısı tercih edilmiştir.
* **DOM Manipulation:** JavaScript tarafında işlenen tüm veriler, `document.createElement()`, `appendChild()`, `innerHTML` ve `querySelector` gibi metotlarla tarayıcı DOM ağacına dinamik olarak işlenmektedir. Statik hiçbir veri kullanılmamıştır.
* **Event Listener:** Kullanıcı etkileşimleri (Buton tıklamaları, arama çubuğuna yazı yazılması, formun gönderilmesi, tema değişimi) tamamen optimize edilmiş `addEventListener()` dinleyicileriyle (`click`, `input`, `submit`) kontrol edilmektedir.

### 📱 4. Tasarım: Responsive ve Kullanıcı Dostu (UX/UI)
* **CSS Grid & Flexbox:** Arayüz, modern CSS teknikleriyle örülmüştür. Mobil cihazlarda tekli kart sütunu, tabletlerde ikili, masaüstü büyük ekranlarda ise 3'lü ve 4'lü esnek ızgara (`grid-template-columns: repeat(auto-fill, minmax(...))`) yapısına geçerek kusursuz bir responsive deneyim sunar.
* **Mevki Renk Kodlaması:** Kullanıcı dostu arayüz kapsamında her oyuncunun mevkisi kendine has bir tema rengiyle (Forvet: Ateş Kırmızısı, Orta Saha: Zümrüt Yeşili, Defans: Çelik Mavisi, Kaleci: Asil Mor) sol şerit olarak kartlara işlenmiştir.

---

## ⚡ EKSTRA PUAN GETİRECEK ÖZELLİKLER (BONUS MADDELER)

Hocamızın ödev metninde belirttiği tüm ekstra puan kriterleri projeye titizlikle dahil edilmiştir:

* 🔍 **Arama Sistemi:** Arama kutusuna yazılan her harf anlık olarak dinlenir (`input` event). JavaScript, oyuncuların isimlerini (`title`), teknik analiz dökümanlarını (`body`) ve mevkilerini (`category`) `.toLowerCase()` ile süzerek anlık (real-time) arama gerçekleştirir.
* 🎛️ **Filtreleme Sistemi:** Üst konsolda yer alan mevki butonları (`data-category`), arama motoruyla kombine çalışır. Örneğin kullanıcı "Forvet" butonuna basıp arama kutusuna "M" yazdığında sadece ismi M ile başlayan forvetler listelenir.
* 💾 **LocalStorage Teknolojisi:** Kullanıcının sitede yaptığı Gece/Gündüz modu seçimi tarayıcının yerel hafızasında (`localStorage.setItem`) saklanır. Sayfa kapatılıp açılsa dahi kullanıcının tercih ettiği tema otomatik olarak yüklenir (`localStorage.getItem`).
* 🌗 **Dark Mode (Gece Modu):** Tek bir buton tetiklemesiyle tüm CSS değişkenleri (`--bg-color`, `--text-color` vb.) saniyeler içinde siber bir gece temasına evrilir. Gözü yormayan modern kontrast ayarları yapılmıştır.
* ⏳ **Loading Animasyonu:** API'den veri çekilirken internet hızına bağlı oluşabilecek gecikmelerde kullanıcının sitenin donduğunu düşünmemesi için CSS ile tasarlanmış modern bir **Yükleme Çarkı (Spinner)** ve "Veri tabanına bağlanılıyor..." bildirimi asenkron işlem bitene kadar ekranda gösterilir (`finally` bloğu ile gizlenir).
* 🔔 **Toast Mesajları:** Sitede yapılan her başarılı veya hatalı işlemden sonra (Örn: "Yeni efsane başarıyla eklendi!", "Oyuncu sözleşmesi feshedildi!") sağ üst köşede 3 saniye sonra kayarak kaybolan zarif animasyonlu siber bildirim pencereleri (Toast) belirir.

---

## 🚀 Canlı Sürüm (Deployment)
Projenin derlenmiş, canlı ve test edilebilir web sürümüne aşağıdaki bağlantıdan ulaşabilirsiniz:
👉 **[Buraya Netlify Canlı Site Linkini Yapıştır Kral]**
