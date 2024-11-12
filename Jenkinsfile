pipeline {
    agent any

    tools {
        maven 'Maven_Local' // Ensure the name is correct
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/oumaima33/SpringDataRest.git', branch: 'master'
            }
        }

        stage('Compile') {
            steps {
                script {
                    def mvnHome = tool 'Maven_Local'
                    bat "\"${mvnHome}\\bin\\mvn\" clean compile"
                }
            }
        }

        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('SonarQube') { // Ensure 'SonarQube' matches Jenkins config
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=spring_sonar ^
                            -Dsonar.host.url=https://08a3-105-73-96-62.ngrok-free.app ^
                            -Dsonar.login=sqp_87e73499757d28c6c0a6e6321a52d591e7b166db ^
                            -Dsonar.sources=./src ^
                            -Dsonar.java.binaries=./target/classes
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') { // Increase if needed
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
