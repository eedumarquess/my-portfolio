# push-portfolio.ps1
# Envia o portfolio para https://github.com/eedumarquess/my-portfolio.git
# em commits ordenados e semânticos.
# Uso: .\push-portfolio.ps1

$ErrorActionPreference = "Stop"
$repoRoot = $PSScriptRoot
$remoteUrl = "https://github.com/eedumarquess/my-portfolio.git"

function Git-Exec {
    param([string]$Message, [string[]]$Files)
    Set-Location $repoRoot
    if ($Files.Count -gt 0) {
        git add $Files
    }
    git commit -m $Message
    if ($LASTEXITCODE -ne 0) { throw "git commit falhou: $Message" }
}

Set-Location $repoRoot

# 1) Configurar remote se não existir
$hasOrigin = (git remote) -contains 'origin'
if (-not $hasOrigin) {
    git remote add origin $remoteUrl
    Write-Host "Remote 'origin' configurado: $remoteUrl" -ForegroundColor Green
}

# 2) Commits em ordem lógica

# Commit 1: dependências e config do projeto
git add package.json package-lock.json
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "chore: dependências e config do projeto"
    Write-Host "Commit: dependências" -ForegroundColor Cyan
}

# Commit 2: estilos globais
git add src/app/globals.css
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "style: estilos globais"
    Write-Host "Commit: estilos globais" -ForegroundColor Cyan
}

# Commit 3: layout base e metadata
git add src/app/layout.tsx
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: layout base e metadata"
    Write-Host "Commit: layout" -ForegroundColor Cyan
}

# Commit 4: lib de leitura de posts
git add src/lib/posts.ts
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: lib de leitura de posts (frontmatter, slug)"
    Write-Host "Commit: lib posts" -ForegroundColor Cyan
}

# Commit 5: componentes reutilizáveis
git add src/components/Header.tsx src/components/HeroIllustration.tsx src/components/HomeLinks.tsx src/components/FocusNow.tsx
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: componentes Header, HeroIllustration, HomeLinks, FocusNow"
    Write-Host "Commit: componentes" -ForegroundColor Cyan
}

# Commit 6: página home
git add src/app/page.tsx
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: página home (hero, links, foco agora, CTA blog)"
    Write-Host "Commit: página home" -ForegroundColor Cyan
}

# Commit 7: páginas do blog
git add src/app/blog/page.tsx "src/app/blog/[slug]/page.tsx"
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "feat: blog - listagem de posts e página de post"
    Write-Host "Commit: blog" -ForegroundColor Cyan
}

# Commit 8: conteúdo (posts e avatar)
git add content/
git add public/hero-avatar.png
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "content: posts e avatar do hero"
    Write-Host "Commit: conteúdo" -ForegroundColor Cyan
}

# Commit 9: documentação
git add README.md
git diff --cached --quiet 2>$null
if ($LASTEXITCODE -ne 0) {
    git commit -m "docs: README com estrutura e como personalizar"
    Write-Host "Commit: README" -ForegroundColor Cyan
}

# Qualquer arquivo restante em um único commit
git add -A
$status = git status --short
if ($status) {
    git commit -m "chore: arquivos restantes do projeto"
    Write-Host "Commit: arquivos restantes" -ForegroundColor Cyan
}

# Push para o remoto
Write-Host "`nEnviando para origin..." -ForegroundColor Yellow
git push -u origin master

Write-Host "`nConcluído. Repositório: $remoteUrl" -ForegroundColor Green
