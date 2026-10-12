param(
    [Parameter(Mandatory)] [string] $FrontendUrl,
    [Parameter(Mandatory)] [string] $ApiUrl
)
$ErrorActionPreference = 'Stop'
$FrontendUrl = $FrontendUrl.TrimEnd('/')
$ApiUrl = $ApiUrl.TrimEnd('/')
foreach ($url in @($FrontendUrl, $ApiUrl)) {
    if (([uri]$url).Scheme -ne 'https') { throw 'Live deployments must use HTTPS.' }
}
$site = Invoke-WebRequest -Uri $FrontendUrl -TimeoutSec 120
if ($site.StatusCode -ne 200) { throw 'Frontend did not return HTTP 200.' }
$health = Invoke-RestMethod -Uri "$ApiUrl/health" -TimeoutSec 120
if ($health.status -ne 'healthy') { throw 'API health check failed.' }
$ready = Invoke-RestMethod -Uri "$ApiUrl/health/ready" -TimeoutSec 120
if ($ready.database -ne 'connected') { throw 'Database readiness check failed.' }
$menu = @(Invoke-RestMethod -Uri "$ApiUrl/api/menu" -TimeoutSec 120)
if ($menu.Count -eq 0) { throw 'Database menu is empty.' }
$cors = Invoke-WebRequest -Uri "$ApiUrl/api/menu" -Method Options -Headers @{
    Origin = $FrontendUrl
    'Access-Control-Request-Method' = 'GET'
} -TimeoutSec 120
if ($cors.Headers['Access-Control-Allow-Origin'] -ne $FrontendUrl) {
    throw 'CORS does not allow the frontend origin.'
}
Write-Output "PASS: frontend HTTP 200; API healthy; database connected; $($menu.Count) menu items; CORS allows frontend."
