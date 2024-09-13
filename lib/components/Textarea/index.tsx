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
    let errorMessage = null;

    if (showPasswordIcon) {
      after = (
        <After className="pointer" onClick={() => setShowPassword(!showPassword)}>
          <Icon name={showPassword ? "eye" : "eye-not"} />
        </After>
      );
    }

    if (isError && message) {
      errorMessage = (
        <p className="error-msg text-error">
          <Icon
            name="warning-circular"
            color={theme.colors.error}
            margin="0 8px 0 0"
            size="18px"
          />
          {message}
        </p>
      );
    }

    return (
      <ContentBox className={className}>
        <Box $isError={isError || undefined} $focus={focus} $inputBgColor={inputBgColor}>
          {iconBefore && (
            <Before>
              <Icon name={iconBefore} />
            </Before>
          )}

          <Container>
            <textarea
              ref={inputRef}
              onChange={handleChange}
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

            {placeholder && (
              <Label $iconBefore={iconBefore} $disabled={disabled}>
                {placeholder && placeholder}{" "}
                {required && <span className="asterisk">*</span>}
              </Label>
            )}
          </Container>
          {after}
        </Box>
        {errorMessage}
      </ContentBox>
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
};

export default React.memo(Textarea);

/* eslint-disable */

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  .error-msg {
    background: ${({ theme }) => theme.colors.errorLight};
    color: ${({ theme }) => theme.colors.error};
    border-radius: 12px;
    margin-top: 4px;
    padding: ${({ theme }) => `${theme.spaces.space1} ${theme.spaces.space2}`};
    font-size: ${({ theme }) => theme.font.size.minor};
    font-weight: 500;
    display: flex;
    align-items: center;
  }
`;

const Box = styled.div<{
  $isError: boolean;
  $focus: boolean;
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
    ${({ $isError, $focus, theme }) =>
      $isError ? theme.colors.error : $focus ? theme.colors.primary : theme.colors.dark};
  border: 2px solid
    ${({ $isError, $focus, theme }) =>
      $isError
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
    color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme, $isError }) => $isError && theme.colors.error};
    min-height: 80px;
    padding: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.normal};
    transition: ${({ theme }) => theme.extra.transition};
    margin-top: 18px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ theme }) => theme.colors.lightGrey};
      font-size: ${({ theme }) => theme.font.size.normal};
    }
    &:-ms-textarea-placeholder {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.font.size.normal};
    }
    &::-ms-textarea-placeholder {
      color: ${({ theme }) => theme.text};
      font-size: ${({ theme }) => theme.font.size.normal};
    }
  }
  textarea:focus + label,
  textarea:not([data-value="false"]) + label {
    transform: translateY(-12px);
    font-size: ${({ theme }) => theme.font.size.small};
  }
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:hover,
  textarea:-webkit-autofill:focus {
    -webkit-background-clip: text;
    font-size: ${({ theme }) => theme.font.size.small};
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  textarea:-webkit-autofill + label,
  textarea:-webkit-autofill:focus + label {
    transform: translateY(-12px);
  }
  textarea:disabled {
    cursor: default;
    color: ${({ theme }) => theme.colors.grey};
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
  $inputBgColor?: string;
  $disabled?: boolean;
}>`
  position: absolute;
  top: 15px;
  left: ${({ $iconBefore, theme }) => ($iconBefore ? theme.spaces.space7 : "12px")};
  right: auto;
  max-width: 100%;
  transform-origin: top;
  transition: ${({ theme }) => theme.extra.transition};
  pointer-events: none;
  font-size: ${({ theme }) => theme.font.size.normal};
  color: ${({ $disabled, theme }) =>
    $disabled ? theme.colors.grey : theme.colors.primaryDark};
  span {
    color: ${({ theme }) => theme.colors.error};
  }
  .max {
    margin-left: ${({ theme }) => theme.spaces.space2};
    color: ${({ theme }) => theme.colors.grey};
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
  .asterisk {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
`;
