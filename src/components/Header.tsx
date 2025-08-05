'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ToggleDarkMode';


const MenuIcon = ({ className }: { className: string }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
);

const CloseIcon = ({ className }: { className: string }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);

const DoorIcon = ({ className }: { className: string }) => (
  <svg className={className} stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path><polyline points="10 17 15 12 10 7"></polyline><line x1="15" y1="12" x2="3" y2="12"></line></svg>
);


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setIsMenuOpen(false); };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const handleLinkClick = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const navItems = (
    <>
      <li><Link href="/noticias" className="group text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" onClick={handleLinkClick}>Notícias<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-500"></span></Link></li>
      <li><Link href="/competicoes" className="group text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" onClick={handleLinkClick}>Competições<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-500"></span></Link></li>
      <li><Link href="/jogadores" className="group text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" onClick={handleLinkClick}>Jogadores<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-500"></span></Link></li>
      <li><Link href="/sobre" className="group text-gray-700 dark:text-gray-300 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500" onClick={handleLinkClick}>Sobre<span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-sky-500"></span></Link></li>
    </>
  );

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50 border-b border-slate-200 dark:border-slate-800">
      <nav className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-sky-600 dark:text-sky-400 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">Happy Game</Link>
        
        {/* NAVEGAÇÃO DESKTOP */}
        <ul className="hidden md:flex items-center space-x-8 text-md font-medium">
          {navItems}
          {/* Ícone de porta adicionado ao menu de desktop */}
          <li>
            <Link href="/sign-in" aria-label="Entrar" className="text-sky-600 dark:text-sky-400 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
              <DoorIcon className="w-6 h-6" />
            </Link>
          </li>
          <li><ThemeToggle/></li>
        </ul>

        {/* NAVEGAÇÃO MOBILE */}
        <div className="md:hidden flex items-center space-x-4">
          {/* Ícone de porta adicionado aos controles mobile */}
          <Link href="/sign-in" aria-label="Entrar" className="text-sky-600 dark:text-sky-400 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
            <DoorIcon className="w-7 h-7" />
          </Link>
          <ThemeToggle/>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menu" className="text-gray-800 dark:text-gray-200 p-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500">
            {isMenuOpen ? <CloseIcon className="w-7 h-7" /> : <MenuIcon className="w-7 h-7" />}
          </button>
        </div>
      </nav>

      {/* MENU MOBILE EXPANDIDO */}
      {isMenuOpen && (<div data-testid="mobile-menu" className="md:hidden p-4 bg-white dark:bg-slate-900"><ul className="flex flex-col space-y-4 text-center">{navItems}</ul></div>)}
    </header>
  );
}