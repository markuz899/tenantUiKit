import React, { useState, useEffect, useRef } from "react";
import styled, { useTheme } from "styled-components";
import Dropdown from "../Dropdown";
import Input from "../Input";
import Checkbox from "../Checkbox";
import { SelectProps } from "./interface";

const Select: React.FC<SelectProps> = ({
  options = [],
  onChange,
  onInputChange,
  placeholder = "Select...",
  topPlaceholder,
  labelBgColor,
  name,
  showArrow = true,
  iconBefore,
  enableInput = false,
  onClose,
  isError,
  message,
  value = "",
  multiselect,
  defaultValues = [],
  readOnly,
  className,
  withFilter = false,
  disabled,
  fluid = true,
  rounded = false,
  clearable = false,
  width,
}) => {
  const theme = useTheme();

  const [disable, setDisable] = useState(disabled || false);
  const [state, setState] = useState<string | string[]>(value);
  const [values, setValues] = useState<string[]>(defaultValues || []);
  const [hover, setHover] = useState(-1);
  const [filtered, setFiltered] = useState(options);
  const drop = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFiltered(options);
  }, [options]);

  useEffect(() => {
    setState(value);
  }, [value]);

  useEffect(() => {
    setFiltered(options);
    if (multiselect) {
      const selected = defaultValues ? [...defaultValues] : [];

      setValues(selected);

      const newSelection: any = [];
      options.forEach((el) => {
        if (selected.includes(el.value)) {
          newSelection.push(el.label);
        }
      });

      if (newSelection.length === 0) {
        setState("");
      } else if (newSelection.length === 1 || newSelection.length === 2) {
        setState(newSelection.toString());
      } else if (newSelection.length > 2) {
        setState(`${newSelection.length} selezionati`);
      }
    } else {
      if (defaultValues) {
        const target = options.find((item) => item.value === defaultValues);

        if (target && state !== target.label) {
          setState(target.label);
          if (disabled && !disable) {
            setDisable(disabled || false);
          }
        } else if (!target && disable) {
          setDisable(false);
        }
      }
    }
    // eslint-disable-next-line
  }, [options]);

  const onSelect = (item: { label: string; value: string }, callback: () => void) => {
    const { label, value } = item;
    if (multiselect) {
      let selected = [...values];
      if (!selected.includes(value)) {
        selected.push(value);
      } else {
        selected = selected.filter((item) => item !== value);
      }
      setValues(selected);
      const newSelection: string[] = [];
      options.forEach((el) => {
        if (selected.includes(el.value)) {
          newSelection.push(el.label);
        }
      });
      if (newSelection.length === 0) {
        setState("");
      } else if (newSelection.length === 1) {
        setState(newSelection.toString());
      } else if (newSelection.length === 2) {
        setState(newSelection.toString());
      } else if (newSelection.length > 1) {
        setState(`${newSelection.length} selezionati`);
      }
      onChange({ ...item, label, value: selected, name: name || "" }, options);
    } else {
      onChange({ ...item, label, value, name: name || "" }, options);
      setState(label);
      callback();
    }
  };

  const handleOnChange = (
    data: { value: string },
    visible: boolean,
    show: () => void,
  ) => {
    if (enableInput) {
      setState(data.value);
      if (onInputChange) onInputChange(data);
      if (data.value === "") {
        setFiltered(options);
      } else {
        setFiltered(
          options.filter((item) =>
            item.label.toLowerCase().includes(data.value.toLowerCase()),
          ),
        );
        if (!visible) show();
      }
      onChange({ name: name || "", value: data.value }, options);
    }
  };

  const handleShowDrop = (show: () => void, visible: boolean, close: () => void) => {
    if (filtered.length > 0) {
      show();
    }
    if (visible) {
      close();
    } else {
      show();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    { show, visible, close }: { show: () => void; visible: boolean; close: () => void },
  ) => {
    if (e.key === "Enter") {
      const { label, value } = filtered[hover];
      setState(label);
      onChange({ label, value, name: name || "" }, options);
      close();
    }
    if (e.key === "Tab") close();
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const { length } = filtered;
      let i = -1;
      if (!visible) show();
      if (e.key === "ArrowUp") i = (hover + length - 1) % length;
      if (e.key === "ArrowDown") i = (hover + 1) % length;
      setHover(i);
      if (i > 4) {
        if (drop.current) drop.current.scrollTop = (i - 4) * 55;
      } else {
        if (drop.current) drop.current.scrollTop = 0;
      }
    }
  };

  const renderTarget = ({
    show,
    visible,
    close,
  }: {
    show: () => void;
    visible: boolean;
    close: () => void;
  }) => (
    <Target
      onClick={() => (disable ? null : handleShowDrop(show, visible, close))}
      onKeyDown={(e) => handleKeyDown(e, { show, visible, close })}
      $isError={isError}
    >
      <Input
        type="text"
        autoComplete="off"
        placeholder={placeholder}
        labelBgColor={labelBgColor}
        value={state as string}
        name={name || ""}
        onChange={(data: any) => handleOnChange(data, visible, show)}
        inputSelectAction={{ visible, show, close }}
        iconBefore={iconBefore}
        icon={showArrow && (visible ? "angle-top" : "angle-down")}
        enableControlledInput
        isError={isError}
        message={message}
        readOnly={readOnly}
        withFilter={withFilter || undefined}
        disabled={disable}
        rounded={rounded}
        clearable={clearable}
        className="select-input"
      />
    </Target>
  );

  const renderDropdown = ({ close }: { close: () => void }) => (
    <Options ref={drop}>
      {filtered &&
        filtered.map((option, i) => (
          <Row
            key={`${option.value}-${i}`}
            $multiselect={!!multiselect}
            $active={multiselect ? values.includes(option.value) : false}
          >
            <Option
              onClick={() => onSelect(option, close)}
              selected={state === option.label}
              $active={multiselect ? values.includes(option.value) : false}
              $hover={hover === i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(-1)}
              $multiselect={!!multiselect}
            >
              {option.label}
            </Option>
            {multiselect && (
              <Checkbox
                checked={values.includes(option.value)}
                onChange={() => onSelect(option, close)}
                htmlFor={`${name}-${i}`}
              />
            )}
          </Row>
        ))}
    </Options>
  );

  return (
    <StyledDropdown
      leftPosition={0}
      renderTarget={renderTarget}
      renderDropdown={filtered.length > 0 ? renderDropdown : undefined}
      showArrow={false}
      onClose={onClose || (() => {})}
      includeTarget
      className={className}
      fluid={fluid}
      width={width}
    />
  );
};

export default React.memo(Select);

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -13px;
  border: 1px solid ${({ theme }) => theme.colors.borderComponent};
  max-height: 180px;
  overflow: hidden;
  overflow-y: scroll;
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.text};
  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

export const Row = styled.div<{ $multiselect: any; $active: any }>`
  cursor: pointer;
  padding: ${({ theme, $multiselect }) =>
    $multiselect
      ? `${theme.spaces.space2} ${theme.spaces.space3}`
      : `14px ${theme.spaces.space3}`};
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid ${({ theme }) => theme.colors.greyIcon};
  background: ${({ theme, $multiselect, $active }) =>
    $multiselect && $active ? `${theme.colors.primaryLightMore}` : `inherit`};
  &:last-child {
    border-bottom: none;
  }
`;

export const Option = styled.li<{
  $active: any;
  selected: boolean;
  $hover: boolean;
  $multiselect: boolean;
}>`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  text-align: left;
  list-style-type: none;
  color: ${({ theme, selected, $hover, $active }) =>
    selected && $hover
      ? theme.colors.primary
      : selected || $active
        ? theme.colors.primary
        : $hover
          ? theme.colors.primary
          : theme.colors.black};
  font-weight: ${(p) =>
    p.selected && p.$hover
      ? "bold"
      : p.selected || p.$active
        ? "bold"
        : p.$hover
          ? "bold"
          : "500"};
  font-size: ${({ theme }) => theme.font.size.tiny};
  &:last-child {
    border-bottom: 0;
  }
`;

const Target = styled.div<{ $isError?: boolean }>`
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  outline: unset;
`;

const StyledDropdown = styled(Dropdown)<any>`
  width: 100%;
  &:focus {
    outline: 0;
  }
`;
