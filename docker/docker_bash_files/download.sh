cd ..
mkdir -p repo
cd repo
TOKEN=$1
USERNAME=$2
REPO=$3
git clone https://x-access-token:$TOKEN@github.com/$USERNAME/$REPO.git