import styled, { css } from "styled-components";
import { StyledButtonProps } from "./interface";

export const KIND = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      color: ${({ theme }) => theme.colors.white};
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-primary": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 3px solid ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.disabled};
      border: 3px solid ${({ theme }) => theme.colors.disabled};
      svg {
        fill: ${({ theme }) => theme.colors.disabled};
      }
    }
  `,
  "primary-link": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.disabled};
      svg {
        fill: ${({ theme }) => theme.colors.disabled};
      }
    }
  `,
  white: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.whiteSmoke};
      color: ${({ theme }) => theme.colors.disabled};
      svg {
        fill: ${({ theme }) => theme.colors.disabled};
      }
    }
  `,
  "inverse-white": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    border: 3px solid ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.whiteSmoke};
      border: 3px solid ${({ theme }) => theme.colors.whiteSmoke};
      svg {
        fill: ${({ theme }) => theme.colors.whiteSmoke};
      }
    }
  `,
  "white-link": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.whiteSmoke};
      svg {
        fill: ${({ theme }) => theme.colors.whiteSmoke};
      }
    }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      color: ${({ theme }) => theme.colors.white};
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-success": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.success};
    border: 3px solid ${({ theme }) => theme.colors.success};
    svg {
      fill: ${({ theme }) => theme.colors.success};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.whiteSmoke};
      border: 3px solid ${({ theme }) => theme.colors.whiteSmoke};
      svg {
        fill: ${({ theme }) => theme.colors.whiteSmoke};
      }
    }
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      color: ${({ theme }) => theme.colors.white};
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-error": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.error};
    border: 3px solid ${({ theme }) => theme.colors.error};
    svg {
      fill: ${({ theme }) => theme.colors.error};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.whiteSmoke};
      border: 3px solid ${({ theme }) => theme.colors.whiteSmoke};
      svg {
        fill: ${({ theme }) => theme.colors.whiteSmoke};
      }
    }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.white};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      color: ${({ theme }) => theme.colors.white};
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-warning": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.warning};
    border: 3px solid ${({ theme }) => theme.colors.warning};
    svg {
      fill: ${({ theme }) => theme.colors.warning};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.whiteSmoke};
      border: 3px solid ${({ theme }) => theme.colors.whiteSmoke};
      svg {
        fill: ${({ theme }) => theme.colors.whiteSmoke};
      }
    }
  `,
  action: css`
    background: ${({ theme }) => theme.colors.primaryLight};
    color: ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: ${({ theme }) => theme.colors.disabled};
      color: ${({ theme }) => theme.colors.white};
      svg {
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
};

/* eslint-disable */
export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0 ${({ icon }) => (icon ? "0" : "24px")};
  font-size: ${({ theme }) => theme.font.size.normal};
  text-transform: uppercase;
  display: flex;
  justify-content: ${({ icon }) => (icon ? "center" : "space-between")};
  letter-spacing: 0.25px;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
  text-align: center;
  min-width: ${({ theme, size }) => theme.height[size]};
  min-height: ${({ theme, size }) => theme.height[size]};
  user-select: none;
  width: ${(props) => props.$fluid && "100%"};
  cursor: pointer;
  transition: all ${({ theme }) => theme.extra.transition};
  border-radius: ${({ theme, $round }: any) =>
    $round ? theme.extra.radiusRoundXL : theme.extra.radius};
  ${(props) => KIND[props.kind]}
  span {
    display: flex;
  }
`;

export const A = styled(StyledButton)`
  border: none;
  display: inline-flex;
  border-radius: none;
  justify-content: ${({ $iconLeft, $iconRight }) =>
    $iconLeft || $iconRight ? "space-between" : "center"};
  padding: 8px 4px;
`;

export const availableKinds = Object.keys(KIND);

export const EmptyIcon = styled.div`
  height: 24px;
  width: 24px;
`;
