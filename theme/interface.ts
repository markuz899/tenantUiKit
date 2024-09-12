export interface ITheme {
  colors: {
    black?: string;
    body?: string;
    borderComponent?: string;
    borderTable?: string;
    dark?: string;
    darkGrey?: string;
    error?: string;
    errorDark?: string;
    errorLight?: string;
    disabled?: string;
    grey?: string;
    greyIcon?: string;
    lightDark?: string;
    lightGrey?: string;
    lightGreyMore?: string;
    navbar?: string;
    navbarText?: string;
    primary?: string;
    primaryDark?: string;
    primaryLight?: string;
    primaryLightMore?: string;
    secondary?: string;
    secondaryDark?: string;
    secondaryLight?: string;
    secondaryLightMore?: string;
    softWhite?: string;
    success?: string;
    successDark?: string;
    successLight?: string;
    warning?: string;
    warningDark?: string;
    warningLight?: string;
    white?: string;
    whiteSmoke?: string;
  };
  height: {
    ss: string;
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  font: {
    size: {
      small: string;
      mini: string;
      minor: string;
      tiny: string;
      normal: string;
      large: string;
      medium: string;
      big: string;
      xl: string;
      xxl: string;
      max: string;
    };
    weight: {
      regular: string;
      medium: string;
      bold: string;
    };
    family: {
      primary?: string;
    };
  };
  spaces: {
    space1: string;
    space2: string;
    space3: string;
    space4: string;
    space5: string;
    space6: string;
    space7: string;
    space8: string;
    space9: string;
    space10: string;
    space11: string;
    space12: string;
    space13: string;
    space14: string;
    space15: string;
    space16: string;
    space17: string;
    space20: string;
  };
  extra: {
    logo: string;
    radius: string;
    radiusBig: string;
    radiusRound: string;
    transition: string;
    transitionFluid: string;
    shadow: string;
  };
  breakpoints: {
    first: string;
    mobile: string;
    tablet: string;
  };
  zIndex: {
    zIndex0: number;
    zIndex1: number;
    zIndex2: number;
    zIndex3: number;
    zIndex4: number;
    zIndex5: number;
    zIndex6: number;
    zIndex7: number;
    zIndex8: number;
    zIndex9: number;
  };
  container: string;
}
