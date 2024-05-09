cd ..
cd repo
GITHUB_USERNAME=$1
GITHUB_REPOSITORY=$2
GITHUB_TOKEN=$3
GITHUB_APP_ID=$4

cd $GITHUB_REPOSITORY
ls
if [ $# -eq 0 ]; then
    echo "Usage: $0 <github_username> <repository_name> <access_token> <github_app_id> <branch_name>"
    exit 1
fi

# Function to check if a Git branch exists
# branch_exists() {
#     git show-ref --verify --quiet "refs/heads/"$GITHUB_BRANCH_NAME""
# }

# if branch_exists "$GITHUB_BRANCH_NAME"; then
#     echo "Branch '$GITHUB_BRANCH_NAME' already exists. Checking out..."
#     git checkout "$GITHUB_BRANCH_NAME"
# else
#     echo "Creating branch '$GITHUB_BRANCH_NAME' and checking out..."
#     git checkout -b "$GITHUB_BRANCH_NAME"
# fi
git config --global user.name "docify[bot]"
git config --global user.email $GITHUB_APP_ID+docify[bot]@users.noreply.github.com
# Change to docify branch
# git checkout docify

# Add all files
git add .docify-assets/output.png

# Commit with message
git commit -m "Docify changes to repository, changes made in ./docify-assets folder"

# Push to github
git push --force https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/${GITHUB_REPOSITORY}.git