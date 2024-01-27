import { FC } from "react";
import StarEmpty from "~/assets/star-empty.svg?react";
import Star from "~/assets/star.svg?react";

type RatingProps = {
  value: number;
  max?: number;
};
/**
 * Rating component shows how many stars the product has received.
 * Usage: <Rating value={4} max={5} />
 */
export const Rating: FC<RatingProps> = ({ value, max = 5 }) => {
  return Array(max)
    .fill(1)
    .map((_, idx) => {
      const current = idx + 1;
      if (current <= value) {
        return <Star key={idx} />;
      }
      return <StarEmpty key={idx} />;
    });
};
