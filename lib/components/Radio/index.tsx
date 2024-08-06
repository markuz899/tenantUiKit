import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
// import Tooltip from '../Tooltip';
import Icon from "../Icon";
import { RadioProps } from "./interface";

/* eslint-disable */
const Radio: React.FC<RadioProps> = ({
  name,
  label,
  options,
  onChange,
  inline = false,
  defaultValue = null,
  isError = false,
  disabled = false,
}) => {
  const theme = useTheme();
  const [state, setState] = useState<any>(defaultValue);

  useEffect(() => {
    setState(defaultValue);
  }, [defaultValue]);

  const handleOnClick = (
    e: React.MouseEvent<HTMLDivElement>,
    newValue: any,
  ) => {
    if (!disabled) {
      if (newValue !== state) {
        setState(newValue);
        onChange({ label: name, value: newValue, name }, e);
      }
    }
  };

  return (
    <RadioGroup $inline={inline ? 1 : 0}>
      {label && <Placeholder>{label}</Placeholder>}
      <Options $inline={inline ? 1 : 0} $isError={isError}>
        {options.map((option) => (
          <label key={`${option.label}`}>
            <input type="radio" name={name} value={option.value} />
            <Option
              onClick={(e) => handleOnClick(e, option.value)}
              active={state === option.value ? "si" : undefined}
              disabled={disabled}
            >
              <div className="selector" />
              <span>{option.label}</span>
            </Option>
          </label>
        ))}
      </Options>
      {isError && (
        <div>
          {/* <Tooltip content={message} className="alertTooltip"> */}
          <Icon name="help-circular" color={theme.colors.error} />
          {/* </Tooltip> */}
        </div>
      )}
    </RadioGroup>
  );
};

Radio.displayName = "Radio";

export default Radio;

/* eslint-disable */
const RadioGroup = styled.div<{ $inline: any }>`
  display: flex;
  flex-direction: ${(props) => (props.$inline == 1 ? "row" : "column")};
`;

const Placeholder = styled.span`
  font-weight: bold;
`;

const Options = styled.div<{ $inline: any; $isError: boolean | undefined }>`
  display: flex;
  flex-direction: ${(props) => (props.$inline == 1 ? "row" : "column")};
  color: ${({ $isError, theme }) =>
    $isError ? theme.colors.error : "inherit"};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  label {
    margin: ${(props) => (props.$inline ? "0 5px" : "5px 0")};
  }
`;

const Option = styled.div<{ active: any; disabled: boolean }>`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  .selector {
    background: ${({ disabled, theme }) =>
      disabled ? theme.colors.greyIcon : "transparent"};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid
      ${({ active, theme }) =>
        active ? theme.colors.primary : theme.colors.greyIcon};
    &:hover {
      opacity: 0.8;
    }
    &:after {
      content: "";
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: ${({ active, theme }) =>
        active ? theme.colors.primary : "transparent"};
    }
  }
  span {
    color: ${({ active, theme }) =>
      active ? theme.colors.primary : "inherit"};
    margin: 0 ${({ theme }) => theme.spaces.space4} 0
      ${({ theme }) => theme.spaces.space3};
    display: inline-block;
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
  &:hover {
    .selector {
      transition: all ${({ theme }) => theme.extra.transition};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;
