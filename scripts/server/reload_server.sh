echo "Pulling from the latest commit"
git stash
git pull origin main
echo "Pull complete"

echo "Restarting application"
npm run build
forever restart -s dist/server.js
exit
