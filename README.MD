git clone

npm install

## Configuration du projet

Avant de lancer le projet en local ou en production, vous devez configurer votre fichier `.env`.

cp .env.example .env :

# URL de connexion à la base de données (exemple pour PostgreSQL)

DATABASE_URL=postgres://user:password@localhost:5432/mydatabase

# Clé secrète pour la gestion des tokens JWT. Doit être unique et secrète.

JWT_SECRET=your-jwt-secret-here

# Le port sur lequel l'application écoute

PORT=3000

# Domaine autorisé pour les requêtes CORS

CORS_ORIGIN=http://localhost:5173

# Clé API pour un service externe comme Stripe, Google Maps, etc.

API_KEY=your-api-key-here

# Mode d'exécution de l'application (production, développement)

NODE_ENV=production

# Créer la BDD

"db:create"
"db:seed" : pour inclure les données de démonstration seulement.

# Lancer les tests unitaires avec Jest pour vérifier que tout fonctionne correctement.
npm run test 