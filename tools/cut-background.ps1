# Packshot on white -> transparent PNG: flood-fills the white background from the edges,
# crops to the product and scales down to MaxWidth. Then run webp.ps1 on the result.
# Usage: powershell -File tools\cut-background.ps1 -In <packshot.jpg|png> -Out <file.png> [-MaxWidth 700] [-Tolerance 40]
param([Parameter(Mandatory)][string]$In, [Parameter(Mandatory)][string]$Out, [int]$MaxWidth = 700, [int]$Tolerance = 40)
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @'
using System; using System.Drawing; using System.Drawing.Imaging; using System.Collections.Generic; using System.Runtime.InteropServices;
public static class CutBackground {
  public static string Run(string inp, string outp, int maxW, int tol) {
    var b0 = new Bitmap(inp); var b = new Bitmap(b0.Width, b0.Height, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(b)) { g.Clear(Color.White); g.DrawImage(b0, 0, 0, b0.Width, b0.Height); } b0.Dispose();
    int w = b.Width, h = b.Height; var d = b.LockBits(new Rectangle(0, 0, w, h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    var px = new byte[w * h * 4]; Marshal.Copy(d.Scan0, px, 0, px.Length);
    var seen = new bool[w * h]; var q = new Queue<int>();
    for (int x = 0; x < w; x++) { q.Enqueue(x); q.Enqueue((h - 1) * w + x); }
    for (int y = 0; y < h; y++) { q.Enqueue(y * w); q.Enqueue(y * w + w - 1); }
    while (q.Count > 0) {
      int p = q.Dequeue(); if (seen[p]) continue; seen[p] = true;
      int i = p * 4; int dist = 765 - (px[i] + px[i + 1] + px[i + 2]); if (dist > tol) continue;
      px[i + 3] = (byte)Math.Min(255, dist * 255 / tol / 2); // soft edge
      int cx = p % w, cy = p / w;
      if (cx > 0) q.Enqueue(p - 1); if (cx < w - 1) q.Enqueue(p + 1); if (cy > 0) q.Enqueue(p - w); if (cy < h - 1) q.Enqueue(p + w);
    }
    int minX = w, minY = h, maxX = 0, maxY = 0;
    for (int y = 0; y < h; y++) for (int x = 0; x < w; x++) if (px[(y * w + x) * 4 + 3] > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
    Marshal.Copy(px, 0, d.Scan0, px.Length); b.UnlockBits(d);
    var crop = new Rectangle(minX, minY, maxX - minX + 1, maxY - minY + 1);
    int nw = Math.Min(maxW, crop.Width), nh = crop.Height * nw / crop.Width;
    var o = new Bitmap(nw, nh, PixelFormat.Format32bppArgb);
    using (var g = Graphics.FromImage(o)) { g.InterpolationMode = System.Drawing.Drawing2D.InterpolationMode.HighQualityBicubic; g.DrawImage(b, new Rectangle(0, 0, nw, nh), crop, GraphicsUnit.Pixel); }
    o.Save(outp, ImageFormat.Png); return outp + " " + nw + "x" + nh;
  }
}
'@
$Out = [IO.Path]::GetFullPath($Out)
New-Item -ItemType Directory -Force (Split-Path -Parent $Out) | Out-Null
[CutBackground]::Run((Resolve-Path $In).Path, $Out, $MaxWidth, $Tolerance)
