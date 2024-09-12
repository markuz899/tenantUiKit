import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import useBreakpoints from "../../hooks/useBreakpoints";
import useResize from "../../hooks/useResize";

// Definizione delle props
interface Option {
  id: string | number;
  src: string;
  title?: string;
  description?: string;
  [key: string]: any;
}

interface SlideshowProps {
  enableTransition?: boolean;
  width?: number;
  height?: number;
  duration?: number;
  close?: () => void;
  onClose?: (closed: boolean) => void;
  options: Option[];
  clickInside?: boolean;
  withDot?: boolean;
}

const Slideshow: React.FC<SlideshowProps> = ({
  enableTransition = false,
  width = 800,
  height = 320,
  duration = 7000,
  close,
  onClose = () => {},
  options = [],
  clickInside,
  withDot = false,
}) => {
  const theme = useTheme();

  const { isSmall } = useBreakpoints();
  const container = useRef<HTMLDivElement | null>(null);
  const size: any = useResize();
  const [selected, setSelected] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (options && enableTransition) {
      interval = setInterval(() => {
        const i = (selected + 1) % options.length;
        setSelected(i);
      }, duration);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [selected, options]);

  const shiftSlide = (e: React.MouseEvent | React.TouchEvent, i: number) => {
    setSelected(i);
  };

  const handleJump = () => {
    if (close) close();
    onClose(true);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setTouchStart(e.clientX);
  };

  const handleMouseUp = (e: any) => {
    if (isSmall) {
      setTouchEnd(e.clientX);
      if (clickInside && touchStart === e.clientX) {
        const clickPosition = e.pageX;
        const total = e.currentTarget.scrollWidth;
        const half = total / 2;
        const domRec = e.target.getBoundingClientRect();
        const condition = clickPosition - domRec.x;
        if (condition >= parseInt(half.toString())) {
          if (options.length - 1 !== selected) {
            shiftSlide(e, selected + 1);
          }
        } else {
          if (selected !== 0) {
            shiftSlide(e, selected - 1);
          }
        }
      }
      if (touchStart > e.clientX) {
        if (options.length - 1 !== selected) {
          shiftSlide(e, selected + 1);
        }
      }
      if (touchStart < e.clientX) {
        if (selected !== 0) {
          shiftSlide(e, selected - 1);
        }
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const { changedTouches } = e;
    setTouchStart(changedTouches[0].clientX);
  };

  const handleTouchEnd = (e: any) => {
    const { changedTouches } = e;
    setTouchEnd(changedTouches[0].clientX);
    if (clickInside && touchStart === changedTouches[0].clientX) {
      const clickPosition = changedTouches[0].clientX;
      const total = e.currentTarget.scrollWidth;
      const half = total / 2;
      const domRec = e.target.getBoundingClientRect();
      const condition = clickPosition - domRec.x;
      if (condition >= parseInt(half.toString())) {
        if (options.length - 1 !== selected) {
          shiftSlide(e, selected + 1);
        }
      } else {
        if (selected !== 0) {
          shiftSlide(e, selected - 1);
        }
      }
    }
    if (touchStart > changedTouches[0].clientX) {
      if (options.length - 1 !== selected) {
        shiftSlide(e, selected + 1);
      }
    } else if (touchStart < changedTouches[0].clientX) {
      if (selected !== 0) {
        shiftSlide(e, selected - 1);
      }
    }
  };

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Slides ref={container} width={width} height={height}>
        {options &&
          options.map((el, i) => (
            <React.Fragment key={el.id}>
              <Slide
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                src={el.src}
                left={size.width * i - size.width * selected || 0}
              />
              <Content>
                <div className="title">
                  <h2>{options && options[selected]?.title}</h2>
                </div>
                <div className="description">
                  <p>{options && options[selected]?.description}</p>
                </div>
              </Content>
              {withDot && (
                <ContainerDot>
                  <Container className="slideshow-dot">
                    <Dots>
                      <div className="rect">
                        <div className="dots">
                          {options &&
                            options.map((el, i) => (
                              <Dot
                                key={el.id}
                                onClick={(e) => shiftSlide(e, i)}
                                $active={i === selected}
                              >
                                <p>{`0${i + 1}`}</p>
                              </Dot>
                            ))}
                        </div>
                      </div>
                    </Dots>
                  </Container>
                </ContainerDot>
              )}
            </React.Fragment>
          ))}
      </Slides>
    </Box>
  );
};

export default Slideshow;

// Styled Components
const Box = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 800px;
  height: 100%;
  background: ${({ theme }) => theme.colors.black};
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    min-width: 100%;
    width: 100%;
  }
`;

const Slides = styled.div<{ width?: number; height?: number }>`
  width: ${(props) => (props.width ? `${props.width}px` : "100%")};
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 500px;
  height: ${(props) =>
    props.height ? `${props.height}px` : "calc(100vh - 70px)"};
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    width: 100%;
    height: 600px;
  }
`;

const ContainerDot = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 50px;
  max-width: 500px;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    padding-left: 0;
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  padding: ${({ theme }) => theme.spaces.space4};
  text-align: left;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  .title {
    display: flex;
    h2 {
      color: ${({ theme }) => theme.colors.white};
      font-size: ${({ theme }) => theme.font.size.big};
      line-height: 1;
    }
  }
  .description {
    margin-top: ${({ theme }) => theme.spaces.space3};
    p {
      margin: ${({ theme }) => theme.spaces.space1};
      font-size: ${({ theme }) => theme.font.size.large};
      color: ${({ theme }) => theme.colors.white};
    }
  }
`;

const Slide = styled.div.attrs(({ left }: any) => ({ style: { left } }))<{
  src: string;
  left: any;
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  flex-shrink: 0;
  transition: all 0.7s cubic-bezier(0.86, 0, 0.07, 1);
  background: linear-gradient(
      ${({ theme }) => theme.colors.primary}60,
      ${({ theme }) => theme.colors.primary}60
    ),
    url(${(props) => props.src});
  background-position: center;
  background-size: cover;
`;

const Container = styled.div`
  width: 100%;
  bottom: ${({ theme }) => theme.spaces.space2};
  & > div {
    margin: auto;
    max-width: ${({ theme }) => theme.container};
    padding: 10px 0px;
  }
  &.slideshow-dot {
    position: absolute;
    left: 20px;
    bottom: 20px;
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    &.slideshow-dot {
      bottom: ${({ theme }) => theme.spaces.space4};
    }
  }
`;

const Dots = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .rect {
    display: flex;
    align-items: center;
    .dots {
      display: flex;
    }
  }
`;

const Dot = styled.div<{ $active: boolean }>`
  color: ${(props) =>
    props.$active
      ? ({ theme }) => theme.colors.primary
      : ({ theme }) => theme.colors.white};
  padding: ${({ theme }) => `${theme.spaces.space3} ${theme.spaces.space2}`};
  border-bottom: 2px solid
    ${(props) =>
      props.$active
        ? ({ theme }) => theme.colors.primary
        : ({ theme }) => theme.colors.white};
  font-size: ${(props) =>
    props.$active
      ? ({ theme }) => theme.font.size.normal
      : ({ theme }) => theme.font.size.mini};
  cursor: pointer;
`;
