mkdir -p ./src
mkdir -p ./style
rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/* ./style/base
# rsync --progress -a --delete -e "ssh -q" ./style/base/bs-sass/ ./src/bs
rsync --progress -a --delete -e "ssh -q" ./style/base/sassCore/ ./src/ui
rm -rf ./style/base/h5bp
rm -rf ./style/base/animate
rm -rf ./style/base/font-awesome
rm -rf ./style/base/hint
rm -rf ./style/base/animate.css
rm -rf ./style/base/select2
rm -rf ./style/base/holderjs
rm -rf ./style/base/modernizr
rm -rf ./style/base/bs-sass
rm -rf ./style/base/sassCore
rm -rf ./style/base/sui