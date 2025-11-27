import express from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configuration du transporteur Nodemailer
// Les variables d'environnement doivent être configurées dans le fichier .env
const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail', // ou 'outlook', 'hotmail', etc.
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route pour envoyer un email de contact/devis
router.post('/', async (req, res) => {
    const { firstName, lastName, email, eventType, message } = req.body;

    // Validation basique
    if (!firstName || !lastName || !email || !eventType || !message) {
        return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    const mailOptions = {
        from: process.env.EMAIL_USER, // L'email qui envoie (doit être authentifié)
        to: 'ap.pianoo@outlook.fr', // L'email de destination demandé
        replyTo: email, // Pour répondre directement au client
        subject: `Nouveau devis : ${eventType} - ${firstName} ${lastName}`,
        text: `
            Nouveau message de demande de devis :
            
            Nom : ${lastName}
            Prénom : ${firstName}
            Email : ${email}
            Type d'événement : ${eventType}
            
            Message :
            ${message}
        `,
        html: `
            <h3>Nouveau message de demande de devis</h3>
            <ul>
                <li><strong>Nom :</strong> ${lastName}</li>
                <li><strong>Prénom :</strong> ${firstName}</li>
                <li><strong>Email :</strong> ${email}</li>
                <li><strong>Type d'événement :</strong> ${eventType}</li>
            </ul>
            <p><strong>Message :</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email envoyé avec succès !' });
    } catch (error) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        res.status(500).json({ error: 'Erreur lors de l\'envoi de l\'email.', details: error.message });
    }
});

export default router;
