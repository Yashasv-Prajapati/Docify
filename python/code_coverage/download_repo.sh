# download a repo from github
# Usage: download_repo.sh <repo_url> <repo_name>
#use the environment variable to get the repo url
cd ..
mkdir -p repo
cd repo
git clone https://github.com/$USER/$REPO.git