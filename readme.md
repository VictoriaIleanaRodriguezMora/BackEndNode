Incorporar al proyecto de servidor de trabajo la compresión gzip.
Verificar sobre la ruta /info con y sin compresión, la diferencia de cantidad de bytes devueltos en un caso y otro. (\*captura sera?)
Luego implementar loggueo (con alguna librería vista en clase) que registre lo siguiente:
Ruta y método de todas las peticiones recibidas por el servidor (info)
Ruta y método de las peticiones a rutas inexistentes en el servidor (warning)
Errores lanzados (throw) (try/catch, o then catch, o callback con error) por las apis de mensajes y productos, únicamente (error)
Considerar el siguiente criterio:
Loggear todos los niveles a consola (info, warning y error)
Registrar sólo los logs de warning a un archivo llamada warn.log
Enviar sólo los logs de error a un archivo llamada error.log

---

análisis completo de performance del servidor

Luego, realizar el análisis completo de performance del servidor con el que venimos trabajando.
Vamos a trabajar sobre la ruta '/info', en modo fork, agregando ó extrayendo un console.log de la información colectada antes de devolverla al cliente. (Además desactivaremos el child_process de la ruta '/randoms'???)
Para ambas condiciones (con o sin console.log) en la ruta '/info' OBTENER:

1. El perfilamiento (profilling) del servidor, realizando el test con --prof de node.js. Analizar los resultados obtenidos luego de procesarlos con --prof-process.
   Utilizaremos como test de carga Artillery en línea de comandos, emulando 50 conexiones concurrentes con 20 request por cada una. Extraer un reporte con los resultados en archivo de texto.

---

Autocannon
Luego utilizaremos Autocannon en línea de comandos, emulando 100 conexiones concurrentes realizadas en un tiempo de 20 segundos. Extraer un reporte con los resultados (puede ser un print screen de la consola) 2) El perfilamiento del servidor con el modo inspector de node.js --inspect (en chrome). Revisar el tiempo de los procesos menos performantes sobre el archivo fuente de inspección. 3) El diagrama de flama con 0x, emulando la carga con Autocannon con los mismos parámetros anteriores.
Realizar un informe en formato pdf sobre las pruebas realizadas incluyendo los resultados de todos los test (texto e imágenes).
👉 Al final incluir la conclusión obtenida a partir del análisis de los datos.

CON GZIP:
![CON_GZIP](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/CON_GZIP.jpeg)

SIN GZIP:
![SIN_GZIP](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/SIN_GZIP.jpeg)

SINCRONO VS ASINCRONO:
![SINCRONO_ASINCRONO](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/SINCRONO_ASINCRONO.PNG)

FORK VS CLUSTER:
![FORK_CLUSTER](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/FORK_CLUSTER.PNG)

PROFILING:
![PROFILING](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/PROFILING.PNG)


AUTOCANNON - 0X BLOQUEANTE:
![PROFILING](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/FLAMA_BLOQUEANTE.PNG)

AUTOCANNON - 0X NO BLOQUEANTE:
![PROFILING](https://github.com/VictoriaIleanaRodriguezMora/BackEndNode/blob/desafio16-clase32/imgReadme/FLAMA_NO_BLOQUEANTE)