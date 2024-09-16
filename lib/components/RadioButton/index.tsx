import React, { useState, MouseEvent, useEffect } from "react";
import styled from "styled-components";
import { RadioButtonProps } from "./interface";
import { Button } from "..";

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  onChange = () => {},
  className,
  name = "radio-button",
  inline = true,
  disabled = false,
  defaultValue,
  isError = false,
}) => {
  const initialValue = options.find((item) => item.checked);
  const [selected, setValue] = useState<any>(initialValue || null);

  useEffect(() => {
    if (defaultValue) {
      const t: any = options?.find((item) => item.value.includes(defaultValue));
      setValue(t);
    }
  }, [defaultValue]);

  const select = (option: any, e: MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    setValue(option);
    onChange({ ...option, name });
  };

  return (
    <Wrapper
      $inline={inline}
      $isError={isError}
      className={className}
      $disabled={disabled}
    >
      <div className="content">
        {options.map((option, i) => (
          <Tab
            type="button"
            key={i}
            $isError={isError}
            $active={option.value === selected?.value}
            disabled={disabled || option.disabled}
            onClick={(e: any) => select(option, e)}
            $disabled={disabled}
          >
            <div className="text">
              <p>{option.label}</p>
            </div>
          </Tab>
        ))}
      </div>
    </Wrapper>
  );
};

export default RadioButton;

const Wrapper = styled.div<{ $inline: boolean; $isError: boolean; $disabled: boolean }>`
  width: 100%;
  .content {
    margin: 0 auto;
    width: 100%;
    display: flex;
    flex-direction: ${(props) => (props.$inline ? "row" : "column")};
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spaces.space5};
    button {
      min-width: 100px;
    }
  }
`;

const Tab = styled.button<{ $isError: boolean; $active: boolean; $disabled: boolean }>`
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $active, $disabled }) =>
    $disabled && $active
      ? theme.colors.disabled
      : $active
        ? theme.colors.primary
        : "transparent"};
  padding: ${({ theme }) => `${theme.spaces.space1}`};
  cursor: pointer;
  border: none;
  outline: ${({ $active, $disabled, $isError, theme }) =>
    $isError
      ? `2px solid ${theme.colors.error}`
      : $disabled
        ? `2px solid ${theme.colors.disabled}`
        : !$active
          ? `2px solid ${theme.colors.primaryLight}`
          : `none`};
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  text-align: center;
  color: ${({ theme, $active }) => ($active ? theme.colors.white : theme.colors.dark)};
  .text {
    p {
      margin: 0;
      line-height: 1;
      font-size: ${({ theme }) => theme.font.size.normal};
    }
  }
  &:disabled {
    color: ${({ theme, $disabled, $active }) =>
      $disabled && $active ? theme.colors.white : theme.colors.disabled};
    cursor: not-allowed;
  }
  &::before {
    content: "";
    position: absolute;
    top: ${({ $active }) => ($active ? "-8px" : "-9px")};
    left: ${({ $active }) => ($active ? "-8px" : "-9px")};
    right: ${({ $active }) => ($active ? "-8px" : "-9px")};
    bottom: ${({ $active }) => ($active ? "-8px" : "-9px")};
    border-radius: ${({ theme }) => theme.extra.radiusRound};
    border: 2px solid
      ${({ theme, $disabled, $isError }) =>
        $isError
          ? theme.colors.error
          : $disabled
            ? theme.colors.disabled
            : `${theme.colors.primaryLight}`};
    z-index: -1;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  }
`;
