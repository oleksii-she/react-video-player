import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { IconLike } from "./icons/Icons";
import { useState } from "react";
import { useStore } from "../store/store";
import { calculationRating } from "./utils/calculationRating";

export const Rating = observer(() => {
  const [ratingToggle, setRatingToggle] = useState(null);
  const store = useStore();

  const { getRatings, setRating } = store;

  const { numberPositive, numberNegative, totalPercentage } = calculationRating(
    getRatings.ratings ? getRatings.ratings : []
  );

  useEffect(() => {
    if (getRatings.userChecked === 0 || getRatings.userChecked === 1) {
      setRatingToggle(getRatings.userChecked);
    } else {
      setRatingToggle(null);
    }
  }, [getRatings.userChecked]);

  return (
    <div className={`rating-wrapper`}>
      <div>
        <button
          className={ratingToggle === 1 ? `button-like active` : "button-like"}
          onClick={() => {
            setRatingToggle(1);
            setRating(1);
          }}
        >
          <IconLike className={"like-icon"} />
        </button>
        <p>{numberPositive}</p>
      </div>
      <div>
        <button
          className={
            ratingToggle === 0 ? `button-dislike active` : "button-dislike"
          }
          onClick={() => {
            setRatingToggle(0);
            setRating(0);
          }}
        >
          <IconLike className={"dislike-icon"} />
        </button>
        <p>{numberNegative}</p>
      </div>
      {<p>{totalPercentage}% positive</p>}
    </div>
  );
});
