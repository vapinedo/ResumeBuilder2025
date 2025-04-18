import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BoxShadow from '@shared/containers/BoxShadow';
import { dialogConfirm } from '@infrastructure/notifications/notificationAdapter';
import { DataGrid, GridColDef, GridToolbar, GridValidRowModel } from '@mui/x-data-grid';

interface AdminTableProps<T extends GridValidRowModel> {
  title: string;
  data: T[];
  loading: boolean;
  columns: GridColDef<T>[];
  createRoute: string;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  confirmDeleteMessage?: (row: T) => string;
  pageSizeOptions?: number[];
  getRowId?: (row: T) => string;
}

const AdminTable = <T extends GridValidRowModel>({
  title,
  data,
  loading,
  columns,
  createRoute,
  onEdit,
  onDelete,
  confirmDeleteMessage,
  pageSizeOptions = [10, 20, 50],
  getRowId = (row) => row.id,
}: AdminTableProps<T>) => {
  const navigate = useNavigate();

  // Agregamos columna de acciones solo si hay handlers definidos
  const enhancedColumns: GridColDef<T>[] = [...columns];

  if (onEdit || onDelete) {
    enhancedColumns.push({
      field: 'acciones',
      headerName: 'Acciones',
      width: 200,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          {onEdit && (
            <Button
              size="small"
              variant="outlined"
              color="primary"
              style={{ marginRight: 8 }}
              onClick={() => onEdit(params.row)}
            >
              Editar
            </Button>
          )}
          {onDelete && (
            <Button
              size="small"
              variant="outlined"
              color="error"
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
        </>
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
          columns={enhancedColumns}
          getRowId={getRowId}
          loading={loading}
          pageSizeOptions={pageSizeOptions}
          disableRowSelectionOnClick
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
              justifyContent: 'flex-end',
              marginTop: '12px',
              marginBottom: '22px',
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
