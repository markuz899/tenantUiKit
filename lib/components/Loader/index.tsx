import styled, { css } from "styled-components";
const Loader = ({ isActive = true, debug = false, type = "spin" }: any) => {
  return (
    <LoadStyle $isActive={isActive} $debug={debug} type={type}>
      <div className={type}></div>
    </LoadStyle>
  );
};

export default Loader;

const LoadStyle = styled.div<{
  $isActive?: boolean;
  $debug?: boolean;
  type: string;
}>`
  z-index: 1099;
  position: ${(p) => (p.$debug ? "relative" : "fixed")};
  top: 0;
  left: 0;
  width: 100%;
  height: 100svh;
  background-image: ${`linear-gradient(120deg, ${({ theme }: any) => theme.colors.primaryLight} 0%, ${({ theme }: any) => theme.colors.primaryDark} 100%)`};
  display: ${(p) => (p.$isActive ? "flex" : "none")};
  align-items: center;
  justify-content: center;
  ${(p) => typeStyles[p.type]}
`;

const spin = css`
  .spin {
    border: 10px solid ${({ theme }) => theme.colors.white};
    border-top: 10px solid ${({ theme }) => theme.colors.error};
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const glue = css`
  .glue {
    width: 80px;
    height: 80px;
    display: inline-block;
    position: relative;
  }
  .glue::after,
  .glue::before {
    content: "";
    box-sizing: border-box;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.white};
    position: absolute;
    left: 0;
    top: 0;
    animation: animloader 2s linear infinite;
  }
  .glue::after {
    animation-delay: 1s;
  }
  @keyframes animloader {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
`;
const three = css`
  .three {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: block;
    margin: 15px auto;
    position: relative;
    background: ${({ theme }) => theme.colors.white};
    box-shadow:
      -24px 0 ${({ theme }) => theme.colors.white},
      24px 0 ${({ theme }) => theme.colors.white};
    box-sizing: border-box;
    animation: shadowPulse 2s linear infinite;
  }

  @keyframes shadowPulse {
    33% {
      background: ${({ theme }) => theme.colors.white};
      box-shadow:
        -24px 0 ${({ theme }) => theme.colors.error},
        24px 0 ${({ theme }) => theme.colors.white};
    }
    66% {
      background: ${({ theme }) => theme.colors.error};
      box-shadow:
        -24px 0 ${({ theme }) => theme.colors.white},
        24px 0 ${({ theme }) => theme.colors.white};
    }
    100% {
      background: ${({ theme }) => theme.colors.white};
      box-shadow:
        -24px 0 ${({ theme }) => theme.colors.white},
        24px 0 ${({ theme }) => theme.colors.error};
    }
  }
`;
const pin = css`
  .pin {
    width: 48px;
    height: 48px;
    display: block;
    margin: 20px auto;
    box-sizing: border-box;
    position: relative;
  }
  .pin::after {
    content: "";
    box-sizing: border-box;
    width: 48px;
    height: 48px;
    left: 0;
    bottom: 0;
    position: absolute;
    border-radius: 50% 50% 0;
    border: 15px solid ${({ theme }) => theme.colors.white};
    transform: rotate(45deg) translate(0, 0);
    box-sizing: border-box;
    animation: animMarker 0.4s ease-in-out infinite alternate;
  }
  .pin::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    top: 150%;
    width: 24px;
    height: 4px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    animation: animShadow 0.4s ease-in-out infinite alternate;
  }

  @keyframes animMarker {
    0% {
      transform: rotate(45deg) translate(5px, 5px);
    }
    100% {
      transform: rotate(45deg) translate(-5px, -5px);
    }
  }

  @keyframes animShadow {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
`;
const qubik = css`
  .qubik {
    width: 64px;
    height: 64px;
    position: relative;
    background-image: ${`linear-gradient(#fff 16px, transparent 0),
      linear-gradient(${({ theme }: any) => theme.colors.error} 16px, transparent 0),
      linear-gradient(${({ theme }: any) => theme.colors.error} 16px, transparent 0),
      linear-gradient(${({ theme }: any) => theme.colors.white} 16px, transparent 0);`};
    background-repeat: no-repeat;
    background-size: 16px 16px;
    background-position:
      left top,
      left bottom,
      right top,
      right bottom;
    animation: rotate 1s linear infinite;
  }
  @keyframes rotate {
    0% {
      width: 64px;
      height: 64px;
      transform: rotate(0deg);
    }
    50% {
      width: 30px;
      height: 30px;
      transform: rotate(180deg);
    }
    100% {
      width: 64px;
      height: 64px;
      transform: rotate(360deg);
    }
  }
`;

const typeStyles: any = {
  spin,
  glue,
  three,
  pin,
  qubik,
};
