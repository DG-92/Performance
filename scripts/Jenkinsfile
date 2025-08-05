pipeline {
    agent any

    environment {
        NODE_ENV = 'test'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://seurepositorio.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Run Performance Test') {
            steps {
                sh 'chmod +x ./scripts/run-load-test.sh'
                sh './scripts/run-load-test.sh'
            }
        }

        stage('Generate Report') {
            steps {
                sh '''
                    npx mochawesome-merge mochawesome-report/*.json > mochawesome.json
                    npx marge mochawesome.json --reportDir mochawesome-report --reportFilename index
                '''
            }
        }

        stage('Publish HTML Report') {
            steps {
                publishHTML([
                    reportDir: 'mochawesome-report',
                    reportFiles: 'index.html',
                    reportName: 'Relatório de Performance - ViaCEP'
                ])
            }
        }
    }

    post {
        always {
            echo 'Pipeline finalizada.'
        }
    }
}
