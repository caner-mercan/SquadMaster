# ⚽ SquadMaster - Dünya Efsaneleri Yönetim Paneli

Bu proje, **Web Tasarım dersi final ödevi** kriterlerine %100 uyumlu olarak; `JSONPlaceholder` Public API'si üzerinden asenkron veri çeken, gelişmiş filtreleme ve kullanıcı dostu arayüz özelliklerine sahip, tam donanımlı bir **Kadro Yönetim Sistemi (CRUD)** otomasyonudur.

## 👤 Geliştirici & Proje Sahibi
* **Caner Mercan**

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
* **Mevki Renk Kodlaması:** Kullanıcı dostu arayüz kapsamında her oyuncunun mevkisi kendine has bir tema rengiyle (Forvet: Ateş Kırmızısı, Orta Saha: Zümrüt Yeşili, Defans: Çelik
