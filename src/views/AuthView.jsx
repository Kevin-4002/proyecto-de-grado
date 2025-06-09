
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Zap, LogIn, UserPlus } from 'lucide-react';

const AuthView = ({ setCurrentUser, navigateTo, auth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // TEMPORAL: Simulación hasta que Firebase esté configurado
    if (!auth.createUserWithEmailAndPassword || !auth.signInWithEmailAndPassword) {
      toast({
        title: "Funcionalidad no disponible",
        description: "La configuración de Firebase no está completa. Usando simulación.",
        variant: "destructive"
      });
      // Simular un login/registro exitoso para desarrollo
      const mockUser = { uid: email, email: email, displayName: email.split('@')[0] };
      setCurrentUser(mockUser);
      navigateTo('home');
      setIsLoading(false);
      return;
    }
    // FIN TEMPORAL

    try {
      let userCredential;
      if (isLogin) {
        userCredential = await auth.signInWithEmailAndPassword(email, password);
        toast({ title: "¡Bienvenido de nuevo!", description: "Inicio de sesión exitoso." });
      } else {
        userCredential = await auth.createUserWithEmailAndPassword(email, password);
        toast({ title: "¡Cuenta Creada!", description: "Registro exitoso. ¡Bienvenido!" });
      }
      setCurrentUser(userCredential.user);
      navigateTo('home');
    } catch (error) {
      toast({
        title: isLogin ? "Error al iniciar sesión" : "Error al registrarse",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 sm:p-12 w-full max-w-md border border-white/20"
      >
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 rounded-full shadow-xl mb-4">
            <Zap className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white">Tutor de Python</h1>
          <p className="text-blue-200 mt-1">{isLogin ? 'Inicia sesión para continuar tu aventura' : 'Crea una cuenta para empezar'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="email-auth" className="text-blue-100 mb-1 block">Correo Electrónico</Label>
            <Input
              id="email-auth"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="bg-white/10 border-white/30 text-white placeholder-blue-300 focus:ring-green-400"
            />
          </div>
          <div>
            <Label htmlFor="password-auth" className="text-blue-100 mb-1 block">Contraseña</Label>
            <Input
              id="password-auth"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-white/10 border-white/30 text-white placeholder-blue-300 focus:ring-green-400"
            />
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 text-lg rounded-lg shadow-md transition-transform hover:scale-105"
          >
            {isLoading ? 'Procesando...' : (isLogin ? <><LogIn className="mr-2 h-5 w-5" /> Iniciar Sesión</> : <><UserPlus className="mr-2 h-5 w-5" /> Registrarse</>)}
          </Button>
        </form>
        <p className="mt-8 text-center text-sm">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="font-medium text-blue-300 hover:text-blue-100 transition-colors"
          >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia Sesión'}
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default AuthView;
