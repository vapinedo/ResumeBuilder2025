import { Persona } from '@core/models/Persona';
import { IPersonaRepository } from '@core/repositories';
import { COLLECTIONS } from '@shared/constants/collections';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

const personaRepository: IPersonaRepository = makeFirestoreRepository<Persona>(COLLECTIONS.PERSONAS);
export default personaRepository;
