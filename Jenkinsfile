pipeline {
    agent any

    tools {
        jdk 'JDK17'
        gradle 'Gradle'
    }

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vivek45-sys/New-OTT-Backend.git'
            }
        }

        stage('Gradle Clean') {
            steps {
                bat 'gradle clean'
            }
        }

        stage('Build & Test') {
            steps {
                bat 'gradle build'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('LocalSonar') {
                    bat 'gradle sonar'
                }
            }
        }



    post {
        success {
            echo '✅ CI/CD Pipeline Successful!'
        }
        failure {
            echo '❌ Pipeline Failed!'
        }
    }
}
