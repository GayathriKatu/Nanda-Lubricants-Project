import React, { useState } from 'react';
import PrimaryButton from '../Components/PrimaryButton';
import DropDown from '../Components/DropDown'; // Import the DropDown component
import axios from 'axios';

function UpdateStock({ onClose }) {

  const [product,setProduct] = useState(
    {
      productId : "",
      productName : "",
      description : "",
      unitPrice : ""
    }
  )

  const handleinputs = (e) => {
    setProduct( pre => ({
      ...pre,[e.target.name]: e.target.value
    }));
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const res = await axios.post('http://localhost:8000/api/products/add' , product);
      console.log(res.data)
;    }catch(err){
     console.log(err.response.data);
}
  finally{onClose();}
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md w-96 border border-white overflow-y-auto"> 
      <h2 className="text-2xl font-semibold mb-4 text-white">Update Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="productId" className="block text-sm font-medium text-white">Product ID</label>
          <input type="text" id="productId" value={product.productId} name="productId" onChange={handleinputs} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-white">Product Name</label>
          <input type="text" id="productName" name="productName" onChange={handleinputs} value={product.productName} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex justify-between">
          <div className="w-1/2 mr-2">
            <label htmlFor="category" className="block text-sm font-medium text-white">Category</label>
            <DropDown
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="category"
              options={['Category 1', 'Category 2', 'Category 3']}
            />
          </div>
          <div className="w-1/2 ml-2">
            <label htmlFor="volume" className="block text-sm font-medium text-white">Volume</label>
            <DropDown
              className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              id="volume"
              options={['1L', '2L', '3L', '4L']}
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-white">Description</label>
          <textarea id="description" name="description" onChange={handleinputs} value={product.description} rows="4" className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="unitPrice" className="block text-sm font-medium text-white">Unit Price</label>
          <input type="text" id="unitPrice" name="unitPrice" onChange={handleinputs} value={product.unitPrice} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="mb-4">
          <label htmlFor="inStock" className="block text-sm font-medium text-white">In Stock</label>
          <input type="text" id="inStock" name="inStock" onChange={handleinputs} value={product.inStock} className="mt-1 p-2 w-full bg-white bg-opacity-20 border border-white rounded-md focus:ring-indigo-500 focus:border-indigo-500" />
        </div>
        <div className="flex justify-between">
          <PrimaryButton text="Add" onClick={handleSubmit}/>
          {/* <button onClick={handleSubmit}>Add</button> */}
          <PrimaryButton text="Cancel" onClick={onClose} />
        </div>
      </form>
    </div>
  );
}

export default UpdateStock;
