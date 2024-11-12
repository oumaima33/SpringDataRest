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

        stage('Quality Gate') {
            steps {
                timeout(time: 10, unit: 'MINUTES') { // Increase if needed
                    waitForQualityGate abortPipeline: true
                }
            }
        }
    }
   stage('Docker Build and Push') {
       when {
           expression { env.BRANCH_NAME == 'master' } // Only push on the master branch
       }
       steps {
           script {
               withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                   bat 'docker login -u %USERNAME% -p %PASSWORD%' // Log into Docker Hub
                   bat 'docker build -t springdatarest:latest .' // Build the Docker image
                   bat 'docker tag springdatarest:latest oum0033/springdatarest:latest' // Tag the Docker image
                   bat 'docker push oum0033/springdatarest:latest' // Push to Docker Hub
               }
           }
       }
   }

}
