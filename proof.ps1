$repo = Get-Location
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$repoName = Split-Path $repo -Leaf
$archiveName = "$repoName-$timestamp.zip"
$hashFile = "$repoName-$timestamp.sha256"
$otsFile = "$hashFile.ots"

git rev-parse HEAD > "latest_commit_$timestamp.txt"
Compress-Archive -Path "$repo\*" -DestinationPath $archiveName
Get-FileHash $archiveName -Algorithm SHA256 | ForEach-Object { $_.Hash } > $hashFile
ots stamp $hashFile

Write-Host "`n✅ Proof generated:"
Write-Host "• Commit: latest_commit_$timestamp.txt"
Write-Host "• Zip Archive: $archiveName"
Write-Host "• Hash: $hashFile"
Write-Host "• OpenTimestamps proof: $otsFile"

Write-Host "`n📩 Now email all 4 files to yourself or store them in Google Drive / ProtonMail for legal proof."

