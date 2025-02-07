export const calculationRating = (ratings) => {
  if (ratings.length === 0) {
    const error = null;
    return { error };
  }
  const numberPositive = ratings.filter((rating) => rating === 1).length;
  const numberNegative = ratings.filter((rating) => rating === 0).length;
  const totalPercentage = (numberPositive / ratings.length) * 100;

  return { numberPositive, numberNegative, totalPercentage };
};
