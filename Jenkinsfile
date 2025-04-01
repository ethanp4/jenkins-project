pipeline {
  agent any

  environment {

  }

  stages {
    stage('Build') {
      agent {
        docker {
          image 'node:22.14.0-alpine'
          reuseNode true
        }
      }
      steps {
        sh '''
          npm install
          npm run build
        '''
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'node:22.14.0-alpine'
          reuseNode true
        }
      }
      steps {
        sh '''
          npm install
          npm run test
        '''
      }
    }
  }
}