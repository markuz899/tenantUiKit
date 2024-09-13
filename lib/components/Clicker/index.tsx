import { useState } from "react";
import styled from "styled-components";

const Clicker = ({ children, radius }: any) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  return (
    <ClickDom
      $radius={radius}
      className={isClicked ? "clicked" : ""}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </ClickDom>
  );
};

export default Clicker;

const ClickDom = styled.div<any>`
  &.clicked {
    border-radius: ${({ $radius, theme }) => ($radius ? theme.extra.radius : "none")};
    transition: none;
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}60;
  }
`;
