import { useState, useEffect } from 'react';

const useRows = (rows) => {
  // state holding number of rows per page
  const [rowsPerPage, setRowsPerPage] = useState(rows);

  // // state holding boolean value for whether or not handle resize was called initially
  const [handleInitialResize, setHandleInitialResize] = useState(false);

  useEffect(() => {
    // listen for window resize, adjusting number of rows per page at 1200px
    const handleResize = () => {
      if (window.innerWidth < 1600) {
        setRowsPerPage(7);
      }
      if (window.innerWidth < 1500) {
        setRowsPerPage(4);
      }
      if (rowsPerPage !== 11 && window.innerWidth > 1600) {
        setRowsPerPage(11);
      }
    };

    window.addEventListener('resize', handleResize);

    // conditional, if initial resize has not occured upon load, handleResize and reassign initial resize to true
    if (!handleInitialResize) {
      handleResize();
      setHandleInitialResize(true);
    }
    // run clean up func to remove event and clear memory
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return { rowsPerPage };
};

export default useRows;
