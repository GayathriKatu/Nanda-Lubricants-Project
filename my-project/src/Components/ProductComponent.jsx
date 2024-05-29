import React from "react";

function ProductComponent({ cardContent, index }) {
  const volumeOrder = ["1 L", "5 L", "20 L", "210 L"];

  return (
    <div className="bg-white bg-opacity-10 border rounded-md p-4 shadow-md w-full flex flex-col" index={index}>
      <h3 className="text-2xl font-semibold mb-2">{cardContent.productName}</h3> {/* Increased font size */}
      <p className="text-sm text-white mb-2">Product ID : {cardContent.productId}</p>
      <p className="text-sm text-white mb-2">Category : {cardContent.category}</p> {/* Bold category */}
      <p className="text-sm text-white mb-2 text-justify">{cardContent.productDes}</p> {/* Justified description */}
      <h4 className="text-md text-white font-semibold mb-2">Unit Prices</h4>
      <ul className="text-sm text-white mb-2">
        {volumeOrder.map(volume => (
          cardContent.unitPrices[volume] !== undefined && (
            <li key={volume} className="tabular-nums">{volume} : <span className="ml-6">${cardContent.unitPrices[volume]}</span></li> 
          )
        ))}
      </ul>
    </div>
  );
}

export default ProductComponent;
