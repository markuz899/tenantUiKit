import React, { useState, useRef, useCallback } from "react";
import styled, { css, useTheme } from "styled-components";
import Icon from "../Icon";
import { AccordionProps, AccordionItemProps } from "./interface";

const AccordionBox: React.FC<AccordionProps> = ({
  options,
  inline = false,
  multipleOpen = false,
  withTruncate = false,
}) => {

  const theme = useTheme();

  const [clicked, setClicked] = useState<number | null>(null);
  const [clickeds, setClickeds] = useState<number[]>([]);

  const handleToggle = (index: number) => {
    if (clicked === index) {
      return setClicked(null);
    }
    setClicked(index);
  };

  const handleMultiToggle = (index: number) => {
    if (clickeds.includes(index)) {
      const updatedClickeds: number[] = clickeds.filter((el) => el !== index);
      setClickeds(updatedClickeds);
    } else {
      const updatedClickeds: number[] = [...clickeds, index];
      setClickeds(updatedClickeds);
    }
  };

  const isActive = useCallback(
    (index: number) => {
      if (!multipleOpen) {
        return clicked === index;
      } else {
        return clickeds.includes(index);
      }
    },
    [clicked, clickeds, multipleOpen]
  );

  return (
    <ContentAccordion $inline={inline}>
      {options?.map((faq, index: number) => (
        <AccordionItem
          $withTruncate={withTruncate}
          onToggle={() =>
            !multipleOpen ? handleToggle(index) : handleMultiToggle(index)
          }
          active={isActive(index)}
          key={index}
          faq={faq}
        />
      ))}
    </ContentAccordion>
  );
};

export default AccordionBox;

const AccordionItem: React.FC<AccordionItemProps> = ({
  faq,
  active,
  onToggle,
  $withTruncate,
}) => {

  const theme = useTheme();

  const { question, answer } = faq;
  const contentEl = useRef<HTMLDivElement>(null);

  return (
    <li className={`accordion_item ${active ? "active" : ""}`}>
      <button className={`button ${active ? "active" : ""}`} onClick={onToggle}>
        <p className={$withTruncate ? "truncate" : "w-100"}>{question}</p>
        {faq?.renderIcon ? (
          faq?.renderIcon
        ) : (
          <Icon
            name={active ? "angle-top" : "angle-down"}
            size={theme.spaces.space4}
            color={theme.colors.primary}
          />
        )}
      </button>
      <div
        ref={contentEl}
        className="answer_wrapper"
        style={
          active
            ? { height: contentEl.current?.scrollHeight }
            : { height: "0px" }
        }
      >
        <div
          className="answer"
          dangerouslySetInnerHTML={{ __html: answer }}
        ></div>
      </div>
    </li>
  );
};

const ContentAccordion = styled.ul<{ $inline: boolean }>`
  width: 100%;
  list-style: none;
  overflow-y: hidden;
  border: 2px solid ${({theme}) => theme.colors.dark};
  border-radius: ${({theme}) => theme.extra.radiusBig};
  ${(props) => props.$inline && InlineStyle}
  .accordion_item {
    border-radius: ${({theme}) => theme.extra.radius};
    &:last-child {
    }
    .button {
      position: relative;
      width: 100%;
      font-size: ${({theme}) => theme.font.size.normal};
      color: ${({theme}) => theme.colors.dark};
      text-transform: uppercase;
      text-align: left;
      background: ${({ theme }) => theme.body};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${({theme}) => theme.spaces.space5} ${({theme}) => theme.spaces.space6};
      z-index: 2;
      transition: all 0.5s;
      cursor: pointer;
      &.active {
        p {
          color: ${({theme}) => theme.colors.primary};
        }
      }
    }
    .answer {
      color: ${({theme}) => theme.colors.dark};
      font-size: ${({theme}) => theme.font.size.normal};
      padding: ${({theme}) => theme.spaces.space4} ${({theme}) => theme.spaces.space6};
      background: ${({theme}) => theme.colors.greyIcon};
    }

    .answer_wrapper {
      /* margin-top: -4px; */
      border-bottom: ${({$inline, theme}) =>
        $inline ? "none" : `2px solid ${theme.colors.dark}`};
      position: relative;
      height: 0;
      overflow: hidden;
      transition: height ease 0.2s;
      text-align: left;
      z-index: 1;
    }
    &:last-child {
      button {
        border-bottom: none;
      }
      .answer_wrapper {
        border-bottom: none;
      }
    }
  }
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    .accordion_item {
      button {
        p {
          font-size: ${({theme}) => theme.font.size.tiny};
        }
      }
      .answer {
        font-size: ${({theme}) => theme.font.size.tiny};
      }
    }
  }
`;

const InlineStyle = css`
  display: flex;
  gap: ${({theme}) => theme.spaces.space2};
  @media only screen and (max-width: ${({theme}) => theme.breakpoints.mobile}) {
    flex-direction: column;
    gap: 0;
  }
`;
