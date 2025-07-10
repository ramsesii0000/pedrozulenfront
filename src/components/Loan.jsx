import React, {useState, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import '../css/Loan.css'
import prestamoService from '../service/prestamoService';
import ModalPrestamoUpdate from './ModalPrestamoUpdate';
import deleteIcon from '../assets/icons/deleteIcon.png';
import updateIcon from '../assets/icons/updateIcon.png';
import verIcon from '../assets/icons/verMasIcon.png';
import multaIcon from '../assets/icons/multaIcon.png';
import detailsPretamoService from '../service/detailPrestamoService';
import ModalVerMasPrestamo from './ModalVerMasPrestamo';
import FilterLoans from './FilterLoans';
import Swal from 'sweetalert2'; 
import Documents from './Documents';
import ModalCreateMulta from './ModalCreateMulta';


const Loan = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVerMas, setIsModalOpenVerMas] = useState(false);
  const [selectedPrestamoId, setSelectedPrestamoId] = useState(null);
  const [selectedPrestamoDate, setSelectedPrestamoDate] = useState('');
  const [selectedReturnDate, setSelectedReturnDate] = useState('');
  const [selectedStatusPrestamo, setSelectedStatusPrestamo] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [details, setDetails] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isModalOpenCreateMulta, setIsModalOpenCreateMulta] = useState(false);

  useEffect(() => {
    fetchLoan();
  }, []);

  const resetGrid = () => {
    fetchLoan(); 
  };

  const fetchLoan = async () => {
    try {
      const token = localStorage.getItem('token');
      const data = await prestamoService.getAllLoans(token);
      const loansWithIds = data.map((prestamo, index) => ({
        ...prestamo,
        id: index + 1
      }));
      setPrestamos(loansWithIds);
      setFilteredRows(loansWithIds); 
    } catch (error) {
      console.error('Error al cargar los prestamos:', error);
    }
  };

  const handleOpenUpdateModal = (prestamoId, prestamoDate, returnDate, statusPrestamo) => {
    setSelectedPrestamoId(prestamoId);
    console.log(prestamoId);
    setSelectedPrestamoDate(prestamoDate);
    setSelectedReturnDate(returnDate);
    setSelectedStatusPrestamo(statusPrestamo);
    setIsModalOpen(true);
  };

  const initialValue = {
    idPrestamo: selectedPrestamoId,
    prestamoDate: selectedPrestamoDate,
    returnDate: selectedReturnDate,
    statusPrestamo: selectedStatusPrestamo,
  };

  const initialValueVerMas = {
    detallePrestamo: details,
  };

  const handleModalVerMas = async (prestamoId) => {
    try {
      const token = localStorage.getItem('token');
      const dataDetail = await detailsPretamoService.getDetails(prestamoId, token);
      setDetails(dataDetail);
      setIsModalOpenVerMas(true);
    } catch (error) {
      console.error('Error al cargar los detalles del préstamo:', error);
    }
  };

  const handleFilter = (startDate, endDate) => {
    setStartDate(startDate);
    setEndDate(endDate);
    filterByDate(startDate, endDate);
  };

  const filterByDate = (startDate, endDate) => {
    const filteredRows = prestamos.filter(row => {
      const prestamoDate = new Date(row.prestamoDate);
      return prestamoDate >= new Date(startDate) && prestamoDate <= new Date(endDate);
    });

    if (filteredRows.length === 0) {
      Swal.fire({
        icon: 'info',
        title: 'No hay préstamos',
        text: 'No se encontraron préstamos en el rango de fechas seleccionado.'
      });
    } else {
      setFilteredRows(filteredRows);
    }
  };

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    filterBySearch(searchTerm);
  };

  const filterBySearch = (searchTerm) => {
    const filteredRows = prestamos.filter(row => {
      return Object.values(row).some(value => {
        if (typeof value === 'object' && value !== null) {
          return Object.values(value).some(innerValue =>
            String(innerValue).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
    setFilteredRows(filteredRows);
  };

  const handleDeletePrestamo = async (prestamoId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar prestamo',
        cancelButtonText: 'Cancelar',
      });
     
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        await prestamoService.deletePrestamo(prestamoId, token);
        fetchLoan();
        Swal.fire('Eliminado', 'El Prestamo ha sido eliminada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar el prestamo:', error);
      Swal.fire('Error', 'Hubo un error al intentar eliminar el prestamo.', 'error');
    }
  };
  const handleModalCreateMulta = (prestamoId) => {
    setSelectedPrestamoId(prestamoId);
    setIsModalOpenCreateMulta(true);
  }

  const columns = [
    {
      field: 'user',
      headerName: 'Dni Usuario',
      width: 120,
      renderCell: (params) => (
        <span>{params.value.dniUser}</span>
      )
    },
    { field: 'prestamoDate', headerName: 'Fecha Prestamo', width: 150 },
    { field: 'returnDate', headerName: 'Fecha Retorno', width: 150 },
    { field: 'statusPrestamo', headerName: 'Estado', width: 150 },
    
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 350,
      renderCell: (params) => (
        <div>
          <button className="delete-button" onClick={() => handleDeletePrestamo(params.row.idPrestamo)}>
            <img className="img-delete-button" src={deleteIcon}/>
          </button>
          <button className="update-button" onClick={() => handleOpenUpdateModal(params.row.idPrestamo, params.row.prestamoDate, params.row.returnDate, params.row.statusPrestamo)}>
            <img className="img-delete-button" src={updateIcon}/>
          </button>
          <button className="verMas-button" onClick={() => handleModalVerMas(params.row.idPrestamo)}>
            <img className="img-delete-button" src={verIcon}/>
          </button>
          <button className="multa-button" onClick={() => handleModalCreateMulta(params.row.idPrestamo)}>
            <img className="img-delete-button" src={multaIcon}/>
          </button>
        </div>
      ),
    }
  ];

  return (
    <div className='loan-container'>
      <h1 className='title-loan'>Gestión de Prestamos</h1>
      <div className="table-container-loan">
        <div className='container-loans-actions'>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            className='input-buscar-libro'
            onChange={(e) => handleSearch(e.target.value)}
          />
          <FilterLoans onFilter={handleFilter} onResetGrid={resetGrid} />
        </div>
        <Documents filteredPrestamos={filteredRows} prestamos={prestamos} />
        {filteredRows.length > 0 && (
          <DataGrid 
            rows={filteredRows} 
            columns={columns} 
            pageSize={5} 
          />
          
        )}
        
        {isModalOpen && (
          <ModalPrestamoUpdate
            onCancel={() => setIsModalOpen(false)}
            initialValue={initialValue}
            updateLoans={fetchLoan}
          />
        )}

        {isModalOpenVerMas && (
          <ModalVerMasPrestamo
            onCancelVerMas={() => setIsModalOpenVerMas(false)}
            initialValueVerMas={initialValueVerMas}
          />
        )}
        {isModalOpenCreateMulta && (
          <ModalCreateMulta
            onCancelCreateMulta={() => setIsModalOpenCreateMulta(false)}
            initialValue={initialValue}
          />
        )}
      </div>
      
    </div>
    
  )
}

export default Loan;