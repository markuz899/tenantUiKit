import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Icon from "../Icon";
import { CheckboxProps } from "./interface";

/* eslint-disable */
const Checkbox: React.FC<CheckboxProps> = ({
  refer,
  name = "check-default",
  checked = false,
  disabled = false,
  onChange = () => {},
  buttonMode = false,
  label,
  isError,
  message,
  children,
  className,
  htmlFor,
}) => {
  const theme = useTheme();
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  let errorTooltip: React.ReactNode = null;
  let errorMessage: React.ReactNode = null;

  if (isError) {
    errorTooltip = (
      <Icon
        name="warning-circular"
        color={theme.colors.error}
        margin="0 0 0 5px"
      />
    );
    errorMessage = <p className="error-msg text-error">*{message}</p>;
  }

  useEffect(() => {
    if (!disabled) setIsChecked(checked);
  }, [checked, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = !isChecked;
    if (!disabled) {
      setIsChecked(value);
      onChange({ name, value, checked: value, label }, e);
    }
  };

  if (!buttonMode) {
    return (
      <Box
        className={`checkbox_box ${className || ""}`}
        onClick={handleChange}
        isError={isError}
      >
        <Check className="check-box" checked={isChecked} disabled={disabled}>
          <input
            ref={refer}
            name={name}
            type="checkbox"
            checked={isChecked}
            id={htmlFor}
            readOnly
          />
          {isChecked && (
            <Icon
              name="check"
              margin="5px 0 0 3px"
              size="15px"
              color={theme.colors.white}
            />
          )}
        </Check>
        {label && <label htmlFor={htmlFor}>{label}</label>}
        {children && <label htmlFor={htmlFor}>{children}</label>}
        {isError && errorTooltip}
        {isError && errorMessage}
      </Box>
    );
  }

  return (
    <BtnCheck>
      <label>
        <input onChange={handleChange} type="checkbox" disabled={disabled} />
        <span>{label}</span>
      </label>
    </BtnCheck>
  );
};

Checkbox.displayName = "Checkbox";

export default React.memo(Checkbox);

// Stili
const Box = styled.div<{
  isError: boolean | undefined;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: ${({ isError, theme }) => (isError ? theme.spaces.space2 : 0)};
  label {
    max-width: 70%;
    font-size: ${({ theme }) => theme.font.size.mini};
    cursor: pointer;
    color: ${({ isError, theme }) => (isError ? theme.colors.error : "none")};
  }
  .error-msg {
    position: absolute;
    bottom: -18px;
    left: 0;
    font-size: ${({ theme }) => theme.font.size.mini};
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    label {
      max-width: 80%;
    }
  }
  &:hover {
    .check-box {
      transition: all ${({ theme }) => theme.extra.transition};
      border: 2px solid ${({ theme }) => theme.colors.primary};
    }
  }
`;

const Check = styled.div<{ checked: boolean; disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin-right: 9px;
  width: ${({ theme }) => theme.spaces.space4};
  height: ${({ theme }) => theme.spaces.space4};
  border-radius: 4px;
  border: 2px solid
    ${({ checked, theme }) =>
      checked ? theme.colors.primary : theme.colors.borderComponent};
  background-color: ${({ disabled, checked, theme }) =>
    disabled ? "#d4d4d4b8" : checked ? theme.colors.primary : "none"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  input {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  svg {
    position: absolute;
  }
`;

const BtnCheck = styled.div`
  input {
    display: none;
    &:checked ~ span {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.primary};
    }
  }
  span {
    min-height: ${({ theme }) => theme.spaces.space9};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.colors.grey};
    border-radius: 3px;
    font-size: ${({ theme }) => theme.font.size.minor};
  }
`;
