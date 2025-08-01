import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { Resume } from '@core/models/Resume';
import { useEliminarResume, useListarResumes } from '@core/hooks/useResume';

type ResumeWithId = Resume & { id: string };

interface ResumeTableData {
  id: string;
  nombres: string;
  primerApellido: string;
  segundoApellido: string;
  telefono: string;
  tipoDocumento: string;
  numeroDocumento: string;
}

export default function ResumeAdminPage() {
  const navigate = useNavigate();
  const { data: resumes = [], isLoading } = useListarResumes();
  const eliminarResume = useEliminarResume();

  const resumesFormatted: ResumeTableData[] = (resumes as ResumeWithId[]).map((resume) => ({
    id: resume.id,
    nombres: resume.datosPersonales?.nombres || '',
    primerApellido: resume.datosPersonales?.primerApellido || '',
    segundoApellido: resume.datosPersonales?.segundoApellido || '',
    telefono: resume.datosPersonales?.telefono || '',
    tipoDocumento: resume.datosPersonales?.tipoDocumento || '',
    numeroDocumento: resume.datosPersonales?.numeroDocumento || '',
    email: resume.datosPersonales?.email || '',
  }));

  const columns: GridColDef[] = [
    { field: 'nombres', headerName: 'Nombres', width: 150 },
    { field: 'primerApellido', headerName: 'Primer Apellido', width: 150 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', width: 150 },
    { field: 'telefono', headerName: 'Telefono', width: 180 },
    { field: 'tipoDocumento', headerName: 'Tipo Documento', width: 130 },
    { field: 'numeroDocumento', headerName: 'Documento', width: 180 },
    { field: 'email', headerName: 'Email', width: 300 },
  ];

  return (
    <AdminTable
      data={resumesFormatted}
      columns={columns}
      loading={isLoading}
      title="Gestión de Hojas de Vida"
      createRoute="/resume/nuevo"
      onDelete={(row) => eliminarResume.mutate(row.id)}
      onEdit={(row) => navigate(`/resume/editar/${row.id}`)}
      confirmDeleteMessage={(row) => `¿Deseas eliminar la hoja de vida de ${row.nombres} ${row.primerApellido}?`}
    />
  );
}
