import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Award, ArrowLeft, Check, ShieldQuestion, Sparkles, Palette as PaletteIcon, Star, Trophy, Zap as ZapIcon } from 'lucide-react'; // Renamed Palette to PaletteIcon

const achievementIcons = {
  default: <ShieldQuestion size={36} className="text-primary" />,
  ach1: <Sparkles size={36} className="text-yellow-500" />, // Using Tailwind colors
  ach2: <Star size={36} className="text-orange-500" />,
  ach3: <Trophy size={36} className="text-green-500" />, // Using Tailwind colors
  ach4: <ZapIcon size={36} className="text-purple-500" />,
  ach5: <Award size={36} className="text-pink-500" />,
  ach6: <PaletteIcon size={36} className="text-teal-500" />,
  ach7: <Sparkles size={36} className="text-indigo-500" />,
  ach15: <ZapIcon size={36} className="text-red-500" />, // Example for a new achievement
};

const AchievementsView = ({ allAchievements, userProgress, navigateTo }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen app-bg p-4 sm:p-8"
  >
    <div className="max-w-5xl mx-auto">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="flex items-center justify-between mb-10"
      >
        <Button
          onClick={() => navigateTo('home')}
          variant="ghost"
          className="app-text hover:bg-primary/10 flex items-center space-x-2 px-3 py-2 rounded-lg transition-all hover:shadow-lg"
        >
          <ArrowLeft size={22} className="text-primary" /> <span className="font-semibold">Volver</span>
        </Button>
        <h1 className="text-4xl sm:text-5xl font-bold app-text flex items-center">
          <PaletteIcon size={40} className="mr-3 text-accent animate-pulse" />
          Galería de Logros
        </h1>
        <div className="w-32 hidden sm:block"></div>
      </motion.div>

      {allAchievements.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center text-muted-foreground text-xl mt-12"
        >
          Tu vitrina de logros está esperando ser llenada. ¡Sigue aprendiendo!
        </motion.p>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {allAchievements.map((achievement, index) => {
          const unlocked = userProgress.achievements.includes(achievement.id);
          const IconComponent = achievementIcons[achievement.id] || achievementIcons.default;

          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.08 + 0.2, type: 'spring', stiffness: 100 }}
              whileHover={{ y: -5, scale: 1.03, boxShadow: "0px 10px 30px rgba(0,0,0,0.1)" }}
              className={`relative overflow-hidden card-bg p-6 transition-all duration-400 ease-out group ${
                unlocked 
                  ? 'border-accent/70 shadow-xl achievement-unlocked-bg' 
                  : 'border-border opacity-80 hover:opacity-100 achievement-locked-bg'
              }`}
            >
              {unlocked && (
                <motion.div 
                  className="absolute -top-1 -right-1 bg-accent text-accent-foreground p-2 rounded-full shadow-lg"
                  initial={{scale:0, rotate: -45}}
                  animate={{scale:1, rotate: 0}}
                  transition={{delay: index * 0.08 + 0.5, type: "spring", stiffness:300, damping:10}}
                >
                  <Check size={20} />
                </motion.div>
              )}
              <div className="flex flex-col items-center text-center h-full">
                <motion.div 
                  className="mb-4 p-3 rounded-full bg-secondary dark:bg-secondary/30"
                  animate={{ rotate: unlocked ? [0, 10, -10, 10, 0] : 0 }}
                  transition={{ delay: unlocked ? index * 0.08 + 0.7 : 0, duration: unlocked ? 0.8 : 0 }}
                >
                  {IconComponent}
                </motion.div>
                <h3 className={`text-xl font-semibold mb-1 ${unlocked ? 'success-text' : 'app-text'}`}>{achievement.name}</h3>
                <p className={`text-sm mb-3 flex-grow ${unlocked ? 'text-accent/80 dark:text-accent/70' : 'text-muted-foreground'}`}>{achievement.description}</p>
                
                <div className={`w-full h-1.5 rounded-full mt-auto mb-3 ${unlocked ? 'bg-accent/30' : 'bg-secondary dark:bg-secondary/30'}`}>
                  {unlocked && (
                    <motion.div 
                      className="h-full bg-accent rounded-full"
                      initial={{width:0}}
                      animate={{width: "100%"}}
                      transition={{delay: index*0.08 + 0.6, duration: 0.5}}
                    />
                  )}
                </div>

                <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                  unlocked ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  {unlocked ? '¡Conseguido!' : 'Bloqueado'}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  </motion.div>
);

export default AchievementsView;