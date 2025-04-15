import { Persona } from '@feature/persona/models/Persona';
import { toastSuccess } from '@core/services/NotificationService';
import FirestoreGenericService from '@core/services/FirestoreGenericService';

const COLLECTION = 'personas';

const firestore = FirestoreGenericService<Persona>(COLLECTION);

const PersonaService = {
  lista: (): Promise<Persona[]> => firestore.getAllDocuments(),

  crear: async (data: Persona): Promise<void> => {
    await firestore.createDocument(data);
    toastSuccess('Persona creada con éxito');
  },

  actualizar: async (data: Persona): Promise<void> => {
    await firestore.updateDocument(data as Persona & { id: string });
    toastSuccess('Persona actualizada con éxito');
  },

  borrar: async (id: string): Promise<void> => {
    await firestore.deleteDocument(id);
    toastSuccess('Persona eliminada con éxito');
  },

  obtener: (id: string): Promise<Persona | null> => firestore.getDocumentById(id),
};

export default PersonaService;
