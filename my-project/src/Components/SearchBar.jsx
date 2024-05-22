import React, { useRef, useEffect } from 'react';
import magnifier from '../Images/magnifier.png';

function SearchBar({ value, onChange, suggestions, onSuggestionClick, onFocus, onBlur }) {
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        onBlur();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onBlur]);

  return (
    <div ref={inputRef} className="relative p-2 rounded-lg bg-white flex items-center gap-2 h-11 bg-opacity-30">
      <input
        className="outline-none text-black h-8 border-none mr-3 rounded-lg flex-grow"
        type="text"
        placeholder="Search..."
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        style={{ outline: 'none' }}
      />
      <img src={magnifier} alt="" className="w-6 h-6 hover:cursor-pointer" />
      {suggestions.length > 0 && (
        <ul className="absolute top-12 left-0 z-10 w-full bg-gray-800 border border-gray-300 rounded-md shadow-sm max-h-40 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white"
              onClick={() => onSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
