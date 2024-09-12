export interface DisableSelectionOptions {
  fieldName: string;
  disabledValue: boolean;
}

export interface TableProps {
  pageSize?: number;
  columns: Array<any>;
  data: Array<any>;
  renderCard?: (row: any) => JSX.Element;
  cardMode?: boolean;
  iSmallScreen?: boolean;
  renderAction?: (props: {
    extraData: any;
    selectedFlatRows: any[];
    selectedRowIds: Record<string, boolean>;
  }) => JSX.Element;
  showPagination?: boolean;
  fullWidthCard?: boolean;
  useSelection?: boolean | "checkbox" | "radio";
  disableSelectAll?: boolean;
  extraData?: any;
  onChangePage?: (pageIndex: number) => void;
  disableSelectionOptions?: DisableSelectionOptions;
}
