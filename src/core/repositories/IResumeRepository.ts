import { Resume } from '@core/models';

export interface IResumeRepository {
  listar(): Promise<Resume[]>;
  obtenerPorId(id: string): Promise<Resume | null>;
  crear(persona: Resume, images?: FileList | null): Promise<void>;
  actualizar(persona: Resume, images?: FileList | null): Promise<void>;
  eliminar(id: string): Promise<void>;
  contar(): Promise<number>;
}
