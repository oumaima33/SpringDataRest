pipeline {
    agent any

    tools {
        maven 'Maven_Local' // Assurez-vous que le nom est correct
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
                    withSonarQubeEnv('SonarQube') {
                        bat """
                            "${scannerHome}\\bin\\sonar-scanner.bat" ^
                            -Dsonar.projectKey=spring_sonar ^
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=sqp_21a539c8772f0692149e53410b70d542a09ddc6a ^
                            -Dsonar.sources=./src ^
                            -Dsonar.java.binaries=./target/classes
                        """
                    }
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
}
