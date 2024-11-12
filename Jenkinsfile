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
                            -Dsonar.host.url=http://localhost:9000 ^
                            -Dsonar.login=sqp_87e73499757d28c6c0a6e6321a52d591e7b166db ^
                            -Dsonar.sources=./src ^
                            -Dsonar.java.binaries=./target/classes
                        """
                    }
                }
            }
        }

        stage('Docker Build') {
                    steps {
                        script {
                            // Build the Docker image
                            bat 'docker build -t springdatarest:latest .'
                        }
                    }
                }

                stage('Docker Push') {
                    when {
                        expression { env.BRANCH_NAME == 'master' } // Push only on the master branch
                    }
                    steps {
                        script {
                            // Login and push the image to a Docker registry (e.g., Docker Hub)
                            withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                                bat 'docker login -u %USERNAME% -p %PASSWORD%'
                                bat 'docker tag springdatarest:latest YOUR_DOCKER_USERNAME/springdatarest:latest'
                                bat 'docker push YOUR_DOCKER_USERNAME/springdatarest:latest'
                            }
                        }
                    }
                }
            }
        }
