cd ..
cd repo
GITHUB_USERNAME=$1
GITHUB_REPOSITORY=$2
GITHUB_TOKEN=$3
GITHUB_APP_ID=$4

cd $GITHUB_REPOSITORY
ls
if [ $# -eq 0 ]; then
    echo "Usage: $0 <github_username> <repository_name> <access_token> <github_app_id>"
    exit 1
fi


git config --global user.name "docify[bot]"
git config --global user.email $GITHUB_APP_ID+docify[bot]@users.noreply.github.com

# Add all files
git add .

# Commit with message
git commit -m "Docify changes to repository, changes made in ./assets folder"

# Push to github
git push https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}.git docify