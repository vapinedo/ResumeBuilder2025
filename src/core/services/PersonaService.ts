import { Persona } from '@feature/persona/models/Persona';
import useNotification from '@core/services/useNotificationService';
import FirestoreGenericService from '@core/services/FirestoreGenericService';

const COLLECTION = 'usuarios';
const { toastSuccess } = useNotification();

const firestore = FirestoreGenericService<Persona>(COLLECTION);

const PersonaService = {
  lista: async (): Promise<Persona[]> => {
    return await firestore.getAllDocuments();
  },

  crear: async (data: Persona): Promise<void> => {
    await firestore.createDocument(data);
    toastSuccess('Persona creada con éxito');
  },

  actualizar: async (data: Persona): Promise<void> => {
    await firestore.updateDocument(data);
    toastSuccess('Persona actualizada con éxito');
  },

  borrar: async (id: string): Promise<void> => {
    await firestore.deleteDocument(id);
    toastSuccess('Persona eliminada con éxito');
  },

  obtener: async (id: string): Promise<Persona | null> => {
    return await firestore.getDocumentById(id);
  },
};

export default PersonaService;
