// PaginationProps.ts
export interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  pageOptions: number[];
  pageCount: number;
  gotoPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  pageIndex: number;
  listCount: number;
  iSmallScreen?: boolean;
  onChangePage?: (pageIndex: number) => void;
}
