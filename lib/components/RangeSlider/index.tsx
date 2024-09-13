import React, { useRef, useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

interface RangeSliderProps {
  name?: string;
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  value?: number;
  onChange?: any;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  name = "range",
  className,
  min = 1,
  max = 10,
  step = 1,
  defaultValue,
  value,
  onChange,
}) => {
  const theme = useTheme();

  const inputRef = useRef<HTMLInputElement>(null);
  const [state, setState] = useState<number>(value || defaultValue || min);

  // Aggiorna lo sfondo dello slider quando il valore cambia
  useEffect(() => {
    if (inputRef.current) {
      const el = inputRef.current;
      const percentage = ((state - min) / (max - min)) * 100;
      el.style.background = `linear-gradient(to right, ${theme.colors.primaryLight}61 ${percentage}%, ${theme.colors.white} ${percentage}%)`;
    }
  }, [state, min, max]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value, 10);
    setState(newValue);

    if (onChange) {
      onChange({ name, value: newValue });
    }
  };

  return (
    <SliderContainer className={className}>
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        step={step}
        value={state}
        onChange={handleChange}
      />
    </SliderContainer>
  );
};

export default RangeSlider;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;

  input[type="range"] {
    background: ${`linear-gradient(to right, ${({ theme }: any) => theme.colors.primaryLight}61 0%, ${({ theme }: any) => theme.colors.white} 0%)`};
    width: 100%;
    height: ${({ theme }) => theme.spaces.space2};
    outline: none;
    transition: background 450ms ease-in;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    border-radius: ${({ theme }) => theme.extra.radiusBig};
    &::-webkit-slider-thumb {
      border-radius: 50px;
      width: ${({ theme }) => theme.spaces.space4};
      height: ${({ theme }) => theme.spaces.space4};
      background-color: ${({ theme }) => theme.colors.primary};
      border: 2px solid ${({ theme }) => theme.colors.primaryLight};
      cursor: pointer;
      -webkit-appearance: none;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.8);
      &:hover {
        background: ${({ theme }) => theme.colors.primaryDark};
      }
      &:active {
        cursor: grab;
      }
    }
    &:disabled {
      background: ${({ theme }) => theme.colors.greyIcon};
    }
  }
`;
