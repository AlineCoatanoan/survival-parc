# Survival Parc - Backend

## 🚀 Présentation du projet

**Survival Parc** vous plonge dans une expérience immersive au sein d'un univers post-apocalyptique ravagé par un virus zombie. Inspiré de sagas comme _The Last of Us_, le parc recrée une zone de quarantaine réaliste où chaque détail transporte les visiteurs dans un monde hostile et captivant.

Le parc est réservé aux visiteurs de plus de 16 ans pour préserver l'intensité de l'expérience. Les billets sont disponibles à la journée, avec la possibilité de réserver un séjour dans l'un des deux hôtels au décor apocalyptique.

L'objectif du site est de permettre aux visiteurs :

- Créer un compte utilisateur
- Gérer leur profil
- Réserver leurs billets et hébergements
- Consulter les informations du parc, attractions et hôtels

Le back-office permet au gérant de :

- Gérer les attractions, événements et hôtels
- Consulter les réservations
- Modifier les informations du site

---

## 🎯 Fonctionnalités du backend

### 🔥 Pour les utilisateurs

- **Création de compte et connexion sécurisée** (JWT, bcrypt)
- **Gestion du profil utilisateur** (modification des infos, historique de réservations)
- **Réservation de billets** (choix de la date et du nombre de personnes)
- **Consultation des attractions** (descriptions détaillées, photos, règles)
- **Consultation des hôtels** (ambiances, types de chambres, réservation)
- **Accès aux informations pratiques** (plan du parc, FAQ, horaires, contact, accès)

### 🔧 Pour les administrateurs

- **Gestion des contenus** (attractions, événements, promotions, hôtels)
- **Consultation des réservations**
- **Modification des informations du parc**

### 📌 Évolutions possibles

- **Système de paiement en ligne sécurisé**
- **Système de messagerie utilisateur-admin**
- **Système de notation et commentaires des activités**
- **Statistiques des réservations**

---

## 🛠️ Technologies utilisées

### 🌟 Front-end

- React
- Tailwind CSS
- Framer Motion
- DaisyUI
- Axios
- React Router
- React Hook Form

### 🔥 Back-end

- Node.js
- Express
- Sequelize
- PostgreSQL
- Joi (validation des données)
- JWT (authentification)
- Bcrypt (hachage des mots de passe)
- dotenv (gestion des variables d'environnement)

### 🔒 Sécurité

- Validation des champs (Joi)
- JWT Token
- Cookies sécurisés (anti-XSS/CSRF)
- Hachage des mots de passe (bcrypt)

---

## ⚙️ Installation du projet

1. **Cloner le projet** :

   ```bash
   git clone https://github.com/votre-repo/survival-parc-back.git
   cd survival-parc-back
   ```

2. **Installer les dépendances** :

   ```bash
   pnpm install
   ```

3. **Configurer les variables d'environnement** :
   Créez un fichier `.env` à la racine avec :

   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=votre_mot_de_passe
   DB_NAME=survival_parc
   JWT_SECRET=unSecretTresSecret
   PORT=3001
   ```

4. **Lancer le serveur en développement** :

   ```bash
   pnpm dev
   ```

5. **Reset et seed de la base de données (si nécessaire)** :
   ```bash
   pnpm db:reset
   pnpm db:seed
   ```

---

## 🧠 Test du backend

### 🔬 Lancer les tests

```bash
pnpm test
```

---

### 🎟️ Dossier de présentation complet en PDF dans le back

Les wireframes

Les user stories décrivant les parcours utilisateurs

Les schémas de la base de données (MCD / MLD / MPD)

Workflow

Les spécifications techniques

Dictionnaire des données

Charte graphique

Une maquette visuelle du site

---

## 🔍 Veille technologique

- Suivi des mises à jour de sécurité (Node.js, Sequelize, PostgreSQL)
- Surveillance des failles XSS/CSRF
- Mise à jour des bonnes pratiques en gestion d'authentification

---

## Projet réalisé par **Aline** en autonomie.

Projet de présentation devant le jury pour le passage du Titre Professionnel de Developpeuse Web Web Mobile.

Résultat : ADMISE

---

✨ **Survival Parc - Parce que survivre, c'est déjà une aventure !**
