
function ProductComponent({ cardContent, index }) {


  return (
    <div className="bg-white bg-opacity-10 border rounded-md p-4 shadow-md w-full flex flex-col" index={index}>
      <h3 className="text-lg font-semibold mb-2">{cardContent.productName}</h3>
      <p className="text-sm text-white mb-2">Product ID:{cardContent.productId}</p>
      <p className="text-sm text-white mb-2">Description: {cardContent.productDes}</p>
      <h4 className="text-md text-white font-semibold mb-2">Unit Prices: </h4>
      {/* <ul className="text-sm text-white mb-2">
              {Object.entries(product.unitPrices).map(([volume, price]) => (
                <li key={volume}>{volume}: ${price}</li>
                const navigate=useNavigate();
                navigate("/fsdffs")
              ))}
            </ul> */}
    </div>
  );
}

export default ProductComponent;
