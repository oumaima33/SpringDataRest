pipeline {
    agent any

    tools {
        maven 'Maven_Local' // Le nom que vous avez défini dans la configuration Jenkins
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/oumaima33/SpringDataRest.git', branch: 'master'
            }
        }

        stage('Compile') {
                    steps {
                        // Appel de Maven avec le chemin local configuré
                        script {
                            def mvnHome = tool 'Maven_Local' // Remplacez par le nom configuré pour Maven
                            bat "${mvnHome}\\bin\\mvn clean compile"
                        }
                    }
                }


        stage('SonarQube Analysis') {
            steps {
                script {
                    def scannerHome = tool 'sonar-scanner'
                    withSonarQubeEnv('SonarQube') {
                        bat """
                            ${scannerHome}\\bin\\sonar-scanner.bat ^
                            -Dsonar.projectKey=spring_sonar ^
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=sqp_c390a9a69a45da1ac38e9f19b882da3093d93b44 ^
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
