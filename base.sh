rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/* ./style/base
cd ~/Sites/webapp/style/base
rm -rf ./h5bp
rm -rf ./animate
rm -rf ./font-awesome
rm -rf ./hint
rm -rf ./animate.css
rm -rf ./select2
rm -rf ./holderjs
rm -rf ./modernizr