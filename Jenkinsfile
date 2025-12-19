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
    }

    post {
        success {
            echo '✅ Build successful!'
        }
        failure {
            echo '❌ Build failed!'
        }
    }
}
