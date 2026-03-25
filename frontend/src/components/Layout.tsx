import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ASSETS } from '../constants';
import SocialLinks from './SocialLinks';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const { items } = useCart();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Partitions', path: '/store' },
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

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ease-in-out ${isDark ? 'text-gray-100' : 'text-gray-900'}`}>
      
      {/* Test Site Banner */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold relative z-[60] shadow-md uppercase tracking-wider">
        SITE DE TEST - Nous déclinons toute responsabilité pour toute utilisation ou transaction sur ce site.
      </div>

      {/* Background Image Layer */}
      <div className={`fixed inset-0 z-[-2] transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <picture>
          <source srcSet={ASSETS.background.webp} type="image/webp" />
          <img 
            src={ASSETS.background.original} 
            alt="Alan Paul background" 
            width={1920}
            height={1080}
            fetchPriority="high" 
            decoding="async" 
            className="w-full h-full object-cover" 
          />
        </picture>
      </div>

      {/* Overlay "Voile Blanc" for better readability over background photo */}
      <div className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-black/90' : 'bg-white/85'}`}></div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${isDark ? 'bg-black/60 border-gray-800' : 'bg-white/60 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 relative">

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Fermer le menu de navigation' : 'Ouvrir le menu de navigation'}
                aria-expanded={isMenuOpen}
                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
              </button>
            </div>

            {/* Logo - Centered on mobile, left-aligned on desktop */}
            <div 
              className="flex-shrink-0 flex items-center cursor-pointer gap-3 absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0" 
              onClick={() => navigate('/')} 
              role="link" 
              tabIndex={0} 
              aria-label="Retour à l'accueil - Alan Paul" 
              onKeyDown={(e) => { if (e.key === 'Enter') navigate('/'); }}
            >
              {!logoError ? (
                <picture>
                  <source 
                    srcSet={`${isDark ? ASSETS.logoDark.webp300w : ASSETS.logoLight.webp300w} 300w, ${isDark ? ASSETS.logoDark.webp : ASSETS.logoLight.webp} 1876w`}
                    sizes="48px"
                    type="image/webp" 
                  />
                  <img
                    src={isDark ? ASSETS.logoDark.original : ASSETS.logoLight.original}
                    alt="Logo Alan Paul"
                    width={48}
                    height={48}
                    decoding="async"
                    className="h-12 w-auto object-contain aspect-square"
                    onError={() => setLogoError(true)}
                  />
                </picture>
              ) : (
                <div className="h-10 w-10 bg-black dark:bg-white rounded flex items-center justify-center text-white dark:text-black font-serif font-bold text-xl">
                  AP
                </div>
              )}
              <span className="hidden sm:block font-serif text-xl tracking-wide font-bold">Alan Paul</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8" aria-label="Navigation principale">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm uppercase tracking-widest hover:text-gray-700 dark:hover:text-gray-300 transition-colors ${isActive(link.path) ? 'border-b-2 border-current pb-1' : ''}`}
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              <button
                onClick={toggleTheme}
                aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
                className="p-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
              </button>

              <button
                onClick={handleUserClick}
                aria-label={isAuthenticated ? "Accéder à mon compte" : "Se connecter"}
                className="p-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative"
              >
                <User size={20} aria-hidden="true" />
                {isAuthenticated && <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full" aria-hidden="true"></span>}
              </button>

              <Link to="/cart" aria-label={`Panier (${items.length} article${items.length !== 1 ? 's' : ''})`} className="p-1 hover:text-gray-700 dark:hover:text-gray-300 transition-colors relative">
                <ShoppingCart size={20} aria-hidden="true" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full" aria-hidden="true">
                    {items.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden border-t border-gray-200 dark:border-gray-800 absolute w-full bg-white dark:bg-black" aria-label="Navigation mobile">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-200 dark:hover:bg-gray-800 uppercase tracking-wider"
                  aria-current={isActive(link.path) ? 'page' : undefined}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full overflow-x-hidden">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 ${isDark ? 'bg-black/80 border-gray-800 text-gray-400' : 'bg-white/80 border-gray-200 text-gray-700'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          <SocialLinks />

          <p className="text-center text-sm font-serif opacity-90">
            &copy; {new Date().getFullYear()} Alan Paul. All Rights Reserved.
          </p>
          <nav className="mt-4 flex flex-wrap justify-center gap-4 text-xs opacity-90" aria-label="Liens légaux">
            <Link to="/mentions-legales" className="hover:underline">Mentions Légales</Link>
            <Link to="/politique-confidentialite" className="hover:underline">Politique de Confidentialité</Link>
            <Link to="/cgu" className="hover:underline">CGU</Link>
            <Link to="/cgv" className="hover:underline">CGV</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
};

export default Layout;