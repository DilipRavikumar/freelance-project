@echo off
set "JAVA_HOME=C:\Program Files\Java\jdk-17"
set "PATH=%JAVA_HOME%\bin;%PATH%"

echo Building Backend...
cd backend\employee-service
mvn clean install
cd ..\..

echo Building Frontend...
cd frontend
npm install
npm run build
cd ..