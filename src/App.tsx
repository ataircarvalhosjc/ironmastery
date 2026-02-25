import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Dumbbell, 
  Timer, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Play, 
  Pause, 
  RotateCcw,
  Trophy,
  Flame,
  Zap,
  Info
} from 'lucide-react';
import { 
  EXERCISES, 
  GOAL_CONFIGS, 
  type TrainingGoal, 
  type Category, 
  type Exercise,
  type GoalConfig
} from './constants';
import { cn } from './lib/utils';

const CATEGORIES: Category[] = [
  'Inferiores', 
  'Peito', 
  'Costas', 
  'Braços', 
  'Ombros/Trapézio', 
  'Antebraço', 
  'Core'
];

export default function App() {
  const [selectedGoal, setSelectedGoal] = useState<TrainingGoal>('hypertrophy');
  const [activeCategory, setActiveCategory] = useState<Category>('Peito');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = EXERCISES.filter(ex => ex.category === activeCategory);
  const currentGoalConfig = GOAL_CONFIGS[selectedGoal];

  return (
    <div className="min-h-screen bg-deep-black pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-deep-black/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-intense-red rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(230,0,0,0.4)]">
              <Dumbbell className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-bold tracking-tighter uppercase italic">
              Iron <span className="text-intense-red">Mastery</span>
            </h1>
          </div>
          <div className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">
            Elite Performance
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-8">
        {/* Goal Selector */}
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-4 h-4 text-intense-red" />
            <h2 className="text-xs uppercase tracking-widest font-bold text-white/60">Objetivo de Treino</h2>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {(Object.keys(GOAL_CONFIGS) as TrainingGoal[]).map((goal) => {
              const config = GOAL_CONFIGS[goal];
              const isActive = selectedGoal === goal;
              const Icon = goal === 'hypertrophy' ? Trophy : goal === 'fat_burn' ? Flame : Zap;
              
              return (
                <button
                  key={goal}
                  onClick={() => setSelectedGoal(goal)}
                  className={cn(
                    "relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 group",
                    isActive 
                      ? "bg-intense-red/10 border-intense-red text-white shadow-[0_0_20px_rgba(230,0,0,0.2)]" 
                      : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:border-white/20"
                  )}
                >
                  <Icon className={cn("w-6 h-6 mb-2 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
                  <span className="text-[11px] font-bold uppercase tracking-tight text-center leading-tight">
                    {config.label}
                  </span>
                  {isActive && (
                    <motion.div 
                      layoutId="goal-indicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-intense-red rounded-full shadow-[0_0_8px_#e60000]"
                    />
                  )}
                </button>
              );
            })}
          </div>
          
          <motion.div 
            key={selectedGoal}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3"
          >
            <Info className="w-4 h-4 text-intense-red shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-white/80 leading-relaxed">
                <span className="font-bold text-white uppercase mr-2">{currentGoalConfig.label}:</span>
                {currentGoalConfig.description}
              </p>
              <div className="flex gap-4 mt-2">
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  Séries: <span className="text-white font-bold">{currentGoalConfig.sets}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  Reps: <span className="text-white font-bold">{currentGoalConfig.reps}</span>
                </div>
                <div className="text-[10px] uppercase tracking-wider text-white/40">
                  Descanso: <span className="text-white font-bold">{currentGoalConfig.rest}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Category Tabs */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <ChevronRight className="w-4 h-4 text-intense-red" />
            <h2 className="text-xs uppercase tracking-widest font-bold text-white/60">Categorias</h2>
          </div>
          <div className="flex overflow-x-auto pb-4 gap-2 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all border",
                  activeCategory === cat
                    ? "bg-white text-deep-black border-white"
                    : "bg-transparent text-white/50 border-white/10 hover:border-white/30"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>

        {/* Exercises Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredExercises.map((exercise) => (
              <motion.div
                layout
                key={exercise.id}
                onClick={() => setSelectedExercise(exercise)}
                className="group relative bg-white/5 border border-white/10 rounded-2xl p-5 cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-intense-red/50 red-glow-hover"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-display font-bold text-white group-hover:text-intense-red transition-colors">
                      {exercise.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">
                      {exercise.category}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-intense-red transition-colors">
                    <Play className="w-3 h-3 text-white fill-current" />
                  </div>
                </div>
                
                <div className="mt-4 flex gap-3">
                  <div className="px-2 py-1 bg-white/5 rounded text-[9px] uppercase font-bold text-white/60">
                    {currentGoalConfig.sets}
                  </div>
                  <div className="px-2 py-1 bg-white/5 rounded text-[9px] uppercase font-bold text-white/60">
                    {currentGoalConfig.reps}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Exercise Modal */}
      <AnimatePresence>
        {selectedExercise && (
          <ExerciseModal 
            exercise={selectedExercise} 
            goalConfig={currentGoalConfig}
            onClose={() => setSelectedExercise(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ExerciseModal({ 
  exercise, 
  goalConfig,
  onClose 
}: { 
  exercise: Exercise; 
  goalConfig: GoalConfig;
  onClose: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(goalConfig.restSeconds);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(goalConfig.restSeconds);
  };

  const progress = (timeLeft / goalConfig.restSeconds) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep-black/95 backdrop-blur-xl cursor-pointer"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white/5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(230,0,0,0.15)] cursor-default"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-intense-red flex items-center justify-center text-white shadow-[0_0_20px_rgba(230,0,0,0.5)] hover:scale-110 active:scale-95 transition-all"
        >
          <X className="w-6 h-6 stroke-[3px]" />
        </button>

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-display font-bold text-white mb-1">{exercise.name}</h2>
            <p className="text-xs uppercase tracking-widest text-intense-red font-bold">{exercise.category}</p>
          </div>

          {/* GIF Placeholder / Viewer */}
          <div className="aspect-square w-full bg-black rounded-3xl overflow-hidden mb-8 border border-white/5 relative group">
            <img 
              src={`./assets/exercises/${exercise.gif}`} 
              alt={exercise.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                // Fallback for missing assets in preview
                (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${exercise.id}/800/800?blur=2`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </div>

          {/* Training Info */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Séries</p>
              <p className="text-lg font-bold text-white">{goalConfig.sets}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Reps</p>
              <p className="text-lg font-bold text-white">{goalConfig.reps}</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-4 text-center border border-white/5">
              <p className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Descanso</p>
              <p className="text-lg font-bold text-white">{goalConfig.rest}</p>
            </div>
          </div>

          {/* Timer Section */}
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-6">
              {/* Circular Progress */}
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="8"
                />
                <motion.circle
                  cx="80"
                  cy="80"
                  r="74"
                  fill="transparent"
                  stroke="#e60000"
                  strokeWidth="8"
                  strokeDasharray="465"
                  animate={{ strokeDashoffset: 465 - (465 * progress) / 100 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                  strokeLinecap="round"
                  className="drop-shadow-[0_0_8px_#e60000]"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-display font-bold text-white">
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold">Resting</span>
              </div>
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={toggleTimer}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
                  isActive 
                    ? "bg-white text-black" 
                    : "bg-intense-red text-white shadow-[0_0_20px_rgba(230,0,0,0.4)]"
                )}
              >
                {isActive ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full py-4 rounded-2xl bg-intense-red text-white font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(230,0,0,0.3)] hover:bg-intense-red/90 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <X className="w-5 h-5 stroke-[3px]" />
              Sair do Exercício
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
