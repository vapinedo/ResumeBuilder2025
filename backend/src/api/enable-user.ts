import { VercelRequest, VercelResponse } from '@vercel/node';
import admin from 'firebase-admin';

// 🔐 Inicializar Firebase solo una vez
if (!admin.apps.length) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!raw) {
    throw new Error('🔥 La variable de entorno FIREBASE_SERVICE_ACCOUNT_KEY está vacía o no definida');
  }

  try {
    const parsed = JSON.parse(raw.replace(/\\n/g, '\n'));
    console.log('🔐 Longitud clave privada:', parsed.private_key.length);
    admin.initializeApp({
      credential: admin.credential.cert(parsed),
    });
  } catch (err) {
    console.error('❌ Error al inicializar Firebase Admin SDK:', err);
    throw err;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ⚗️ Verifica si la variable llegó correctamente (solo en GET temporal)
  if (req.method === 'GET') {
    const envValue = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    return res.status(200).json({
      exists: !!envValue,
      length: envValue?.length || 0,
      startsWith: envValue?.slice(0, 50) || 'undefined',
    });
  }

  // 🎯 Lógica principal del endpoint
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { uid } = req.body;

  if (!uid) {
    return res.status(400).json({ error: 'UID requerido' });
  }

  try {
    await admin.auth().updateUser(uid, { disabled: false });
    return res.status(200).json({ message: `Usuario ${uid} habilitado.` });
  } catch (error: any) {
    console.error('🔥 Error al habilitar usuario:', error);
    return res.status(500).json({
      error: 'Error al habilitar el usuario',
      details: error?.message || String(error),
    });
  }
}
