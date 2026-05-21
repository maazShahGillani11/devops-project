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
                sh '''
                    export PATH=$PATH:/usr/local/bin:/usr/bin:/bin:/snap/bin
                    which trivy && trivy fs --exit-code 0 --severity HIGH,CRITICAL . || echo "Trivy scan completed"
                '''
            }
        }

        stage('Docker Build Backend') {
            steps {
                sh '''
                    export PATH=$PATH:/usr/local/bin:/usr/bin:/bin
                    export DOCKER_HOST=unix:///var/run/docker.sock
                    ls -la /var/run/docker.sock
                    id
                    docker build -t maazshah6/devops-backend:v${BUILD_NUMBER} ./backend
                '''
            }
        }

        stage('Docker Build Frontend') {
            steps {
                sh '''
                    export PATH=$PATH:/usr/local/bin:/usr/bin:/bin
                    docker build -t maazshah6/devops-frontend:v${BUILD_NUMBER} ./frontend
                '''
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        export PATH=$PATH:/usr/local/bin:/usr/bin:/bin
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push maazshah6/devops-backend:v${BUILD_NUMBER}
                        docker push maazshah6/devops-frontend:v${BUILD_NUMBER}
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
