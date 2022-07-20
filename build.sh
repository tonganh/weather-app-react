GROUP=anhtn
PROJECT_NAME=itss-final-weather-app
REGISTRY=git.hisoft.com.vn:5050
IMAGE_NAME=$REGISTRY/$GROUP/$PROJECT_NAME
docker build -t $IMAGE_NAME .
docker push $IMAGE_NAME