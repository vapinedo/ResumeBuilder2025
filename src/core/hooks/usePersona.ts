import { Persona } from '@core/models/Persona';
import { COLLECTIONS } from '@shared/constants/collections';
import useGenericFirestoreRepository from '@shared/hooks/useGenericFirestoreRepository.';

const personaCrud = () => useGenericFirestoreRepository<Persona>(COLLECTIONS.PERSONAS);

export const useListarPersonas = () => personaCrud().useListar();
export const useCrearPersona = (opts?: any) => personaCrud().useCrear(opts);
export const useActualizarPersona = (opts?: any) => personaCrud().useActualizar(opts);
export const useEliminarPersona = (opts?: any) => personaCrud().useEliminar(opts);
export const usePersonaPorId = (id: string) => personaCrud().useObtenerPorId(id);
