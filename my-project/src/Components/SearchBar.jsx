import React from 'react';
import magnifier from '../Images/magnifier.png';

function SearchBar() {
  return (
    <div className="p-2 rounded-lg bg-white flex items-center gap-2 h-11 bg-opacity-30" >
      <input
        className="outline-none text-black h-8 border-none mr-3 rounded-lg"
       
        type="text"
        placeholder="Search..."
        style={{ outline: 'none' }}
      
      />
      <img src={magnifier} alt="" className="w-6 h-6 hover:cursor-pointer" />
    </div>
  );
}

export default SearchBar;
