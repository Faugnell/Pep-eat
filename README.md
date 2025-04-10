# Pep'eat - Projet web avancé - 2025
##### Groupe 2 : [DEXES Victor](https://github.com/VictorDexes) - [MENANTEAU Melvin](https://github.com/Melvin-Menanteau) - [MERCIER Charly](https://github.com/Charlyhno-eng) - [PETIT Victor](https://github.com/Faugnell)

![pep'eat logo](/livrables/livrable1/src/logo/logo-green.png)

## 🧰 Technologies

- **Frontend** : NuxtJS, Vue, Pinia, TailwindCSS
- **Backend** : Node.js, ExpressJS
- **Librairies** : dotenv, jwt, moongoose, nuxt ui

## 🏗️ Architecture

Le backend est composé de plusieurs microservices indépendants :

| Microservice         | Port   | Rôle                                                             |
|----------------------|--------|------------------------------------------------------------------|
| **restaurant**        | 3101   | Gestion des restaurants                                         |
| **commande**          | 3102   | Prise en charge des commandes clients                           |
| **article/menu**      | 3103   | Gestion des articles                                            |
| **authentification**  | 3104   | Authentification, inscription et gestion des sessions           |
| **livraison**         | 3105   | Suivi et gestion des livraisons                                 |
| **média**             | 3107   | Gestion des fichiers médias (images, etc.)                      |
| **profil**            | 3108   | Gestion des profils utilisateurs                                |
| **notifications**     | 3109   | Envoi de notifications                                          |
| **développeur tier**  | -      | (Service réservé ou non encore défini)                          |
| **commercial**        | -      | (Service réservé ou non encore défini)                          |
| **paiement**          | -      | (A été fait en front uniquement)                                |

---

## ⚙️ Pré-requis

- Node.js
- npm
- MongoDB

---

## 🚀 Installation

```bash
git clone https://github.com/ton-utilisateur/pep-eat.git
cd pep-eat
```

### Installer les dépendances

Si chaque service est dans un dossier séparé :

```bash
cd frontend
npm install

cd ../services/restaurant
npm install

# Répéter pour chaque microservice
```

## 🛠️ Configuration

Pour le frontend il faut un .env.local avec les données suivantes :

```bash
API_RESTAURANT_SERVICE_HOST=localhost
API_RESTAURANT_SERVICE_PORT=3101
API_COMMANDE_SERVICE_HOST=localhost
API_COMMANDE_SERVICE_PORT=3102
API_ARTICLE_SERVICE_HOST=localhost
API_ARTICLE_SERVICE_PORT=3103
API_AUTHENTIFICATION_SERVICE_HOST=localhost
API_AUTHENTIFICATION_SERVICE_PORT=3104
API_LIVRAISON_SERVICE_HOST=localhost
API_LIVRAISON_SERVICE_PORT=3105
API_PAIEMENT_SERVICE_HOST=localhost
API_PAIEMENT_SERVICE_PORT=3106
API_MEDIA_SERVICE_HOST=localhost
API_MEDIA_SERVICE_PORT=3107
API_PROFIL_SERVICE_HOST=localhost
API_PROFIL_SERVICE_PORT=3108
API_NOTIFICATION_SERVICE_HOST=localhost
API_NOTIFICATION_SERVICE_PORT=3109
PUBLIC_NOTIFICATION_SERVICE_HOST=localhost
PUBLIC_NOTIFICATION_SERVICE_PORT=3109
```

Chaque microservice nécessite un fichier .env. Voici un exemple type :

```bash
MONGO_CONNECTION_STRING=mongodb://example...
PORT=3101
JWT_SECRET=une_clé_ultra_secrète
```
⚠️ Pense à adapter chaque .env au service concerné (nom de la BDD, port, clé JWT, etc.)

## 🔧 Lancement

### Frontend (NuxtJS)

```bash
cd frontend
npm run dev
```

### Backend (microservices)

Chaque microservice est lancé individuellement :

```bash
cd services/restaurant
npm run dev
```
