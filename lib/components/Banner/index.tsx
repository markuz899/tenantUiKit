import React, { useState, Children } from "react";
import styled, { css, useTheme } from "styled-components";
import { BannerProps } from "./interface";
import { colorBasedOnBg } from "../../utils/utils";
import { BASE_COLOR } from "../../../theme";

const availableKinds = ["warning", "success", "error", "info"] as const;

const Banner: React.FC<BannerProps> = ({
  title = "Banner info",
  content = "",
  kind = "success",
  active = true,
  children,
  className,
}) => {
  const theme = useTheme();

  const inner = children ? Children.toArray(children) : content;
  let colorKind = kind;
  if (!availableKinds.includes(kind)) colorKind = "info";
  const [visible, setVisible] = useState(active);

  const handleClick = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <Msg className={className} $kind={colorKind} $active={visible}>
        <p className="title">
          {title}
          <span
            className="closebtn"
            tabIndex={-1}
            role="button"
            onClick={handleClick}
            onKeyPress={handleClick}
          >
            &times;
          </span>
        </p>
        <p className="content">{inner}</p>
      </Msg>
    );
  }
  return null;
};

export default Banner;

const COLORS = {
  warning: css`
    background: ${({ theme }) => theme.colors.warningDark};
    border: 2px solid ${({ theme }) => theme.colors.warning};
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successDark};
    border: 2px solid ${({ theme }) => theme.colors.success};
  `,
  error: css`
    background: ${({ theme }) => theme.colors.errorDark};
    border: 2px solid ${({ theme }) => theme.colors.error};
    .title {
      color: ${({ theme }) => theme.colors.white}!important;
    }
  `,
  info: css`
    background: ${({ theme }) => theme.colors.primaryDark};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    .title {
      color: ${({ theme }) => theme.colors.white}!important;
    }
  `,
};

interface MsgProps {
  $kind: "warning" | "success" | "error" | "info";
  $active: boolean;
}

const Msg = styled.div<MsgProps>`
  ${(props) => COLORS[props.$kind]};
  max-width: 100%;
  height: auto;
  display: block;
  align-items: center;
  border-radius: 3px;
  padding: ${({ theme }) => theme.spaces.space2};
  margin-top: ${({ theme }) => theme.spaces.space2};
  margin-bottom: ${({ theme }) => theme.spaces.space2};
  .title {
    color: ${({ $kind, theme }) =>
      colorBasedOnBg(BASE_COLOR[$kind] || theme.colors.white)};
    font-size: ${({ theme }) => theme.font.size.minor};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    text-align: left;
    .closebtn {
      margin-top: -3px;
      font-size: 26px;
      font-weight: ${({ theme }) => theme.font.weight.regular};
      line-height: 16px;
      float: right;
      transition: 0.3s;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
  .content {
    color: ${({ $kind, theme }) =>
      colorBasedOnBg(BASE_COLOR[$kind] || theme.colors.white)};
    font-size: ${({ theme }) => theme.font.size.tiny};
    font-family: Helvetica;
    line-height: 1.2;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .title {
      font-size: ${({ theme }) => theme.font.size.small};
    }
  }
`;
