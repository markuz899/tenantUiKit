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
    <Wrapper $inline={inline} $isError={isError} className={className}>
      <div className="content">
        {options.map((option, i) => (
          <Tab
            type="button"
            key={i}
            $active={option.value === selected?.value}
            disabled={option.disabled}
            onClick={(e: any) => select(option, e)}
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

const Wrapper = styled.div<{ $inline: boolean; $isError: boolean }>`
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

const Tab = styled.button<{ $active: boolean }>`
  position: relative;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};
  padding: ${({ theme }) => `${theme.spaces.space1}`};
  cursor: pointer;
  border: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.primaryLight};
  outline: ${({ $active, theme }) =>
    !$active ? `2px solid ${theme.colors.primaryLight}` : `none`};
  border-radius: 16px;
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
    color: ${({ theme }) => theme.colors.greyIcon};
    cursor: not-allowed;
  }
  &::before {
    content: "";
    position: absolute;
    top: ${({ $active }) => ($active ? "-8px" : "-10px")};
    left: ${({ $active }) => ($active ? "-8px" : "-10px")};
    right: ${({ $active }) => ($active ? "-8px" : "-10px")};
    bottom: ${({ $active }) => ($active ? "-8px" : "-10px")};
    border-radius: 25px;
    border: 3px solid ${({ theme }) => `${theme.colors.primaryLight}`};
    z-index: -1;
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
  }
`;
