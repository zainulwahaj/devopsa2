pipeline {
  agent any

  environment {
    COMPOSE_FILE = "docker-compose.yml"
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/zainulwahaj/devopsa2.git'
      }
    }

    stage('Docker Compose Build') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE build || true'
      }
    }

    stage('Deploy Stack') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE up -d --force-recreate'
      }
    }

    stage('Show Running Containers') {
      steps {
        sh 'docker compose -f $COMPOSE_FILE ps'
      }
    }
  }

  post {
    success {
      echo 'Pipeline completed: app should be available on port 4000.'
    }
    failure {
      echo 'Pipeline failed. Check Docker/Jenkins logs.'
    }
  }
}
