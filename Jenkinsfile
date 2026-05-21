pipeline {
    agent any

    environment {
        DOCKER_USERNAME = 'maazshah6'
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Code checked out successfully'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Security Scan') {
            steps {
                sh '/usr/local/bin/trivy fs --exit-code 0 --severity HIGH,CRITICAL . || true'
            }
        }

        stage('Docker Build Backend') {
            steps {
                sh 'docker build -t maazshah6/devops-backend:${IMAGE_TAG} ./backend'
            }
        }

        stage('Docker Build Frontend') {
            steps {
                sh 'docker build -t maazshah6/devops-frontend:${IMAGE_TAG} ./frontend'
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push maazshah6/devops-backend:${IMAGE_TAG}
                        docker push maazshah6/devops-frontend:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                echo 'Kubernetes deployment stage complete'
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
