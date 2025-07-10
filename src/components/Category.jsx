import React, { useState, useEffect } from 'react';
import categoryService from '../service/categoryService';
import { DataGrid } from '@mui/x-data-grid';
import ModalCategory from './ModalCategory';
import '../css/Category.css'
import Swal from 'sweetalert2';
{/* import Documents from './Documents'; */ }

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState('');
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const categories = await categoryService.getAllCategory(token);
        const categoriesWithIds = categories.map((category, index) => ({
          ...category,
          id: index + 1 
        }));
        setCategories(categoriesWithIds);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
  
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setNewCategoryName(e.target.value);
  };

  const handleSaveCategory = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const categoryName = newCategoryName;
      await categoryService.createCategory(categoryName, token);
      const updatedCategories = await categoryService.getAllCategory(token);
      const categoriesWithIds = updatedCategories.map((category, index) => ({
        ...category,
        id: index + 1
      }));
      setCategories(categoriesWithIds);
      setNewCategoryName('');
    } catch (error) {
      console.error('Error al guardar la categoría:', error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const result = await Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar categoría',
        cancelButtonText: 'Cancelar',
      });
 
      if (result.isConfirmed) {
        const token = localStorage.getItem('token');
        await categoryService.deleteCategory(categoryId, token);
        setCategories(categories.filter(category => category.idCategory !== categoryId));
        Swal.fire('Eliminado', 'La categoría ha sido eliminada correctamente.', 'success');
      }
    } catch (error) {
      console.error('Error al eliminar la categoría:', error);
      Swal.fire('Error', 'Hubo un error al intentar eliminar la categoría.', 'error');
    }
  };

  const handleUpdateCategory = async (newName) => {
    try {
      const token = localStorage.getItem('token');
      await categoryService.updateCategory(selectedCategoryId, newName, token);
      const updatedCategories = await categoryService.getAllCategory(token);
      setCategories(updatedCategories);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error al actualizar la categoría:', error);
    }
  }; 

  const handleOpenUpdateModal = (categoryId, categoryName) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setIsModalOpen(true);
  };

  const columns = [
    { field: 'idCategory', headerName: 'ID', width: 100 },
    { field: 'nameCategory', headerName: 'Nombre de la categoría', width: 300 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 200,
      renderCell: (params) => (
        <div>
          <button className="delete-button" onClick={() => handleDeleteCategory(params.row.idCategory)}>Eliminar</button>
          <button className="update-button" onClick={() => handleOpenUpdateModal(params.row.idCategory, params.row.nameCategory)}>Actualizar</button>
        </div>
      ),
    },
  ];
  

  return (
    <div className="container-category">
      <h2 className="title-category">Gestión de Categorías</h2>
      <div className="input-container-category">
        <input
          className="input-category"
          type="text"
          value={newCategoryName}
          onChange={handleInputChange}
          placeholder="Ingrese el nombre de la categoría"
        />
        <button className="button-save" onClick={handleSaveCategory}>Guardar</button>
      </div>
      <div className="table-container-category">
      <DataGrid rows={categories} columns={columns} pageSize={5} getRowId={(row) => row.idCategory} />
        {isModalOpen && (
        <ModalCategory 
          onUpdate={handleUpdateCategory} 
          onCancel={() => setIsModalOpen(false)}
          initialValue={selectedCategoryName} 
        />
      )}
      </div>
      {/*<Documents categories={categories} />*/}
    </div>
  );  
};

export default Category;
