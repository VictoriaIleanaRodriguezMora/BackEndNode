// This returns the percentage win at normalize the objects

function percentageCalculator(weightWithoutNormalize = 2653, weightNormalize = 1871) {
  let theCount = Math.round((weightNormalize * 100) / weightWithoutNormalize)
  let finalNum = 100 - theCount
  console.log(`Se ganó un ${finalNum}%`)
  return finalNum
}

// percentageCalculator(2653, 1871)
module.export = percentageCalculator
