export const calculationRating = (ratings) => {
  if (ratings.length === 0)
    return { numberPositive: 0, numberNegative: 0, totalPercentage: 0 };

  const numberPositive = ratings.filter((rating) => rating === 1).length;
  const numberNegative = ratings.filter((rating) => rating === 0).length;
  const calc = (numberPositive / ratings.length) * 100;
  const totalPercentage = Math.round(calc);

  return { numberPositive, numberNegative, totalPercentage };
};
