#!/bin/sh
# variables
PROD_BUCKET="app.prosperia"
DEV_BUCKET="app-dev.prosperia"
BUILD_DIR="build"
PROD_ENV_FILE="env.prod.json"
DEV_ENV_FILE="env.dev.json"
PROD_CLOUDFRONT_ID="E1WCQLB2UBQ1B0"
DEV_CLOUDFRONT_ID="E5IMIIDCWP4C8"

BUCKET=""
ENV_FILE=""
CLOUDFRONT_ID=""
export AWS_PROFILE=prokur

# ask for environment
echo What environment? [dev / prod]
read env

if [ "$env" = "dev" ]
then
  BUCKET=$DEV_BUCKET
  ENV_FILE=$DEV_ENV_FILE
  CLOUDFRONT_ID=$DEV_CLOUDFRONT_ID
elif [ "$env" = "prod" ]
then
  echo Are you sure? [yes / n]
  read confirm
  if [ "$confirm" = "yes" ]
  then
    BUCKET=$PROD_BUCKET
    ENV_FILE=$PROD_ENV_FILE
    CLOUDFRONT_ID=$PROD_CLOUDFRONT_ID
  else
    exit 0
  fi
else
  echo "Bad env"
fi

# bucket url
# http://app.prosperia.s3-website-us-east-1.amazonaws.com

# Build the app
echo "Build for ${env} environment"
npm run build

# use correct env file
echo "Use ${ENV_FILE} environment file"
mv $BUILD_DIR/$ENV_FILE $BUILD_DIR/env.json

# Remove all contents in bucket
echo "Remove all contents from ${BUCKET}"
aws s3 rm s3://$BUCKET --recursive

# Upload contents of build
echo "Upload contents to ${BUCKET}"
aws s3 cp $BUILD_DIR/ s3://$BUCKET/ --recursive

# Invalidate cache
echo "Invalidating cache"
aws cloudfront create-invalidation \
    --distribution-id $CLOUDFRONT_ID \
    --paths "/*"
