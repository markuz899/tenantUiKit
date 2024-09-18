import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import Button from "../Button";
import Icon from "../Icon";
import { BannerComposeProps } from "./interface";

const availableKinds = ["error", "light-error", "warning", "success"] as const;

const COLORS = {
  error: css`
    background: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.error};

    .icon {
      svg {
        fill: ${({ theme }) => theme.colors.error};
      }
    }
  `,
  "light-error": css`
    background: ${({ theme }) => theme.colors.warningLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    .icon {
      svg {
        fill: ${({ theme }) => theme.colors.warning};
      }
    }
  `,
  warning: css`
    background: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.primaryDark};

    .icon {
      svg {
        fill: ${({ theme }) => theme.colors.error};
      }
    }
  `,
  success: css`
    background: ${({ theme }) => theme.colors.successLight};
    color: ${({ theme }) => theme.colors.primaryDark};
    .icon {
      svg {
        fill: ${({ theme }) => theme.colors.success};
      }
    }
  `,
};

const BannerCompose: React.FC<BannerComposeProps> = ({
  kind = "success",
  title = "",
  active = false,
  children,
  className,
}) => {
  // const theme = useTheme();

  const messageBox = useRef<HTMLDivElement>(null);

  let colorKind = kind;
  if (!availableKinds.includes(kind)) colorKind = "warning";
  const [visible, setVisible] = useState(active);
  const [height, setHeight] = useState<string | number>("0px");

  const iconName = kind == "success" ? "check-circular" : "warning-circular";

  useEffect(() => {
    if (visible && messageBox.current) {
      setHeight(messageBox.current.scrollHeight);
    }
  }, [visible]);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <Msg className={className} $kind={colorKind} $active={visible}>
      <div className="box-section">
        <div className="title-section">
          <span className="icon">
            <Icon name={iconName} size="18px"></Icon>
          </span>
          <p className="title">{title}</p>
        </div>

        <Button
          onClick={handleClick}
          kind="primary"
          iconSize="24px"
          size="ss"
          link
          iconRight={visible ? "arrow-top" : "arrow-down"}
        >
          {visible ? "mostra meno" : "mostra di più"}
        </Button>
      </div>

      <div
        style={visible ? { height } : { height: 0 }}
        className="children"
        ref={messageBox}
      >
        <p>{children}</p>
      </div>
    </Msg>
  );
};

export default BannerCompose;

interface MsgProps {
  $kind: "error" | "light-error" | "warning" | "success";
  $active: boolean;
}

const Msg = styled.div<MsgProps>`
  ${(props) => COLORS[props.$kind]};
  max-width: 100%;
  gap: 8px;
  height: auto;
  display: block;
  border-radius: ${({ theme }) => theme.extra.radiusNormal};
  padding: 4px ${({ theme }) => theme.spaces.space2};
  .box-section {
    font-size: ${({ theme }) => theme.font.size.minor};
    font-weight: ${({ theme }) => theme.font.weight.bold};
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: space-between;
    .title-section {
      display: flex;
      gap: 8px;
      align-items: center;
      .title {
        width: 100%;
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.font.size.tiny};
      }
    }
  }
  button {
    margin: 0;
    svg {
      width: 18px;
      height: 12px;
    }
  }
  .children {
    height: 0;
    overflow: hidden;
    padding-left: 26px;
    gap: 10px;
    transition: height 0.5s;
  }
  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .box-section {
      gap: 0;
      flex-wrap: wrap;
    }

    button {
      order: 1;
      margin-left: auto;
      margin-right: 0;
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }

    .title-section {
      order: 0;
      width: 100%;
    }
  }
`;
