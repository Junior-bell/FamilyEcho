@echo off
REM Find Java installation
for /f "tokens=*" %%i in ('where java') do set JAVA_PATH=%%i

REM Get Java home directory (remove \bin\java.exe)
for %%i in ("%JAVA_PATH%") do set JAVA_BIN=%%~dpi
for %%i in ("%JAVA_BIN:~0,-1%") do set JAVA_HOME=%%~dpi
set JAVA_HOME=%JAVA_HOME:~0,-1%

echo Using JAVA_HOME: %JAVA_HOME%

REM Run Maven with JAVA_HOME set
mvn spring-boot:run
