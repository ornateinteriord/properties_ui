import { useEffect, useState } from 'react';

const usePagination = <T,>(data: T[], itemsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);
  

  useEffect(() => {
    window.scrollTo({top:0,behavior:'smooth'});
  }, [currentPage]);

  // Get the subset of data for the current page
  const getCurrentData = (): T[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    currentPage,
    totalPages,
    getCurrentData,
    handlePageChange,
  };

};

export default usePagination;