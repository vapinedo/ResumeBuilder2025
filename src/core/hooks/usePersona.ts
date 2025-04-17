import { Persona } from '@feature/persona/models/Persona';
import { useFirestoreCrud } from '@core/hooks/useFirestoreCrud';

const personaCrud = () => useFirestoreCrud<Persona>('personas');

export const useListaPersonas = () => personaCrud().useList();
export const useCrearPersona = (opts?: any) => personaCrud().useCreate(opts);
export const useActualizarPersona = (opts?: any) => personaCrud().useUpdate(opts);
export const useBorrarPersona = (opts?: any) => personaCrud().useDelete(opts);
export const usePersonaPorId = (id: string) => personaCrud().useGetById(id);
