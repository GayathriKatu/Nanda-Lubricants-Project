import React from 'react';

function PrimaryButton({ text, onClick }) {
  return (
    <div>
      <button className="bg-[#D4C5A9] text-black font-medium py-2 px-4 rounded-md hover:bg-[#b3a081] transition duration-300" onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default PrimaryButton;
