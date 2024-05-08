GITHUB_USERNAME=$1
GITHUB_REPOSITORY=$2
GITHUB_TOKEN=$3
GITHUB_APP_ID=$4
GITHUB_BRANCH_NAME=$5

cd "../repo/$GITHUB_REPOSITORY"

git add .

git config --global user.name "docify[bot]"
git config --global user.email $GITHUB_APP_ID+docify[bot]@users.noreply.github.com

# Commit with message
git commit -m "chore(deps): docify generated requirements.txt"

# Push to github
git push -u https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}.git $GITHUB_BRANCH_NAME