class Calculadora {
  sumar(a, b) {
    const resultado = a + b;
    return resultado;
  }
}

function checkTestCalculador(test, a, b, expected) {
  if (typeof a != "number" || typeof b != "number") {
    console.log(`TEST OK test: ${a} or ${b} not number so It is a valid ERROR`);
    return "ERROR";
  }

  const calculadoraMock = new Calculadora();
  switch (test) {
    case "calculadora/sumar":
      if (calculadoraMock.sumar(a, b) == expected) {
        console.log(`TEST OK test: ${a} ${test} ${b}  == ${expected} `);
      } else {
        console.error(`TEST WRONG test: ${a} ${test} ${b} != ${expected} `);
      }
      break;
    case "calculadora/restar":
      break;
    case "calculadora/multiplicar":
      break;
    case "calculadora/dividir":
      break;
  }
}

checkTestCalculador("calculadora/sumar", 10, 10, 20);
checkTestCalculador("calculadora/sumar", -50, 10, -40);
checkTestCalculador("calculadora/sumar", "10", 10, "ERROR");
checkTestCalculador("calculadora/sumar", "10,999", 10, "ERROR");
