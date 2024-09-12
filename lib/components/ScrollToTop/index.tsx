import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components";
import Icon from "../Icon";

const ScrollToTop: React.FC = () => {

  const theme = useTheme();

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <Scroll $isVisible={isVisible} onClick={scrollToTop}>
        <div>
          <Icon
            name="angle-top"
            color={theme.colors.white}
            size={theme.spaces.space4}
          />
        </div>
      </Scroll>
    )
  );
};

export default ScrollToTop;

interface ScrollProps {
  $isVisible: boolean;
}

const Scroll = styled.div<ScrollProps>`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fadeOut {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  opacity: 0;
  width: 50px;
  height: 50px;
  border-radius: ${({theme}) => theme.spaces.space1};
  background: ${({theme}) => theme.colors.primaryDark};
  position: fixed;
  bottom: ${({theme}) => theme.spaces.space6};
  right: ${({theme}) => theme.spaces.space6};
  animation: ${(p) => (p.$isVisible ? "fadeIn" : "fadeOut")} 700ms ease-in 0.5s
    both;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 700;
  &:hover {
    opacity: 0.5 !important;
  }
`;
