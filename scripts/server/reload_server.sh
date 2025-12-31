echo "Pulling from the latest commit"
git pull origin main
echo "Pull complete"

echo "Restarting application"
npm i
forever restart -s dist/server.js
exit
