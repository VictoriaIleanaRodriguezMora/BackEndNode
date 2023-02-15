1. Server prendido FORK:
npm start 2000 FORK
2. En otra CMD:
VECES - USUARIOS = 50 * 40 = 2000 REQ
artillery quick --count 50 -n 40 http://localhost:2000?max=10000 > result_fork.txt

1. Server prendido CLUSTER:
npm start 2000 CLUSTER
2. En otra CMD:
artillery quick --count 50 -n 40 http://localhost:2000?max=10000 > result_cluster.txt

Para ser esto aun mas rapido, se puede meter asincronia

PM2 está mas orientado a monitoreo, pero no es una herramienta de analisis de rendimiento.

node --prof servArt.js 
HASTA QUE NO SE PAGA EL SERVIDOR NO SE PUEDE VER EL ARCHIVO QUE ESTE COMANDO CREA

curl -X GET "http://localhost:8080/newUser?username=marian&password=qwerty123"
artillery quick --count 10 -n 50 "http://localhost:8080/auth-bloq?username=marian&password=qwerty123" > result_bloq.txt


curl -X GET "http://localhost:8080/newUser?username=dani&password=qwerty123"
artillery quick --count 10 -n 50 "http://localhost:8080/auth-nobloq?username=dani&password=qwerty123" > result_nobloq.txt


node --prof-process bloq.log > PROFILING_bloq.txt
node --prof-process no-bloq.log > PROFILING_nobloq.txt

INSPECTOR CHROME
chrome://inspect/#devices

para usar el progfiling de node:
node --inspect servArt.js




