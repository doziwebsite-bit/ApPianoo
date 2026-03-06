import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Calendar, Mail, Trophy, Music, Loader2, CheckCircle, AlertCircle, X, Copy, Check, Coffee, Star } from 'lucide-react';
import { API_CONFIG } from '../constants';

const Services: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventType: 'Match de Basket',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('ap.pianoo@outlook.fr');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, eventType, message } = formData;

    const subject = `Demande de devis: ${eventType}`;
    const body = `Bonjour,

Je souhaiterais obtenir un devis pour un événement.

Détails:
- Nom: ${lastName}
- Prénom: ${firstName}
- Email: ${email}
- Type d'événement: ${eventType}

Message:
${message}

Cordialement.`;

    window.location.href = `mailto:ap.pianoo@outlook.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Prestations Live - Alan Paul</title>
        <meta name="description" content="Réservez Alan Paul pour vos événements : matchs sportifs, concerts privés, mariages, restaurants. Demandez un devis." />
        <meta property="og:title" content="Prestations Live - Alan Paul" />
        <meta property="og:description" content="Animation musicale live pour tous vos événements. Demandez un devis personnalisé." />
        <meta property="og:url" content="https://appianoo.netlify.app/services" />
      </Helmet>
      {/* Header Hero */}
      <div className="relative py-24 bg-black text-white overflow-hidden">
        <img
          src="https://picsum.photos/seed/stadium/1600/900"
          alt="Salle de spectacle pour événement musical"
          width={1600}
          height={900}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Prestations Live</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Animation de matchs sportifs, cafés, restaurants, spectacles et bien plus encore. Une ambiance sur mesure pour chaque événement.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="font-serif text-4xl font-bold">Prestations Adaptées & Polyvalentes</h2>
          <p className="text-lg opacity-90 leading-relaxed">
            Alan Paul ne se limite pas aux stades. Il propose une expérience musicale flexible et immersive, capable de s'adapter à tous les lieux : animation de matchs de basket, ambiances feutrées pour cafés et restaurants, ou performances scéniques pour des spectacles. Il transforme chaque lieu avec un répertoire varié et une énergie communicative.
          </p>

          <ul className="space-y-4">
            {[
              { icon: <Trophy className="text-yellow-500" aria-hidden="true" />, text: "Événements sportifs (Matchs, Tournois)" },
              { icon: <Coffee className="text-amber-700" aria-hidden="true" />, text: "Ambiance Lounge, Cafés & Restaurants" },
              { icon: <Star className="text-purple-500" aria-hidden="true" />, text: "Spectacles & Événementiel privé" },
              { icon: <Music className="text-blue-500" aria-hidden="true" />, text: "Répertoire sur-mesure (Jazz, Pop, Épique)" },
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 p-4 bg-white dark:bg-zinc-900 rounded-lg shadow-sm">
                {item.icon}
                <span className="font-medium">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-100 dark:bg-zinc-900 p-8 rounded-2xl shadow-lg">
          <h3 className="font-serif text-2xl font-bold mb-6">Demander un devis</h3>

          {status === 'success' ? (
            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 p-6 rounded-lg flex flex-col items-center text-center space-y-4">
              <CheckCircle size={48} aria-hidden="true" />
              <h4 className="text-xl font-bold">Message envoyé !</h4>
              <p>Votre demande de devis a bien été reçue. Nous vous répondrons dans les plus brefs délais.</p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors"
              >
                Envoyer un autre message
              </button>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {status === 'error' && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-center gap-3" role="alert">
                  <AlertCircle size={20} aria-hidden="true" />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-xs font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">Prénom</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-xs font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">Nom</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="votre.email@exemple.fr"
                />
              </div>
              <div>
                <label htmlFor="eventType" className="block text-xs font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">Type d'événement</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>Match de Basket</option>
                  <option>Concert Privé</option>
                  <option>Mariage / Cocktail</option>
                  <option>Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase mb-1 text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Détails de votre événement..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                aria-label="Envoyer la demande de devis"
                className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" aria-hidden="true" /> Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail size={18} aria-hidden="true" /> Envoyer
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => setShowEmailModal(true)}
                className="w-full text-center text-sm text-gray-700 dark:text-gray-300 mt-4 underline hover:text-blue-500"
              >
                Le bouton ne fonctionne pas ? Cliquez ici
              </button>
            </form>
          )}
        </div>
      </div>

      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Copier l'adresse email">
          <div className="bg-white dark:bg-zinc-900 rounded-xl max-w-md w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setShowEmailModal(false)}
              aria-label="Fermer la fenêtre"
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <h3 className="text-xl font-bold mb-2">Copier l'adresse email</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
              Si le formulaire ne fonctionne pas, vous pouvez copier l'adresse email ci-dessous pour nous contacter directement.
            </p>

            <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-black rounded-lg border border-gray-200 dark:border-zinc-800">
              <code className="flex-1 font-mono text-sm">ap.pianoo@outlook.fr</code>
              <button
                onClick={handleCopyEmail}
                aria-label="Copier l'adresse email"
                className="p-2 rounded-md hover:bg-white dark:hover:bg-zinc-800 transition-colors relative group"
              >
                {copied ? <Check size={18} className="text-green-500" aria-hidden="true" /> : <Copy size={18} aria-hidden="true" />}
              </button>
            </div>

            {copied && (
              <p className="text-green-500 text-xs mt-2 text-center font-medium" role="status">
                Adresse email copiée !
              </p>
            )}

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-6 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full font-medium text-sm hover:opacity-80 transition-opacity"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;