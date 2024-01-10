pipeline {
    environment {
        dockerHome = tool 'myDocker'
        PATH = "$dockerHome/bin:$PATH"
    }
    agent { docker { image 'node:21-bullseye-slim'} }
    stages {
        stage ('Checkout'){
            steps {
                sh 'docker version'
                sh 'node --version'
            }
        }
    }


}