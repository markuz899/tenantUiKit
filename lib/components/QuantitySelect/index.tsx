import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { QuantitySelectProps } from "./interface";
import { Button, Icon } from "..";

const QuantitySelect: React.FC<QuantitySelectProps> = ({
  className,
  disabledInput,
  min = 1,
  max = 10,
  value = 0,
  onChange,
  onIncrement,
  onDecrement,
  width,
}) => {
  const theme = useTheme();

  const [defaultValue, setDefaultValue] = useState<number>(value || 1);

  const handlePlus = () => {
    if (defaultValue < max) {
      const val = defaultValue + 1;
      setDefaultValue(val);
      onChange && onChange(val);
      onIncrement && onIncrement(val);
    }
  };

  const handleLess = () => {
    if (defaultValue > min) {
      const val = defaultValue - 1;
      setDefaultValue(val);
      onChange && onChange(val);
      onDecrement && onDecrement(val);
    }
  };

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    const numberValue = Number(value);
    let maxim = 1;
    if (numberValue) {
      if (numberValue < max && numberValue > min) {
        maxim = numberValue;
      } else {
        maxim = max;
      }
    } else {
      maxim = 1;
    }
    setDefaultValue(maxim);
    onChange && onChange(maxim);
  };

  return (
    <StyledQuantity className={className} width={width}>
      <div className="child auto left">
        <Button
          kind="primary"
          onClick={handleLess}
          disabled={defaultValue === 1}
        >
          <Icon
            name={defaultValue === 1 ? "disabled" : "less"}
            size={theme.spaces.space3}
          />
        </Button>
      </div>
      <div className="child">
        <input
          disabled={disabledInput}
          onChange={handleChange}
          type="text"
          value={defaultValue}
        />
      </div>
      <div className="child auto right">
        <Button
          kind="primary"
          onClick={handlePlus}
          disabled={defaultValue === max}
        >
          <Icon
            name={defaultValue === max ? "disabled" : "plus"}
            size={theme.spaces.space3}
          />
        </Button>
      </div>
    </StyledQuantity>
  );
};

export default QuantitySelect;

interface StyledQuantityProps {
  width?: string;
}

const StyledQuantity = styled.div<StyledQuantityProps>`
  width: ${(p) => (p.width ? p.width : "100%")};
  display: flex;
  align-items: center;
  .child {
    width: 100%;
    text-align: center;
    &.auto {
      width: auto;
      &.left {
        margin-right: ${({ theme }) => theme.spaces.space4};
      }
      &.right {
        margin-left: ${({ theme }) => theme.spaces.space4};
      }
    }
    input[type="text"] {
      border-radius: ${({ theme }) => theme.extra.radiusBig};
      width: 100%;
      height: 40px;
      border: none;
      text-align: center;
      padding: 0;
      flex-grow: 1;
      font-size: ${({ theme }) => theme.font.size.normal};
      background: ${({ theme }) => theme.colors.white};
      border: 2px solid ${({ theme }) => theme.colors.primary};
      &:disabled {
        background: ${({ theme }) => theme.colors.greyIcon};
        color: ${({ theme }) => theme.colors.dark};
      }
      &:focus {
        outline: none;
      }
    }
  }
`;
