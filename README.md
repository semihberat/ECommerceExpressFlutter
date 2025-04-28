Bu proje, paket yönetimi için Bun kullanır.
Bun, npm veya yarn alternatifidir ve çok daha hızlı çalışır.
Paket Kurulumu

Projedeki bağımlılıkları yüklemek için aşağıdaki komutu kullanın:

bun install

veya yeni bir paket eklemek için:

bun add <paket-ismi>

.env Dosyası

Projede çevresel değişkenler (environment variables) .env dosyası ile yönetilmektedir.
Örnek bir .env dosyası aşağıdaki gibidir:

# Veritabanı Ayarları
DB_HOST=localhost            # Veritabanı sunucu adresi
DB_USER=root                 # Veritabanı kullanıcı adı
DB_PASSWORD=sb552003         # Veritabanı şifresi
DB_NAME=ecommerce_db         # Kullanılacak veritabanı ismi
DB_DIALECT=mysql             # Veritabanı türü ('mysql' gibi)

# JWT (JSON Web Token) Ayarları
JWT_SECRET=gizliKey123       # JWT için kullanılan gizli anahtar (güçlü bir şifre olmalı)

# Email Sunucu Ayarları
EMAIL_HOST=smtp-mail.outlook.com  # SMTP sunucu adresi (örnek: Outlook için) (ethreal mail kullanabilirsin)
EMAIL_USER=dev.berat@outlook.com  # SMTP kullanıcı e-posta adresi 
EMAIL_PASS=ornekemailsifre        # SMTP e-posta şifresi veya uygulama şifresi

# Frontend URL Ayarı
FRONTEND_URL=http://localhost:3000  # Frontend uygulamanızın çalıştığı adres

Önemli Notlar

    .env dosyası kesinlikle public (herkesin erişebildiği) bir alanda paylaşılmamalıdır.

    JWT_SECRET ve EMAIL_PASS gibi hassas bilgiler güçlü ve gizli tutulmalıdır.

    E-posta şifresi olarak normal şifrenizi değil, tercihen uygulama şifresi (app password) kullanmalısınız.

    Üretim (production) ortamında, FRONTEND_URL değeri gerçek frontend domain adresinizle güncellenmelidir.

Hızlı Başlangıç Komutları

# Bağımlılıkları yükleyin
bun install

# Sunucuyu başlatın
bun run dev

Kullanılan Teknolojiler

    ORM Sequelize - Veritabani 
    
    Bun → Paket yöneticisi

    MySQL → Veritabanı

    JWT → Kimlik doğrulama (Authentication)

    SMTP (Outlook) → E-posta gönderimi
