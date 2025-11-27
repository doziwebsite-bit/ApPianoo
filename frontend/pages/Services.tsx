import React, { useState } from 'react';
import { Calendar, Mail, Trophy, Music, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch(`${API_CONFIG.baseURL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          eventType: 'Match de Basket',
          message: ''
        });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error(data.error || 'Une erreur est survenue lors de l\'envoi.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Une erreur est survenue');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen">
      {/* Header Hero */}
      <div className="relative py-24 bg-black text-white overflow-hidden">
        <img
          src="https://picsum.photos/seed/stadium/1600/900"
          alt="Basketball Stadium"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold mb-6">Prestations Live</h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Animation de matchs de basket, événements sportifs et concerts privés. Apportez une touche unique à votre événement.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="font-serif text-4xl font-bold">Le Show Sportif</h2>
          <p className="text-lg opacity-80 leading-relaxed">
            Alan Paul propose une expérience musicale immersive pour les événements sportifs. Spécialisé dans l'animation des temps morts et des mi-temps, il transforme l'ambiance du stade avec des reprises énergiques et des compositions épiques.
          </p>

          <ul className="space-y-4">
            {[
              { icon: <Trophy className="text-yellow-500" />, text: "Animation mi-temps & avant-match" },
              { icon: <Music className="text-blue-500" />, text: "Répertoire adapté (Epic, Pop, Rock)" },
              { icon: <Calendar className="text-green-500" />, text: "Disponible pour la saison 2025/2026" },
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
              <CheckCircle size={48} />
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
                <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 p-4 rounded-lg flex items-center gap-3">
                  <AlertCircle size={20} />
                  <p>{errorMessage}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-60">Prénom</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1 opacity-60">Nom</label>
                  <input
                    type="text"
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
                <label className="block text-xs font-bold uppercase mb-1 opacity-60">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="votre.email@exemple.fr"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-60">Type d'événement</label>
                <select
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
                <label className="block text-xs font-bold uppercase mb-1 opacity-60">Message</label>
                <textarea
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
                className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Envoi en cours...
                  </>
                ) : (
                  <>
                    <Mail size={18} /> Envoyer
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;