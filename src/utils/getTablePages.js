export let getTablePages = totalRows => {
     let pagesFullyOccupiedByRows = totalRows / import.meta.env.VITE_PAGE_SIZE;
     let remaingRows = totalRows % import.meta.env.VITE_PAGE_SIZE;
     return Math.floor(pagesFullyOccupiedByRows) + (remaingRows > 0 ? 1 : 0);
};
