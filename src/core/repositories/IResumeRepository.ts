// src/core/repositories/IResumeRepository.ts
import { Resume } from '@core/models';

export interface IResumeRepository {
  listar(): Promise<Resume[]>;
  obtenerPorId(id: string): Promise<Resume | null>;
  crear(resume: Resume, images?: FileList | null): Promise<void>;
  actualizar(resume: Resume & { id: string }, images?: FileList | null): Promise<void>;
  eliminar(id: string): Promise<void>;
  contar(): Promise<number>;
}
