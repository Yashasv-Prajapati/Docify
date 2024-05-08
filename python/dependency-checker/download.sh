cd ..
mkdir -p repo
cd repo

TOKEN=$1
USERNAME=$2
GITHUB_REPOSITORY=$3
GITHUB_BRANCH_NAME=$4

git clone https://x-access-token:$TOKEN@github.com/$USERNAME/$GITHUB_REPOSITORY.git

cd $GITHUB_REPOSITORY

branch_exists() {
    git show-ref --verify --quiet "refs/heads/"$GITHUB_BRANCH_NAME""
}

if branch_exists "$GITHUB_BRANCH_NAME"; then
    echo "Branch "$GITHUB_BRANCH_NAME" already exists. Checking out..."
    git checkout "$GITHUB_BRANCH_NAME"
else
    echo "Creating branch "$GITHUB_BRANCH_NAME" and checking out..."
    git checkout -b "$GITHUB_BRANCH_NAME"
fi