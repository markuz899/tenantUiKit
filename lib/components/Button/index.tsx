import React, { Children, useState } from "react";
import PropTypes from "prop-types";
import { StyledButton, A, availableKinds, KIND } from "./styled";
import Icon from "../Icon";
import { availableIcons } from "../Icon/icons";
import { ButtonProps } from "./interface";
import { useTheme } from "styled-components";
/* eslint-disable */
const Button: React.FC<ButtonProps> = ({
  label = "",
  children,
  kind = "primary",
  href,
  icon,
  iconSize = "1rem",
  reverse = false,
  round = false,
  size = "md",
  fluid = false,
  className,
  loading = false,
  loadingColor,
  type,
  ...rest
}) => {
  const theme = useTheme();
  const [isClicked, setIsClicked] = useState<boolean>(false);
  type KindKeys = keyof typeof KIND;
  type HeightKeys = keyof typeof theme.height;
  let buttonKind: KindKeys = kind;
  let buttonSize: HeightKeys = size;

  if (kind && !availableKinds.includes(kind)) buttonKind = "primary";

  let inner: React.ReactNode[] | string | any = children
    ? Children.toArray(children)
    : label;

  if (icon && availableIcons.includes(icon)) {
    inner = (
      <>
        <span>
          <Icon size={iconSize} name={icon} />
        </span>
        {label}
      </>
    );
  }

  if (loading) {
    inner = (
      <div className="loader">
        <svg
          version="1.1"
          id="L4"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enableBackground="new 0 0 0 0"
        >
          <circle
            fill={loadingColor ? loadingColor : "#fff"}
            stroke="none"
            cx="30"
            cy="50"
            r="6"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.1"
            />
          </circle>
          <circle
            fill={loadingColor ? loadingColor : "#fff"}
            stroke="none"
            cx="50"
            cy="50"
            r="6"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.2"
            />
          </circle>
          <circle
            fill={loadingColor ? loadingColor : "#fff"}
            stroke="none"
            cx="70"
            cy="50"
            r="6"
          >
            <animate
              attributeName="opacity"
              dur="1s"
              values="0;1;0"
              repeatCount="indefinite"
              begin="0.3"
            />
          </circle>
        </svg>
      </div>
    );
  }

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleMouseLeave = () => {
    setIsClicked(false);
  };

  let button = (
    <StyledButton
      {...rest}
      type={type}
      kind={buttonKind}
      reverse={reverse || undefined}
      $round={round || undefined}
      $fluid={fluid || undefined}
      size={buttonSize}
      className={`${className ? className : ""} ${isClicked ? "clicked" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
    >
      {inner}
    </StyledButton>
  );

  if (href) {
    button = (
      <A
        {...rest}
        className={className}
        $fluid={fluid}
        href={href}
        kind={buttonKind}
        reverse={reverse}
        $round={round}
        size={buttonSize}
      >
        {inner}
      </A>
    );
  }

  return button;
};

Button.propTypes = {
  kind: PropTypes.any,
  icon: PropTypes.oneOf(availableIcons),
  size: PropTypes.any,
  iconSize: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
  round: PropTypes.bool,
  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
};

export default Button;
