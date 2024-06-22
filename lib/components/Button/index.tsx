import { ButtonProps } from "./interface";

const Button = ({ children, label }: ButtonProps) => {
  const content = children || label;
  return <button>{content}</button>;
};

export default Button;
