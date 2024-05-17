import React from 'react';



function DropDown({ options, value, onChange }) {
  return (
    <div>
      <select className = 'p-1 text-zinc-900 opacity-30 bg-gray-700 bg-opacity-30 rounded-md border-white' value={value} onChange={onChange}>
        <option value="" >Select All</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DropDown;
