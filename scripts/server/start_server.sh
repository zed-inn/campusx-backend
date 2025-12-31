echo "Pulling new code"
git pull

forever start -s dist/app.js
echo "Application started"