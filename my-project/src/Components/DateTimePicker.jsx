import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerOnly({ selectedDate, handleChange }) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat="MMMM d, yyyy"
      className="'p-1 text-white opacity-30 bg-white bg-opacity-30 rounded-md border-white'"
    />
  );
}

export default DatePickerOnly;
