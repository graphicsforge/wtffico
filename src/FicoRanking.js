
// These scores were taken from https://www.experian.com/blogs/ask-experian/credit-education/score-basics/what-is-a-good-credit-score/
// Update this Look-up-table as better info becomes available
const percentageLUT = [
  { score: 300, percent: 0 },
  { score: 579, percent: 17 },
  { score: 669, percent: 37.2 },
  { score: 739, percent: 58.7 },
  { score: 700, percent: 76.9 },
  { score: 850, percent: 100 },
];

class FicoRanking {
  static getPercentage(score, keyframeLUT = percentageLUT) {
    // keyframe lut should be built in ascending order, but cheap to ensure
    const keyframes = keyframeLUT.sort((a, b) => (a.score - b.score));
    // cap to 0 if below of the range of scores we have values for
    if (score <= keyframes[0].score) return 0;
    // find closest 2 keyframes for linear interpolate
    for (let i = 0; i < keyframes.length - 2; i += 1) {
      if (score < keyframes[i + 1].score) {
        // linear interpolation
        const scoreDiff = keyframes[i + 1].score - keyframes[i].score;
        const percentDiff = keyframes[i + 1].percent - keyframes[i].percent;
        const position = (score - keyframes[i].score) / scoreDiff;
        let percentage = (position * percentDiff) + keyframes[i].percent;
        percentage = Math.round(percentage * 10) / 10;
        return percentage;
      }
    }
    // cap to 100 if above of the range of scores we have values for
    return 100;
  }
}

module.exports = FicoRanking;
