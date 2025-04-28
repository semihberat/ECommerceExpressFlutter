# Mobile App With Express(Typescript) & Flutter

Bu proje, paket yönetimi için Bun kullanır.
Bun, npm veya yarn alternatifidir ve çok daha hızlı çalışır.
Paket Kurulumu

Projedeki bağımlılıkları yüklemek için aşağıdaki komutu kullanın:

```bash
bun install
```

veya yeni bir paket eklemek için:

```bash
bun add <paket-ismi>
```

### **.env Dosyası**

Projede çevresel değişkenler (environment variables) .env dosyası ile yönetilmektedir.
Örnek bir .env dosyası aşağıdaki gibidir:

```dotenv
# Veritabanı Ayarları
DB_HOST=localhost            # Veritabanı sunucu adresi
DB_USER=root                 # Veritabanı kullanıcı adı
DB_PASSWORD=sb552003         # Veritabanı şifresi
DB_NAME=ecommerce_db         # Kullanılacak veritabanı ismi
DB_DIALECT=mysql             # Veritabanı türü ('mysql' gibi)

# JWT (JSON Web Token) Ayarları
JWT_SECRET=gizliKey123       # JWT için kullanılan gizli anahtar

# Email Sunucu Ayarları
EMAIL_HOST=ornekgecicimail@example.com # SMTP sunucu adresi (örnek: Outlook için) (ethreal mail kullanabilirsin)
EMAIL_USER=dayyummbruh@example.com # SMTP kullanıcı e-posta adresi
EMAIL_PASS=examplemailpass # SMTP e-posta şifresi veya uygulama şifresi

# Frontend URL Ayarı
FRONTEND_URL=http://localhost:3000  # Frontend uygulamanızın çalıştığı adres
```

```txt
/server
DB_HOST -> ./config/dbConnect.ts
DB_USER -> ./config/dbConnect.ts
DB_PASSW0RD -> ./config/dbConnect.ts
DB_NAME -> ./config/dbConnect.ts
DB_DIALECT -> ./config/dbConnect.ts

EMAIL_HOST -> ./utils/mailTransporter.ts
EMAIL_USER -> ./utils/mailTransporter.ts
EMAIL_PASS -> ./utils/mailTransporter.ts

FRONTEND_URL -> ./controllers/authController.ts
```

Hızlı Başlangıç Komutları

# Bağımlılıkları yükleyin

```
bun install
```

# Sunucuyu başlatın

```
bun --watch index.ts
```

Bir kere başlattıktan sonra örnek veritabanı denemesi yapmak için;

```bash
bun ./test/testSeed.ts
```

ardindan tekrar sunucuyu --watch ile başlatmanız önerilir
--watch nodemon'un yaptığı işi yapmakta.

Kullanılan Teknolojiler

    ORM Sequelize - Veritabani

    Bun → Paket yöneticisi

    MySQL → Veritabanı

    JWT → Kimlik doğrulama (Authentication)

    SMTP (Outlook) → E-posta gönderimi

```

```
