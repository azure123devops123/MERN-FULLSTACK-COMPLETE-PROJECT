pipeline {
    agent { docker { image 'node:21-bullseye-slim'}}
    environment {
        dockerHome = tool 'myDocker'
    }
    stages {
        stage ('Checkout'){
            steps {
                sh 'docker version'
                sh 'node --version'
            }
        }
    }


}