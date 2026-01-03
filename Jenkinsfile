pipeline {
  agent any

  stages {

    stage('Clone') {
      steps {
        git 'https://github.com/02devops/2048-devops-project.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t 2048-backend:latest .'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
        docker stop 2048-backend || true
        docker rm 2048-backend || true
        docker run -d \
          -p 3000:3000 \
          --name 2048-backend \
          2048-backend:latest
        '''
      }
    }
  }
}
