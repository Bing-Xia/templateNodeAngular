function installDependenciesForDevloper(){
	# clean workspaces, in case of the previous node_modules are broken
	rm -rf ./node_modules
	rm -rf ./gulp/node_modules

	# install gulp package dependencies
	cd gulp
	npm install 

	# install node server dependencies
	cd ../
	npm install
 }
 function clearDistAndInstallGulp(){
	# clean workspaces, in case of the previous node_modules are broken
	rm -rf ./node_modules
	rm -rf ./gulp/node_modules
	rm -rf ./dist

	# install gulp package dependencies
	cd gulp
	npm install 
	# back to root folder
	cd ../
 }
# for devops team 
# 1. package
# ./build.sh run 
# 2. cd dist and run app.sh
if [ $# -eq 1 ] && [ $1 == "run" ]; then
	clearDistAndInstallGulp
	# run gulp
	./gulp/node_modules/gulp/bin/gulp.js  --gulpfile ./gulp/gulpfile.js

	# install node server dependencies according the package.json
	cd dist
	npm install

# for developer
# install node_modules
elif [ $# -eq 1 ] && [ $1 == "install" ]; then
	installDependenciesForDevloper

# for developer run gulp task, for exapmle: gulp dev
else
	./gulp/node_modules/gulp/bin/gulp.js --gulpfile ./gulp/gulpfile.js $@
fi
