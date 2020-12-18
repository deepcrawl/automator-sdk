rm -rf .tmp
mkdir .tmp
cp README.md ./.tmp
cp vss-extension.json .tmp/.
cp package.json .tmp/.
cp yarn.lock .tmp/.
cp -R images .tmp/.
cd run-automator-build-task && yarn && yarn build && cd ../
cd .tmp
yarn
mkdir run-automator-build-task
cp -R ../run-automator-build-task/dist run-automator-build-task/.
cp ../run-automator-build-task/task.json run-automator-build-task/.
cp ../run-automator-build-task/package.json run-automator-build-task/.
cp ../run-automator-build-task/yarn.lock run-automator-build-task/.
cd run-automator-build-task
yarn install --production
cd ../
yarn tfx extension create --manifest-globs vss-extension.json --output-path ../release/.
cd ../ && rm -rf .tmp
