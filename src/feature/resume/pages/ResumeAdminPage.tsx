import { GridColDef } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import AdminTable from '@shared/components/AdminTable';
import { useEliminarResume, useListarResumes } from '@core/hooks/useResume';

export default function ResumeAdminPage() {
  const navigate = useNavigate();
  const { data: personas = [], isLoading } = useListarResumes();
  const eliminarPersona = useEliminarResume();

  const columns: GridColDef[] = [
    { field: 'nombres', headerName: 'Nombres', width: 200 },
    { field: 'primerApellido', headerName: 'Primer Apellido', width: 200 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'numeroDocumento', headerName: 'Documento', width: 180 },
    { field: 'fechaNacimiento', headerName: 'Nacimiento', width: 150 },
  ];

  return (
    <AdminTable
      data={personas}
      columns={columns}
      loading={isLoading}
      title="Gestión de Hojas de Vida"
      createRoute="/resume/nuevo"
      onDelete={(row) => eliminarPersona.mutate(row.id)}
      onEdit={(row) => navigate(`/resume/editar/${row.id}`)}
      confirmDeleteMessage={(row) => `¿Deseas eliminar a ${row.nombres} ${row.primerApellido} ${row.segundoApellido}?`}
    />
  );
}
