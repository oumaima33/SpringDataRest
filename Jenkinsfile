pipeline {
    agent any

    tools {
        maven 'Maven_Local' // Ensure the name is correct
    }
    environment {
        DOCKER_IMAGE_NAME = 'spring-boot'
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
        stage('Docker Build & Push') {
            steps {
                script {
                    withDockerRegistry(credentialsId: 'docker', toolName: 'docker') {
                        def buildTag = "${DOCKER_IMAGE_NAME}:${BUILD_NUMBER}"
                        def latestTag = "${DOCKER_IMAGE_NAME}:latest"
                        
                        bat "docker build -t ${DOCKER_IMAGE_NAME} -f Dockerfile.final ."
                        bat "docker tag ${DOCKER_IMAGE_NAME} oum0033/${buildTag}"
                        bat "docker tag ${DOCKER_IMAGE_NAME} oum0033/${latestTag}"
                        bat "docker push oum0033/${buildTag}"
                        bat "docker push oum0033/${latestTag}"
                        env.BUILD_TAG = buildTag
                    }
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
                            -Dsonar.host.url=http://localhost:9000 ^
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
