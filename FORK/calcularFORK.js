process.on("message", (msg) => {
    if (msg == "start") {
         process.send({ hi: true});
    }
  });
  