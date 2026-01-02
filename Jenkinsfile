pipeline {
    agent any

    tools {
        jdk 'JDK17'
        gradle 'Gradle'
    }

    environment {
        SONAR_AUTH_TOKEN = credentials('Local sonar')
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
            bat '''
            gradle sonar ^
              -Dsonar.projectKey=ott-backend ^
              -Dsonar.projectName=ott-backend ^
              -Dsonar.host.url=http://localhost:9000 ^
              -Dsonar.token=%SONAR_AUTH_TOKEN%
            '''
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
            bat '''
            echo Deploying application...
            if not exist C:\\apps\\ott-backend mkdir C:\\apps\\ott-backend
            copy /Y build\\libs\\*.jar C:\\apps\\ott-backend\\ott-backend.jar
            start "" java -jar C:\\apps\\ott-backend\\ott-backend.jar
            '''
        }
    }
}
