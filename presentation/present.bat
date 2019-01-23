if not exist node_modules\ (
    npm install
)
if not exist dist\slides.html (
    npm run present:build
)

npm run present:start