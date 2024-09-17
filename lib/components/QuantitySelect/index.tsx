import React, { useState } from "react";
import styled, { useTheme } from "styled-components";
import { QuantitySelectProps } from "./interface";
import Button from "../Button";

const QuantitySelect: React.FC<QuantitySelectProps> = ({
  className,
  disabled,
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
          kind="inverse-primary"
          onClick={handleLess}
          disabled={disabled || defaultValue === 1}
          icon={defaultValue === 1 ? "disabled" : "less"}
          iconSize={theme.spaces.space3}
        />
      </div>
      <div className="child">
        <input
          disabled={disabled}
          onChange={handleChange}
          type="text"
          value={defaultValue}
        />
      </div>
      <div className="child auto right">
        <Button
          kind="inverse-primary"
          onClick={handlePlus}
          disabled={disabled || defaultValue === max}
          icon={defaultValue === max ? "disabled" : "plus"}
          iconSize={theme.spaces.space3}
        />
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
  gap: 8px;
  .child {
    text-align: center;
    width: ${(p) => (p.width ? p.width : "auto")};
    &.auto {
      width: auto;
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
      border: 1px solid ${({ theme }) => theme.colors.disabled};
      &:disabled {
        background: ${({ theme }) => theme.colors.whiteSmoke};
        color: ${({ theme }) => theme.colors.grey};
      }
      &:focus {
        outline: none;
      }
    }
    button {
      margin-bottom: 0;
    }
  }
`;
