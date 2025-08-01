import { Resume } from '@core/models/Resume';
import { useFirestoreCrud } from '@shared/hooks/useGenericFirestoreRepository.';

const resumeCrud = () => useFirestoreCrud<Resume>('resumes');

export const useListarResumes = () => resumeCrud().useListar();
export const useCrearResume = (opts?: any) => resumeCrud().useCrear(opts);
export const useActualizarResume = (opts?: any) => resumeCrud().useActualizar(opts);
export const useEliminarResume = (opts?: any) => resumeCrud().useEliminar(opts);
export const useResumePorId = (id: string) => resumeCrud().useObtenerPorId(id);
