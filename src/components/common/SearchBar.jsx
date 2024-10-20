// import React from 'react';
// import SearchIcon from '@mui/icons-material/Search';
// import InputBase from '@mui/material/InputBase';
// import { styled, alpha } from '@mui/material/styles';

// const SearchBar = ({ marginClass = '' }) => {
//   const Search = styled('div')(({ theme }) => ({
//     position: 'relative',
//     borderRadius: theme.shape.borderRadius,
//     backgroundColor: alpha(theme.palette.common.white, 0.15),
//     width: '100%',
//     [theme.breakpoints.up('sm')]: {
//       marginLeft: theme.spacing(3),
//       width: 'auto',
//     },
//   }));

//   const SearchIconWrapper = styled('div')(({ theme }) => ({
//     padding: theme.spacing(0, 2),
//     height: '100%',
//     position: 'absolute',
//     pointerEvents: 'none',
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   }));

//   const StyledInputBase = styled(InputBase)(({ theme }) => ({
//     color: 'inherit',
//     '& .MuiInputBase-input': {
//       padding: theme.spacing(0.5, 0.5, 0.5, 0),
//       paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//       transition: theme.transitions.create('width'),
//       width: '100%',
//       [theme.breakpoints.up('md')]: {
//         width: '20ch',
//       },
//     },
//   }));

//   return (
//     <Search className={`bg-search h-8 mx-0 rounded-lg ${marginClass}`}>
//       <SearchIconWrapper>
//         <SearchIcon className="h-4 w-4" />
//       </SearchIconWrapper>
//       <StyledInputBase
//         className="w-full"
//         placeholder="Search…"
//         inputProps={{ 'aria-label': 'search' }}
//       />
//     </Search>
//   );
// };

// export default SearchBar;


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