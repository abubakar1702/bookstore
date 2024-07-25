import { useState } from 'react';

const RangeSlider = ({ minValue, maxValue, onChange }) => {
  const handleMinChange = (event) => {
    const value = parseInt(event.target.value);
    onChange(value, maxValue); // Update parent state with new min value
  };

  const handleMaxChange = (event) => {
    const value = parseInt(event.target.value);
    onChange(minValue, value); // Update parent state with new max value
  };

  return (
    <div className="p-4">
      <div className="flex items-center">
        <label htmlFor="minRange" className="mr-2 text-gray-700">
          {minValue}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={handleMinChange}
          className="w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
          id="minRange"
        />
      </div>
      <div className="flex items-center mt-4">
        <label htmlFor="maxRange" className="mr-2 text-gray-700">
          {maxValue}
        </label>
        <input
          type="range"
          min="0"
          max="100"
          value={maxValue}
          onChange={handleMaxChange}
          className="w-full cursor-pointer appearance-none rounded-lg bg-gray-300"
          id="maxRange"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
