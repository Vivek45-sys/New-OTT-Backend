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
                    bat '''
                    gradle sonarqube ^
                      -Dsonar.projectKey=ott-backend ^
                      -Dsonar.projectName=ott-backend ^
                      -Dsonar.login=%SONAR_AUTH_TOKEN%
                    '''
                }
            }
        }

       
                
            
        

        stage('Deploy') {
            steps {
                bat 'copy /Y build/libs/*.jar C:/app.jar'
                bat 'java -jar C:/app.jar'
            }
        }
    }
}
