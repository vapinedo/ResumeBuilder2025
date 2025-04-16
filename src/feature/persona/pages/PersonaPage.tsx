import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useListaPersonas } from '@core/hooks/usePersona';
import { SectionContainer } from '@shared/containers/SectionContainer';

export default function PersonasAdminPage() {
  const { data: personas = [], isLoading } = useListaPersonas();

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
    <SectionContainer title="Gestión de Personas">
      <DataGrid
        rows={personas}
        columns={columns}
        loading={isLoading}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
      />
    </SectionContainer>
  );
}
