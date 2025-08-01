import { Resume } from '@core/models/Resume';
import { COLLECTIONS } from '@shared/constants/collections';
import useGenericFirestoreRepository from '@shared/hooks/useGenericFirestoreRepository.';

const resumeCrud = () => useGenericFirestoreRepository<Resume>(COLLECTIONS.RESUMES);

export const useListarResumes = () => resumeCrud().useListar();
export const useCrearResume = (opts?: any) => resumeCrud().useCrear(opts);
export const useActualizarResume = (opts?: any) => resumeCrud().useActualizar(opts);
export const useEliminarResume = (opts?: any) => resumeCrud().useEliminar(opts);
export const useResumePorId = (id: string) => resumeCrud().useObtenerPorId(id);
