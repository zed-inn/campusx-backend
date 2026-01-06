echo "Pulling new code"
git stash
git pull

npm run build
forever start -s dist/server.js
git stash clear
chmod +x **/*/*.sh
echo "Application started"