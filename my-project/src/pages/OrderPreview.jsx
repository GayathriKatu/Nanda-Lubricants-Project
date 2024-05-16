import React from 'react';
import PreviewComponent from '../Components/PreviewComponent';

const OrderPreview = () => {
  const tableRows = [
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560',subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560',subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560',subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560',subtotal: '828000' },
    { productid: 'P-123456', productname: "REVTRON GOLD ULTRA", volume: '5 L', quantity: '50', unitprice: '16560',subtotal: '828000' },



  ];

  return (
    <PreviewComponent tableRows={tableRows} />
  );
};

export default OrderPreview;