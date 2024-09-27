import React from 'react';

const Dropdown = ({ options, selectedOption, onOptionChange }) => {
  return (
    <div>
      <select
        value={selectedOption}
        onChange={(e) => onOptionChange(e.target.value)}
        className="block bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3"
      >
        <option value="">All Tags</option> {/* Default option for showing all blogs */}
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;


