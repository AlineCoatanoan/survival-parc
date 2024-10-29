Le Cross-Site Request Forgery (CSRF) est une attaque où un utilisateur malveillant incite un navigateur à envoyer des requêtes non désirées à une application web sur laquelle l'utilisateur est authentifié. Voici comment cela fonctionne :

**Principe de l'attaque CSRF**

1. Authentification : L'utilisateur se connecte à un site web (par exemple, un site de banque) et reçoit un cookie d'authentification pour sa session.

2. Visite d'un site malveillant : Pendant que l'utilisateur est connecté, il visite un site malveillant. Ce site contient du code (souvent JavaScript ou un formulaire caché) qui envoie une requête HTTP (comme un transfert d'argent) à l'application authentifiée.

3. Requête non désirée : Comme l'utilisateur est déjà connecté et que son navigateur envoie automatiquement les cookies avec les requêtes, le site malveillant réussit à faire une requête non autorisée à l'application.

**Impact de l'attaque**

1. Actions non autorisées : L'attaquant peut réaliser des actions en tant qu'utilisateur sans son consentement, comme modifier des informations personnelles, effectuer des achats, ou transférer des fonds.
2. Perte de confiance : Cela peut entraîner une perte de confiance des utilisateurs envers le site ciblé.

**Protection contre le CSRF**

1. Tokens CSRF : Les applications peuvent utiliser des tokens uniques générés par le serveur pour chaque session. Ce token doit être inclus dans les requêtes sensibles. Le serveur vérifie le token avant d'exécuter l'action demandée.

2. Vérification du référent (Referer) : Le serveur peut vérifier l'en-tête de la requête pour s'assurer qu'elle provient du même domaine.

3. Utilisation de méthodes HTTP sécurisées : Limiter l'utilisation de méthodes sensibles (comme POST) aux seuls contextes où cela est nécessaire.
