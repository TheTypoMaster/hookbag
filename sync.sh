rm -rf ./style
rm -rf ./mod
rm -rf ./page
rsync --progress -a --delete -e "ssh -q" ./_site/* ./
