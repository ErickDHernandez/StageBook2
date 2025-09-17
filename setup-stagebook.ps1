# 1️⃣ Limpiar dependencias y cache
Write-Host "Limpiando node_modules, package-lock.json y cache de npm..." -ForegroundColor Cyan
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm cache clean --force

# 2️⃣ Instalar dependencias principales
Write-Host "Instalando dependencias del proyecto..." -ForegroundColor Cyan
npm install

# 3️⃣ Instalar Tailwind y dependencias de desarrollo
Write-Host "Instalando Tailwind CSS y dependencias..." -ForegroundColor Cyan
npm install -D tailwindcss postcss autoprefixer

# 4️⃣ Inicializar Tailwind
Write-Host "Inicializando Tailwind CSS..." -ForegroundColor Cyan
npx tailwindcss init -p

# 5️⃣ Configurar rutas de contenido automáticamente
Write-Host "Configurando rutas de contenido en tailwind.config.js..." -ForegroundColor Cyan

$tailwindConfig = @"
module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
"@

Set-Content -Path "tailwind.config.js" -Value $tailwindConfig

# 6️⃣ Crear index.css si no existe
if (-Not (Test-Path "src/index.css")) {
    Write-Host "Creando src/index.css con importaciones de Tailwind..." -ForegroundColor Cyan
    New-Item -ItemType File -Path "src/index.css" -Force
    Set-Content -Path "src/index.css" -Value "@tailwind base;`n@tailwind components;`n@tailwind utilities;"
}

# 7️⃣ Mensaje final
Write-Host "`n✅ StageBook listo con Tailwind CSS. Ejecuta 'npm run dev' para iniciar el servidor de desarrollo." -ForegroundColor Green
