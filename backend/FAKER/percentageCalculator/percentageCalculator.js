// This returns the percentage win at normalize the objects
// 1. SIN NORMALIZAR, 2. NORMALIZADO
function percentageCalculator(weightWithOutNormalize = 2653, weightNormalize = 1871) {
  let theCount = Math.round((weightNormalize * 100) / weightWithOutNormalize)
  let finalNum = 100 - theCount
  console.log(`Se ganó un ${finalNum}%`)
  return finalNum
}

// percentageCalculator(2653, 1871)
module.exports = { percentageCalculator }
