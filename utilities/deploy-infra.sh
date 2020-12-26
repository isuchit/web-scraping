#!/usr/bin/env bash
# Deployment script for AWS CloudFormation Templates

function upload_api_spec() {
    echo -ne "\tUploading API spec... "
    aws s3 cp "$API_SPEC_NEW" s3://${CF_BUCKET_NAME}/openapi.yaml >/dev/null &&
        echo -e "Done" ||
        # If error logic here
        echo -e "Error"
}

# * Replaces values within the template with actual values
# * Package the CF template
function package_template() {
    echo -ne "\tPackaging template... "

    aws cloudformation package \
        --region $AWS_REGION \
        --template-file="${TEMPLATE_FILE}" \
        --s3-bucket="${CF_BUCKET_NAME}" \
        --output-template-file="${OUTPUT_TEMPLATE}" \
        >/dev/null &&
        echo -e "Done" ||
        # If error logic here
        echo -e "Error"
}

# * Deploys the packaged CF template
# * Replaces values within the template with actual values
function deploy_template() {
    echo -ne "\tDeploying template... "

    aws cloudformation deploy \
        --region $AWS_REGION \
        --template-file $OUTPUT_TEMPLATE \
        --stack-name $STACK_NAME \
        --capabilities CAPABILITY_IAM \
        --parameter-overrides \
        ApiDomainName=$API_DOMAIN_NAME \
        OpenApiBucket=$CF_BUCKET_NAME \
        StackName=$STACK_NAME \
        ScraperPostArn=$ScraperPostArn \
        >/dev/null &&
        echo -e "Done" ||
        # If error logic here
        echo -e "Error"

}

function setTerminationProtection() {
    echo "Setting Terminiation Protection"
    echo "Adding stack protection"
    aws cloudformation update-termination-protection \
    --enable-termination-protection \
    --stack-name "$STACK_NAME"
    echo "Terminiation Protection Set"
    # TODO: Catch Errors
}

# * Print out stack details after deployment
function describeStacks() {
    echo "Stack Details"
    aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --query Stacks[].Outputs \
    --region ${AWS_REGION} \
    --output table 
    # TODO: Catch Errors
}

function deploy() {
    echo ""
    TEMPLATE_FILE="$CLOUDFORMATION_DIR/index.yaml"
    OUTPUT_TEMPLATE="$CLOUDFORMATION_DIR/packaged-index.yaml"

    echo -e "Deploying Storage..."
    upload_api_spec
    package_template
    deploy_template
}

post_deploy() {
    setTerminationProtection
    describeStacks
}
echo "****************************************** Start API deploy *************************************************************"
#*#################################################
#* Args
#*################################################

# TODO: Fix error checking
while [ $# -gt 0 ]; do
    if [[ $1 == *"--"* ]]; then
        param="${1/--/}"
        declare "${param^^}"="$2"
    fi
    shift
done

#*#################################################
#* Vars
#*################################################
cd "${0%/*}"
ROOT_DIR=$(PWD)

CLOUDFORMATION_DIR="cloudformation"

API_DOMAIN_NAME="api.suchitrotti.com"
echo "API_DOMAIN_NAME: $API_DOMAIN_NAME"
# echo -e "################################################################################################\n"


STACK_NAME="web-scraper"
echo "$STACK_NAME"


echo -ne "ACCOUNT_ID: " &&
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text) &&
    echo -ne "$ACCOUNT_ID\n"

AWS_REGION="ap-south-1"
CF_BUCKET_NAME="web-scraper-${AWS_REGION}"
API_SPEC_NEW="api/openapi.yml"

ScraperPostArn="arn:aws:lambda:${AWS_REGION}:${ACCOUNT_ID}:function:${STACK_NAME}"

# echo -e "\n################################################################################################"

#*#################################################
#* Main
#*#################################################
echo "Deploying...."
deploy && post_deploy
echo "****************************************** Done API deploy *************************************************************"