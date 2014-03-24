rsync --progress -a --delete -e "ssh -q" ~/Sites/base/style/base/* ./style/base
cd ~/Sites/webapp/style/base
rm -rf h5bp
