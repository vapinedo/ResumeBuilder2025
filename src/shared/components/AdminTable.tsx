import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoxShadow from '@shared/components/BoxShadow';
import { dialogConfirm } from '@infrastructure/notifications/notificationAdapter';
import { DataGrid, GridColDef, GridToolbar, GridValidRowModel } from '@mui/x-data-grid';

interface AdminTableProps<T extends GridValidRowModel> {
  data: T[];
  title: string;
  loading: boolean;
  createRoute: string;
  columns: GridColDef<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onPrint?: (row: T) => void; // Nueva prop opcional para la acción de imprimir
  pageSizeOptions?: number[];
  getRowId?: (row: T) => string;
  confirmDeleteMessage?: (row: T) => string;
}

const AdminTable = <T extends GridValidRowModel>({
  data,
  title,
  onEdit,
  loading,
  columns,
  onDelete,
  onPrint, // Nueva prop
  createRoute,
  confirmDeleteMessage,
  getRowId = (row) => row.id,
  pageSizeOptions = [10, 20, 50],
}: AdminTableProps<T>) => {
  const navigate = useNavigate();

  // Agregamos columna de acciones solo si hay handlers definidos
  const enhancedColumns: GridColDef<T>[] = [...columns];

  if (onEdit || onDelete || onPrint) {
    enhancedColumns.push({
      field: 'acciones',
      headerName: 'Acciones',
      width: onPrint ? 300 : 200, // Aumentamos el ancho si hay botón de imprimir
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box
          sx={{
            display: 'flex',
            gap: 1,
            alignItems: 'center', // Centra verticalmente
            height: '100%', // Asegura que el Box ocupe toda la altura disponible
          }}
        >
          {onEdit && (
            <Button size="small" color="primary" variant="outlined" onClick={() => onEdit(params.row)}>
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={async () => {
                const message = confirmDeleteMessage?.(params.row) ?? '¿Estás seguro de eliminar este registro?';
                const result = await dialogConfirm(message);
                if (result.isConfirmed) {
                  onDelete(params.row);
                }
              }}
            >
              Eliminar
            </Button>
          )}
          {onPrint && (
            <Button size="small" color="secondary" variant="outlined" onClick={() => onPrint(params.row)}>
              Imprimir
            </Button>
          )}
        </Box>
      ),
    });
  }

  return (
    <BoxShadow>
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="m-0">{title}</h2>
        <Button variant="contained" color="primary" onClick={() => navigate(createRoute)}>
          Crear nuevo
        </Button>
      </header>

      <Box sx={{ height: '100%', width: '100%' }}>
        <DataGrid
          rows={data}
          loading={loading}
          getRowId={getRowId}
          columns={enhancedColumns}
          disableRowSelectionOnClick
          pageSizeOptions={pageSizeOptions}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: pageSizeOptions[0],
              },
            },
          }}
          sx={{
            border: 'none',
            overflowX: 'auto',
            '& .MuiDataGrid-toolbarContainer': {
              display: 'flex',
              marginTop: '12px',
              marginBottom: '22px',
              justifyContent: 'flex-end',
            },
          }}
          localeText={{
            toolbarExport: 'Exportar',
            toolbarQuickFilterPlaceholder: 'Buscar...',
          }}
        />
      </Box>
    </BoxShadow>
  );
};

export default AdminTable;
