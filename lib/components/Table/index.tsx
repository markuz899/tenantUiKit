import React, { Fragment } from "react";
import styled, { useTheme } from "styled-components";
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table";
import Icon from "../Icon";
import Checkbox from "../Checkbox";
import PaginationTable from "../PaginationTable";
import { TableProps } from "./interface";

const Table: React.FC<TableProps> = ({
  pageSize = 10,
  columns = [{ Header: "void" }],
  data = [],
  renderCard,
  cardMode = false,
  iSmallScreen = false,
  renderAction,
  showPagination = true,
  fullWidthCard = false,
  useSelection = false,
  disableSelectAll = false,
  extraData,
  onChangePage,
  disableSelectionOptions = {
    fieldName: "disabled",
    disabledValue: true,
  },
}: any) => {
  const theme = useTheme();

  const {
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    selectedFlatRows,
    state: { pageIndex, selectedRowIds },
  } = useTable<any>(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize } as any,
    },
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks: any) => {
      hooks.visibleColumns.push((cols: any) => {
        if (
          useSelection &&
          (typeof useSelection === "boolean" || useSelection === "checkbox")
        ) {
          return [
            {
              id: "selection",
              Header: (props: any) => {
                const { checked } = props.getToggleAllRowsSelectedProps();
                return (
                  !disableSelectAll && (
                    <Checkbox
                      onChange={(d: any) =>
                        props.toggleAllRowsSelected(d.value)
                      }
                      checked={checked}
                    />
                  )
                );
              },
              Cell: (props: any) => {
                const { original } = props.row;
                const disabled = original
                  ? original[disableSelectionOptions.fieldName] ===
                    disableSelectionOptions.disabledValue
                  : false;
                const checked = props.row.isSelected;
                return (
                  <Cell>
                    <Checkbox
                      onChange={(d: any) =>
                        props.row.toggleRowSelected(d.value)
                      }
                      checked={checked}
                      disabled={disabled}
                    />
                  </Cell>
                );
              },
            },
            ...cols,
          ];
        }
        if (useSelection === "radio") {
          return [
            {
              id: "selection",
              Cell: (props: any) => {
                const checked = props.row.isSelected;
                const { values } = props.row;

                const handleSelect = (d: any) => {
                  if (!props.row.isSelected) {
                    props.toggleAllRowsSelected(false);
                    props.row.toggleRowSelected(d);
                  }
                };

                return (
                  <Cell>
                    <Radio
                      onClick={() => handleSelect(values)}
                      $active={checked}
                    >
                      <div className="selector" />
                    </Radio>
                  </Cell>
                );
              },
            },
            ...cols,
          ];
        }
        return [...cols];
      });
    },
  ) as any;

  return (
    <>
      {cardMode && renderCard ? (
        <Grid $fullWidthCard={fullWidthCard}>
          {page.map((row: any) => {
            prepareRow(row);
            return renderCard({ ...row, extraData });
          })}
        </Grid>
      ) : (
        <StyledTable>
          <Thead>
            {headerGroups.map((headerGroup: any) => {
              return (
                // eslint-disable-next-line
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column: any) => {
                    return (
                      // eslint-disable-next-line
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps(),
                        )}
                      >
                        <div>
                          {column.render("Header")}
                          <span>
                            {column.isSorted && (
                              <Icon
                                size="10px"
                                name={
                                  column.isSortedDesc
                                    ? "angle-down"
                                    : "angle-top"
                                }
                              />
                            )}
                          </span>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </Thead>
          <tbody>
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <Fragment key={row.index}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell: any) => {
                      return (
                        // eslint-disable-next-line
                        <td {...cell.getCellProps()}>
                          {cell.render("Cell", extraData)}
                        </td>
                      );
                    })}
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </StyledTable>
      )}
      <Footer $isSmall={iSmallScreen}>
        <>
          {renderAction && (
            <div className="downloads">
              {renderAction({ extraData, selectedFlatRows, selectedRowIds })}
            </div>
          )}
        </>
        {showPagination && pageOptions.length > 0 && (
          <PaginationTable
            canPreviousPage={canPreviousPage}
            canNextPage={canNextPage}
            pageOptions={pageOptions}
            pageCount={pageCount}
            gotoPage={gotoPage}
            nextPage={nextPage}
            previousPage={previousPage}
            pageIndex={pageIndex}
            listCount={data.length}
            iSmallScreen={iSmallScreen}
            onChangePage={onChangePage}
          />
        )}
      </Footer>
    </>
  );
};

export default Table;

// Styles (puoi lasciare questi stili inalterati a meno che non vuoi anche tipizzarli)
const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-radius: ${({ theme }) => theme.extra.radius};
  overflow: hidden;
  tr {
    border: 1px solid ${({ theme }) => theme.colors.borderTable};
  }
  td {
    background: ${({ theme }) => theme.body};
    padding: 0;
  }
`;

const Thead = styled.thead`
  border: 1px solid ${({ theme }) => theme.colors.borderTable};
  font-size: ${({ theme }) => theme.font.size.minor};
  color: ${({ theme }) => theme.colors.grey};
  text-align: left;
  background: ${({ theme }) => theme.body};
  th {
    padding: 20px 10px;
    & > div {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      span {
        width: ${({ theme }) => theme.spaces.space2};
        height: ${({ theme }) => theme.spaces.space2};
      }
    }
    &:last-child {
      padding-right: ${({ theme }) => theme.spaces.space3};
    }
  }
`;

const Grid = styled.div<{ $fullWidthCard: boolean }>`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${(props) => (props.$fullWidthCard ? "100%" : "280px")}, 1fr)
  );
`;

const Footer = styled.div<{ $isSmall: boolean }>`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  flex-direction: ${(props) => (props.$isSmall ? "column-reverse" : "row")};
  align-items: ${(props) => (props.$isSmall ? "center" : "flex-end")};
  .downloads {
    display: flex;
    flex-direction: ${(props) => (props.$isSmall ? "column" : "row")};
    button {
      margin: ${(props) => (props.$isSmall ? "10px 0 0 0" : "0 10px 0 0")};
    }
  }
`;

const Cell = styled.div`
  padding: 15px 8px;
`;

const Radio = styled.div<{ $active: boolean }>`
  display: -webkit-inline-box;
  align-items: center;
  cursor: pointer;
  .selector {
    border: 1px solid ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    transition: all 0.3s ease;
    border: 1px solid
      ${({ $active, theme }) =>
        $active ? theme.colors.primary : theme.colors.greyIcon};
    &:hover {
      opacity: 0.8;
    }
    &:after {
      content: "";
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${({ $active, theme }) =>
        $active ? theme.colors.primary : "transparent"};
    }
  }
  span {
    margin: 0 ${({ theme }) => theme.spaces.space4} 0
      ${({ theme }) => theme.spaces.space3};
    display: inline-block;
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
`;
