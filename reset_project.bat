@echo off
echo === STOP ALL NODE SERVERS ===
taskkill /IM node.exe /F

echo === DELETE PRISMA & NODE_MODULES CACHE ===
rmdir /s /q .prisma
rmdir /s /q node_modules\.prisma
rmdir /s /q node_modules

echo === REINSTALL DEPENDENCIES ===
call npm install

echo === GENERATE PRISMA CLIENT ===
call npx prisma generate

echo === RUN PRISMA MIGRATE (nếu cần) ===
call npx prisma migrate dev

echo === TẠO ADMIN (nếu có script) ===
if exist scripts\create-admin.js (
    call node scripts\create-admin.js
) else (
    echo KHONG CO scripts\create-admin.js, bo qua buoc tao admin!
)

echo === IMPORT ARTICLES (nếu có script) ===
if exist scripts\import-articles.js (
    call node scripts\import-articles.js
) else (
    echo KHONG CO scripts\import-articles.js, bo qua buoc import articles!
)

echo === DONE! ===
pause