export type TrainingGoal = 'hypertrophy' | 'fat_burn' | 'strength';

export interface GoalConfig {
  label: string;
  sets: string;
  reps: string;
  rest: string;
  restSeconds: number;
  description: string;
}

export const GOAL_CONFIGS: Record<TrainingGoal, GoalConfig> = {
  hypertrophy: {
    label: 'Hipertrofia',
    sets: '3-4 séries',
    reps: '8-12 reps',
    rest: '60-90s',
    restSeconds: 90,
    description: 'Foco em ganho de massa muscular.'
  },
  fat_burn: {
    label: 'Queima de Gordura',
    sets: '4 séries',
    reps: '15-20 reps',
    rest: '30s',
    restSeconds: 30,
    description: 'Foco em cadência e definição.'
  },
  strength: {
    label: 'Força Bruta',
    sets: '5 séries',
    reps: '3-5 reps',
    rest: '3 min',
    restSeconds: 180,
    description: 'Foco em carga máxima e potência.'
  }
};

export type Category = 'Inferiores' | 'Peito' | 'Costas' | 'Braços' | 'Ombros/Trapézio' | 'Antebraço' | 'Core';

export interface Exercise {
  id: string;
  name: string;
  category: Category;
  gif: string;
}

export const EXERCISES: Exercise[] = [
  // Inferiores
  { id: '1', name: 'Abduçao de quadril em pé', category: 'Inferiores', gif: 'Abduçao de quadril em pé.gif' },
  { id: '2', name: 'agachamento bulgaro', category: 'Inferiores', gif: 'agachamento bulgaro.gif' },
  { id: '3', name: 'Leg Press 45', category: 'Inferiores', gif: 'Leg Press 45.gif' },
  { id: '4', name: 'Cadeira Extensora', category: 'Inferiores', gif: 'Cadeira Extensora.gif' },
  
  // Peito
  { id: '5', name: 'supino reto no cross', category: 'Peito', gif: 'supino reto no cross.gif' },
  { id: '6', name: 'Supino Inclinado com Halteres', category: 'Peito', gif: 'Supino Inclinado com Halteres.gif' },
  { id: '7', name: 'Crucifixo Máquina', category: 'Peito', gif: 'Crucifixo Máquina.gif' },

  // Costas
  { id: '8', name: 'remada serrote', category: 'Costas', gif: 'remada serrote.gif' },
  { id: '9', name: 'Puxada Aberta', category: 'Costas', gif: 'Puxada Aberta.gif' },
  { id: '10', name: 'Remada Curvada', category: 'Costas', gif: 'Remada Curvada.gif' },

  // Braços
  { id: '11', name: 'rosca direta no cross barra W', category: 'Braços', gif: 'rosca direta no cross barra W.gif' },
  { id: '12', name: 'triceps testa com barra', category: 'Braços', gif: 'triceps testa com barra.gif' },
  { id: '13', name: 'Rosca Martelo', category: 'Braços', gif: 'Rosca Martelo.gif' },
  { id: '14', name: 'Triceps Pulley', category: 'Braços', gif: 'Triceps Pulley.gif' },

  // Ombros
  { id: '15', name: 'encolhimento no smith', category: 'Ombros/Trapézio', gif: 'encolhimento no smith.gif' },
  { id: '16', name: 'Desenvolvimento com Halteres', category: 'Ombros/Trapézio', gif: 'Desenvolvimento com Halteres.gif' },
  { id: '17', name: 'Elevação Lateral', category: 'Ombros/Trapézio', gif: 'Elevação Lateral.gif' },

  // Antebraço
  { id: '18', name: 'Rosca Inversa', category: 'Antebraço', gif: 'Rosca Inversa.gif' },
  { id: '19', name: 'Flexão de Punho', category: 'Antebraço', gif: 'Flexão de Punho.gif' },

  // Core
  { id: '20', name: 'Abdominal com Carga', category: 'Core', gif: 'Abdominal com Carga.gif' },
  { id: '21', name: 'Plancha Abdominal', category: 'Core', gif: 'Plancha Abdominal.gif' },
];
