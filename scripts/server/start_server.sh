echo "Pulling new code"
git stash
git pull

npm run build
forever start -s dist/server.js
echo "Application started"