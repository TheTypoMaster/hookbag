rm -rf ./style
rm -rf ./block
rm -rf ./page
rsync --progress -a --delete -e "ssh -q" ./_site/* ./
