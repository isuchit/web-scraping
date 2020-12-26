echo "######################################## Setup ###################################################"

echo "###################################### Unit Testing #############################################"

cd functions/scrape-metadata && npm install  &&  npm run coverage

cd ../..

echo "#################################### Done Unit Testing #############################################"

echo "#####################################  Deploy Infra ###################################################"

chmod 777 ./utilities/deploy-infra.sh
. ./utilities/deploy-infra.sh

echo "###################################  Done Deploy Infra ###################################################"

echo "###################################### API Testing #############################################"

chmod 777 ./testing/api-testing.sh
. ./testing/api-testing.sh

echo "###################################### Done API Testing #############################################"


echo "###################################### Web App Build #############################################"

cp -r functions/scrape-metadata/coverage/lcov-report web/public

cp -r test-reports/api-report.html web/public/api-report.html

cd web && npm install && npm run build

echo "###################################### Done Web App Build #############################################"

echo "####################################### Setup Complete ###################################################"
