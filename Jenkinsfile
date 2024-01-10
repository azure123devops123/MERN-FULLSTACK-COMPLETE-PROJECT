pipeline {
    // environment {
    //     dockerHome = tool 'myDocker'
    //     PATH = "$dockerHome/bin:$PATH"
    // }
    agent { docker { image 'node:21-bullseye-slim'} }
    stages {
        stage ('Build') {
            steps {
                echo "Build"
                sh 'docker version'
                sh 'node --version'
            }
        }
    }


}