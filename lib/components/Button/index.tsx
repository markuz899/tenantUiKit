import { useTheme } from "../../hooks/useTheme";
import { ButtonProps } from "./interface";

const Button = ({ children, label }: ButtonProps) => {
  const { themeCurrent } = useTheme();
  console.log("from comp", themeCurrent);
  const content = children || label;
  return <button>{content}</button>;
};

export default Button;
