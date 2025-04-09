pipeline {
  agent any

  environment {
    AWS_DOCKER_REGISTRY = '958261994748.dkr.ecr.us-east-2.amazonaws.com'
    APP_NAME = 'enterprise-project'
    AWS_DEFAULT_REGION = 'us-east-2'
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
    stage('Build My Docker Image'){
      agent{
        docker{
          image 'amazon/aws-cli'
            reuseNode true
            args '-u root -v /var/run/docker.sock:/var/run/docker.sock --entrypoint=""'
        }
      }
      steps{
        withCredentials([usernamePassword(credentialsId: 'enterprise-key', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
            sh '''
                amazon-linux-extras install docker
                docker build -t $AWS_DOCKER_REGISTRY/$APP_NAME .
                aws ecr get-login-password | docker login --username AWS --password-stdin $AWS_DOCKER_REGISTRY
                docker push $AWS_DOCKER_REGISTRY/$APP_NAME:latest
            '''
        }
      }
    }
    stage('Deploy to AWS'){
      agent{
          docker{
              image 'amazon/aws-cli'
              reuseNode true
              args '-u root --entrypoint=""'
          }
      }
      steps {
          withCredentials([usernamePassword(credentialsId: 'enterprise-key', passwordVariable: 'AWS_SECRET_ACCESS_KEY', usernameVariable: 'AWS_ACCESS_KEY_ID')]) {
              sh '''
                  aws --version
                  yum install jq -y

                  LATEST_TD_REVISION=$(aws ecs register-task-definition --cli-input-json file://aws/task-definition.json | jq '.taskDefinition.revision')
                  aws ecs update-service --cluster enterprise-project-Prod --service enterprise-Service-Prod --task-definition enterprise-project-TaskDefinition-Prod:$LATEST_TD_REVISION
              '''
          }
        }
      }
    }
  }
