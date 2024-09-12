import React, { useState, useEffect } from "react";
import styled, { useTheme } from "styled-components";
import Icon from "../Icon";
/* eslint-disable */

export interface RatingProps {
  className?: string;
  rate?: number;
  disable?: boolean;
  numberStar?: number;
  onChange?: any;
  size?: string;
}

const Rating = ({
  className,
  rate,
  disable,
  numberStar = 5,
  onChange,
  size = "30px",
}: RatingProps) => {
  const theme = useTheme();

  const [totalStars, setTotalStars] = useState<number>(numberStar);
  const [rating, setRating] = useState<any>(rate);
  const [hover, setHover] = useState<boolean>(false);

  useEffect(() => {
    setRating(rate);
    setTotalStars(numberStar);
  }, [rate, numberStar]);

  const onSelect = (rate: number) => {
    setRating(rate);
    onChange && onChange(rate);
  };

  return (
    <ContentRating className={className || ""} $disable={disable}>
      {[...Array(totalStars)].map((star, index) => {
        const currentRating: any = index + 1;

        return (
          <label key={index}>
            <input
              key={star}
              type="radio"
              name="rating"
              value={currentRating}
              onChange={() => !disable && onSelect(currentRating)}
            />
            <span
              className="star"
              onMouseEnter={() => !disable && setHover(currentRating)}
              onMouseLeave={() => !disable && setHover(false)}
            >
              <Icon
                className="star"
                name="star"
                size={size}
                color={
                  currentRating <= (hover || rating)
                    ? theme.colors.warning
                    : theme.colors.greyIcon
                }
              />
            </span>
          </label>
        );
      })}
    </ContentRating>
  );
};

export default React.memo(Rating);

const ContentRating = styled.div<any>`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 0;
  input[type="radio"] {
    display: none;
  }
  .star {
    display: block;
    cursor: ${(p) => (p.$disable ? "default" : "pointer")};
    font-size: 2rem;
  }
`;
