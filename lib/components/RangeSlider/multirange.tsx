import React, { useEffect, useState, useRef } from "react";
import styled, { useTheme } from "styled-components";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "tc-range-slider": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        min?: number;
        max?: number;
        value1?: number;
        value2?: number;
        round?: string;
        "animate-onclick"?: string;
        "keyboard-disabled"?: string;
        "generate-labels"?: string;
      };
    }
  }
}

interface MultiRangeSliderProps {
  min: number;
  max: number;
  onChange?: (value: {
    name: string;
    value: { min: number; max: number };
  }) => void;
  name?: string;
  defaultMin?: number;
  defaultMax?: number;
}

const MultiRangeSlider: React.FC<MultiRangeSliderProps> = ({
  min = 1,
  max = 100,
  onChange,
  name = "Range slider",
  defaultMin,
  defaultMax,
}) => {

  const theme = useTheme();

  const [minVal, setMinVal] = useState<number>(defaultMin || min);
  const [maxVal, setMaxVal] = useState<number>(defaultMax || max);
  const sliderRef = useRef<any>(null);

  useEffect(() => {
    setMinVal(defaultMin || min);
    setMaxVal(defaultMax || max);
  }, [defaultMin, defaultMax, min, max]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (slider) {
      slider.innerHTML = `
        .panel{
          transition: none;
        }
        .panel-fill{
          background: ${({theme}: any) => theme.colors.primary};
          transition: none;
        }
        .pointer-shape{
          transition: none;
        }
      `;

      slider.addCSS(`
        .panel{
          border: 2px solid ${({theme}: any) => theme.colors.primary};
        }
        .panel:hover{
          background: inherit;
        }
      `);

      slider.addEventListener("mouseleave", handleChange);
      slider.addEventListener("click", handleChange);
      slider.addEventListener("touchend", handleChange);
      return () => {
        slider.removeEventListener("mouseleave", handleChange);
        slider.removeEventListener("click", handleChange);
        slider.removeEventListener("touchend", handleChange);
      };
    }
  }, [name]);

  const handleChange = (evt: Event) => {
    if (evt.type == "mouseleave") return;
    const customEvent = evt as CustomEvent;
    const min = (customEvent.target as any)?.value1;
    const max = (customEvent.target as any)?.value2;
    setMinVal(min);
    setMaxVal(max);
    onChange && onChange({ name, value: { min, max } });
    sliderRef.current?.blur();
  };

  return (
    <ContentRange>
      <tc-range-slider
        round="0"
        animate-onclick="false"
        ref={sliderRef}
        min={min}
        max={max}
        value1={minVal}
        value2={maxVal}
        keyboard-disabled="true"
        generate-labels="false"
        slider-height={({theme}: any) => theme.spaces.space2}
        slider-bg={({theme}: any) => theme.colors.white}
        slider-bg-fill={`${({theme}: any) => theme.colors.primary}60`}
        pointer-width="20px"
        pointer-height="20px"
        pointer-bg={({theme}: any) => theme.colors.primary}
        pointer-border={`2px solid ${({theme}: any) => theme.colors.primaryLight}`}
        pointer-bg-hover={({theme}: any) => theme.colors.primaryDark}
        pointer-border-hover={`2px solid ${({theme}: any) => theme.colors.primaryLight}`}
        pointer-border-focus={`2px solid ${({theme}: any) => theme.colors.primaryLight}`}
        pointer-bg-focus={({theme}: any) => theme.colors.primaryDark}
        pointer2-width="20px"
        pointer2-height="20px"
      ></tc-range-slider>

      <div className="slider">
        <div className="slider__left-value">€ {minVal}</div>
        <div className="slider__right-value">€ {maxVal}</div>
      </div>
    </ContentRange>
  );
};

export default MultiRangeSlider;

const ContentRange = styled.div`
  padding: ${({theme}) => theme.spaces.space2};
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50px;
  tc-range-slider {
    transition: none;
    position: relative;
    top: ${({theme}) => theme.spaces.space2};
  }
  .slider {
    width: 100%;
    position: relative;
    top: ${({theme}) => theme.spaces.space2};
    .slider__left-value,
    .slider__right-value {
      position: absolute;
    }

    .slider__left-value,
    .slider__right-value {
      color: ${({theme}) => theme.colors.dark};
      top: -35px;
    }

    .slider__left-value {
      left: 0px;
    }

    .slider__right-value {
      right: -4px;
    }
  }
`;
