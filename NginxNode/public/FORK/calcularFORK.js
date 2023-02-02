function generateNumbersFork(numToGenerate) {

     let arrRandomNumbers = []
     for (let i = 0; i < numToGenerate; i++) {
          const randomNumber = Math.round(Math.random() * numToGenerate)
          const toPush = { [i]: randomNumber }
          arrRandomNumbers.push(toPush)

     }

     console.log(arrRandomNumbers);
     return arrRandomNumbers

}
// SI O SI tiene que ser message por donde se comunicanm
process.on("message", async (numFromFatherFork) => {
     console.log("process.on CALCULAR");
     console.log("numFromFatherFork", numFromFatherFork);
     const randomNumber = generateNumbersFork(numFromFatherFork)
     process.send(randomNumber)


});
