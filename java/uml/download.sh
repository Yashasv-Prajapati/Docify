cd ..
mkdir -p repo
cd repo
TOKEN=$1
USERNAME=$2
REPO=$3
GITHUB_BRANCH_NAME="docify"

git clone https://x-access-token:$TOKEN@github.com/$USERNAME/$REPO.git
cd $REPO
# Function to check if a Git branch exists
branch_exists() {
    git show-ref --verify --quiet "refs/heads/"$GITHUB_BRANCH_NAME""
}

if branch_exists "$GITHUB_BRANCH_NAME"; then
    echo "Branch "$GITHUB_BRANCH_NAME" already exists. Checking out..."
    git checkout "$GITHUB_BRANCH_NAME" # This will checkout in the docify branch
    git checkout -m "${GITHUB_BRANCH_NAME}-$(date +%Y%m%d%H%M%S)" # This will rename the docify branch

    git checkout -b "$GITHUB_BRANCH_NAME" # This will create a new docify branch and checkout into it
else
    echo "Creating branch "$GITHUB_BRANCH_NAME" and checking out..."
    git checkout -b "$GITHUB_BRANCH_NAME"
fi