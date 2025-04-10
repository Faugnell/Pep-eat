# Pep'eat
##### Projet bloc web avancé - 2025
##### Groupe 2 : [DEXES Victor](https://github.com/VictorDexes) - [MENANTEAU Melvin](https://github.com/Melvin-Menanteau) - [MERCIER Charly](https://github.com/Charlyhno-eng) - [PETIT Victor](https://github.com/Faugnell)

![pep'eat logo](/livrables/livrable1/src/logo/logo-green.png)

## 🧰 Technologies

- **Frontend** : NuxtJS, Pinia, TailwindCSS (si utilisé)
- **Backend** : Node.js, ExpressJS
- **Librairies** : dotenv, axios, etc.

## 🏗️ Architecture

Le backend est composé de plusieurs microservices indépendants :

| Microservice         | Port   | Rôle                                                             |
|----------------------|--------|------------------------------------------------------------------|
| **restaurant**        | 3101   | Gestion des restaurants                                         |
| **commande**          | 3102   | Prise en charge des commandes clients                           |
| **article/menu**      | 3103   | Gestion des menus et articles                                   |
| **authentification**  | 3104   | Authentification, inscription et gestion des sessions           |
| **livraison**         | 3105   | Suivi et gestion des livraisons                                 |
| **média**             | 3107   | Gestion des fichiers médias (images, etc.)                      |
| **profil**            | 3108   | Gestion des profils utilisateurs                                |
| **notifications**     | 3109   | Envoi de notifications (email, push, etc.)                      |
| **développeur tier**  | -      | (Service réservé ou non encore défini)                          |
| **commercial**        | -      | (Service réservé ou non encore défini)                          |
| **paiement**          | -      | A été fait en front uniquement                                  |

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

🛠️ Configuration

Chaque service nécessite un fichier .env. Voici un exemple type :

```bash
PORT=3101
DB_URI=mongodb://example...
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
