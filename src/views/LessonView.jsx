import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, Play, CheckCircle, XCircle, Lightbulb, BookOpen, ArrowLeft } from 'lucide-react';

const LessonView = ({
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
}) => {

  if (!currentLesson || !currentLesson.questions) {
    return (
      <div className="min-h-screen flex items-center justify-center app-bg">
        <p className="app-text text-xl">Cargando lección...</p>
      </div>
    );
  }
  
  const question = currentLesson.questions[currentQuestionIndex];

  if (!question && viewingState !== 'lessonIntro') {
     return (
      <div className="min-h-screen flex items-center justify-center app-bg">
        <p className="app-text text-xl">Cargando pregunta...</p>
      </div>
    );
  }

  const handleTextareaChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const renderContent = () => {
    if (viewingState === 'lessonIntro') {
      return (
        <motion.div
          key="lessonIntro"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="card-bg p-8 max-w-3xl w-full mx-4"
        >
          <div className="flex items-center mb-4 text-primary dark:text-brand-blue-light">
            <BookOpen className="w-8 h-8 mr-3" />
            <h2 className="text-3xl font-bold">{currentLesson.introTitle || "Introducción a la Lección"}</h2>
          </div>
          <div className="app-text prose dark:prose-invert prose-sm sm:prose-base whitespace-pre-line max-h-[60vh] overflow-y-auto custom-scrollbar p-2 mb-8" dangerouslySetInnerHTML={{ __html: currentLesson.introduction }}></div>
          <Button 
            onClick={proceedToNextStep}
            variant="success"
            className="w-full px-8 py-3 text-lg font-semibold"
          >
            Entendido, ¡vamos a la primera pregunta!
          </Button>
        </motion.div>
      );
    }

    if (viewingState === 'questionIntro') {
      return (
        <motion.div
          key={`questionIntro-${currentQuestionIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="card-bg p-8 max-w-3xl w-full mx-4"
        >
          <div className="flex items-center mb-4 text-primary dark:text-brand-blue-light">
             <Lightbulb className="w-8 h-8 mr-3" />
            <h2 className="text-2xl sm:text-3xl font-bold">Concepto Clave</h2>
          </div>
          <div className="app-text prose dark:prose-invert prose-sm sm:prose-base whitespace-pre-line max-h-[60vh] overflow-y-auto custom-scrollbar p-2 mb-8" dangerouslySetInnerHTML={{ __html: question.concept }}></div>
          <Button 
            onClick={proceedToNextStep}
            variant="success"
            className="w-full px-8 py-3 text-lg font-semibold"
          >
            ¡Listo para el desafío!
          </Button>
        </motion.div>
      );
    }

    if (viewingState === 'quiz') {
      return (
        <motion.div
          key={`quiz-${currentQuestionIndex}`}
          initial={{ opacity: 0, x: showResult ? 0 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="card-bg p-6 sm:p-8 w-full"
        >
          <h2 className="text-xl sm:text-2xl font-bold app-text mb-6">{question.question}</h2>
          
          {question.type === 'theory' ? (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setUserAnswer(index.toString())}
                  disabled={showResult}
                  className={`w-full p-3 sm:p-4 text-left rounded-xl border-2 transition-all text-sm sm:text-base app-text
                    ${
                    showResult && parseInt(userAnswer) === index && isCorrect ? 'border-accent bg-accent/20 ring-2 ring-accent' :
                    showResult && parseInt(userAnswer) === index && !isCorrect ? 'border-destructive bg-destructive/20 ring-2 ring-destructive' :
                    showResult && index === question.correct ? 'border-accent bg-accent/10' :
                    userAnswer === index.toString() ? 'border-primary bg-primary/10 dark:bg-primary/20' : 
                    'border-border dark:border-border bg-secondary/50 dark:bg-secondary/20 hover:bg-secondary dark:hover:bg-secondary/30'
                  } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  {option}
                </button>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="code-editor">
                <textarea
                  value={userAnswer}
                  onChange={handleTextareaChange}
                  placeholder={question.placeholder}
                  className="w-full bg-transparent text-accent dark:text-brand-green font-mono resize-none focus:outline-none text-sm sm:text-base"
                  rows={Math.max(3, userAnswer.split('\n').length, (question.placeholder.match(/\n/g) || []).length + 1)}
                  disabled={showResult}
                />
              </div>
              
              {userAnswer && !showResult && (
                <div className="bg-brand-gray-dark/5 dark:bg-black/30 rounded-xl p-4 border border-border dark:border-border shadow-inner">
                  <div className="flex items-center space-x-2 mb-2">
                    <Play className="w-4 h-4 text-accent dark:text-brand-green" />
                    <span className="text-accent dark:text-brand-green font-mono text-xs sm:text-sm">Salida (simulada):</span>
                  </div>
                  <pre className="app-text font-mono text-xs sm:text-sm whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">
                    {(() => {
                      const result = executePythonCode(userAnswer);
                      return result.success ? result.output || '(Sin salida)' : `Error: ${result.error}`;
                    })()}
                  </pre>
                </div>
              )}
            </div>
          )}
          
          <div className={`mt-6 sm:mt-8 ${showResult ? 'flex flex-col sm:flex-row items-center justify-between' : 'text-right'}`}>
            {showResult && (
              <div className={`flex items-center space-x-2 mb-4 sm:mb-0 ${isCorrect ? 'success-text' : 'error-text'}`}>
                {isCorrect ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                <span className="font-semibold text-base sm:text-lg">
                  {isCorrect ? '¡Excelente!' : 'Intenta de nuevo'}
                </span>
              </div>
            )}
             <Button 
                onClick={showResult ? proceedToNextStep : checkAnswer}
                disabled={(!userAnswer && userAnswer !== 0 && !showResult)}
                variant={showResult ? 'default' : 'success'}
                className="px-6 py-2.5 sm:px-8 sm:py-3 text-base sm:text-lg font-semibold"
              >
                {showResult ? (currentQuestionIndex < currentLesson.questions.length - 1 ? 'Siguiente Concepto' : 'Finalizar Lección') : 'Verificar Respuesta'}
              </Button>
          </div>
           {showResult && !isCorrect && question.explanation && (
              <motion.div 
                initial={{opacity: 0, height: 0}}
                animate={{opacity: 1, height: 'auto'}}
                className="mt-4 p-3 bg-brand-blue-light dark:bg-primary/20 border border-primary/30 dark:border-primary/50 rounded-lg text-primary dark:text-brand-blue-light text-sm sm:text-base"
              >
                <strong className="font-semibold">Pista:</strong> {question.explanation}
              </motion.div>
            )}
        </motion.div>
      );
    }
  };


  return (
    <div className="min-h-screen app-bg flex flex-col">
      <header className="header-bg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <Button 
              onClick={() => navigateTo('home')}
              variant="ghost" 
              className="app-text hover:bg-primary/10 flex items-center space-x-1 px-2 py-1.5 sm:px-3"
            >
              <ArrowLeft size={20} className="mr-1 text-primary"/> Salir
            </Button>
            
            {viewingState !== 'lessonIntro' && (
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="app-text text-xs sm:text-sm">
                  Pregunta {currentQuestionIndex + 1} / {currentLesson.questions.length}
                </div>
                <div className="w-24 sm:w-32 progress-bar-bg h-2 sm:h-2.5">
                  <motion.div 
                    className="progress-bar-fill"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuestionIndex + (viewingState === 'quiz' && showResult && isCorrect ? 1 : 0)) / currentLesson.questions.length) * 100}%`}}
                    transition={{ duration: 0.5 }}
                  ></motion.div>
                </div>
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-brand-red" />
              <span className="app-text font-semibold text-sm sm:text-base">{userProgress.hearts}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4">
        {renderContent()}
      </main>
    </div>
  );
};

export default LessonView;