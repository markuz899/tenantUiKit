import React, { Children, useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styled, { useTheme } from "styled-components";
import { PopoverProps } from "./interface";

const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  flex = false,
  renderTarget,
  renderContent,
  portalId = "root-tooltip"
}) => {

  const theme = useTheme();

  const target = useRef<any>(null);
  const tip = useRef<HTMLDivElement>(null);
  const arrow = useRef<HTMLDivElement>(null);

  const [visible, setState] = useState(false);

  const toggleVisibility = (e: any) => {
    if (
      target.current &&
      !target.current.contains(e.target) &&
      tip?.current &&
      !tip?.current.contains(e.target)
    ) {
      setState(false);
    }
  };

  useEffect(() => {
    const calculatePosition = () => {
      if (tip.current && target.current) {
        const rect = target.current?.firstElementChild.getBoundingClientRect();
        const { innerWidth, scrollY } = window;
        const { width, height } = tip.current.getBoundingClientRect();
        const right = innerWidth - (rect.x + rect.width);

        const position = {
          top: `${rect.bottom + scrollY - rect.height * 3 - 10}px`,
          // bottom: `${window.screen.availHeight - rect.top - scrollY + 12}px`,
          left: `${rect.left + rect.width / 2 - width / 2}px`,
        };

        if (width / 2 > rect.x + rect.width / 2 && width > rect.width) {
          position.left = `${rect.left}px`;
          if (arrow.current)
            arrow.current.style.left = `${rect.width / 2 - 8}px`;
        }

        if (right < width / 2) {
          position.left = `${
            innerWidth - (innerWidth - rect.x) - width + rect.width
          }px`;
          if (arrow.current)
            arrow.current.style.left = `${width - rect.width / 2 - 8}px`;
        }

        if (rect.y < height) {
          if (arrow.current) {
            arrow.current.style.bottom = `${height - 8}px`;
            arrow.current.style.transform = "rotate(-135deg)";
          }
        }

        Object.assign(tip.current.style, position);
      }
    };

    calculatePosition();

    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", toggleVisibility);
    document.addEventListener("click", toggleVisibility);
    return () => {
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", toggleVisibility);
      document.removeEventListener("click", toggleVisibility);
    };
  });

  const show = () => {
    setState(true);
  };

  const close = () => {
    setState(false);
  };

  const toggle = () => {
    setState(!visible);
  };

  const renderTooltip = () => {
    const ROOT_NODE = document.getElementById(portalId);
    return ROOT_NODE
      ? createPortal(
          <Tip ref={tip}>
            {renderContent && renderContent({ close })}
            <Arrow ref={arrow} />
          </Tip>,
          ROOT_NODE
        )
      : null;
  };

  return (
    <>
      <Target $flex={flex} onClick={toggle} ref={target} className={className}>
        {children
          ? Children.toArray(children)
          : renderTarget && renderTarget({ visible })}
      </Target>
      {visible && renderTooltip()}
    </>
  );
};

// Popover.setRoot = (APP_NODE: HTMLElement, id: string) => {
//   ROOT_ID = id;
//   let node = document.getElementById(ROOT_ID);
//   if (!node) {
//     node = document.createElement("div");
//     node.setAttribute("id", ROOT_ID);
//     APP_NODE.insertAdjacentElement("afterend", node);
//   }
// };

export default Popover;

export const Target = styled.span<{ $flex: boolean }>`
  display: contents;
`;
export const Tip = styled.div`
  position: absolute;
  padding: 9px;
  left: -800px;
  font-size: 16px;
  max-height: 150px;
  max-width: 300px;
  box-sizing: border-box;
  text-align: center;
  background: ${({theme}) => theme.colors.white};
  color: ${({theme}) => theme.colors.black};
  box-shadow: 0px 1px 5px 1px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  z-index: 2200;
`;

const Arrow = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: -6px;
  left: calc(50% - 6px);
  width: 12px;
  height: 12px;
  transform: rotate(45deg);
  background: white;
  border-width: 1px;
  border-style: solid;
  border-color: transparent #dadada #dadada transparent;
`;
