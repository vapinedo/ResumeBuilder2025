import { useEffect } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import usePersonaStore from '@core/stores/usePersonaStore';

export default function PersonasAdminPage() {
  const personas = usePersonaStore((state) => state.personas);
  const lista = usePersonaStore((state) => state.lista);
  const loading = usePersonaStore((state) => state.loading);

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
    <div style={{ height: 600, width: '100%' }}>
      <h2>Gestión de Personas</h2>
      <DataGrid
        rows={personas}
        columns={columns}
        getRowId={(row) => row.id}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
        }}
      />
    </div>
  );
}
