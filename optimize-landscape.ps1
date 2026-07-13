$ErrorActionPreference = "Continue"
$base = "D:\personal\sky-portfolio\my_portfolio"
$input  = "$base\Landscape_optimized.glb"
$tmp1   = "$base\tmp_opt_s1.glb"
$tmp2   = "$base\tmp_opt_s2.glb"
$tmp3   = "$base\tmp_opt_s3.glb"
$tmp4   = "$base\tmp_opt_s4.glb"
$output = "$base\public\landscape_web.glb"

function Size($f) { "$([math]::Round((Get-Item $f).Length/1MB, 1)) MB" }

Write-Host "[1/5] Welding vertices (merging duplicates)..."
gltf-transform weld $input $tmp1 2>&1
Write-Host "      -> $(Size $tmp1)"

Write-Host "[2/5] Simplifying geometry to 10% of vertices..."
gltf-transform simplify $tmp1 $tmp2 --ratio 0.10 --error 1 2>&1
Write-Host "      -> $(Size $tmp2)"

Write-Host "[3/5] Resizing textures to max 512x512..."
gltf-transform resize $tmp2 $tmp3 --width 512 --height 512 2>&1
Write-Host "      -> $(Size $tmp3)"

Write-Host "[4/5] Converting textures to WebP (quality 70)..."
gltf-transform webp $tmp3 $tmp4 --quality 70 2>&1
Write-Host "      -> $(Size $tmp4)"

Write-Host "[5/5] Applying Draco geometry compression..."
gltf-transform draco $tmp4 $output 2>&1
Write-Host "      -> $(Size $output)"

Remove-Item $tmp1, $tmp2, $tmp3, $tmp4 -ErrorAction SilentlyContinue
Write-Host "DONE. Final file: $output ($(Size $output))"
