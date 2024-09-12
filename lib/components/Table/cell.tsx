import styled from "styled-components";
import { ITheme } from "../../../theme/interface";

interface CellProps {
  theme: ITheme;
}

export const Cell = styled.div<CellProps>`
  padding: 15px 8px;
  width: 100%;
  display: inline-block;
  font-size: ${({ theme }) => theme.font.size.minor};
`;
