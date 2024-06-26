import React, { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton'; // Import the PrimaryButton component
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from './DeleteConfirmationModal'; // Import the DeleteConfirmationModal component

function ProductCard({ cardContent, index }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = async (stockId) => {
    try {
      await axios.delete(`http://localhost:8000/api/stock/delete/${stockId}`);
      // Optionally, update state or perform any other action after successful deletion
      // You may want to refetch the data after deletion to update the UI
      console.log('Deleted successfully');
      setIsModalOpen(false); // Close the modal after successful deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const openDeleteModal = (stockId) => {
    setDeleteId(stockId);
    setIsModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const navigate = useNavigate();

  const handleUpdateClick = () => {
    navigate('/updateinventory', { state: { cardContent } });
  };

  return (
    <div className="w-full bg-white bg-opacity-10 rounded-lg shadow-md overflow-hidden items-center px-5 mb-2" index={index}>
      <div key={index} className="flex flex-grow p-4 justify-between">
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">{cardContent.product}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Volume</p>
          <p className="text-white text-base mb-2">{cardContent.volume}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">In Stock</p>
          <p className="text-white text-base mb-2">{cardContent.stock}</p>
        </div>
        <div className="flex flex-col w-1/4 pr-4">
          <p className="text-white text-base font-bold mb-2">Unit Price (Rs.)</p>
          <p className="text-white text-base mb-2">{cardContent.price}</p>
        </div>
        <div className="flex items-center">
          <div className="mr-2">
            <PrimaryButton text="Update" onClick={handleUpdateClick} />
          </div>
          <div>
            <PrimaryButton text="Delete" onClick={() => openDeleteModal(cardContent.stockId)} />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <DeleteConfirmationModal
          onClose={closeDeleteModal}
          onConfirm={() => handleDelete(deleteId)}
        />
      )}
    </div>
  );
}

export default ProductCard;
