import { Route, Routes } from 'react-router-dom';
import PersonaForm from '@feature/persona/components/PersonaForm';
import PersonaAdminPage from '@feature/persona/pages/PersonaAdminPage';
import PersonaDetallePage from '@feature/persona/pages/PersonaDetallePage';

export default function PersonaRouter() {
  return (
    <Routes>
      <Route path="/" element={<PersonaAdminPage />} />
      <Route path="/detalle/:id" element={<PersonaDetallePage />} />
      <Route path="/nuevo" element={<PersonaForm isEditMode={false} />} />
      <Route path="/editar/:id" element={<PersonaForm isEditMode={true} />} />
    </Routes>
  );
}
