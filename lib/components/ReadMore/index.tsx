import { useState } from "react";
import styled from "styled-components";
import Icon from "../Icon";

const ReadMore = ({
  text,
  max = 700,
  active = true,
}: {
  text: string;
  max?: number;
  active?: boolean;
}) => {
  const [isReadMore, setIsReadMore] = useState(active);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <ReadStyle>
      {isReadMore ? text.slice(0, max) : text}
      {text.length > max && (
        <span
          className="text-primary"
          onClick={toggleReadMore}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleReadMore();
            }
          }}
        >
          {isReadMore ? (
            <ReadMoreContent>
              mostra di più
              <Icon name="arrow-down" />
            </ReadMoreContent>
          ) : (
            <ReadMoreContent>
              mostra di meno
              <Icon name="arrow-top" />
            </ReadMoreContent>
          )}
        </span>
      )}
    </ReadStyle>
  );
};

export default ReadMore;

const ReadStyle = styled.p`
  line-height: 1.3;
  span {
    cursor: pointer;
  }
`;

const ReadMoreContent = styled.span`
  gap: 8px;
  display: inline-flex;
  align-items: center;
  text-transform: uppercase;
  font-weight: ${({ theme }) => theme.font.weight.bold};
  color: ${({ theme }) => theme.colors.primary};
  svg {
    fill: ${({ theme }) => theme.colors.primary};
  }
`;
