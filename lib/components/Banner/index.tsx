import React, { useState } from "react";
import styled, { css } from "styled-components";
import Icon from "../Icon";
import ReadMore from "../ReadMore";
import { BannerProps } from "./interface";

const availableKinds = ["error", "light-error", "warning", "success"] as const;

const Banner: React.FC<BannerProps> = ({
  content = "",
  kind = "success",
  active = true,
  children,
  className,
  closable = false,
  readMore = false,
  max = 100,
}) => {
  const safeContent = typeof content === "string" ? content : "";

  const inner = children
    ? React.Children.toArray(children)
        .filter((child) => typeof child === "string")
        .join("")
    : safeContent;

  let colorKind = kind;
  if (!availableKinds.includes(kind)) colorKind = "warning";
  const [visible, setVisible] = useState(active);

  const iconName = kind == "success" ? "check-circular" : "warning-circular";

  const handleClick = () => {
    setVisible(!visible);
  };

  if (visible) {
    return (
      <Msg className={className} $kind={colorKind} $active={visible}>
        <span>
          <Icon className="icon" name={iconName} size="18px"></Icon>
        </span>
        {readMore ? <ReadMore text={inner} max={max} /> : inner}
        {closable && (
          <span
            className="closebtn"
            tabIndex={0}
            role="button"
            onClick={handleClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }}
          >
            &times;
          </span>
        )}
      </Msg>
    );
  }
  return null;
};

export default Banner;

const COLORS = {
  error: css`
    background: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.error};

    .icon {
      fill: ${({ theme }) => theme.colors.error};
    }
  `,
  "light-error": css`
    background: ${({ theme }) => theme.colors.warningLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    .icon {
      fill: ${({ theme }) => theme.colors.warning};
    }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.primaryDark};

    .icon {
      fill: ${({ theme }) => theme.colors.error};
    }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    .icon {
      fill: ${({ theme }) => theme.colors.success};
    }
  `,
};

interface MsgProps {
  $kind: "error" | "light-error" | "warning" | "success";
  $active: boolean;
}

const Msg = styled.div<MsgProps>`
  ${(props) => COLORS[props.$kind]};
  max-width: 100%;
  height: auto;
  gap: 8px;
  display: flex;
  align-items: center;
  border-radius: ${({ theme }) => theme.extra.radiusNormal};
  padding: 4px ${({ theme }) => theme.spaces.space2};
  line-height: 16px;
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
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
