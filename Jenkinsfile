pipeline {

   agent any



   tools {

       jdk 'JDK-17'

       gradle 'Gradle'

   }



   environment {

       SONAR_AUTH_TOKEN = credentials('SonarQube')

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

                     -Dsonar.host.url=http://localhost:9000 ^

                     -Dsonar.login=%SONAR_AUTH_TOKEN%

                   '''

               }

           }

       }



       stage('Deploy') {
    steps {
        bat 'copy /Y build/libs/*.jar C:/'
        bat 'java -jar C:/ott-backend.jar'
    }
}

           }

       }

   }

}
