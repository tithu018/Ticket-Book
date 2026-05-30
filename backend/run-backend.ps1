# Purpose: Starts the Spring Boot backend using the Maven Wrapper and a local JDK.

$ErrorActionPreference = "Stop"

$javaHome = $env:JAVA_HOME

if (-not $javaHome -or -not (Test-Path (Join-Path $javaHome "bin\java.exe"))) {
    $jdk = Get-ChildItem "C:\Program Files\Java" -Directory -Filter "jdk*" -ErrorAction SilentlyContinue |
        Sort-Object Name -Descending |
        Select-Object -First 1

    if ($null -eq $jdk) {
        throw "Java JDK was not found. Install Java 17 or newer, then run this script again."
    }

    $javaHome = $jdk.FullName
}

$env:JAVA_HOME = $javaHome
$env:PATH = "$javaHome\bin;$env:PATH"

Push-Location $PSScriptRoot
try {
    & ".\mvnw.cmd" spring-boot:run
}
finally {
    Pop-Location
}
