# ⚽ SquadMaster - Dünya Efsaneleri Kadro Yönetim Otomasyonu

Bu dökümantasyon, **Web Tasarım Dersi Final Ödevi** kapsamında geliştirilen "SquadMaster" projesinin mimari yapısını, kullanılan teknolojileri ve ödev isterlerine yönelik teknik çözümleri en ince ayrıntısına kadar açıklamaktadır.

---

## 📂 BÖLÜM 1: Proje Sahibi ve Geliştirici Bilgileri
* **Geliştirici Adı Soyadı:** Caner Mercan
* **Proje Statüsü:** Bireysel Final Projesi
* **Proje Teması:** Dünya Futbol Tarihindeki 32 Efsane Oyuncunun CRUD Paneli

---

## 🛠️ BÖLÜM 2: Kullanılan Teknolojiler ve Versiyon Kontrolü
Projenin ön yüz mimarisi ve versiyon takibi tamamen modern web standartlarına ve endüstriyel pratiklere uygun olarak yapılandırılmıştır:
* **HTML5:** Anlamsal (Semantic) etiketler kullanılarak SEO ve erişilebilirlik standartlarına uygun arayüz iskeleti.
* **CSS3:** Tamamen özelleştirilmiş CSS Değişkenleri (CSS Variables), Flexbox ve Grid sistemleri ile modüler stil yönetimi.
* **Modern JavaScript (ES6+):** Nesne yönelimli ve asenkron programlama pratikleri.
* **Git & GitHub:** Projenin tüm geliştirme süreçleri lokalde Git yazılımı ile takip edilmiş ve GitHub üzerinde herkese açık (Public) olarak uzak depoya aktarılmıştır.

---

## 📥 BÖLÜM 3: Public API Entegrasyonu Mimarisi
Ödev dökümanında belirtilen dış kaynaklı veri tüketimi için **JSONPlaceholder** REST API servisleri entegre edilmiştir:
* **Uç Nokta (Endpoint):** `https://jsonplaceholder.typicode.com/posts`
* **Veri Tüketim Stratejisi:** API'den gelen ham metinsel veriler (`title` ve `body`), projenin konseptine uygun olarak JavaScript tarafında dinamik bir veri harmanlama (Data Mapping) işlemine tabi tutulmuştur. 
* **Data Mapping:** API'den dönen her nesne, yerel veri havuzundaki futbolcuların mevkileri (`category`), takımları ve gerçek istatistikleri ile eşleştirilerek anlamlı birer "Efsane Oyuncu Kartı" formuna dönüştürülür.

---

## 🔄 BÖLÜM 4: Asenkron Veri Yönetimi (fetch API & async / await)
Geleneksel, tarayıcıyı kilitleyen ve kod okunabilirliğini düşüren asenkron yapılar yerine modern JavaScript mimarisi tercih edilmiştir:
* **fetch API Kullanımı:** Sunucuya atılan tüm HTTP istekleri, JavaScript'in yerleşik `window.fetch` fonksiyonu ile asenkron sözleşmeler (Promises) üzerinden yönetilir.
* **async / await Senkronizasyonu:** Kod bloklarının `then/catch` zincirleriyle karmaşık hale gelmesini (Callback Hell) önlemek amacıyla tüm API istekleri `async` fonksiyonlar içinde `await` anahtar kelimesiyle senkronize edilmiştir. Bu sayede hata yönetimi `try / catch` blokları ile merkezi hale getirilmiştir.

---

## 💻 BÖLÜM 5: Dinamik DOM Manipülasyonu ve Event Listeners
Projede statik hiçbir HTML kartı bulunmamaktadır. Arayüz tamamen kullanıcı etkileşimlerine göre anlık olarak inşa edilir:
* **Dinamik Element Üretimi:** API'den veri geldikçe veya yeni eleman eklendikçe `document.createElement()`, `querySelector()`, `appendChild()` ve şablon dizileri (Template Literals) kullanılarak DOM ağacı gerçek zamanlı manipüle edilir.
* **Olay Dinleyicileri (Event Management):** 
  * Form gönderimlerinde sayfa yenilenmesini engellemek için `submit` olayında `e.preventDefault()` kontrolü kullanılmıştır.
  * Arama ve filtreleme işlemleri için butonlarda `click`, arama çubuğunda ise anlık tetiklenen `input` olayları dinlenmektedir.

---

## 🔁 BÖLÜM 6: Tam CRUD Döngüsü Uygulama Detayları
Sistem, Single Page Application (SPA) prensiplerine uygun olarak 4 temel veri tabanı işlemini tarayıcı yenilenmeden simüle eder:
1. **CREATE (Ekleme):** Yeni oyuncu formu doldurulduğunda, veriler API'ye `POST` metoduyla gönderilir. Başarılı yanıt (HTTP 201) alındığında, yeni oyuncu nesnesi yerel diziye ve arayüze `unshift()` edilerek en üste eklenir.
2. **READ (Listeleme):** Sayfa ilk açıldığında `DOMContentLoaded` olayı ile asenkron istek tetiklenir, spinner aktif edilir ve veriler responsive kartlar halinde listelenir.
3. **UPDATE (Güncelleme):** `Düzenle` butonuna basıldığında ilgili oyuncunun ID'si üzerinden mevcut bilgileri yakalanıp forma basılır. Form yeniden gönderildiğinde API'ye `PUT` metodu simüle edilir ve yerel dizideki eleman güncellenerek DOM manipülasyonu ile kart anında yenilenir.
4. **DELETE (Silme):** `Sözleşmeyi Feshet` butonuna basıldığında pencerede bir `confirm()` doğrulaması açılır. Kullanıcı onay verirse API'ye `DELETE` isteği atılır ve oyuncu yerel diziden `.filter()` metoduyla ayıklanarak DOM'dan tamamen kaldırılır.

---

## 🔍 BÖLÜM 7: Gelişmiş Filtreleme ve Canlı Arama Algoritması
Kullanıcı deneyimini (UX) en üst seviyeye çıkarmak için kombine çalışan bir arama ve filtreleme motoru yazılmıştır:
* **Anlık Canlı Arama:** Arama kutusuna girilen her karakter `input` eventi ile yakalanır. Büyük/küçük harf duyarlılığını ortadan kaldırmak için hem aranan kelime hem de oyuncu verileri `.toLowerCase()` fonksiyonundan geçirilir. Oyuncunun ismi (`title`) veya teknik dökümanı (`body`) içinde eşleşme taranır.
* **Mevki Filtreleme:** Üst paneldeki butonlar, elementlerin `data-category` niteliklerini okur. Seçilen mevkiye (Forvet, Orta Saha, Defans, Kaleci) ait oyuncular `.filter()` metoduyla filtrelenir. Arama çubuğu ve filtre butonları ortak bir state (durum) üzerinden beslendiği için birbirlerinin sonuçlarını kısıtlamadan senkronize çalışırlar.

---

## 💾 BÖLÜM 8: Kalıcı Durum Yönetimi (LocalStorage Entegrasyonu)
Kullanıcıların web sitesindeki yapılandırma tercihleri, tarayıcı oturumu kapansa dahi korunacak şekilde tasarlanmıştır:
* **Veri Depolama:** Kullanıcı Gece/Gündüz modu butonuna bastığında, seçilen temanın aktiflik durumu (Örn: `theme: dark`) `localStorage.setItem()` metodu ile tarayıcının yerel depolama alanına string olarak yazılır.
* **Veri Okuma ve State Başlatma:** Sayfa her yüklendiğinde JavaScript ilk olarak `localStorage.getItem()` kontrolü yapar. Eğer kullanıcı daha önce "Dark Mode" seçmişse, HTML `body` etiketine ilgili CSS sınıfı daha sayfa tamamen render edilmeden eklenir. Böylece sayfa açılışında göz kırpma (flickering) efekti önlenir.

---

## 🌗 BÖLÜM 9: Kullanıcı Arayüzü Dinamikleri (Dark Mode, Spinner & Toast)
Ödev dökümanında ekstra puan kategorisinde yer alan tüm kullanıcı dostu arayüz elementleri sıfırdan kodlanmıştır:
* **Dark Mode (Gece Modu):** CSS mimarisinde tanımlanan kök değişkenler (`:root`), gövdeye `.dark-theme` sınıfı geldiğinde saniyeler içinde yeni kontrast renk kodlarına evrilir. Tasarımda geçiş yumuşaklığı için `transition: all 0.3s ease` kullanılmıştır.
* **Asenkron Loading Spinner:** API sunucusundan yanıt beklenen asenkron süreçte (`fetch` başlama anı), CSS keyframes animasyonları ile dönen bir yükleme çarkı arayüze basılır. İstek başarılı veya başarısız sonuçlansa dahi `finally` bloğu içinde bu spinner DOM'dan temizlenir.
* **Dinamik Toast Bildirimleri:** CRUD işlemlerinin tamamında, sayfanın sağ üst köşesinde animasyonlu bildirim kutuları (Toast) belirir. Bu kutular 3 saniye sonra JavaScript `setTimeout` mekanizması ile kendi kendini DOM'dan imha eder (Self-destruction).

---

## 📱 BÖLÜM 10: Esnek (Responsive) Tasarım ve Deployment
* **Responsive Grid Sistemi:** CSS Grid `repeat(auto-fill, minmax(280px, 1fr))` yapısı sayesinde ekran boyutu ne olursa olsun kartlar taşma yapmadan otomatik olarak hizalanır. Mobil cihazlarda dikey tekli sütun düzenine, geniş ekranlarda ise yan yana 4'lü matris düzenine kusursuz geçiş sağlanır.
* **Canlı Yayın (Deployment):** Projenin tüm kaynak kodları derlenmiş ve sürekli entegrasyon (CI/CD) altyapısına sahip **Netlify** platformu üzerinde canlıya alınmıştır.
* **Canlı Önizleme Adresi:** 👉 **[Netlify Canlı Site Linkini Buraya Yapıştır Kral]**
