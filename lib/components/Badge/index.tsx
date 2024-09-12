import React from "react";
import styled, { css, useTheme } from "styled-components";
import Icon from "../Icon";
import { BadgeProps } from "./interface";
import { colorBasedOnBg } from "../../utils/utils";
import { BASE_COLOR } from "../../../theme";

const COLOR_ICON = (theme: any) => ({
  ghost: theme.colors.primary,
  info: theme.colors.white,
  success: theme.colors.white,
  error: theme.colors.white,
  warning: theme.colors.white,
});

const Badge: React.FC<BadgeProps> = ({
  label,
  children,
  onClick,
  className,
  iconClose = true,
  kind = "ghost",
}) => {
  const theme = useTheme();

  const handleClick = () => {
    if (onClick && (label || children)) {
      onClick(label || children);
    }
  };

  return (
    <StyledBadge className={className} $kind={kind}>
      <div className="text">{label || children}</div>
      {iconClose && (
        <div
          className="icon"
          onClick={handleClick}
          tabIndex={0}
          role="button"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleClick();
            }
          }}
        >
          <Icon
            name="close"
            color={COLOR_ICON(theme)[kind]}
            margin="0 0 0 25px"
            size={theme.spaces.space3}
          />
        </div>
      )}
    </StyledBadge>
  );
};

export default Badge;

const COLORS = {
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    border: 2px solid ${({ theme }) => theme.colors.warningDark};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.success};
    border: 2px solid ${({ theme }) => theme.colors.successDark};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.error};
    border: 2px solid ${({ theme }) => theme.colors.errorDark};
    .text {
      color: ${({ theme }) => theme.colors.white}!important;
    }
  `,
  info: css`
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primaryDark};
    .text {
      color: ${({ theme }) => theme.colors.white}!important;
    }
  `,
  ghost: css`
    background: ${({ theme }) => theme.colors.white};
    border: 2px solid ${({ theme }) => theme.colors.greyIcon};
    .text {
      color: ${({ theme }) => theme.colors.dark}!important;
    }
  `,
};

interface Props {
  $kind: "warning" | "success" | "error" | "info" | "ghost";
}

const StyledBadge = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spaces.space2}
    ${({ theme }) => theme.spaces.space4};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spaces.space2};
  ${(props) => COLORS[props.$kind]};
  .text {
    color: ${({ $kind, theme }) =>
      colorBasedOnBg(BASE_COLOR[$kind] || theme.colors.white)};
    font-size: ${({ theme }) => theme.font.size.minor};
  }
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    white-space: nowrap;
    flex: 1 0 35%;
    padding: 8px;
    margin-bottom: ${({ theme }) => theme.spaces.space1};
    .text {
      font-size: ${({ theme }) => theme.font.size.small};
    }
  }
`;
