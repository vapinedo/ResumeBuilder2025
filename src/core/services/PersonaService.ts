import { Persona } from '@feature/persona/models/Persona';
import FirestoreGenericService from '@core/services/FirestoreGenericService';

const COLLECTION_NAME = 'personas';
const service = FirestoreGenericService<Persona>(COLLECTION_NAME);

export default service;
