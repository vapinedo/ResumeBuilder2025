import { Route, Routes } from 'react-router-dom';
import PersonaForm from '@feature/persona/components/PersonaForm';
// import PersonaAdminPage from '@feature/persona/pages/PersonaAdminPage';
import PersonaPage from '@feature/persona/pages/PersonaPage';
import PersonaDetallePage from '@feature/persona/pages/PersonaDetallePage';

export default function PersonaRouter() {
  return (
    <Routes>
      <Route path="/" element={<PersonaPage />} />
      <Route path="/nuevo" element={<PersonaForm />} />
      <Route path="/detalle/:id" element={<PersonaDetallePage />} />
    </Routes>
  );
}
