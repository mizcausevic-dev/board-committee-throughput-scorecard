$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Committee Throughput Scorecard", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for committee throughput" -Subtitle "One executive brief for agenda overflow, decision-slot scarcity, escalation turnover, and board confidence." -Bullets @(
  "The overview keeps constrained lanes, scheduling moves, and unresolved decision bottlenecks visible in one committee-safe surface.",
  "Leadership can see where adding a slot, reordering an agenda, escalating ownership, or deferring scope would recover board-safe decision speed.",
  "This layer turns scattered committee drag into one board-ready scheduling packet instead of another manual synthesis cycle."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Throughput lane keeps owner, audience, scheduling theme, and next move connected" -Subtitle "Every route retains the owner, audience, scheduling action, throughput theme, slot counts, and board confidence." -Bullets @(
  "The throughput-lane view makes it obvious which systems are slowing because of committee pressure and which ones need more decision capacity before another board meeting.",
  "Board questions stay attached to actual throughput themes instead of vague operating language.",
  "Leadership can tighten the scheduling packet before the next board, investor, or operating review begins."
) -OutputPath (Join-Path $screenshots "02-throughput-lane-proof.png")

New-ScenarioImage -Title "Agenda ledger shows where the board cannot ignore carryover and slot pressure" -Subtitle "Throughput headlines, overflow signals, escalation owners, meeting counts, and required evidence stay visible in one board readout." -Bullets @(
  "This view keeps revenue, identity, biotech, and FinTech lanes tied to the specific committee bottlenecks slowing real decisions.",
  "Thin slot coverage stays visible before it turns into another memo or investor narrative that outruns actual operating motion.",
  "Leadership can see exactly where one tighter agenda intervention would strengthen the next board discussion."
) -OutputPath (Join-Path $screenshots "03-agenda-ledger-proof.png")

New-ScenarioImage -Title "Intervention posture keeps action, severity, and scheduling exposure tied together" -Subtitle "Composite throughput risk, severity signals, and board-safe action stay grounded in the same operating view." -Bullets @(
  "The intervention-posture view keeps the next board move attached to actual agenda overflow and decision-slot strain instead of abstract process stories.",
  "Weak board confidence remains visible before leadership assumes the committee can absorb more scope.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-intervention-posture-proof.png")
