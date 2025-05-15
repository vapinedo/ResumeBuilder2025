import cors from 'cors';
import admin from 'firebase-admin';
import type { Request, Response } from 'express';

// 🔐 Inicialización de Firebase Admin con variable de entorno
const rawKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (!rawKey) {
  throw new Error('🔥 La variable de entorno FIREBASE_SERVICE_ACCOUNT_KEY no está definida');
}

const serviceAccount = JSON.parse(rawKey.replace(/\\n/g, '\n'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// 🔒 Endpoint: Deshabilitar usuario
app.post('/api/disable-user', async (req: Request, res: Response) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: 'UID requerido' });

  try {
    await admin.auth().updateUser(uid, { disabled: true });
    res.json({ message: `Usuario ${uid} desactivado.` });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al desactivar el usuario', details: error.message });
  }
});

// 🔓 Endpoint: Habilitar usuario
app.post('/api/enable-user', async (req: Request, res: Response) => {
  const { uid } = req.body;
  if (!uid) return res.status(400).json({ error: 'UID requerido' });

  try {
    await admin.auth().updateUser(uid, { disabled: false });
    res.json({ message: `Usuario ${uid} habilitado.` });
  } catch (error: any) {
    res.status(500).json({ error: 'Error al habilitar el usuario', details: error.message });
  }
});

// 🚀 Arrancar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend escuchando en http://localhost:${PORT}`);
});
