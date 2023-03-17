rm -rf .tmp
mkdir .tmp
cp README.md ./.tmp
cp vss-extension.json .tmp/.
cp package.json .tmp/.
cp yarn.lock .tmp/.
cp -R images .tmp/.
cd run-lumar-protect-build-task && yarn && yarn build && cd ../
cd .tmp
yarn
mkdir run-lumar-protect-build-task
cp -R ../run-lumar-protect-build-task/dist run-lumar-protect-build-task/.
cp ../run-lumar-protect-build-task/task.json run-lumar-protect-build-task/.
cp ../run-lumar-protect-build-task/package.json run-lumar-protect-build-task/.
cp ../run-lumar-protect-build-task/yarn.lock run-lumar-protect-build-task/.
cd run-lumar-protect-build-task
yarn install --production
cd ../
yarn tfx extension create --manifest-globs vss-extension.json --output-path ../release/.
cd ../ && rm -rf .tmp
