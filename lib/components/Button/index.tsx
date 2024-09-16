import PropTypes from "prop-types";
import React, { Children, useState } from "react";
import { useTheme } from "styled-components";
import Icon from "../Icon";
import { availableIcons } from "../Icon/icons";
import { ButtonProps } from "./interface";
import { A, availableKinds, EmptyIcon, KIND, StyledButton } from "./styled";
/* eslint-disable */
const Button: React.FC<ButtonProps> = ({
  label = "",
  children,
  kind = "primary",
  link = false,
  iconLeft = "",
  iconRight = "",
  icon,
  iconSize = "24px",
  reverse = false,
  round = true,
  size = "md",
  fluid = false,
  className = "",
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

  if (kind && !availableKinds.includes(kind)) {
    buttonKind = "primary";
  }

  let inner: React.ReactNode[] | string | JSX.Element = children
    ? Children.toArray(children)
    : label;

  let content: React.ReactNode[] | string | JSX.Element = children
    ? Children.toArray(children)
    : label;

  if (icon && availableIcons.includes(icon)) {
    inner = (
      <span>
        <Icon size={iconSize} name={icon} />
      </span>
    );
  }

  if (iconLeft && availableIcons.includes(iconLeft)) {
    inner = (
      <>
        <span>
          <Icon size={iconSize} name={iconLeft} />
        </span>
        {content}
        {!link && <EmptyIcon />}
      </>
    );
  }

  if (iconRight && availableIcons.includes(iconRight)) {
    inner = (
      <>
        {!link && <EmptyIcon />}
        {content}
        <span>
          <Icon size={iconSize} name={iconRight} />
        </span>
      </>
    );
  }

  if (
    iconLeft &&
    availableIcons.includes(iconLeft) &&
    iconRight &&
    availableIcons.includes(iconRight)
  ) {
    inner = (
      <>
        <span>
          <Icon size={iconSize} name={iconLeft} />
        </span>
        {content}
        <span>
          <Icon size={iconSize} name={iconRight} />
        </span>
      </>
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
      $reverse={reverse || undefined}
      $round={round}
      $fluid={fluid || undefined}
      size={buttonSize}
      className={`${className} ${isClicked ? "clicked" : ""}`}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      icon={icon}
      $iconLeft={iconLeft}
      $iconRight={iconRight}
    >
      {inner}
    </StyledButton>
  );

  if (link) {
    let currentKind = `${buttonKind}-link` as KindKeys;
    button = (
      <A
        {...rest}
        className={className}
        $fluid={fluid}
        $link={link}
        kind={currentKind}
        $reverse={reverse}
        $round={round}
        size={buttonSize}
        icon={icon}
        $iconLeft={iconLeft}
        $iconRight={iconRight}
      >
        {inner}
      </A>
    );
  }

  return button;
};

Button.propTypes = {
  kind: PropTypes.any,
  iconLeft: PropTypes.oneOf(availableIcons),
  iconRight: PropTypes.oneOf(availableIcons),
  size: PropTypes.any,
  iconSize: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.node,
  link: PropTypes.bool,
  onClick: PropTypes.func,
  reverse: PropTypes.bool,
  round: PropTypes.bool,
  fluid: PropTypes.bool,
  loading: PropTypes.bool,
  loadingColor: PropTypes.string,
};

export default Button;
