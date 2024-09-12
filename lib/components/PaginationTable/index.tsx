// Pagination.tsx
import React, { useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Icon from "../Icon";
import { PaginationProps } from "./interface";

const Pagination: React.FC<PaginationProps> = ({
  canPreviousPage,
  canNextPage,
  pageOptions,
  pageCount,
  gotoPage,
  nextPage,
  previousPage,
  pageIndex,
  listCount,
  iSmallScreen = false,
  onChangePage,
}) => {

  const theme = useTheme();

  const limit = iSmallScreen ? 5 : 9;

  const shortPages: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    shortPages.push(i);
  }

  useEffect(() => {
    if (onChangePage) onChangePage(pageIndex);
  }, [pageIndex, onChangePage]);

  return (
    <PaginationStyle isSmall={iSmallScreen}>
      <div className="pages">
        {pageCount < limit ? (
          shortPages.map((page) => (
            <Page
              key={page}
              type="button"
              onClick={() => gotoPage(page)}
              active={pageIndex === page}
            >
              {page + 1}
            </Page>
          ))
        ) : (
          <>
            <Page
              type="button"
              hidden={pageIndex < 2 || !canPreviousPage}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <Icon color={theme.colors.primary} name="angle-left" />
            </Page>
            <Page
              type="button"
              hidden={pageIndex < 2 || !canPreviousPage}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              active={pageIndex === 0}
            >
              1
            </Page>
            <Dots
              type="button"
              hidden={pageIndex < 2 || !canPreviousPage}
              disabled={!canPreviousPage}
            >
              ...
            </Dots>
            <Page
              type="button"
              hidden={iSmallScreen || !canPreviousPage}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {pageIndex}
            </Page>
            <Page type="button" active>
              {pageIndex + 1}
            </Page>
            <Page
              type="button"
              hidden={iSmallScreen || !canNextPage}
              onClick={nextPage}
              disabled={!canNextPage}
            >
              {pageIndex + 2}
            </Page>
            <Dots
              type="button"
              hidden={pageIndex > pageCount - 2 || !canNextPage}
              disabled={!canPreviousPage}
            >
              ...
            </Dots>
            <Page
              type="button"
              hidden={pageIndex > pageCount - 2 || !canNextPage}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              active={pageIndex === pageCount - 1}
            >
              {pageCount}
            </Page>
            <Page
              type="button"
              hidden={pageIndex > pageCount - 2 || !canNextPage}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <Icon color={theme.colors.primary} name="angle-right" />
            </Page>
          </>
        )}
      </div>
      <Count>
        <strong>
          {pageIndex + 1} - {pageOptions.length} su <span>{listCount}</span>
        </strong>
      </Count>
    </PaginationStyle>
  );
};

export default Pagination;

const PaginationStyle = styled.div<{ isSmall: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: ${(props) => (props.isSmall ? "column" : "row")};
  position: relative;
  .pages {
    display: flex;
    align-items: center;
  }
`;

const Page = styled.button<{ active?: boolean }>`
  margin: 4px;
  height: 32px;
  min-width: 32px;
  background: ${({active, theme}) =>
    active ? theme.colors.primary : theme.colors.white};
  color: ${({active, theme}) =>
    active ? theme.colors.white : theme.colors.primary};
  border: 1px solid ${({theme}) => theme.colors.greyIcon};
  align-items: center;
  border-radius: 3px;
  cursor: pointer;
`;

const Dots = styled(Page)`
  border: 0;
  margin: 0;
  padding: 0;
  min-width: 30px;
  background: transparent;
`;

const Count = styled.span`
  align-items: center;
  color: ${({theme}) => theme.colors.grey};
  font-size: ${({theme}) => theme.font.size.mini};
  font-weight: ${({theme}) => theme.font.weight.medium};
  margin: 4px;
`;
