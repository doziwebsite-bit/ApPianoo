import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ASSETS, SOCIAL_LINKS } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const { items } = useCart();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false); // État pour gérer l'erreur d'image logo
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    // { name: 'Partitions', path: '/store' },
    { name: 'Média', path: '/media' },
    { name: 'Prestations', path: '/services' },
  ];

  const handleUserClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  // SVGs for specific social platforms
  const SocialIcon = ({ path, viewBox = "0 0 24 24" }: { path: string, viewBox?: string }) => (
    <svg className="w-5 h-5 fill-current" viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  );

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ease-in-out ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>

      {/* Maintenance Banner */}
      <div className="bg-red-600 text-white text-center py-2 font-bold z-[60] relative">
        ⚠️ SITE EN MAINTENANCE La demande de devis pour prestations via le site est momentanément impossible. Pour toute demande de devis, merci de nous contacter directement par email à : ap.pianoo@outlook.fr
      </div>

      {/* Background Image Layer */}
      <div className={`fixed inset-0 z-[-2] transition-opacity duration-500 ${isDark ? 'bg-marble-dark' : 'bg-marble-light'}`}></div>

      {/* Overlay "Voile Blanc" for better readability over background photo */}
      <div className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-black/90' : 'bg-white/85'}`}></div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDark ? 'bg-black/60 border-gray-800' : 'bg-white/60 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer gap-3" onClick={() => navigate('/')}>
              {!logoError ? (
                <img
                  src={isDark ? ASSETS.logoDark : ASSETS.logoLight}
                  alt="Alan Paul Logo"
                  className="h-12 w-auto object-contain"
                  onError={() => setLogoError(true)}
                />
              ) : (
                /* Fallback si l'image est manquante */
                <div className="h-10 w-10 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-serif font-bold text-xl">
                  AP
                </div>
              )}
              <span className="hidden sm:block font-serif text-xl tracking-wide font-bold">Alan Paul</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest hover:text-gray-500 transition-colors ${isActive(link.path) ? 'border-b-2 border-current pb-1' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button onClick={toggleTheme} className="p-1 hover:text-gray-500 transition-colors">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button onClick={handleUserClick} className="p-1 hover:text-gray-500 transition-colors relative" title={isAuthenticated ? "Mon Compte" : "Se connecter"}>
                <User size={20} />
                {isAuthenticated && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full"></span>}
              </button>

              {/* <Link to="/cart" className="p-1 hover:text-gray-500 transition-colors relative">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </Link> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 absolute w-full bg-white dark:bg-black">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-800 uppercase tracking-wider"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 ${isDark ? 'bg-black/80 border-gray-800 text-gray-400' : 'bg-white/80 border-gray-200 text-gray-600'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

          <div className="flex flex-wrap justify-center gap-8 mb-8">
            {/* YouTube */}
            <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors" title="YouTube">
              <SocialIcon path="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </a>

            {/* Instagram */}
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition-colors" title="Instagram">
              <SocialIcon path="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
            </a>

            {/* TikTok */}
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors" title="TikTok">
              <SocialIcon path="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </a>

            {/* Spotify */}
            <a href={SOCIAL_LINKS.spotify} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors" title="Spotify">
              <SocialIcon path="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </a>

            {/* Apple Music (Standard Apple Logo) */}
            <a href={SOCIAL_LINKS.appleMusic} target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors" title="Apple Music">
              <SocialIcon path="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.21-.93 3.69-.93 1.55.05 2.62.66 3.38 1.63-3.31 1.62-2.71 5.3 1.18 6.53-.9 2.56-2.09 4.69-3.33 4.96zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
            </a>

            {/* Deezer (Clean Equalizer) */}
            <a href={SOCIAL_LINKS.deezer} target="_blank" rel="noopener noreferrer" className="hover:text-purple-500 transition-colors" title="Deezer">
              <SocialIcon path="M2 13v6h4v-6H2zm6-6v12h4V7H8zm6-4v16h4V3h-4zm6 7v9h4v-9h-4z" />
            </a>

          </div>

          <p className="text-center text-sm font-serif opacity-80">
            &copy; {new Date().getFullYear()} Alan Paul. All Rights Reserved.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs opacity-60">
            <Link to="/mentions-legales" className="hover:underline">Mentions Légales</Link>
            <Link to="/politique-confidentialite" className="hover:underline">Politique de Confidentialité</Link>
            <Link to="/cgu" className="hover:underline">CGU</Link>
            {/* <Link to="/cgv" className="hover:underline">CGV</Link> */}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;