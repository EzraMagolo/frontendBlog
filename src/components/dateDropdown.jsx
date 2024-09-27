import React from 'react';

const DateDropdown = ({ selectedDate, onDateChange }) => {
  return (
    <div>
      <select
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        className="block bg-gray-300 text-gray-700 py-2 px-2 rounded-lg focus:outline-none md:py-3"
      >
        <option value="">All Dates</option>
        <option value="today">Today</option>
        <option value="lastWeek">Last 7 Days</option>
        <option value="lastMonth">Last Month</option>
      </select>
    </div>
  );
};

export default DateDropdown;
