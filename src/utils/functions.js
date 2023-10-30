export const calculateMean = values => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

export const calculateMedian = values => {
  if (values.length === 0) return 0;
  const sortedValues = values.slice().sort((a, b) => a - b);
  const middle = Math.floor(sortedValues.length / 2);
  if (sortedValues.length % 2 === 0) {
    return (sortedValues[middle - 1] + sortedValues[middle]) / 2;
  } else {
    return sortedValues[middle];
  }
};

export const calculateMode = values => {
  if (values.length === 0) return 0;
  const valueCount = {};
  values.forEach(value => {
    valueCount[value] = (valueCount[value] || 0) + 1;
  });
  let mode = [];
  let maxCount = 0;
  for (const value in valueCount) {
    if (valueCount[value] > maxCount) {
      mode = [parseFloat(value)];
      maxCount = valueCount[value];
    } else if (valueCount[value] === maxCount) {
      mode.push(parseFloat(value));
    }
  }
  return mode;
};
