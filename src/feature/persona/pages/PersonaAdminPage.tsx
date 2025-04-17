import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dialogConfirm } from '@core/services/NotificationService';
import { SectionContainer } from '@shared/containers/SectionContainer';
import { useBorrarPersona, useListaPersonas } from '@core/hooks/usePersona';

export default function PersonasAdminPage() {
  const navigate = useNavigate();
  const borrarPersona = useBorrarPersona();
  const { data: personas = [], isLoading } = useListaPersonas();

  const columns: GridColDef[] = [
    { field: 'nombres', headerName: 'Nombres', width: 200 },
    { field: 'primerApellido', headerName: 'Primer Apellido', width: 200 },
    { field: 'segundoApellido', headerName: 'Segundo Apellido', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'telefono', headerName: 'Teléfono', width: 150 },
    { field: 'numeroDocumento', headerName: 'Documento', width: 180 },
    { field: 'fechaNacimiento', headerName: 'Nacimiento', width: 150 },
    {
      width: 200,
      sortable: false,
      field: 'acciones',
      headerName: 'Acciones',
      renderCell: (params) => (
        <>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            style={{ marginRight: 8 }}
            onClick={() => navigate(`/personas/editar/${params.row.id}`)}
          >
            Editar
          </Button>
          <Button
            size="small"
            color="error"
            variant="outlined"
            onClick={async () => {
              const result = await dialogConfirm(
                `Seguro que quieres eliminar ${params.row.nombres} ${params.row.primerApellido} ${params.row.segundoApellido} `
              );
              if (result.isConfirmed) {
                borrarPersona.mutate(params.row.id);
              }
            }}
          >
            Eliminar
          </Button>
        </>
      ),
    },
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
