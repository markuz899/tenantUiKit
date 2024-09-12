import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";

const WordChanger = ({
  label,
  options = ["test", "esempio", "caso"],
  timing = 2000,
  color,
  uppercase = false,
}: {
  label?: string;
  options: any[];
  timing?: number;
  color?: string;
  uppercase?: boolean;
}) => {
  const theme = useTheme();

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [words, setWords] = useState(options);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setWords(options);
  }, [options]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(true);

      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setFade(false);
      }, 500);
    }, timing);

    return () => clearInterval(interval);
  }, []);

  return (
    <Wrapper
      $uppercase={uppercase}
      color={color}
      className={`word ${fade ? "fade" : ""}`}
    >
      {words[currentWordIndex]}
    </Wrapper>
  );
};

export default React.memo(WordChanger);

const Wrapper = styled.span<{ color?: string; $uppercase: boolean }>`
  &.word {
    transition: opacity 0.5s ease-in-out;
    display: inline-block;
    color: ${({ color, theme }) => (color ? color : theme.colors.primary)};
    text-transform: ${({ $uppercase }) =>
      $uppercase ? "uppercase" : "inherit"};
  }
  &.fade {
    opacity: 0;
  }
`;
