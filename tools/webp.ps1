# Encode PNG/JPG to WebP via headless Edge (canvas.toDataURL) - no extra tools needed.
# Usage: powershell -File tools\webp.ps1 -ImgDir <folder with png/jpg> -OutDir <output folder> [-Quality 0.82]
param([Parameter(Mandatory)][string]$ImgDir, [Parameter(Mandatory)][string]$OutDir, [double]$Quality = 0.82)
$edge = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
$work = Join-Path $env:TEMP 'bv-webp'
New-Item -ItemType Directory -Force $OutDir, $work | Out-Null
# Images go in as data URLs, otherwise file:// taints the canvas and toDataURL fails.
$items = Get-ChildItem $ImgDir -File | Where-Object { $_.Extension -in '.png', '.jpg', '.jpeg' } | ForEach-Object {
  $mime = if ($_.Extension -eq '.png') { 'image/png' } else { 'image/jpeg' }
  '{{n:"{0}",d:"data:{1};base64,{2}"}}' -f $_.BaseName, $mime, [Convert]::ToBase64String([IO.File]::ReadAllBytes($_.FullName))
}
if (-not $items) { throw "No PNG/JPG files in $ImgDir" }
$html = @"
<!doctype html><meta charset=utf-8><pre id=o></pre><script>
const L=[$($items -join ',')];
(async()=>{let out=[];for(const it of L){const im=new Image();await new Promise((ok,err)=>{im.onload=ok;im.onerror=err;im.src=it.d;});
const c=document.createElement('canvas');c.width=im.naturalWidth;c.height=im.naturalHeight;c.getContext('2d').drawImage(im,0,0);
out.push(it.n+'|'+c.width+'x'+c.height+'|'+c.toDataURL('image/webp',$Quality).split(',')[1]);}
document.getElementById('o').textContent='BEGIN\n'+out.join('\n')+'\nEND';})();
</script>
"@
$page = Join-Path $work 'job.html'
[IO.File]::WriteAllText($page, $html)
$dom = & $edge --headless=new --disable-gpu --user-data-dir="$work\profile" --virtual-time-budget=60000 --dump-dom ("file:///" + $page.Replace('\', '/')) 2>$null | Out-String
if ($dom -notmatch '(?s)BEGIN\r?\n(.*?)\r?\nEND') { throw 'Edge returned no results' }
foreach ($line in ($Matches[1] -split '\r?\n')) {
  $n, $dim, $b64 = $line -split '\|', 3
  $f = Join-Path $OutDir "$n.webp"
  [IO.File]::WriteAllBytes($f, [Convert]::FromBase64String($b64))
  '{0}.webp {1} {2}KB' -f $n, $dim, [int]((Get-Item $f).Length / 1KB)
}
