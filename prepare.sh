#!/usr/bin/bash

# Script provide prebuilded files for Cesium for fast deploy from git

curl -o prebuild.tar.gz https://www.dropbox.com/s/302x0ds3ww1dwvc/prebuild2.tar.gz?dl=0
tar -zxvf prebuild.tar.gz
rm prebuild.tar.gz

# install remain packages

npm install
