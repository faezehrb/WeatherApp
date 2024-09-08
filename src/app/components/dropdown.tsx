import { useState } from 'react';

type City = {
  id: number;
  name: string;
};

type CustomDropdownProps = {
  cities: City[];
  handleChange: (event: { target: { value: string } }) => void;
};

export default function CustomDropdown({ cities, handleChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string>("Select a city");

  const handleSelect = (item: City) => {
    setSelectedCity(item.name); // Update the displayed text with the selected city's name
    handleChange({ target: { value: JSON.stringify(item) } });
    setIsOpen(false); 
  };

  return (
    <div className="relative w-full">
      <button
        className="w-full text-[#4b5563] bg-white rounded-md px-4 py-2 text-left shadow-sm flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCity}
        <svg
          className={`w-4 h-4 transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto focus:outline-none">
          {cities.map((item) => (
            <li
              key={item.id}
              className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(item)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}