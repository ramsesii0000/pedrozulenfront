import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../css/Multa.css'
import Swal from 'sweetalert2';
import multaService from '../service/multaService';
import deleteIcon from '../assets/icons/deleteIcon.png';
import updateIcon from '../assets/icons/updateIcon.png';
import ModalUpdateMulta from './ModalUpdateMulta';
 
const Fines = () => {
  const [multas, setMultas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMultaId, setSelectedMultaId] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState('');
  const [selectedTypeMulta, setSelectedTypeMulta] = useState('');
  const [selectedMultaDate, setSelectedMultaDate] = useState('');
  const [selectedStatusMulta, setSelectedStatusMulta] = useState('');
  const [selectedMontoTotal, setSelectedMontoTotal] = useState(null);
  const [selectedPrestamoId, setSelectedPrestamoId] = useState(null);
 
  useEffect(() => {
    fetchMulta();
  }, []);
 
  const fetchMulta = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await multaService.getAllMultas(token);
      const multaWithIds = data.map((multa, index) => ({
        ...multa,
        id: index + 1
      }));
      setMultas(multaWithIds);
      console.log(multas)
    } catch (error) {
      console.error('Error al cargar las multas:', error);
    }
  };
 
  const handleDeleteMulta = async (idMulta) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar multa',
        cancelButtonText: 'Cancelar',
      });
     
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        await multaService.deleteMulta(idMulta, token);
        fetchMulta();
        Swal.fire('Eliminado', 'La Multa ha sido eliminada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la multa:', error);
      Swal.fire('Error', 'Hubo un error al intentar eliminar la multa.', 'error');
    }
  };
 
  const columns = [
    { field: 'typeMulta', headerName: 'Tipo de Multa', width: 180 },
    { field: 'multaDate', headerName: 'Fecha', width: 100 },
    { field: 'statusMulta', headerName: 'Estado', width: 120 },
    { field: 'montoTotal', headerName: 'Monto', width: 70 },
    {
      field: 'prestamo',
      headerName: 'Usuario',
      width: 150,
      renderCell: (params) => (
        <span>{params.value.user.nameUser} {params.value.user.lastnameUser}</span>
      )
    },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 350,
      renderCell: (params) => (
        <div>
          <button className="delete-button" onClick={() => handleDeleteMulta(params.row.idMulta)}>
            <img className="img-delete-button" src={deleteIcon}/>
          </button>
          <button className="update-button" onClick={() => handleOpenUpdateModal(params.row.idMulta, params.row.descriptionMulta,
            params.row.typeMulta, params.row.multaDate, params.row.statusMulta, params.row.montoTotal, params.row.prestamo.idPrestamo )}>
               <img className="img-delete-button" src={updateIcon}/>
            </button>
        </div>
      ),
    }
  ];
 
  const handleOpenUpdateModal= (idMulta, descriptionMulta, typeMulta, multaDate, statusMulta, montoTotal, idPrestamo) => {
    setSelectedMultaId(idMulta);
    setSelectedDescription(descriptionMulta);
    setSelectedTypeMulta(typeMulta);
    setSelectedMultaDate(multaDate);
    setSelectedStatusMulta(statusMulta);
    setSelectedMontoTotal(montoTotal);
    setSelectedPrestamoId(idPrestamo);
    setIsModalOpen(true);
  }
 
  const initValue = {
    idMulta: selectedMultaId,
    descriptionMulta: selectedDescription,
    typeMulta: selectedTypeMulta,
    multaDate: selectedMultaDate,
    statusMulta: selectedStatusMulta,
    montoTotal: selectedMontoTotal,
    idPrestamo: selectedPrestamoId
  }
 
  return (
    <div className='multa-container'>
      <h1 className='title-multa'>Gestión de Multas</h1>
      <div className="table-container-multa">
      <input
          type="text"
          placeholder="Buscar..."
          className='input-buscar-libro'
        />
        <DataGrid
        rows={multas}
        columns={columns}
        pageSize={5}
        />
        {isModalOpen && (
          <ModalUpdateMulta
            onCancel={() => setIsModalOpen(false)}
            initValue={initValue}
            updateMultas={fetchMulta}
          />
        )}
      </div>
    </div>
  )
}
 
export default Fines