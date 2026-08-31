$repoPath = "c:\Users\SADAB EHTESHAM\Desktop\Library management system"
$intervalSeconds = 10

Write-Host "Auto-sync watcher started for: $repoPath"
Write-Host "Checking every $intervalSeconds seconds for changes..."

while ($true) {
    try {
        Set-Location $repoPath

        git add -A
        $status = git status --porcelain

        if ($status) {
            $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
            git commit -m "Auto sync at $timestamp" --allow-empty
            git push origin main
            Write-Host "Sync complete at $timestamp"
        }
    }
    catch {
        Write-Host "Auto-sync error: $($_.Exception.Message)"
    }

    Start-Sleep -Seconds $intervalSeconds
}
