GITHUB_REPO=$1
cp CombineFiles.java ../repo
cp java2plantuml.jar ../repo
cp plantuml.jar ../repo
cp combinedFile.txt ../repo
cd ..
cd repo
apt-get install -y graphviz
java CombineFiles.java $GITHUB_REPO
java -jar java2plantuml.jar combinedFile.txt 
java -jar plantuml.jar output.puml
mkdir -p $GITHUB_REPO/.assets
mv output.png $GITHUB_REPO/.assets/