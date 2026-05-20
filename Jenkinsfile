pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials')
        DOCKER_USERNAME = 'maazshah6'
        IMAGE_TAG = "v${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main',
                    credentialsId: 'github-credentials',
                    url: 'https://github.com/maazShahGillani11/devops-project.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo 'Installing backend dependencies...'
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo 'Installing frontend dependencies...'
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Security Scan') {
            steps {
                echo 'Running Trivy security scan...'
                sh 'trivy fs --exit-code 0 --severity HIGH,CRITICAL . || true'
            }
        }

        stage('Docker Build Backend') {
            steps {
                echo 'Building backend Docker image...'
                sh "docker build -t ${DOCKER_USERNAME}/devops-backend:${IMAGE_TAG} ./backend"
            }
        }

        stage('Docker Build Frontend') {
            steps {
                echo 'Building frontend Docker image...'
                sh "docker build -t ${DOCKER_USERNAME}/devops-frontend:${IMAGE_TAG} ./frontend"
            }
        }

        stage('Docker Push') {
            steps {
                echo 'Pushing images to Docker Hub...'
                sh "echo ${DOCKERHUB_CREDENTIALS_PSW} | docker login -u ${DOCKERHUB_CREDENTIALS_USR} --password-stdin"
                sh "docker push ${DOCKER_USERNAME}/devops-backend:${IMAGE_TAG}"
                sh "docker push ${DOCKER_USERNAME}/devops-frontend:${IMAGE_TAG}"
            }
        }

        stage('Deploy') {
            steps {
                echo 'Kubernetes deployment will be added in next phase'
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
