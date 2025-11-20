import React from 'react';
import { Calendar, Mail, Trophy, Music } from 'lucide-react';

const Services: React.FC = () => {
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
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-60">Prénom</label>
                <input type="text" className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="John" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase mb-1 opacity-60">Nom</label>
                <input type="text" className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 opacity-60">Email</label>
              <input type="email" className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 opacity-60">Type d'événement</label>
              <select className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Match de Basket</option>
                <option>Concert Privé</option>
                <option>Mariage / Cocktail</option>
                <option>Autre</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-1 opacity-60">Message</label>
              <textarea rows={4} className="w-full p-3 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Détails de votre événement..."></textarea>
            </div>
            <button type="submit" className="w-full py-4 bg-black text-white dark:bg-white dark:text-black font-bold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              <Mail size={18} /> Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Services;