pipeline {
  agent any

  stages {
    stage('Clone') {
      steps {
        git 'https://github.com/your-username/2048-devops-project.git'
      }
    }

    stage('Build Docker Image') {
      steps {
        sh 'docker build -t game-backend -f docker/Dockerfile .'
      }
    }

    stage('Deploy') {
      steps {
        sh '''
        docker stop game || true
        docker rm game || true
        docker run -d -p 3000:3000 --name game game-backend
        '''
      }
    }
  }
}
[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[A[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[C[02devops[C[C[C[C[C[A[A[A[A[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B[B