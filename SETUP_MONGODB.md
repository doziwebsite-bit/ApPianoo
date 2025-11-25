# Configuration MongoDB Atlas

## Étape 1 : Créer un compte MongoDB Atlas

1. Allez sur https://www.mongodb.com/cloud/atlas/register
2. Créez un compte gratuit (Google OAuth recommandé)
3. Choisissez le plan **FREE** (M0 Sandbox)
4. Région : Choisir la plus proche (ex: Frankfurt, Germany)
5. Nom du cluster : `alanpaul-cluster`

## Étape 2 : Configurer l'accès

1. **Database Access** :
   - Créer un utilisateur
   - Username : `alanpaul-admin`
   - Password : Générer un mot de passe fort (NOTEZ-LE !)
   - Rôle : `Atlas admin`

2. **Network Access** :
   - Cliquer sur "Add IP Address"
   - Choisir "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirmer

## Étape 3 : Obtenir la chaîne de connexion

1. Cliquer sur "Connect" sur votre cluster
2. Choisir "Connect your application"
3. Driver : Node.js
4. Version : 4.1 or later
5. Copier la connection string :
   ```
   mongodb+srv://alanpaul-admin:<password>@alanpaul-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Remplacer `<password>` par votre vrai mot de passe

## Étape 4 : Structure de la base de données

Collections à créer :
- `users` - Profils utilisateurs
- `products` - Partitions à vendre
- `orders` - Commandes
- `files` - Métadonnées des fichiers PDF

## Prochaine étape

Une fois MongoDB configuré, nous créerons le backend Node.js.
