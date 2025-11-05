pipeline {
    agent any
    
    stages {
        stage('Build Backend') {
            steps {
                dir('backend/employee-service') {
                    bat 'mvn clean package'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }
        
        stage('Docker Build') {
            parallel {
                stage('Backend Docker') {
                    steps {
                        dir('backend/employee-service') {
                            bat 'docker build -t employee-service:latest .'
                        }
                    }
                }
                stage('Frontend Docker') {
                    steps {
                        dir('frontend') {
                            bat 'docker build -t frontend:latest .'
                        }
                    }
                }
            }
        }
        
        stage('Deploy') {
            steps {
                bat 'kubectl apply -f k8s/'
            }
        }
    }
}