function generateNumbersFork(numToGenerate) {
     const randomNumber = Math.round(Math.random() * numToGenerate)
     return randomNumber

}
// SI O SI tiene que ser message por donde se comunicanm
process.on("message", async (numFromFatherFork) => {
     console.log("process.on CALCULAR");
     console.log("numFromFatherFork", numFromFatherFork);
     const randomNumber = generateNumbersFork(numFromFatherFork)
     process.send(randomNumber)


});
