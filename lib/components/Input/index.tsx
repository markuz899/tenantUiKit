import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";
import PropTypes from "prop-types";
import styled, { css, useTheme } from "styled-components";
import Icon from "../Icon";
import { InputProps, InputRef } from "./interface";

const Input = forwardRef<InputRef, InputProps>(
  (
    {
      type = "text",
      placeholder,
      value,
      defaultValue,
      importantDefault,
      name,
      isError = false,
      isWarning = false,
      onChange,
      message,
      showPasswordIcon,
      icon,
      iconBefore,
      className,
      disabled,
      readOnly,
      required,
      enableControlledInput,
      uppercase,
      withFilter,
      autoComplete,
      inputSelectAction,
      inputBgColor = "white",
      rounded = false,
      clearable = false,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    const initialValue = defaultValue || value || "";
    const inputRef = useRef<HTMLInputElement>(null);
    const valueRef = useRef<string | undefined>(defaultValue);
    const [hasValue, setHasValue] = useState<boolean>(!!initialValue);
    const [state, setState] = useState<string>(initialValue);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [focus, setFocus] = useState<boolean>(false);

    useEffect(() => {
      if (defaultValue !== valueRef.current) {
        setState(defaultValue || "");
        setHasValue(!!defaultValue);
      }
    }, [defaultValue]);

    useImperativeHandle(ref, () => ({
      focus: () => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      },
    }));

    const text = importantDefault ? defaultValue : !enableControlledInput ? state : value;
    const dataValue = !enableControlledInput ? hasValue : !!value;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let v = e.target.value;
      if (uppercase) v = v.toUpperCase();
      if (!enableControlledInput) {
        setHasValue(!!v);
        setState(v);
      }
      onChange && onChange({ value: v, name, type }, e);
    };

    const toggleSelectAction = () => {
      const { visible, show, close } = inputSelectAction!;
      if (visible) return close();
      show();
    };

    const clearInput = () => {
      setHasValue(false);
      setState("");
      onChange && onChange({ value: "", name, type });
    };

    let after = icon && (
      <After onClick={inputSelectAction ? toggleSelectAction : undefined}>
        <Icon name={icon} size={theme.font.size.normal} color={theme.colors.primary} />
      </After>
    );

    let errorMessage = null;

    if (showPasswordIcon) {
      after = (
        // eslint-disable-next-line
        <span className="pointer" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? (
            <Icon name="eye-not" color={theme.colors.borderComponent} />
          ) : (
            <Icon name="eye" color={theme.colors.borderComponent} />
          )}
        </span>
      );
    }

    if (type == "search" && state.length) {
      after = (
        <After className="cursor-pointer" onClick={clearInput}>
          <Icon
            name={"close-circular"}
            size={theme.font.size.normal}
            color={theme.colors.primary}
          />
        </After>
      );
    }

    const cleared =
      clearable && text?.length ? (
        <After className="cursor-pointer" onClick={clearInput}>
          <Icon
            name={"close-circular"}
            size={theme.font.size.normal}
            color={theme.colors.primary}
          />
        </After>
      ) : null;

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
      type !== "hidden" && (
        <ContentBox className={className}>
          <Box
            $rounded={rounded}
            $isError={isError || undefined}
            $isWarning={isWarning || undefined}
            $focus={focus}
            withFilter={withFilter}
            $inputBgColor={inputBgColor}
            $disabled={disabled}
          >
            {iconBefore && (
              <Before>
                <Icon
                  name={iconBefore}
                  color={theme.colors.primary}
                  size={theme.font.size.normal}
                  margin={focus || text?.length ? "15px 0 0 0" : "0px 0 0 0"}
                />
              </Before>
            )}
            <Container>
              <input
                ref={inputRef}
                type={showPassword ? "text" : type}
                onChange={handleChange}
                value={text || ""}
                data-value={dataValue}
                name={name}
                autoComplete={autoComplete || name}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                disabled={disabled}
                required={required}
                readOnly={readOnly}
                {...rest}
              />
              {placeholder && (
                <Label $iconBefore={iconBefore} $disabled={disabled}>
                  {placeholder && placeholder}{" "}
                  {required && <span className="asterisk">*</span>}
                </Label>
              )}
            </Container>
            {cleared}
            {after}
          </Box>
          {errorMessage}
        </ContentBox>
      )
    );
  },
);

Input.displayName = "Input";

export default React.memo(Input);

Input.propTypes = {
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
  type: PropTypes.string,
  withFilter: PropTypes.bool,
};

const isError = css`
  border: 2px solid ${({ theme }) => theme.colors.error};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  .error-msg {
    background: ${({ theme }) => theme.colors.errorLight};
    border-radius: 12px;
    width: 100%;
    margin-top: 4px;
    padding: ${({ theme }) => `${theme.spaces.space1} ${theme.spaces.space2}`};
    font-size: ${({ theme }) => theme.font.size.minor};
    font-weight: 500;
    display: flex;
    align-items: center;
  }
`;

const Box = styled.div<{
  $rounded: boolean;
  $isError: any;
  $isWarning: any;
  $focus: any;
  withFilter?: boolean;
  $inputBgColor?: string;
  $disabled?: boolean;
}>`
  position: relative;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  min-height: ${({ theme }) => theme.spaces.space10};
  background: ${({ $inputBgColor, $disabled, theme }) =>
    $disabled ? theme.colors.whiteSmoke : $inputBgColor};
  width: 100%;
  padding: 0 12px;
  border: 1px solid
    ${({ $isError, $isWarning, $focus, $disabled, theme }) =>
      $isWarning
        ? theme.colors.warning
        : $disabled
          ? theme.colors.grey
          : $focus
            ? theme.colors.primary
            : theme.colors.disabled};
  ${({ $isError }) => $isError && isError}
  border-radius: ${({ theme, $rounded }) =>
    $rounded ? theme.extra.radiusRound : theme.extra.radiusBig};
  input {
    box-sizing: border-box;
    background: transparent;
    width: 100%;
    border: 0;
    color: ${({ theme }) => theme.colors.primaryDark};
    color: ${({ theme, $isWarning }) => $isWarning && theme.colors.warningDark};
    color: ${({ theme, $isError }) => $isError && theme.colors.error};
    min-height: ${({ theme }) => theme.spaces.space7};
    padding: 0;
    font-weight: ${({ theme }) => theme.font.weight.medium};
    font-size: ${({ theme }) => theme.font.size.normal};
    transition: ${({ theme }) => theme.extra.transition};
    margin-top: 12px;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: ${({ withFilter, theme }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
    &:-ms-input-placeholder {
      color: ${({ withFilter, theme }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
    &::-ms-input-placeholder {
      color: ${({ withFilter, theme }) =>
        withFilter ? theme.colors.black : theme.colors.lightGrey};
      font-size: ${({ theme }) => theme.font.size.tiny};
    }
  }
  input:focus + label,
  input:not([data-value="false"]) + label {
    transform: translateY(-12px);
    font-size: ${({ theme }) => theme.font.size.small};
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.dark} !important;
    font-weight: 400;
    font-size: ${({ theme }) => theme.font.size.small};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  input:-webkit-autofill + label,
  input:-webkit-autofill:focus + label {
    transform: translateY(-12px);
  }
  input:disabled {
    cursor: default;
    color: ${({ theme }) => theme.colors.grey};
  }

  input[type="search"]::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg)
      no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
  }

  input[type="search"]:focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
  }

  input[type="search"]::-webkit-search-cancel-button {
    cursor: pointer;
    display: none;
  }
  .pointer {
    cursor: pointer;
    font-size: ${({ theme }) => theme.font.size.mini};
    color: ${({ theme }) => theme.colors.lightGrey};
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
  display: flex;
  margin-left: ${({ theme }) => theme.spaces.space2};
`;

const Before = styled.div`
  margin-right: 7px;
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
  .asterisk {
    color: ${({ theme }) => theme.colors.primary};
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    font-size: ${({ theme }) => theme.font.size.tiny};
  }
`;
