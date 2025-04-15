import { create } from 'zustand';
import { Persona } from '@feature/persona/models/Persona';
import PersonaService from '@core/services/PersonaService';
import { persist, PersistStorage } from 'zustand/middleware';

interface PersonaStore {
  loading: boolean;
  personas: Persona[];
  error: string | null;
  lista: () => Promise<void>;
  borrar: (id: string) => Promise<void>;
  crear: (persona: Persona) => Promise<void>;
  obtener: (id: string) => Persona | undefined;
  actualizar: (persona: Persona) => Promise<void>;
}

const serialize = (persona: Persona): any => ({ ...persona });
const deserialize = (persona: any): Persona => ({ ...persona });

const storage: PersistStorage<PersonaStore> = {
  getItem: (name) => {
    const item = sessionStorage.getItem(name);
    if (item) {
      const parsed = JSON.parse(item);
      return {
        ...parsed,
        state: {
          ...parsed.state,
          personas: parsed.state.personas.map(deserialize),
        },
      };
    }
    return null;
  },
  setItem: (name, value) => {
    const serializedState = JSON.stringify({
      ...value,
      state: {
        ...value.state,
        personas: value.state.personas.map(serialize),
      },
    });
    sessionStorage.setItem(name, serializedState);
  },
  removeItem: (name) => sessionStorage.removeItem(name),
};

const handleError = (error: unknown, set: (state: Partial<PersonaStore>) => void) => {
  if (error instanceof Error) {
    set({ error: error.message, loading: false });
  } else {
    set({ error: String(error), loading: false });
  }
};

const usePersonaStore = create<PersonaStore>()(
  persist(
    (set, get) => ({
      personas: [],
      loading: false,
      error: null,

      lista: async () => {
        set({ loading: true, error: null });
        try {
          const personas = await PersonaService.lista();
          set({ personas, loading: false });
        } catch (error) {
          handleError(error, set);
        }
      },

      obtener: (id: string) => {
        const { personas } = get();
        return personas.find((persona) => persona.id === id);
      },

      crear: async (persona: Persona) => {
        set({ loading: true, error: null });
        try {
          await PersonaService.crear(persona);
          await get().lista();
        } catch (error) {
          handleError(error, set);
        }
      },

      actualizar: async (persona: Persona) => {
        set({ loading: true, error: null });
        try {
          await PersonaService.actualizar(persona);
          await get().lista();
        } catch (error) {
          handleError(error, set);
        }
      },

      borrar: async (id: string) => {
        set({ loading: true, error: null });
        try {
          await PersonaService.borrar(id);
          await get().lista();
        } catch (error) {
          handleError(error, set);
        }
      },
    }),
    {
      name: 'personas-store',
      storage,
    }
  )
);

export default usePersonaStore;
