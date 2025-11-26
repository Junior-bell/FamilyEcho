@echo off
echo Setting JAVA_HOME to JDK 25...
set JAVA_HOME=C:\Program Files\Java\jdk-25
echo.
echo Current JAVA_HOME: %JAVA_HOME%
echo.
echo Checking for javac.exe...
dir "%JAVA_HOME%\bin\javac.exe"
echo.
echo Testing Maven...
mvn clean
