import { Persona } from '@feature/persona/models/Persona';
import { useFirestoreCrud } from '@core/hooks/useFirestoreCrud';

export const useListaPersonas = () => useFirestoreCrud<Persona>('personas').useList();
export const useCrearPersona = (opts?: any) => useFirestoreCrud<Persona>('personas').useCreate(opts);
export const useActualizarPersona = (opts?: any) => useFirestoreCrud<Persona>('personas').useUpdate(opts);
export const useBorrarPersona = (opts?: any) => useFirestoreCrud<Persona>('personas').useDelete(opts);
export const usePersonaPorId = (id: string) => useFirestoreCrud<Persona>('personas').useGetById(id);
