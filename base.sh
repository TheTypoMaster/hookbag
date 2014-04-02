# mkdir -p ./src
mkdir -p ./_temp/css
mkdir -p ./_temp/js
mkdir -p ./_temp/img
mkdir -p ./_temp/fonts
mkdir -p ./dist/css
mkdir -p ./dist/js
mkdir -p ./dist/img
mkdir -p ./dist/fonts
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/sui/* ./dist/
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/holderjs/* ./_temp/js/
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/hint/hint.css ./_temp/css/
