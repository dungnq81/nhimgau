param (
    [int]$Port = 8080
)

# .\check-port.ps1 -Port 8080 --> check port 8080
# powershell -ExecutionPolicy Bypass -File .\check-port.ps1 -Port 8080
# Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

Write-Host "Checking port $Port ..."

$connection = Get-NetTCPConnection -LocalPort $Port -ErrorAction SilentlyContinue

if ($connection) {
    $targetPid = $connection.OwningProcess
    $process = Get-Process -Id $targetPid

    Write-Host "Port $Port is currently in use by:"
    Write-Host "   - PID: $targetPid"
    Write-Host "   - Process name: $($process.ProcessName)"
} else {
    Write-Host "Port $Port is free."
}
