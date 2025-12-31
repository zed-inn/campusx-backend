echo "Pulling new code"
git pull

forever start -s dist/server.js
echo "Application started"