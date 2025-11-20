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
  const { isAuthenticated, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      navigate('/cart');
    }
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-500 ease-in-out ${isDark ? 'bg-zinc-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      
      {/* Overlay for better readability over marble background */}
      <div className={`fixed inset-0 z-[-1] pointer-events-none transition-opacity duration-500 ${isDark ? 'bg-black/80' : 'bg-white/70'}`}></div>

      {/* Sticky Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-500 ${isDark ? 'bg-black/70 border-white/10' : 'bg-white/70 border-black/5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
               <div className="w-8 h-8 bg-current rounded-full overflow-hidden">
                 <img src={ASSETS.profile} alt="Alan Paul" className="w-full h-full object-cover opacity-80 group-hover:opacity-100" />
               </div>
               <span className="font-serif text-xl font-bold tracking-tight">Alan Paul</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium uppercase tracking-widest hover:text-blue-500 transition-colors ${isActive(link.path) ? 'text-blue-600 dark:text-blue-400' : 'text-current opacity-70 hover:opacity-100'}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="hidden md:flex items-center gap-6">
              <button onClick={toggleTheme} className="opacity-60 hover:opacity-100 transition-opacity">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <Link to="/cart" className="relative opacity-60 hover:opacity-100 transition-opacity">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </Link>

              <button onClick={handleUserClick} className="opacity-60 hover:opacity-100 transition-opacity">
                 {isAuthenticated && user?.avatarUrl ? (
                   <img src={user.avatarUrl} alt="Profile" className="w-6 h-6 rounded-full border border-current" />
                 ) : (
                   <User size={20} />
                 )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center md:hidden gap-4">
              <Link to="/cart" className="relative opacity-60 hover:opacity-100 transition-opacity">
                <ShoppingCart size={20} />
                {items.length > 0 && (
                   <span className="absolute -top-2 -right-2 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                    {items.length}
                   </span>
                )}
              </Link>
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full h-[calc(100vh-80px)] bg-white dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-800 p-6 flex flex-col gap-6 z-40 overflow-y-auto">
            <nav className="flex flex-col gap-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`text-2xl font-serif font-bold ${isActive(link.path) ? 'text-blue-600' : ''}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            <div className="flex justify-center gap-8 mt-8">
              <button onClick={toggleTheme} className="flex items-center gap-2 opacity-70">
                 {isDark ? <><Sun size={20}/> Light Mode</> : <><Moon size={20}/> Dark Mode</>}
              </button>
              <button onClick={() => { handleUserClick(); setIsMenuOpen(false); }} className="flex items-center gap-2 opacity-70">
                 <User size={20} /> {isAuthenticated ? 'Dashboard' : 'Login'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className={`border-t py-12 ${isDark ? 'bg-black border-zinc-800' : 'bg-gray-100 border-gray-200'}`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <span className="font-serif text-xl font-bold">Alan Paul</span>
            </div>
            <p className="text-sm opacity-60">&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>

          <div className="flex gap-6">
             <a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 hover:text-red-500 transition-all">Youtube</a>
             <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 hover:text-pink-500 transition-all">Instagram</a>
             <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 hover:text-black dark:hover:text-white transition-all">TikTok</a>
             <a href={SOCIAL_LINKS.appleMusic} target="_blank" rel="noreferrer" className="opacity-60 hover:opacity-100 hover:text-pink-500 transition-all">Apple Music</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;