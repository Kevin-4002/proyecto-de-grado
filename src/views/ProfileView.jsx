import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { User, BookOpen, Award, Zap, BarChart3, CalendarDays, RefreshCw, AlertTriangle, GraduationCap } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProfileView = ({ currentUser, userProgress, achievementsList, navigateTo, getLessonsByGradeAndDifficulty, schoolGrades, difficultyLevels, onResetProgress }) => {
  const unlockedAchievements = achievementsList.filter(ach => userProgress.achievements.includes(ach.id));
  
  const currentGradeKey = userProgress.currentGrade || (schoolGrades.length > 0 ? schoolGrades[0].key : 'decimo');

  const totalLessonsInCurrentGrade = difficultyLevels.reduce((acc, diffLevel) => {
    const lessonsInDifficulty = getLessonsByGradeAndDifficulty(currentGradeKey, diffLevel.key);
    return acc + (lessonsInDifficulty ? lessonsInDifficulty.length : 0);
  }, 0);
  
  const completedLessonsInCurrentGrade = userProgress.completedLessons.length;

  const completionPercentageCurrentGrade = totalLessonsInCurrentGrade > 0 
    ? Math.min(100, (completedLessonsInCurrentGrade / totalLessonsInCurrentGrade) * 100) 
    : 0;
  
  const currentGradeName = schoolGrades.find(g => g.key === currentGradeKey)?.name || "Grado Desconocido";

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen app-bg p-4 sm:p-8"
    >
      <div className="max-w-4xl mx-auto">
        <div className="card-bg p-6 sm:p-10">
          
          <div className="flex flex-col sm:flex-row items-center mb-10">
            <div className="relative mb-6 sm:mb-0 sm:mr-8">
              <motion.div 
                className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-accent to-primary rounded-full flex items-center justify-center text-white shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User size={currentUser.photoURL ? 0 : 60} className={currentUser.photoURL ? 'hidden' : ''} />
                {currentUser.photoURL && <img-replace src={currentUser.photoURL} alt="Foto de perfil" className="rounded-full w-full h-full object-cover" />}
              </motion.div>
              <motion.div 
                className="absolute -bottom-2 -right-2 bg-warning p-2 rounded-full shadow-md"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0]}}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              >
                <Zap size={20} className="text-warning-foreground" />
              </motion.div>
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold app-text text-center sm:text-left">{currentUser.displayName || currentUser.email}</h1>
              <p className="text-primary dark:text-brand-blue-light text-center sm:text-left flex items-center justify-center sm:justify-start">
                <GraduationCap size={20} className="mr-2"/> {currentGradeName} - Nivel {userProgress.level}
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="bg-secondary dark:bg-secondary/30 rounded-2xl p-6 border border-border dark:border-border mb-8"
          >
            <h2 className="text-xl font-semibold app-text mb-3">Progreso en {currentGradeName}</h2>
            <div className="flex items-center">
              <div className="w-full progress-bar-bg h-5 mr-4">
                <motion.div 
                  className="progress-bar-fill flex items-center justify-end pr-2"
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentageCurrentGrade}%` }}
                  transition={{ duration: 1.2, ease: "circOut", delay: 0.3 }}
                >
                  {completionPercentageCurrentGrade > 10 && <span className="text-xs font-bold text-white">{Math.round(completionPercentageCurrentGrade)}%</span>}
                </motion.div>
              </div>
               {completionPercentageCurrentGrade <= 10 && <span className="text-sm font-bold app-text">{Math.round(completionPercentageCurrentGrade)}%</span>}
            </div>
             <p className="text-xs text-muted-foreground mt-1 text-right">
              {completedLessonsInCurrentGrade} de {totalLessonsInCurrentGrade} lecciones completadas en este grado
            </p>
          </motion.div>


          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="bg-secondary dark:bg-secondary/30 rounded-2xl p-6 border border-border dark:border-border"
            >
              <h2 className="text-2xl font-semibold app-text mb-4 flex items-center"><BarChart3 className="mr-3 text-accent"/>Estadísticas (Grado Actual)</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center app-text">
                  <div className="flex items-center">
                    <Zap className="mr-2 text-warning" />
                    <span>XP Total:</span>
                  </div>
                  <span className="font-bold text-xl">{userProgress.xp}</span>
                </div>
                 <div className="flex justify-between items-center app-text">
                  <div className="flex items-center">
                    <CalendarDays className="mr-2 text-orange-500" />
                    <span>Racha Global:</span>
                  </div>
                  <span className="font-bold text-xl">{userProgress.streak} días</span>
                </div>
                 <div className="flex justify-between items-center app-text">
                  <div className="flex items-center">
                    <BookOpen className="mr-2 text-primary" />
                    <span>Lecciones Completadas:</span>
                  </div>
                  <span className="font-bold text-xl">{completedLessonsInCurrentGrade}</span>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="bg-secondary dark:bg-secondary/30 rounded-2xl p-6 border border-border dark:border-border"
            >
              <h2 className="text-2xl font-semibold app-text mb-4 flex items-center"><Award className="mr-3 text-accent"/>Logros Globales</h2>
              {unlockedAchievements.length > 0 ? (
                <ul className="space-y-3 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                  {unlockedAchievements.slice(-3).reverse().map(ach => (
                    <motion.li 
                      key={ach.id} 
                      className="flex items-center p-3 bg-accent/10 dark:bg-accent/20 rounded-lg shadow-sm"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <span className="text-2xl mr-3">{ach.icon}</span>
                      <div>
                        <p className="font-medium success-text">{ach.name}</p>
                        <p className="text-xs text-accent/80 dark:text-accent/70">{ach.description}</p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted-foreground">¡Sigue aprendiendo para desbloquear logros!</p>
              )}
              {unlockedAchievements.length > 0 && (
                <Button variant="link" onClick={() => navigateTo('achievements')} className="text-primary dark:text-brand-blue-light hover:text-primary/80 dark:hover:text-brand-blue-light/80 mt-3 w-full justify-start p-0">Ver todos los logros</Button>
              )}
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-4"
          >
            <Button 
              onClick={() => navigateTo('home')}
              className="primary-button font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105 text-lg w-full sm:w-auto"
            >
              <BookOpen className="mr-2"/> Continuar Aprendiendo
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="font-semibold py-3 px-8 rounded-lg shadow-lg transition-transform hover:scale-105 text-lg w-full sm:w-auto"
                >
                  <RefreshCw className="mr-2"/> Reiniciar Progreso (Grado Actual)
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="flex items-center error-text">
                    <AlertTriangle className="mr-2" />
                    ¿Reiniciar progreso para {currentGradeName}?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="text-muted-foreground">
                    Esta acción es irreversible. Perderás todas tus lecciones completadas, XP y logros específicos de este grado. Tu progreso en otros grados y tu racha global no se verán afectados. Tu cuenta no será eliminada.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={onResetProgress}
                    className="destructive-button"
                  >
                    Sí, reiniciar progreso del grado
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
};

export default ProfileView;