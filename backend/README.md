# 🚀 Guide de démarrage - Backend API

## ✅ Ce qui a été créé

### Structure complète du backend
```
backend/
├── server.js                 # Serveur Express avec toutes les routes
├── package.json             # Dépendances installées ✅
├── .env                     # Variables d'environnement (à configurer)
├── models/
│   ├── User.js             # Modèle utilisateur
│   ├── Product.js          # Modèle partition
│   └── Order.js            # Modèle commande
└── routes/
    ├── auth.js             # Authentification Google + JWT
    ├── products.js         # CRUD partitions
    ├── orders.js           # Gestion commandes
    └── stripe.js           # Paiements Stripe
```

## 📋 Étapes pour démarrer

### 1. Configurer MongoDB Atlas

**a) Créer un compte gratuit :**
- Allez sur https://www.mongodb.com/cloud/atlas/register
- Créez un compte (utilisez Google OAuth)
- Choisissez le plan **FREE (M0)**
- Région : Europe (Frankfurt ou Paris)

**b) Créer un utilisateur de base de données :**
- Database Access → Add New Database User
- Username : `alanpaul-admin`
- Password : Générer un mot de passe fort (NOTEZ-LE !)
- Rôle : Atlas admin

**c) Autoriser l'accès réseau :**
- Network Access → Add IP Address
- Choisir "Allow Access from Anywhere" (0.0.0.0/0)

**d) Obtenir la chaîne de connexion :**
- Clusters → Connect → Connect your application
- Copier la connection string :
  ```
  mongodb+srv://alanpaul-admin:<password>@cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
  ```
- Remplacer `<password>` par votre vrai mot de passe

### 2. Configurer le fichier .env

Éditez `backend/.env` et remplissez :

```env
# MongoDB - Collez votre URI ici
MONGODB_URI=mongodb+srv://alanpaul-admin:VOTRE_MOT_DE_PASSE@cluster.xxxxx.mongodb.net/alanpaul?retryWrites=true&w=majority

# Server
PORT=5000
NODE_ENV=development

# JWT Secret - Générez avec PowerShell :
# node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
JWT_SECRET=COLLEZ_ICI_LE_SECRET_GENERE

# Stripe - Obtenez sur https://dashboard.stripe.com/test/apikeys
STRIPE_SECRET_KEY=sk_test_VOTRE_CLE_STRIPE

# Frontend URLs
FRONTEND_URL=http://localhost:5173
FRONTEND_URL_PROD=https://votre-site.netlify.app
```

### 3. Démarrer le backend

```bash
cd backend
npm run dev
```

Vous devriez voir :
```
✅ MongoDB connecté avec succès
🚀 Serveur démarré sur le port 5000
📍 URL: http://localhost:5000
```

### 4. Tester l'API

Ouvrez http://localhost:5000 dans votre navigateur.

Vous devriez voir :
```json
{
  "message": "API Alan Paul - Backend",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "auth": "/api/auth",
    "products": "/api/products",
    "orders": "/api/orders",
    "stripe": "/api/stripe"
  }
}
```

## 📡 Endpoints API disponibles

### Authentification
- `POST /api/auth/google` - Connexion Google
- `POST /api/auth/email` - Connexion email (démo)
- `GET /api/auth/me` - Profil utilisateur

### Produits
- `GET /api/products` - Liste des partitions
- `GET /api/products/:id` - Détails d'une partition
- `POST /api/products` - Créer une partition
- `PUT /api/products/:id` - Modifier une partition
- `DELETE /api/products/:id` - Supprimer une partition

### Commandes
- `GET /api/orders/user/:userId` - Commandes d'un utilisateur
- `GET /api/orders/:orderId` - Détails d'une commande
- `POST /api/orders` - Créer une commande
- `PUT /api/orders/:orderId/status` - Mettre à jour le statut
- `POST /api/orders/:orderId/download-links` - Générer liens de téléchargement

### Stripe
- `POST /api/stripe/create-payment-intent` - Créer un paiement
- `POST /api/stripe/webhook` - Webhook Stripe
- `GET /api/stripe/payment-status/:id` - Statut d'un paiement

## 🔧 Prochaines étapes

1. **Configurer Stripe** :
   - Créer un compte sur https://stripe.com
   - Obtenir les clés de test
   - Ajouter `STRIPE_SECRET_KEY` dans `.env`

2. **Connecter le frontend** :
   - Installer axios dans le frontend
   - Créer un service API
   - Remplacer les données mockées par les vraies API

3. **Déployer le backend** :
   - Heroku (gratuit)
   - Railway (gratuit)
   - Render (gratuit)

## ⚠️ Important

- Ne commitez JAMAIS le fichier `.env` sur Git
- Le `.env` est déjà dans `.gitignore`
- Utilisez les clés de TEST Stripe en développement

## 🆘 Besoin d'aide ?

Si vous voyez des erreurs :
1. Vérifiez que MongoDB est bien connecté
2. Vérifiez que toutes les variables d'environnement sont remplies
3. Vérifiez les logs dans le terminal

Prêt à continuer ? 🚀
