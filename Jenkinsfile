pipeline{
  stages {
    stage('Build'){
      steps {
        sh 'npm install'
        sh 'npm run build'  
      }
    }

    stage('Deploy') {
      steps{
        sh './deploy_script/deploy.sh'
      }
    }
  }
}