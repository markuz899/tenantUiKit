import { useState } from "react";
import styled from "styled-components";

const calculatePercentage = (value: number, min: number, max: number) => {
  return ((value - min) / (max - min)) * 100;
};

const genSlideStyle = (value: number, min: number, max: number) => {
  const percentage = calculatePercentage(value, min, max);

  return {
    point: {
      left: `calc(${percentage}% - ${10}px)`,
    },
    range: {
      width: `calc(${percentage}%)`,
    },
  };
};

const RangeSlider = ({
  min = 1,
  max = 100,
  step = 1,
  defaultValue,
  onChange,
  disabled = false,
  steps,
  stepsFormat,
}: {
  min?: number;
  max?: number;
  step?: number;
  onChange?: any;
  defaultValue?: number;
  disabled?: boolean;
  steps?: any[];
  stepsFormat?: string;
}) => {
  const [value, setValue] = useState(defaultValue || min);
  const slideStyle = genSlideStyle(value, min, max);

  const handleChange = (e: any) => {
    setValue(e.target.value);
    onChange({ name: "", value: e.target.value });
  };

  const renderSteps = () => {
    return steps?.map((item) => {
      return (
        <span key={item}>
          {item.toLocaleString("it-IT")} {stepsFormat}
        </span>
      );
    });
  };

  return (
    <Range>
      <div className="content-range">
        {(steps?.length && <div className="content-steps">{renderSteps()}</div>) || null}
        <Track />
        <Bullet right="10%" />
        <Bullet right="20%" />
        <Bullet right="30%" />
        <Bullet right="40%" />
        <Bullet right="50%" />
        <Bullet right="60%" />
        <Bullet right="70%" />
        <Bullet right="80%" />
        <Bullet right="90%" />

        <RangeValue $disabled={disabled} style={slideStyle.range} />
        <Circle $disabled={disabled} style={slideStyle.point} />
        <RangeSlide
          disabled={disabled}
          name="range"
          type="range"
          min={min}
          max={max}
          value={value}
          step={step}
          onChange={handleChange}
        />
      </div>
    </Range>
  );
};

export default RangeSlider;

const Range = styled.div`
  position: relative;
  padding: 10px 0;
  margin: 30px 20px 0;
  .content-range {
    .content-steps {
      position: absolute;
      width: 100%;
      top: -30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    .content-range {
      .content-steps {
        font-size: ${({ theme }) => theme.font.size.minor};
      }
    }
  }
`;

const RangeSlide = styled.input`
  position: absolute;
  width: 100%;
  background: transparent;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  left: 0;
  top: -3px;
  z-index: 9;
  outline: none;
  opacity: 0;

  ::-ms-expand {
    display: none;
  }

  ::-ms-clear {
    display: none;
  }

  ::-webkit-slider-thumb {
    width: 35px;
    height: 35px;
    margin: -3px 0 0 -3px;
    cursor: pointer;
    -webkit-appearance: none;
    appearance: none;
  }
`;

const Circle = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  top: -3px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.07);
  border: solid 5px
    ${({ theme, $disabled }) =>
      $disabled ? theme.colors.disabled : theme.colors.primary};
  background: white;
  display: inline-block;
`;

const RangeValue = styled.span<{ $disabled?: boolean }>`
  position: absolute;
  top: 5px;
  left: 0;
  display: inline-block;
  width: 20%;
  height: 10px;
  background: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.disabled : theme.colors.primary};
  border-radius: 10px 0 0 10px;
`;

const Track = styled.div`
  width: 100%;
  position: absolute;
  height: 2px;
  background: ${({ theme }) => theme.colors.disabled};
  top: 9px;
`;

const Bullet = styled.span<{ right: any }>`
  position: absolute;
  top: 7px;
  display: inline-block;
  width: 7px;
  height: 7px;
  background: ${({ theme }) => theme.colors.disabled};
  border-radius: 50%;
  &:nth-of-type(odd) {
    background: ${({ theme }) => theme.colors.primaryLight};
  }
  ${({ right }) => right && `right: ${right};`}
`;
