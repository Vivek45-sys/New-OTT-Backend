pipeline {
    agent any

    tools {
        jdk 'JDK17'
        gradle 'Gradle'
    }

    environment {
        SONAR_PROJECT_KEY  = 'ott-backend'
        SONAR_PROJECT_NAME = 'ott-backend'
        ANSIBLE_PLAYBOOK   = 'ansible/deploy.yml'
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
                    withCredentials([string(credentialsId: 'sonarqube-token', variable: 'SONAR_AUTH_TOKEN')]) {
                        bat '''
                        gradle sonar ^
                          -Dsonar.projectKey=%SONAR_PROJECT_KEY% ^
                          -Dsonar.projectName=%SONAR_PROJECT_NAME% ^
                          -Dsonar.token=%SONAR_AUTH_TOKEN% ^
                          -Dsonar.gradle.skipCompile=true
                        '''
                    }
                }
            }
        }

     

  stage('Deploy with Ansible') {
    steps {
        bat '''
        echo Running Ansible Deployment...
        wsl ansible-playbook %ANSIBLE_PLAYBOOK% -i ansible/inventory.ini ^
        --extra-vars "workspace=%WORKSPACE%"
        '''
    }
}

    }

    post {
        success {
            echo '✅ CI/CD Pipeline completed successfully'
        }
        failure {
            echo '❌ Pipeline failed – check logs above'
        }
    }
}
