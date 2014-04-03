# mkdir -p ./src
mkdir -p ./_temp/css
mkdir -p ./_temp/js
mkdir -p ./_temp/img
mkdir -p ./_temp/fonts
mkdir -p ./style/css
mkdir -p ./style/js
mkdir -p ./style/img
mkdir -p ./style/fonts
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/sui/* ./style/
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/holderjs/* ./js/
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/hint/hint.css ./_temp/css/
