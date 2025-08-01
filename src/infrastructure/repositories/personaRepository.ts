import { Persona } from '@core/models/Persona';
import { IPersonaRepository } from '@core/repositories';
import makeFirestoreRepository from '@infrastructure/repositories/makeFirestoreRepository';

const COLLECTION_NAME = 'personas';
const personaRepository: IPersonaRepository = makeFirestoreRepository<Persona>('personas');
export default personaRepository;
