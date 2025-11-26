@echo off
echo ========================================
echo Testing FamilyEcho Backend API
echo ========================================
echo.

echo Testing Members Endpoint...
echo URL: http://localhost:8081/api/members
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/members' -UseBasicParsing; Write-Host 'SUCCESS: Backend is running!' -ForegroundColor Green; Write-Host 'Response:' $response.Content; } catch { Write-Host 'FAILED: Backend is not responding' -ForegroundColor Red; Write-Host $_.Exception.Message }"
echo.

echo Testing Relationships Endpoint...
echo URL: http://localhost:8081/api/relationships
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/relationships' -UseBasicParsing; Write-Host 'SUCCESS: Relationships endpoint working!' -ForegroundColor Green; Write-Host 'Response:' $response.Content; } catch { Write-Host 'FAILED: Relationships endpoint not responding' -ForegroundColor Red; Write-Host $_.Exception.Message }"
echo.

echo Testing Memories Endpoint...
echo URL: http://localhost:8081/api/memories
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8081/api/memories' -UseBasicParsing; Write-Host 'SUCCESS: Memories endpoint working!' -ForegroundColor Green; Write-Host 'Response:' $response.Content; } catch { Write-Host 'FAILED: Memories endpoint not responding' -ForegroundColor Red; Write-Host $_.Exception.Message }"
echo.

echo ========================================
echo Test Complete!
echo ========================================
pause
