import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import HomeView from '@/views/HomeView';
import LessonView from '@/views/LessonView';
import AchievementsView from '@/views/AchievementsView';
import ProfileView from '@/views/ProfileView';
import AuthView from '@/views/AuthView';
import { getLessonsByGradeAndDifficulty } from '@/lib/lessonData';
import { getAllAchievements } from '@/lib/achievementData';
import { schoolGrades, difficultyLevels } from '@/lib/levelData';
import { executePythonCode } from '@/lib/pythonExecutor';
import { useToast } from '@/components/ui/use-toast';
import { auth } from '@/lib/firebase';
import { User, LogOut, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MAX_HEARTS = 5;
const HEART_RECHARGE_INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds

const App = () => {
  const [currentView, setCurrentView] = useState('loading');
  const [currentUser, setCurrentUser] = useState(null);
  const heartRechargeTimerRef = useRef(null);
  
  const getDefaultGradeKey = () => {
    if (schoolGrades && schoolGrades.length > 0) {
      return schoolGrades[0].key;
    }
    return 'decimo'; // Fallback
  };

  const initialUserProgress = {
    level: 1, 
    xp: 0,
    hearts: MAX_HEARTS,
    lastHeartRechargeTime: Date.now(),
    streak: 0,
    lastLoginDate: null,
    completedLessons: [],
    achievements: [],
    currentGrade: getDefaultGradeKey(), 
  };
  const [userProgress, setUserProgress] = useState(initialUserProgress);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [viewingState, setViewingState] = useState('lessonIntro');
  
  const { toast } = useToast();
  const achievementsList = getAllAchievements();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
        loadUserProgress(user.uid);
        checkStreak(user.uid);
        setCurrentView('home');
      } else {
        setCurrentUser(null);
        setCurrentView('auth');
        setUserProgress(initialUserProgress);
        if (heartRechargeTimerRef.current) {
          clearInterval(heartRechargeTimerRef.current);
        }
      }
    });
    return () => {
      unsubscribe();
      if (heartRechargeTimerRef.current) {
        clearInterval(heartRechargeTimerRef.current);
      }
    };
  }, []);

  const startHeartRechargeTimer = () => {
    if (heartRechargeTimerRef.current) {
      clearInterval(heartRechargeTimerRef.current);
    }
    heartRechargeTimerRef.current = setInterval(() => {
      setUserProgress(prev => {
        if (prev.hearts < MAX_HEARTS) {
          const now = Date.now();
          const timeSinceLastRecharge = now - (prev.lastHeartRechargeTime || now);
          const heartsToRecharge = Math.floor(timeSinceLastRecharge / HEART_RECHARGE_INTERVAL);

          if (heartsToRecharge > 0) {
            const newHearts = Math.min(MAX_HEARTS, prev.hearts + heartsToRecharge);
            if (newHearts > prev.hearts) {
               toast({ title: "Vida Recargada ❤️", description: `¡Tienes ${newHearts} vidas!` });
            }
            return { ...prev, hearts: newHearts, lastHeartRechargeTime: now };
          }
        }
        return prev;
      });
    }, 60000); // Check every minute
  };
  
  useEffect(() => {
    if (currentUser && userProgress.hearts < MAX_HEARTS) {
      startHeartRechargeTimer();
    } else if (userProgress.hearts >= MAX_HEARTS && heartRechargeTimerRef.current) {
      clearInterval(heartRechargeTimerRef.current);
    }
    return () => {
      if (heartRechargeTimerRef.current) {
        clearInterval(heartRechargeTimerRef.current);
      }
    };
  }, [currentUser, userProgress.hearts]);


  const loadUserProgress = (userId) => {
    const storedProgress = localStorage.getItem(`pythonTutorProgress_${userId}`);
    if (storedProgress) {
      const parsedProgress = JSON.parse(storedProgress);
      const validGrade = schoolGrades.some(g => g.key === parsedProgress.currentGrade) 
        ? parsedProgress.currentGrade 
        : getDefaultGradeKey();
      
      let hearts = parsedProgress.hearts !== undefined ? parsedProgress.hearts : MAX_HEARTS;
      let lastHeartRechargeTime = parsedProgress.lastHeartRechargeTime || Date.now();

      if (hearts < MAX_HEARTS) {
        const timePassed = Date.now() - lastHeartRechargeTime;
        const heartsRecharged = Math.floor(timePassed / HEART_RECHARGE_INTERVAL);
        hearts = Math.min(MAX_HEARTS, hearts + heartsRecharged);
        if (heartsRecharged > 0) lastHeartRechargeTime = Date.now();
      }

      setUserProgress({ ...initialUserProgress, ...parsedProgress, currentGrade: validGrade, hearts, lastHeartRechargeTime });
    } else {
      const newProgress = { ...initialUserProgress, currentGrade: getDefaultGradeKey(), lastLoginDate: new Date().toISOString().split('T')[0], lastHeartRechargeTime: Date.now() };
      setUserProgress(newProgress);
      localStorage.setItem(`pythonTutorProgress_${userId}`, JSON.stringify(newProgress));
    }
  };

  useEffect(() => {
    if (currentUser && currentView !== 'auth' && currentView !== 'loading') {
      localStorage.setItem(`pythonTutorProgress_${currentUser.uid}`, JSON.stringify(userProgress));
    }
  }, [userProgress, currentUser, currentView]);

  const checkStreak = (userId) => {
    const storedProgressString = localStorage.getItem(`pythonTutorProgress_${userId}`);
    if (!storedProgressString) return;

    const storedProgress = JSON.parse(storedProgressString);
    const today = new Date().toISOString().split('T')[0];
    const lastLogin = storedProgress.lastLoginDate;

    if (lastLogin === today) return;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toISOString().split('T')[0];

    let newStreak = storedProgress.streak || 0;
    if (lastLogin === yesterdayString) {
      newStreak++;
      toast({ title: "¡Racha Mantenida! 🔥", description: `Tu racha es ahora de ${newStreak} días.`, className: "bg-brand-orange text-brand-orange-foreground border-brand-orange" });
      if(newStreak === 3 && !userProgress.achievements.includes("ach2")){
        awardAchievement("ach2");
      }
      if(newStreak === 7 && !userProgress.achievements.includes("ach9")){
        awardAchievement("ach9");
      }
    } else if (lastLogin && lastLogin !== today) {
      newStreak = 1; 
      toast({ title: "Racha Rota 😢", description: "¡No te desanimes! Comienza una nueva racha hoy.", variant: "destructive" });
    } else if (!lastLogin) { 
        newStreak = 1;
    }
    
    setUserProgress(prev => ({ ...prev, streak: newStreak, lastLoginDate: today }));
  };

  const awardAchievement = (achievementId) => {
    if (!userProgress.achievements.includes(achievementId)) {
      const newAchievements = [...userProgress.achievements, achievementId];
      setUserProgress(prev => ({
        ...prev,
        achievements: newAchievements
      }));
      const achievement = achievementsList.find(a => a.id === achievementId);
      if (achievement) {
        toast({
          title: "¡Logro Desbloqueado! 🏆",
          description: `${achievement.icon} ${achievement.name}: ${achievement.description}`,
          className: "bg-brand-green text-brand-green-foreground border-brand-green"
        });
      }
      if (newAchievements.length >= 5 && !newAchievements.includes("ach8")) {
        awardAchievement("ach8");
      }
      if (newAchievements.length >= 10 && !userProgress.achievements.includes("ach15") && achievementsList.find(a => a.id === "ach15")) { // Check if ach15 exists
        awardAchievement("ach15"); // Example for a new achievement
      }
    }
  };

  const checkAnswer = () => {
    if (!currentLesson || !currentLesson.questions) return;
    const question = currentLesson.questions[currentQuestionIndex];
    if (!question) return;

    let correct = false;
    
    if (question.type === 'theory') {
      correct = parseInt(userAnswer) === question.correct;
    } else if (question.type === 'code') {
      const normalizedUserAnswer = userAnswer.toLowerCase().replace(/\s+/g, ' ').trim();
      
      if (Array.isArray(question.correct)) {
        correct = question.correct.some(altCorrect => {
            if (typeof altCorrect === 'string') {
                const normalizedAltCorrect = altCorrect.toLowerCase().replace(/\s+/g, ' ').trim();
                return normalizedUserAnswer === normalizedAltCorrect;
            }
            return false; 
        });
      } else if (typeof question.correct === 'string') {
        const normalizedCorrectAnswer = question.correct.toLowerCase().replace(/\s+/g, ' ').trim();
        correct = normalizedUserAnswer === normalizedCorrectAnswer;
      }

      if (!correct && typeof question.validate === 'function') {
        correct = question.validate(userAnswer);
      }
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setUserProgress(prev => ({
        ...prev,
        xp: prev.xp + (question.xp || 10) 
      }));
      toast({
        title: "¡Correcto! 🎉",
        description: `+${question.xp || 10} XP ganados`,
        className: "bg-brand-green text-brand-green-foreground border-brand-green"
      });
    } else {
      setUserProgress(prev => ({
        ...prev,
        hearts: Math.max(0, prev.hearts - 1),
        lastHeartRechargeTime: prev.hearts > 0 ? prev.lastHeartRechargeTime : Date.now() // Reset timer if hearts depleted
      }));
      toast({
        title: "Incorrecto 😔",
        description: question.explanation,
        variant: "destructive"
      });
      if (userProgress.hearts -1 < MAX_HEARTS && !heartRechargeTimerRef.current) {
        startHeartRechargeTimer();
      }
    }
  };

  const proceedToNextStep = () => {
    if (!currentLesson || !currentLesson.questions) return;

    if (viewingState === 'quiz' && showResult) {
      setShowResult(false);
      setUserAnswer('');
      if (currentQuestionIndex < currentLesson.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setViewingState('questionIntro');
      } else {
        const updatedCompletedLessons = [...new Set([...userProgress.completedLessons, currentLesson.id])];
        setUserProgress(prev => ({
          ...prev,
          xp: prev.xp + currentLesson.xpReward,
          completedLessons: updatedCompletedLessons
        }));
        toast({
          title: "¡Lección Completada! 🏆",
          description: `+${currentLesson.xpReward} XP ganados`,
          className: "bg-brand-green text-brand-green-foreground border-brand-green"
        });
        
        if (updatedCompletedLessons.length === 1 && !userProgress.achievements.includes("ach1")) {
          awardAchievement("ach1");
        }

        const lessonsInCurrentGradeBeginner = getLessonsByGradeAndDifficulty(userProgress.currentGrade, 'principiante');
        const completedBeginnerInGrade = updatedCompletedLessons.filter(id => lessonsInCurrentGradeBeginner.some(l => l.id === id)).length;
        if (lessonsInCurrentGradeBeginner.length > 0 && completedBeginnerInGrade >= Math.min(3, lessonsInCurrentGradeBeginner.length) && !userProgress.achievements.includes("ach3")) {
           awardAchievement("ach3");
        }
        
        if (currentLesson.difficultyKey === 'avanzado' && currentLesson.gradeKey === 'tercero_bach' && !userProgress.achievements.includes("ach6")) {
            awardAchievement("ach6"); 
        }
        
        const expertoLessons = getLessonsByGradeAndDifficulty(userProgress.currentGrade, 'experto');
        if (expertoLessons && expertoLessons.some(l => l.id === currentLesson.id) && !userProgress.achievements.includes("ach10")) {
            awardAchievement("ach10");
        }
        
        const especializacionLessons = getLessonsByGradeAndDifficulty(userProgress.currentGrade, 'especializacion');
        if (especializacionLessons && especializacionLessons.some(l => l.id === currentLesson.id) && !userProgress.achievements.includes("ach15")) {
            awardAchievement("ach15");
        }


        setCurrentView('home');
        setCurrentLesson(null);
        setCurrentQuestionIndex(0);
        setViewingState('lessonIntro');
      }
    } else if (viewingState === 'lessonIntro') {
      setViewingState('questionIntro');
    } else if (viewingState === 'questionIntro') {
      setViewingState('quiz');
    }
  };

  const startLesson = (lesson) => {
    if(userProgress.hearts <= 0){
        toast({ title: "¡Sin vidas! 💔", description: "Tus vidas se recargan con el tiempo. ¡Vuelve más tarde!", variant: "destructive"});
        return;
    }
    setCurrentLesson(lesson);
    setCurrentQuestionIndex(0);
    setUserAnswer('');
    setShowResult(false);
    setViewingState('lessonIntro'); 
    setCurrentView('lesson');
  };

  const navigateTo = (view) => {
    if (view === 'home' && currentView !== 'home') {
        const beginnerLessonsInCurrentGrade = getLessonsByGradeAndDifficulty(userProgress.currentGrade, 'principiante');
        const intermedioLessonsInCurrentGrade = getLessonsByGradeAndDifficulty(userProgress.currentGrade, 'intermedio');

        const completedBeginnerCount = userProgress.completedLessons.filter(id => beginnerLessonsInCurrentGrade && beginnerLessonsInCurrentGrade.some(l => l.id === id)).length;
        const completedIntermedioCount = userProgress.completedLessons.filter(id => intermedioLessonsInCurrentGrade && intermedioLessonsInCurrentGrade.some(l => l.id === id)).length;

        if (beginnerLessonsInCurrentGrade && beginnerLessonsInCurrentGrade.length > 0 && completedBeginnerCount >= Math.min(2, beginnerLessonsInCurrentGrade.length) && !userProgress.achievements.includes("ach5")) {
            awardAchievement("ach5"); 
        }
        if (intermedioLessonsInCurrentGrade && intermedioLessonsInCurrentGrade.length > 0 && completedIntermedioCount >= Math.min(1, intermedioLessonsInCurrentGrade.length) && !userProgress.achievements.includes("ach7")) {
            awardAchievement("ach7"); 
        }
    }
    setCurrentView(view);
  };

  const handleSignOut = async () => {
    try {
      if (auth && typeof auth.signOut === 'function') {
         await auth.signOut();
      }
      setCurrentUser(null);
      setCurrentView('auth');
      setUserProgress(initialUserProgress);
      if (heartRechargeTimerRef.current) {
        clearInterval(heartRechargeTimerRef.current);
      }
      toast({ title: "Sesión cerrada", description: "¡Vuelve pronto!" });
    } catch (error) {
      toast({ title: "Error al cerrar sesión", description: error.message, variant: "destructive" });
    }
  };

  const handleResetProgress = () => {
    if (currentUser) {
      const resetProgress = { ...initialUserProgress, currentGrade: userProgress.currentGrade, lastLoginDate: new Date().toISOString().split('T')[0], lastHeartRechargeTime: Date.now() };
      setUserProgress(resetProgress);
      localStorage.setItem(`pythonTutorProgress_${currentUser.uid}`, JSON.stringify(resetProgress));
      toast({ title: "Progreso Reiniciado", description: "Tu aventura comienza de nuevo." });
      navigateTo('profile');
    }
  };
  
  const handleChangeGrade = (newGradeKey) => {
    setUserProgress(prev => ({...initialUserProgress, currentGrade: newGradeKey, lastLoginDate: new Date().toISOString().split('T')[0], lastHeartRechargeTime: Date.now()}));
    toast({title: "Grado Cambiado", description: `Ahora estás en ${schoolGrades.find(g => g.key === newGradeKey)?.name}. ¡Tu progreso para este grado comienza ahora!`});
    navigateTo('home'); 
  };

  const lessonViewProps = {
    currentLesson,
    currentQuestionIndex,
    userProgress,
    userAnswer,
    setUserAnswer,
    showResult,
    isCorrect,
    checkAnswer,
    proceedToNextStep,
    executePythonCode,
    navigateTo,
    viewingState,
  };

  if (currentView === 'loading') {
    return <div className="min-h-screen flex items-center justify-center app-bg"><p className="app-text text-xl">Cargando Tutor de Python...</p></div>;
  }
  
  if (currentView === 'auth' || !currentUser) {
    return <AuthView setCurrentUser={setCurrentUser} navigateTo={navigateTo} auth={auth} />;
  }

  return (
    <div className="font-sans app-bg">
      {currentUser && currentView !== 'auth' && (
        <header className="header-bg sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center justify-between">
              <Button variant="ghost" onClick={() => navigateTo('home')} className="app-text hover:bg-primary/10 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-primary" /> <span>Inicio</span>
              </Button>
              <div className="flex items-center space-x-4">
                <Button variant="ghost" onClick={() => navigateTo('profile')} className="app-text hover:bg-primary/10 flex items-center space-x-2">
                  <User className="w-5 h-5 text-primary" /> <span className="app-text">Perfil</span>
                </Button>
                <Button variant="ghost" onClick={handleSignOut} className="text-brand-red hover:bg-brand-red/20 hover:text-brand-red flex items-center space-x-2">
                  <LogOut className="w-5 h-5" /> <span>Salir</span>
                </Button>
              </div>
            </div>
          </div>
        </header>
      )}
      <AnimatePresence mode="wait">
        {currentView === 'home' && currentUser && (
          <HomeView 
            key="home"
            userProgress={userProgress}
            getLessonsByGradeAndDifficulty={getLessonsByGradeAndDifficulty}
            schoolGrades={schoolGrades}
            difficultyLevels={difficultyLevels}
            startLesson={startLesson}
            navigateTo={navigateTo}
            achievements={achievementsList}
            currentUser={currentUser}
            onChangeGrade={handleChangeGrade}
          />
        )}
        {currentView === 'lesson' && currentLesson && currentUser && (
          <LessonView key="lesson" {...lessonViewProps} />
        )}
        {currentView === 'achievements' && currentUser && (
          <AchievementsView 
            key="achievements"
            allAchievements={achievementsList}
            userProgress={userProgress}
            navigateTo={navigateTo}
          />
        )}
        {currentView === 'profile' && currentUser && (
            <ProfileView
                key="profile"
                currentUser={currentUser}
                userProgress={userProgress}
                achievementsList={achievementsList}
                navigateTo={navigateTo}
                getLessonsByGradeAndDifficulty={getLessonsByGradeAndDifficulty}
                schoolGrades={schoolGrades}
                difficultyLevels={difficultyLevels}
                onResetProgress={handleResetProgress}
            />
        )}
      </AnimatePresence>
      <Toaster />
    </div>
  );
};

export default App;