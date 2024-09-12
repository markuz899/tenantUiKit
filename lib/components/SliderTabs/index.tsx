import React, { useEffect, useState, useRef } from "react";
import Icon from "../Icon";
import styled, { useTheme } from "styled-components";

interface Option {
  value: string | number;
  label: string;
  icon?: string;
  iconColor?: string;
  checked?: boolean;
}

interface TabsProps {
  name?: string;
  className?: string;
  options: Option[];
  onChange?: any;
  children?: React.ReactNode;
  isSmall?: boolean;
  defaultValue?: string;
}

const Tabs: React.FC<TabsProps> = ({
  name = "slider",
  className,
  options,
  onChange = () => {},
  children,
  isSmall,
  defaultValue,
}) => {
  const theme = useTheme();

  const tabRef = useRef<HTMLDivElement>(null);
  const selectorRef = useRef<HTMLDivElement>(null);

  const initialValue =
    options?.find((item) => item.checked) || options[0] || [];
  const [selected, setValue] = useState<Option>(initialValue);

  useEffect(() => {
    const list = tabRef.current;
    if (list) {
      const activeTab = list.querySelector(".active") as HTMLButtonElement;
      const boundingWidh = activeTab?.offsetWidth || 0;
      const boundingLeft = activeTab?.offsetLeft || 0;
      if (selectorRef.current) {
        selectorRef.current.style.left = `${boundingLeft}px`;
        selectorRef.current.style.width = `${boundingWidh}px`;
      }
    }
    if (defaultValue) {
      const target: any = options.find((item) => item.value === defaultValue);
      if (target) {
        setValue(target);
      }
    }
  }, [selected, options, defaultValue]);

  const select = (option: Option, index: number) => {
    if (option.value === selected.value) return;
    setValue(option);
    onChange && onChange({ name, value: option.value });
  };

  return (
    <Wrapper className={className ? className : null}>
      <Flex>
        <Buttons ref={tabRef}>
          <div className="selector" ref={selectorRef} />
          {options &&
            options.map((option, i) => (
              <Tab
                key={option.value}
                onClick={() => select(option, i)}
                className={option.value == selected.value ? "active" : ""}
                $iconColor={option.iconColor || ""}
              >
                <div className="d-flex">
                  {option.icon && (
                    <Icon
                      name={option.icon}
                      margin={`0 ${isSmall ? "0" : "0"} 0 0`}
                      color={option.iconColor || theme.colors.dark}
                    />
                  )}
                  {!isSmall && <p>{option.label} </p>}
                </div>
              </Tab>
            ))}
        </Buttons>
      </Flex>
      {children && <Box>{children}</Box>}
    </Wrapper>
  );
};

export default React.memo(Tabs);

// Styled Components
const Wrapper = styled.div<any>`
  position: relative;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Buttons = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  display: inline-block;
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  border: 2px solid ${({ theme }) => theme.colors.greyIcon};
  height: ${({ theme }) => theme.spaces.space9};
  .selector {
    height: 100%;
    display: inline-block;
    position: absolute;
    left: 0px;
    top: 0px;
    z-index: 1;
    border-radius: 6px;
    transition-duration: 0.6s;
    background: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primaryDark};
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
  }
`;

const Tab = styled.button<{ $iconColor: string }>`
  height: 100%;
  cursor: pointer;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.text};
  padding: ${({ theme }) => theme.spaces.space2}
    ${({ theme }) => theme.spaces.space4};
  position: relative;
  z-index: 1;
  transition-duration: 0.6s;
  &.active {
    cursor: default;
    p,
    svg {
      transition-delay: 0.3s;
      color: ${({ theme }) => theme.colors.white};
      fill: ${({ $iconColor, theme }) =>
        $iconColor ? $iconColor : theme.colors.white};
    }
  }
  .d-flex {
    display: flex;
    align-items: center;
    p {
      line-height: 1;
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
    span {
      margin-left: 5px;
      font-size: ${({ theme }) => theme.font.size.minor};
      color: ${({ theme }) => theme.colors.white};
    }
  }
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    padding: ${({ theme }) => theme.spaces.space2};
  }
`;

const Box = styled.div`
  box-shadow: ${({ theme }) => theme.extra.shadow};
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  padding: ${({ theme }) => theme.spaces.space1}
    ${({ theme }) => theme.spaces.space3} ${({ theme }) => theme.spaces.space3};
  background: ${({ theme }) => theme.colors.white};
  width: 100%;
  @media only screen and (max-width: ${({ theme }) =>
      theme.breakpoints.mobile}) {
    padding: 0;
    border: 0;
    box-shadow: none;
    height: 100%;
  }
`;
