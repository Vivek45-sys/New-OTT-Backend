pipeline {
    agent any

    tools {
        jdk 'JDK17'
        gradle 'Gradle'
    }

    environment {
        SONAR_AUTH_TOKEN = credentials('sonarqube-token')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build') {
            steps {
                bat 'gradle clean build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    bat """
                        gradle sonarqube ^
                          -Dsonar.projectKey=ott-backend ^
                          -Dsonar.projectName=ott-backend ^
                          -Dsonar.host.url=http://localhost:9000 ^
                          -Dsonar.login=${env.SONAR_AUTH_TOKEN}
                    """
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 1, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }

        stage('Deploy') {
            steps {
                bat """
                    echo Deploying application...
                    mkdir C:\\apps\\ott-backend 2>nul
                    copy /Y build\\libs\\*.jar C:\\apps\\ott-backend\\ott-backend.jar
                    start "" java -jar C:\\apps\\ott-backend\\ott-backend.jar
                """
            }
        }
    }
}
