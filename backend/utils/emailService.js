import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'hotmail', // Default to hotmail as per .env example
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        replyTo,
        subject,
        text,
        html
    };

    return transporter.sendMail(mailOptions);
};

export const sendOrderConfirmationEmail = async (order, userEmail) => {
    const downloadLinksHtml = order.items.map(item => `
        <div style="margin-bottom: 20px; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
            <h3 style="margin: 0 0 10px;">${item.title}</h3>
            <a href="${item.product.pdfFile}" style="display: inline-block; padding: 10px 20px; background-color: #000; color: #fff; text-decoration: none; border-radius: 5px;">Télécharger la partition (PDF)</a>
        </div>
    `).join('');

    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #333;">Merci pour votre commande !</h1>
            <p>Bonjour,</p>
            <p>Nous avons bien reçu votre commande <strong>#${order.orderId || order._id}</strong>.</p>
            
            <h2>Vos téléchargements :</h2>
            ${downloadLinksHtml}
            
            <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
            
            <h3>Détails de la commande :</h3>
            <p>Total payé : <strong>${order.total}€</strong></p>
            
            <p>Si vous avez des questions, n'hésitez pas à répondre à cet email.</p>
            <p>Musicalement,<br>L'équipe Alan Paul</p>
        </div>
    `;

    const text = `
        Merci pour votre commande !
        
        Voici vos liens de téléchargement :
        ${order.items.map(item => `${item.title}: ${item.product.pdfFile}`).join('\n')}
        
        Total payé : ${order.total}€
        
        Musicalement,
        L'équipe Alan Paul
    `;

    return sendEmail({
        to: userEmail,
        subject: `Votre commande Alan Paul - Téléchargez vos partitions`,
        html,
        text
    });
};
