'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import loginWithEmailAndPassword from '@/functions/sign-in';

type User = {
    email: string;
    password: string;
};

const LockIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

export default function SignInPage() {
  const [user, setUser] = useState<User>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!user.email || !user.password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    setError('');

    try {
      await loginWithEmailAndPassword(user);
      router.push('/dashboard');
    } catch (err: any) {
      console.error("Erro de autenticação:", err);
      switch (err.code) {
        case 'auth/invalid-credential':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setError('Email ou senha inválidos. Por favor, tente novamente.');
          break;
        case 'auth/invalid-email':
          setError('O formato do email é inválido.');
          break;
        default:
          setError('Ocorreu um erro ao tentar fazer login. Tente mais tarde.');
          break;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-xl bg-slate-800 p-8 shadow-2xl shadow-slate-950/50">
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="bg-sky-500/20 p-3 rounded-full">
              <LockIcon className="w-6 h-6 text-sky-400" />
            </div>
            <h1 className="text-3xl font-bold text-center text-white">
              Acesse sua Conta
            </h1>
            <p className="text-center text-gray-400 text-sm">
              Bem-vindo de volta ao seu universo gamer.
            </p>
          </div>
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-300 text-sm font-bold mb-2">Email</label>
              <input type="email" id="email" name="email" value={user.email} onChange={handleChange} className="w-full px-4 py-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" placeholder="voce@exemplo.com" required disabled={isLoading} />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-300 text-sm font-bold mb-2">Senha</label>
              <input type="password" id="password" name="password" value={user.password} onChange={handleChange} className="w-full px-4 py-3 rounded-md bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 transition" placeholder="••••••••" required disabled={isLoading} />
               <div className="text-right mt-2">
                <Link href="/forgot-password" className="text-sm text-sky-400 hover:text-sky-300 transition">Esqueceu sua senha?</Link>
              </div>
            </div>
            {error && (<p data-testid="error-message" className="text-center text-red-400 text-sm mb-4">{error}</p>)}
            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed" disabled={isLoading}>{isLoading ? 'Entrando...' : 'Entrar'}</button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-400">Não tem uma conta?{' '}<Link href="/sign-up" className="font-bold text-sky-400 hover:text-sky-300 transition">Cadastre-se</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}