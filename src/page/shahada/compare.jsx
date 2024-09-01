function compareWords(expected, spoken) {
  const expectedWords = expected.toLowerCase().split(" ");
  const spokenWords = spoken.toLowerCase().split(" ");
  let correctCount = 0;

  spokenWords.forEach((word, index) => {
    if (word === expectedWords[index]) {
      correctCount++;
    }
  });

  const correctPercentage = (correctCount / expectedWords.length) * 100;
  return correctPercentage >= 50;
}

export default compareWords;
