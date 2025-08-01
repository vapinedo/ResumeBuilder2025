import { Route, Routes } from 'react-router-dom';
import ResumeAdminPage from '@feature/resume/pages/ResumeAdminPage';
import ResumeForm from '@feature/resume/components/ResumeForm';
// import PersonaDetallePage from '@feature/persona/pages/PersonaDetallePage';
// import PersonaFormWrapper from '@feature/persona/components/PersonaFormWrapper';

export default function ResumeRouter() {
  return (
    <Routes>
      <Route path="/" element={<ResumeAdminPage />} />
      <Route path="/nuevo" element={<ResumeForm />} />
      {/* <Route path="/editar/:id" element={<PersonaFormWrapper />} /> */}
      {/* <Route path="/detalle/:id" element={<PersonaDetallePage />} /> */}
    </Routes>
  );
}
