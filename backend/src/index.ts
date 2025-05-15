import cors from 'cors';
import path from 'path';
import admin from 'firebase-admin';
import { fileURLToPath } from 'url';
import express, { Request, Response } from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta al archivo JSON de la cuenta de servicio
const serviceAccountPath = path.resolve(__dirname, '../serviceAccountKey.json');

// Inicializar Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountPath),
});

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Endpoint: Deshabilitar usuario por UID
app.post('/api/disable-user', async (req: Request, res: Response) => {
  console.log('Request body', req.body);
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID requerido' });
  }

  try {
    await admin.auth().updateUser(uid, { disabled: true });
    res.json({ message: `Usuario ${uid} desactivado.` });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al desactivar el usuario', details: error.message });
  }
});

// Endpoint: Habilitar usuario por UID
app.post('/api/enable-user', async (req: Request, res: Response) => {
  console.log('Request body', req.body);
  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID requerido' });
  }

  try {
    await admin.auth().updateUser(uid, { disabled: false });
    res.json({ message: `Usuario ${uid} habilitado.` });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al habilitar el usuario', details: error.message });
  }
});

// Puerto de escucha (útil para desarrollo local)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
