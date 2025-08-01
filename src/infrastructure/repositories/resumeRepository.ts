import { Resume } from '@core/models/Resume';
import { IResumeRepository } from '@core/repositories';
import { COLLECTIONS } from '@shared/constants/collections';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

const resumeRepository: IResumeRepository = makeFirestoreRepository<Resume>(COLLECTIONS.RESUMES);
export default resumeRepository;
