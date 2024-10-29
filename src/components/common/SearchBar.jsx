import React, { useEffect, useState } from 'react';

const SearchBar = ({ setSearchValue ,type }) => {
  const [searchText, setSearchText] = useState('');
  const timeout = 600; // Example timeout value, adjust as needed

  useEffect(() => {
    const handler = setTimeout(() => {
      // Add the function you want to run after the timeout here
      console.log('Searching for:', searchText);
      if(type === "findFriend"){

        setSearchValue(searchText)
      }
    }, timeout);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]); // Add searchText as a dependency

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className='w-full mb-2'>
      <input
        type="search"
        placeholder="Search"
        className="form-control w-100 py-1 px-2 text-sm w-full rounded-lg border border-gray-300 border-solid focus:border-primary focus:outline-none"
        value={searchText}
        onChange={handleSearchChange}
      />
    </div>
  );
};

export default SearchBar;