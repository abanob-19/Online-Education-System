import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

function StarRating(props) {
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label>
            <input
              className="starRadio"
              
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => {
                props.onChanged(props.cID, ratingValue);
                setRating(ratingValue);
              }}
              //   onClick={() => {
              //     rateClick(c._id, rating);
              //   }}
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
}

export default StarRating;