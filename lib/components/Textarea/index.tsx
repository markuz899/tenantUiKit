import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import styled, { useTheme } from "styled-components";
import Icon from "../Icon";
// import Tooltip from '../Tooltip';
import { TextareaProps, TextareaRef } from "./interface";

const Textarea = forwardRef<TextareaRef, TextareaProps>(
  (
    {
      type = "text",
      topPlaceholder,
      placeholder,
      value,
      defaultValue,
      name,
      isError = false,
      onChange = () => {},
      message,
      showPasswordIcon,
      icon,
      iconBefore,
      className,
      disabled = false,
      readOnly = false,
      required = false,
      enableControlledInput = false,
      uppercase = false,
      maxLength,
      labelBgColor,
      inputBgColor = "white",
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();

    const initialValue = defaultValue || value || "";
    const inputRef = useRef<HTMLTextAreaElement>(null);
    const valueRef = useRef(defaultValue);
    const [hasValue, setHasValue] = useState(!!initialValue);
    const [state, setState] = useState(initialValue);
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState<any>(false);

    useEffect(() => {
      if (defaultValue !== valueRef.current) {
        setState(defaultValue);
        setHasValue(!!defaultValue);
      }
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
    }));

    const text = !enableControlledInput ? state : value;
    const dataValue = !enableControlledInput ? hasValue : !!value;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      let v = e.target.value;
      if (uppercase) v = v.toUpperCase();
      if (!enableControlledInput) {
        setHasValue(!!v);
        setState(v);
      }
      onChange({ value: v, name, type }, e);
    };

    let after = icon && (
      <After>
        <Icon name={icon} size={theme.font.size.tiny} />
      </After>
    );
    let errorTooltip = null;
    if (showPasswordIcon) {
      after = (
        <After className="pointer" onClick={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye" : "eye-not"} />
        </After>
      );
    }

    if (isError) {
      errorTooltip = <Icon name="warning-circular" color={theme.colors.error} />;
    }

    return (
      <Box
        isError={isError || undefined}
        className={className}
        $focus={focus}
        $labelBgColor={labelBgColor}
        $topPlaceholder={topPlaceholder}
        $inputBgColor={inputBgColor}
      >
        {iconBefore && (
          <Before>
            <Icon name={iconBefore} />
          </Before>
        )}

        <Container>
          <textarea
            ref={inputRef}
            onChange={handleChange}
            placeholder={placeholder}
            value={text}
            data-value={dataValue}
            name={name}
            autoComplete={name}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            disabled={disabled}
            required={required}
            readOnly={readOnly}
            maxLength={maxLength}
            {...rest}
          ></textarea>

          {topPlaceholder && (
            <Label $iconBefore={iconBefore} $labelBgColor={labelBgColor}>
              {topPlaceholder} {required && <span className="asterisk">*</span>}
              {maxLength && (
                <span className="max">
                  {text.length}/{maxLength}
                </span>
              )}
            </Label>
          )}
        </Container>
        {errorTooltip}
        {after}
      </Box>
    );
  },
);

Textarea.displayName = "Textarea";

Textarea.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
  isError: PropTypes.bool,
  message: PropTypes.string,
  icon: PropTypes.any,
  iconBefore: PropTypes.string,
  showPasswordIcon: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  enableControlledInput: PropTypes.bool,
  readOnly: PropTypes.bool,
  uppercase: PropTypes.bool,
  maxLength: PropTypes.number,
  labelBgColor: PropTypes.string,
};

export default React.memo(Textarea);

/* eslint-disable */
const Box = styled.div<{
  isError: boolean;
  $focus: boolean;
  $topPlaceholder: any;
  $labelBgColor?: string;
  $inputBgColor?: string;
}>`
  position: relative;
  margin-top: 15px;
  border-radius: 0;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spaces.space9};
  background: ${(p) => p.$inputBgColor};
  width: 100%;
  padding: 0 ${({ theme }) => theme.spaces.space2};
  border: 2px solid
    ${({ isError, $focus, theme }) =>
      isError ? theme.colors.error : $focus ? theme.colors.primary : theme.colors.dark};
  border: 2px solid
    ${({ isError, $focus, theme }) =>
      isError
        ? theme.colors.error
        : $focus
          ? theme.colors.primary
          : theme.colors.borderComponent};
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  textarea {
    box-sizing: border-box;
    background: transparent;
    width: 100%;
    border: 0;
    min-height: ${({ theme }) => theme.spaces.space7};
    padding: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.tiny};
    transition: ${({ theme }) => theme.extra.transition};
    color: ${({ theme }) => theme.text};
    color: ${({ isError, theme }) => isError && theme.colors.error};
    margin-top: 4px;
    padding-top: ${({ $topPlaceholder }) =>
      $topPlaceholder ? ({ theme }) => theme.spaces.space3 : 0};
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.lightGrey};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
    &:-ms-textarea-placeholder {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
    &::-ms-textarea-placeholder {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
  }
  textarea + label,
  textarea:not([data-value="false"]) + label {
    transform: translateY(-20px) scale(0.9);
    background: ${(p) => p.$labelBgColor};
    padding: 0 ${({ theme }) => theme.spaces.space1} 0
      ${({ theme }) => theme.spaces.space1};
  }
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-background-clip: text;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  textarea:-webkit-autofill + label,
  textarea:-webkit-autofill:focus + label {
    transform: translateY(-20px) scale(0.9);
  }
  textarea:disabled {
    cursor: default;
  }
  .pointer {
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.mini};
    color: ${({ theme }) => theme.colors.lightGrey};
  }
  .alertTooltip {
    margin-left: 3px;
  }
  &:hover {
    transition: all ${({ theme }) => theme.extra.transition};
    border: 2px solid
      ${({ isError, $focus }) =>
        isError
          ? ({ theme }) => theme.colors.error
          : ({ theme }) => theme.colors.primary};
  }
`;
const Container = styled.div`
  flex-grow: 1;
  width: 100%;
`;
const After = styled.div`
  margin-left: ${({ theme }) => theme.spaces.space2};
`;
const Before = styled.div`
  margin-right: ${({ theme }) => theme.spaces.space2};
`;
const Label = styled.label<{
  $iconBefore?: string;
  $labelBgColor?: string;
  $inputBgColor?: string;
}>`
  position: absolute;
  top: 0px;
  left: 6px;
  right: auto;
  max-width: 100%;
  transform-origin: top left;
  margin-top: 8px;
  transition: ${({ theme }) => theme.extra.transitionFluid};
  pointer-events: none;
  padding: 0;
  font-size: ${({ theme }) => theme.font.size.normal};
  color: ${({ theme }) => theme.colors.grey};
  background: ${({ $labelBgColor, theme }) => $labelBgColor || theme.bg};
  border-radius: ${({ theme }) => theme.extra.radiusBig};
  span {
    color: ${({ theme }) => theme.colors.error};
  }
  .asterisk {
    color: ${({ theme }) => theme.colors.primary};
  }
  &::before {
    content: "";
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 50%;
    right: 0;
    border-radius: inherit;
    background-color: ${(p) => (p.$labelBgColor ? p.$labelBgColor : "transparent")};
  }

  &::after {
    content: "";
    z-index: -1;
    position: absolute;
    left: 0;
    top: 60%;
    bottom: 0;
    right: 0;
    border-radius: inherit;
    background-color: ${({ $labelBgColor, $inputBgColor, theme }) =>
      $labelBgColor ? $labelBgColor : $inputBgColor ? $inputBgColor : theme.colors.white};
  }
  .max {
    margin-left: ${({ theme }) => theme.spaces.space2};
    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
`;
