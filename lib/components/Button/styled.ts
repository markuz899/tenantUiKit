import styled, { css } from "styled-components";
import { StyledButtonProps } from "./interface";
/* eslint-disable */
export const KIND = {
  primary: css`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    &:hover {
      background: ${({ theme }) => theme.colors.primaryDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}60;
    }
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.success};
    &:hover {
      background: ${({ theme }) => theme.colors.successDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.success}60;
    }
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.error};
    &:hover {
      background: ${({ theme }) => theme.colors.errorDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error}60;
    }
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.warning};
    &:hover {
      background: ${({ theme }) => theme.colors.warningDark};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.warning}60;
    }
    svg {
      fill: ${({ theme }) => theme.colors.white};
    }
  `,
  "inverse-primary": css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}60;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.primary};
      svg {
        transition: all ${({ theme }) => theme.extra.transition};
        fill: ${({ theme }) => theme.colors.white};
      }
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.white};
      color: ${({ theme }) => theme.colors.greyIcon};
      border: 2px solid ${({ theme }) => theme.colors.greyIcon};
    }
    &:disabled {
      color: ${({ theme }) => theme.colors.dark};
    }
  `,
  "inverse-success": css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.success};
    svg {
      fill: ${({ theme }) => theme.colors.success};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.success}60;
    }
    &:hover {
      background: ${({ theme }) => theme.colors.success};
      svg {
        transition: all ${({ theme }) => theme.extra.transition};
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-warning": css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.warning};
    svg {
      fill: ${({ theme }) => theme.colors.warning};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.warning}60;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.dark};
      background: ${({ theme }) => theme.colors.warning};
      svg {
        transition: all ${({ theme }) => theme.extra.transition};
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  "inverse-error": css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.error};
    border: 2px solid ${({ theme }) => theme.colors.error};
    svg {
      fill: ${({ theme }) => theme.colors.error};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.error}60;
    }
    &:hover {
      color: ${({ theme }) => theme.colors.white};
      background: ${({ theme }) => theme.colors.error};
      svg {
        transition: all ${({ theme }) => theme.extra.transition};
        fill: ${({ theme }) => theme.colors.white};
      }
    }
  `,
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.dark};
    border: 2px solid ${({ theme }) => theme.colors.grey};
    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.darkGrey};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.grey}60;
    }
    svg {
      fill: ${({ theme }) => theme.colors.dark};
    }
  `,
  minimal: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
    }
    svg {
      fill: ${({ theme }) => theme.colors.primary};
    }
  `,
  "minimal-error": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.error};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${({ theme }) => theme.colors.errorDark};
    }
    svg {
      fill: ${({ theme }) => theme.colors.error};
    }
  `,
  "minimal-warning": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.warning};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${({ theme }) => theme.colors.warningDark};
    }
    svg {
      fill: ${({ theme }) => theme.colors.warning};
    }
  `,
  "minimal-success": css`
    background: transparent;
    color: ${({ theme }) => theme.colors.success};
    border: 0px;
    padding: 0;
    &:hover {
      color: ${({ theme }) => theme.colors.successDark};
    }
    svg {
      fill: ${({ theme }) => theme.colors.success};
    }
  `,
  action: css`
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.greyIcon};
    transition: ${({ theme }) => theme.extra.transition};
    svg {
      color: ${({ theme }) => theme.colors.primary};
    }
    &.clicked {
      transition: none;
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}60;
    }
    &:hover {
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  `,
};

/* eslint-disable */
export const StyledButton = styled.button<StyledButtonProps>`
  border: none;
  padding: 0;
  font-size: ${({ theme }) => theme.font.size.minor};
  font-weight: ${({ theme }) => theme.font.weight.medium};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-align: center;
  min-width: ${({ theme, size }) => theme.height[size]};
  min-height: ${({ theme, size }) => theme.height[size]};
  user-select: none;
  width: ${(props) => props.$fluid && "100%"};
  cursor: pointer;
  transition: all ${({ theme }) => theme.extra.transition};
  ${(props) => (props.reverse ? `flex-direction: row-reverse;` : null)};
  .iconAfter {
    width: ${({ theme }) => theme.spaces.space2};
    margin-left: ${({ theme }) => theme.spaces.space1};
  }
  .iconBefore {
    width: ${({ theme }) => theme.spaces.space2};
    margin-right: ${({ theme }) => theme.spaces.space1};
  }
  & > span {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: ${(props) =>
      props.reverse ? `0 0 0 1rem;` : `0 ${props.$round ? "0" : "1rem"} 0 0;`};
  }
  ${(props) =>
    props.$round
      ? `border-radius:50px;`
      : `
    border-radius: 8px;
    `};
  padding: 0 ${({ theme }) => theme.spaces.space4};
  &:disabled {
    background: ${({ theme }) => theme.colors.greyIcon};
    color: ${({ theme }) => theme.colors.dark};
    border: 1px solid ${({ theme }) => theme.colors.greyIcon};
    cursor: not-allowed;
    &:hover {
      background: ${({ theme }) => theme.colors.darkGrey};
    }
  }
  .loader {
    display: flex;
    svg {
      width: ${({ theme }) => theme.spaces.space8};
      display: inline-block;
    }
  }
  ${(props) => KIND[props.kind]}
`;

export const A = styled(StyledButton).attrs({
  as: "a",
})`
  &.btn {
    color: white;
    &:hover {
      color: white;
    }
  }
`;

export const availableKinds = Object.keys(KIND);
/* eslint-enable */
