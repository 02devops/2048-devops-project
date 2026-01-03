pipeline {
  agent any

  environment {
    IMAGE_NAME = "2048-backend"
    CONTAINER_NAME = "2048-backend"
  }

  stages {

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t $IMAGE_NAME:latest .'
      }
    }

    stage('Stop Old Container') {
      steps {
        sh '''
        docker stop $CONTAINER_NAME || true
        docker rm $CONTAINER_NAME || true
        '''
      }
    }

    stage('Deploy New Container') {
      steps {
        sh '''
        docker run -d \
          -p 3000:3000 \
          --name $CONTAINER_NAME \
          $IMAGE_NAME:latest
        '''
      }
    }
  }
}
