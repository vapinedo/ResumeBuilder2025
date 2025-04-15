import { useEffect } from 'react';
import AdminTable from '@shared/components/AdminTable';
import { NavLink, useNavigate } from 'react-router-dom';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { Persona } from '@feature/persona/models/Persona';
import usePersonaStore from '@core/stores/usePersonaStore';
import { dialogConfirm } from '@core/services/NotificationService';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';

export default function PersonasAdminPage() {
  const navigate = useNavigate();
  const { personas, loading, lista, borrar } = usePersonaStore((state) => ({
    lista: state.lista,
    borrar: state.borrar,
    loading: state.loading,
    personas: state.personas,
  }));

  useEffect(() => {
    lista();
  }, [lista]);

  const handleActions = (params: GridRenderCellParams<Persona>) => {
    return (
      <>
        <IconEdit color="#00abfb" cursor="pointer" onClick={() => navigate(`/personas/actualizar/${params.id}`)} />
        <IconTrash color="#ff2825" cursor="pointer" style={{ marginLeft: 15 }} onClick={() => handleDelete(params)} />
      </>
    );
  };

  const handleDelete = async ({ row }: { row: Persona }) => {
    const text = `Vas a eliminar a ${row.nombres} ${row.primerApellido}`;
    const { isConfirmed } = await dialogConfirm(text);
    if (isConfirmed && row.id) {
      borrar(row.id);
    }
  };

  const columns: GridColDef<Persona>[] = [
    {
      field: 'nombres',
      headerName: 'Nombre',
      width: 300,
      renderCell: ({ row }) => (
        <NavLink
          title={`Ver detalles de ${row.nombres} ${row.primerApellido}`}
          className="grid-table-linkable-column"
          to={`/personas/detalle/${row.id}`}
        >
          {row.nombres} {row.primerApellido}
        </NavLink>
      ),
    },
    {
      field: 'primerApellido',
      headerName: 'Apellido',
      width: 300,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'telefono',
      headerName: 'Teléfono',
      width: 200,
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 120,
      sortable: false,
      filterable: false,
      align: 'center',
      renderCell: handleActions,
    },
  ];

  return (
    <AdminTable
      data={personas}
      loading={loading}
      columns={columns}
      fetchData={lista}
      title="Gestión de Personas"
      createRoute="/personas/nuevo"
    />
  );
}
