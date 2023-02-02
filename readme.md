cd NginxNode/public 

pm2 start server.js --name="CLUSTER" --watch -i max -- 8082

pm2 start server.js --name="FORK" --watch -- 8081

Dentro de la carpeta base de todo el proyecto donde esta nginx.exe ejecutar este comando:
nginx usando cmd
./nginx.exe 

