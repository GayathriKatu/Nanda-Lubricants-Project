// import React from 'react';



// function DropDown({ options, value, onChange }) {
//   return (
//     <div>
//       <select className = 'p-1 text-zinc-900 opacity-30 bg-gray-700 bg-opacity-30 rounded-md border-white' value={value} onChange={onChange}>
//         <option value="" >Select All</option>
//         {options.map((option) => (
//           <option key={option} value={option}>
//             {option}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }

// export default DropDown;


import React from 'react';

function DropDown({ id, options, value, onChange, className }) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default DropDown;
