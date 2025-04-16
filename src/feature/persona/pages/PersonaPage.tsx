import { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import usePersonaStore from '@core/stores/usePersonaStore';
import { SectionContainer } from '@shared/containers/SectionContainer';

export default function PersonasAdminPage() {
  const lista = usePersonaStore((state) => state.lista);
  const loading = usePersonaStore((state) => state.loading);
  const personas = usePersonaStore((state) => state.personas);

  useEffect(() => {
    lista();
  }, [lista]);

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
        loading={loading}
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
      />
    </SectionContainer>
  );
}
