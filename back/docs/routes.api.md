## Routes auth

| Méthode | Chemin             | Middleware   | Description             | Paramètres                                |
| ------- | ------------------ | ------------ | ----------------------- | ----------------------------------------- |
| POST    | /api/auth/register | validateUser | Inscription utilisateur | firstname, lastname email, password, role |
| POST    | /api/auth/login    | -            | Connexion utilisateur   | email, password                           |
| POST    | /api/auth/logout   | -            | déconnexion utilisateur | email, password                           |

## Routes User

| Méthode | Chemin            | Middleware        | Description             | Paramètres      |
| ------- | ----------------- | ----------------- | ----------------------- | --------------- |
| GET     | /api/user        | authenticateToken | Obtenir tous les users  | admin           |
| GET     | /api/user/:id    | authenticateToken | Obtenir un user par ID  | admin           |
| GET     | /api/user/search | authenticateToken | Obtenir un user par nom | ?name=... admin |
| DELETE  | /api/user/:id    | authenticateToken | Supprimer un user       | admin           |

## Routes : reservation

| Méthode | Chemin                | Middleware        | Description                     | Paramètres |
| ------- | --------------------- | ----------------- | ------------------------------- | ---------- |
| GET     | /api/reservations     | authenticateToken | Obtenir toutes les réservations |            |
| GET     | /api/reservations/:id | authenticateToken | Obtenir une réservation par ID  |            |
| POST    | /api/reservations     | authenticateToken | Créer une réservation           |            |
| PUT     | /api/reservations/:id | authenticateToken | Mettre à jour une réservation   |            |
| DELETE  | /api/reservations/:id | authenticateToken | Supprimer une réservation       |            |

## Routes : profile

| Méthode | Chemin           | Middleware        | Description              | Paramètres |
| ------- | ---------------- | ----------------- | ------------------------ | ---------- |
| POST    | /api/profile     | authenticateToken | Créer un profil          |            |
| PATCH   | /api/profile/:id | authenticateToken | Mettre à jour son profil |            |
| DELETE  | /api/profile/:id | authenticateToken | Supprimer son profil     |            |

## routes : attraction

| Méthode | Chemin                  | Middleware        | Description                       | Paramètres |
| ------- | ----------------------- | ----------------- | --------------------------------- | ---------- |
| GET     | /api/attractions        | -                 | Obtenir toutes les attractions    | -          |
| GET     | /api/attractions/search | -                 | Rechercher une attraction par nom | ?name=...  |
| GET     | /api/attractions/:id    | -                 | Obtenir une attraction par ID     | -          |
| POST    | /api/attractions        | authenticateToken | Créer une attraction              | admin      |
| PUT     | /api/attractions/:id    | authenticateToken | Mettre à jour une attraction      | admin      |
| DELETE  | /api/attractions/:id    | authenticateToken | Supprimer une attraction          | admin      |

## routes : hotel

| Méthode | Chemin         | Middleware        | Description             | Paramètres |
| ------- | -------------- | ----------------- | ----------------------- | ---------- |
| GET     | /api/hotel     | -                 | Obtenir tous les hotel  | -          |
| GET     | /api/hotel/:id | -                 | Obtenir un hotel par ID | -          |
| POST    | /api/hotel     | authenticateToken | Créer un hotel          | admin      |
| PUT     | /api/hotel/:id | authenticateToken | Mettre à jour un hotel  | admin      |
| DELETE  | /api/hotel/:id | authenticateToken | Supprimer un hotel      | admin      |
