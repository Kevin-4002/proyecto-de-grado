import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Flame, Star, BookOpen, CheckCircle, ChevronRight, Lock, Zap, ChevronDown, ChevronUp, GraduationCap } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const HomeView = ({ userProgress, getLessonsByGradeAndDifficulty, schoolGrades, difficultyLevels, startLesson, navigateTo, achievements, currentUser, onChangeGrade }) => {
  
  const [openGradeKey, setOpenGradeKey] = useState(userProgress.currentGrade || (schoolGrades.length > 0 ? schoolGrades[0].key : null));
  
  const initialDifficultyState = schoolGrades.reduce((acc, grade) => {
    acc[grade.key] = 'principiante';
    return acc;
  }, {});
  const [selectedDifficultyPerGrade, setSelectedDifficultyPerGrade] = useState(initialDifficultyState);

  useEffect(() => {
    setOpenGradeKey(userProgress.currentGrade);
    if (!selectedDifficultyPerGrade[userProgress.currentGrade]) {
      setSelectedDifficultyPerGrade(prev => ({...prev, [userProgress.currentGrade]: 'principiante'}));
    }
  }, [userProgress.currentGrade, schoolGrades]);


  const completedLessonsForDifficultyInGrade = (gradeKey, difficultyKey) => {
    const lessons = getLessonsByGradeAndDifficulty(gradeKey, difficultyKey);
    if (!lessons) return 0;
    return lessons.filter(lesson => userProgress.completedLessons.includes(lesson.id)).length;
  };

  const totalLessonsInDifficultyInGrade = (gradeKey, difficultyKey) => {
    const lessons = getLessonsByGradeAndDifficulty(gradeKey, difficultyKey);
    return lessons ? lessons.length : 0;
  };

  const difficultyOrder = difficultyLevels.map(d => d.key);

  const isDifficultyUnlocked = (gradeKey, difficultyKey) => {
    if (difficultyKey === 'principiante') return true; 

    const currentDifficultyIndex = difficultyOrder.indexOf(difficultyKey);
    if (currentDifficultyIndex === -1 || currentDifficultyIndex === 0) return true;

    const previousDifficultyKey = difficultyOrder[currentDifficultyIndex - 1];
    const lessonsInPreviousDifficulty = getLessonsByGradeAndDifficulty(gradeKey, previousDifficultyKey);
    if (!lessonsInPreviousDifficulty || lessonsInPreviousDifficulty.length === 0) return true; 

    const completedInPrevious = completedLessonsForDifficultyInGrade(gradeKey, previousDifficultyKey);
    
    return completedInPrevious >= Math.min(1, lessonsInPreviousDifficulty.length) || lessonsInPreviousDifficulty.length === 0;
  };
  
  const currentGradeName = schoolGrades.find(g => g.key === userProgress.currentGrade)?.name || "Grado";

  return (
    <div className="min-h-screen app-bg pb-16">
      <div className="pt-8 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between mb-8 card-bg p-4">
            <div className="flex items-center space-x-3 mb-4 sm:mb-0">
              <div className="bg-gradient-to-r from-brand-green to-primary p-3 rounded-xl shadow-lg">
                <Zap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold app-text tracking-tight">Tutor de Python</h1>
                {currentUser && <p className="text-sm text-primary dark:text-brand-blue-light">{currentUser.displayName || currentUser.email.split('@')[0]}</p>}
              </div>
            </div>
            
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-1.5 bg-brand-red/20 dark:bg-brand-red/30 px-2.5 py-1.5 rounded-lg shadow">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-brand-red" />
                <span className="app-text font-semibold text-sm">{userProgress.hearts}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-brand-orange/20 dark:bg-brand-orange/30 px-2.5 py-1.5 rounded-lg shadow">
                <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-brand-orange" />
                <span className="app-text font-semibold text-sm">{userProgress.streak}</span>
              </div>
              <div className="flex items-center space-x-1.5 bg-accent/20 dark:bg-accent/30 px-2.5 py-1.5 rounded-lg shadow">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <span className="app-text font-semibold text-sm">{userProgress.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl sm:text-4xl font-bold app-text">Grados Escolares</h2>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-card dark:bg-card border-border dark:border-border text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary flex items-center">
                    <GraduationCap className="mr-2 h-5 w-5 text-primary" />
                    {currentGradeName}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-popover dark:bg-popover border-border dark:border-border text-popover-foreground dark:text-popover-foreground">
                  <DropdownMenuLabel>Seleccionar Grado</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-border dark:bg-border"/>
                  {schoolGrades.map(grade => (
                    <DropdownMenuItem 
                      key={grade.key} 
                      onClick={() => onChangeGrade(grade.key)}
                      className={`hover:bg-secondary dark:hover:bg-secondary focus:bg-secondary dark:focus:bg-secondary ${userProgress.currentGrade === grade.key ? 'bg-secondary dark:bg-secondary' : ''}`}
                    >
                      {grade.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {schoolGrades.map(grade => (
              <div key={grade.key} className="mb-6">
                <Button
                  onClick={() => setOpenGradeKey(openGradeKey === grade.key ? null : grade.key)}
                  className={`w-full flex justify-between items-center text-left text-xl sm:text-2xl font-semibold p-4 sm:p-5 rounded-lg 
                              ${grade.key === userProgress.currentGrade 
                                ? 'bg-primary/10 dark:bg-primary/20 text-primary dark:text-brand-blue-light hover:bg-primary/20 dark:hover:bg-primary/30' 
                                : 'bg-secondary/50 dark:bg-secondary/30 text-muted-foreground dark:text-muted-foreground cursor-not-allowed'}`}
                  disabled={grade.key !== userProgress.currentGrade}
                >
                  {grade.name}
                  {openGradeKey === grade.key ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                </Button>

                <AnimatePresence>
                  {openGradeKey === grade.key && grade.key === userProgress.currentGrade && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 pl-4 border-l-2 border-primary/50 dark:border-primary/70"
                    >
                      <div className="mb-4 flex items-center space-x-2">
                        <span className="text-muted-foreground dark:text-brand-gray">Dificultad:</span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-card dark:bg-card border-border dark:border-border text-foreground dark:text-foreground hover:bg-secondary dark:hover:bg-secondary">
                              {difficultyLevels.find(d => d.key === selectedDifficultyPerGrade[grade.key])?.name || "Seleccionar"}
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-popover dark:bg-popover border-border dark:border-border text-popover-foreground dark:text-popover-foreground">
                            {difficultyLevels.map(diffLevel => (
                              <DropdownMenuItem 
                                key={diffLevel.key} 
                                onClick={() => setSelectedDifficultyPerGrade(prev => ({...prev, [grade.key]: diffLevel.key}))}
                                className="hover:bg-secondary dark:hover:bg-secondary focus:bg-secondary dark:focus:bg-secondary"
                              >
                                {diffLevel.name}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      {(() => {
                        const difficultyKey = selectedDifficultyPerGrade[grade.key];
                        const lessons = getLessonsByGradeAndDifficulty(grade.key, difficultyKey);
                        const unlocked = isDifficultyUnlocked(grade.key, difficultyKey);
                        const completedCount = completedLessonsForDifficultyInGrade(grade.key, difficultyKey);
                        const totalCount = totalLessonsInDifficultyInGrade(grade.key, difficultyKey);

                        if (!lessons || lessons.length === 0) {
                          return <p className="text-muted-foreground dark:text-brand-gray p-3">No hay lecciones para esta dificultad todavía.</p>;
                        }
                        
                        return (
                          <div className="bg-background/50 dark:bg-black/10 p-4 rounded-md">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className={`text-lg font-medium ${unlocked ? 'success-text' : 'text-muted-foreground dark:text-brand-gray'}`}>
                                  {difficultyLevels.find(dl => dl.key === difficultyKey)?.name}
                                </h4>
                                {unlocked && totalCount > 0 && (
                                  <span className="text-xs bg-accent/20 dark:bg-accent/30 success-text px-2 py-0.5 rounded-full">
                                    {completedCount} / {totalCount}
                                  </span>
                                )}
                                {!unlocked && <Lock className="w-5 h-5 text-muted-foreground dark:text-brand-gray" />}
                            </div>
                            {!unlocked && (
                                <p className="text-sm text-muted-foreground dark:text-brand-gray mb-3">Completa lecciones de la dificultad anterior para desbloquear.</p>
                            )}
                            <div className="grid md:grid-cols-2 gap-4">
                              {lessons.map((lesson, index) => (
                                <motion.div
                                  key={lesson.id}
                                  initial={{ opacity: 0, scale: 0.95 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  className={`interactive-card-bg p-4 group lesson-card ${unlocked ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'}`}
                                  onClick={() => unlocked && startLesson(lesson)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shadow-inner ${
                                        userProgress.completedLessons.includes(lesson.id) 
                                          ? 'bg-accent' 
                                          : unlocked ? 'bg-gradient-to-r from-primary to-accent/70' : 'bg-brand-gray/50 dark:bg-brand-gray/30'
                                      }`}>
                                        {userProgress.completedLessons.includes(lesson.id) ? (
                                          <CheckCircle className="w-6 h-6 text-white" />
                                        ) : unlocked ? (
                                          <BookOpen className="w-5 h-5 text-white" />
                                        ) : (
                                          <Lock className="w-5 h-5 text-brand-gray-light dark:text-brand-gray" />
                                        )}
                                      </div>
                                      <div>
                                        <h5 className={`text-md font-semibold ${unlocked ? 'app-text' : 'text-muted-foreground dark:text-brand-gray'}`}>{lesson.title}</h5>
                                        <p className={`text-xs ${unlocked ? 'text-primary dark:text-brand-blue-light' : 'text-muted-foreground dark:text-brand-gray/70'}`}>{lesson.description}</p>
                                      </div>
                                    </div>
                                    {unlocked && <ChevronRight className="w-5 h-5 text-muted-foreground dark:text-brand-gray/60 group-hover:text-primary dark:group-hover:text-primary transition-colors" />}
                                  </div>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        );
                      })()}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          <div className="space-y-8 sticky top-28">
            <div className="card-bg p-6">
              <h3 className="text-xl sm:text-2xl font-semibold app-text mb-4">Tu Progreso (Grado Actual)</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs sm:text-sm text-primary dark:text-brand-blue-light mb-1">
                    <span>Nivel {userProgress.level}</span>
                    <span>{userProgress.xp % 500} / 500 XP para Nivel {userProgress.level + 1}</span>
                  </div>
                  <div className="w-full progress-bar-bg h-3 sm:h-4">
                    <motion.div 
                      className="progress-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${(userProgress.xp % 500) / 5}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    ></motion.div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-2">
                  <div className="text-center bg-secondary dark:bg-secondary/50 p-2.5 sm:p-3 rounded-lg">
                    <div className="text-2xl sm:text-3xl font-bold app-text">{userProgress.completedLessons.length}</div>
                    <div className="text-xs sm:text-sm text-muted-foreground dark:text-brand-gray">Lecciones Completadas</div>
                  </div>
                  <div className="text-center bg-secondary dark:bg-secondary/50 p-2.5 sm:p-3 rounded-lg">
                    <div className="text-2xl sm:text-3xl font-bold app-text">{userProgress.streak}</div>
                    <div className="text-sm text-muted-foreground dark:text-brand-gray">Racha Global</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-bg p-6">
              <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl sm:text-2xl font-semibold app-text">Logros Destacados</h3>
                   <Button 
                      onClick={() => navigateTo('achievements')}
                      variant="link"
                      size="sm"
                      className="text-primary dark:text-brand-blue-light hover:text-primary/80 dark:hover:text-brand-blue-light/80 p-0 h-auto"
                  >
                      Ver todos
                  </Button>
              </div>
              <div className="space-y-3">
                {achievements.filter(a => userProgress.achievements.includes(a.id)).slice(0, 2).map((achievement) => (
                  <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-accent/10 dark:bg-accent/20 rounded-lg">
                    <div className="text-2xl sm:text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="success-text font-medium text-sm sm:text-base">{achievement.name}</div>
                      <div className="text-xs sm:text-sm text-accent/80 dark:text-accent/70">{achievement.description}</div>
                    </div>
                  </div>
                ))}
                {achievements.filter(a => !userProgress.achievements.includes(a.id)).slice(0, Math.max(0, 2 - achievements.filter(a => userProgress.achievements.includes(a.id)).length)).map((achievement) => (
                   <div key={achievement.id} className="flex items-center space-x-3 p-2 bg-secondary dark:bg-secondary/30 rounded-lg opacity-70">
                    <div className="text-2xl sm:text-3xl">{achievement.icon}</div>
                    <div>
                      <div className="text-muted-foreground dark:text-brand-gray font-medium text-sm sm:text-base">{achievement.name}</div>
                      <div className="text-xs sm:text-sm text-muted-foreground/80 dark:text-brand-gray/70">{achievement.description}</div>
                    </div>
                  </div>
                ))}
                {userProgress.achievements.length === 0 && achievements.filter(a => !userProgress.achievements.includes(a.id)).length === 0 && (
                   <p className="text-sm text-muted-foreground dark:text-brand-gray">¡Sigue aprendiendo para ganar logros!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeView;