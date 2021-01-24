def dockerhub = 'inyilis/jbackend'
def image_name = "${dockerhub}:${BRANCH_NAME}"
def builder 

pipeline {

    agent any

    parameters {
        string(name: 'DOCKERHUB', defaultValue: "${image_name}", description: 'by Inyilis Punya')
        booleanParam(name: 'RUNTEST', defaultValue: 'false', description: 'Testing Image')
        choice(name: 'DEPLOY', choices: ['dev', 'prod'], description: 'Pilih deploy kemana?')
    }

    stages {
        stage("Install dependencies")  {
            steps {
                nodejs("node14") {
                    sh 'npm install'
                }
            }
        }
        stage("Build docker image")  {
            steps {
                script {
                    builder = docker.build("${image_name}")
                }
            }
        }
        stage("Testing image")  {
            when {
                expression {
                    params.RUNTEST
                }
            }
            steps {
                script {
                    builder.inside {
                        sh 'echo passed'
                    }
                }
            }
        }
        stage("Push image")  {
            steps {
                script {
                    builder.push()
                }
            }
        }
        stage("Deploy Dev")  {
            when {
                expression {
                    params.DEPLOY == 'dev'
                    branch 'master'
                }
            }
            steps {
                script {
                    sshPublisher (
                        publishers: [
                            sshPublisherDesc(
                               configName: 'DevAja',
                               verbose: false,
                               transfers: [
                                   sshTransfer(
                                       execCommand: "cd /home/devaja/app; docker-compose up -d",
                                       execTimeout: 1200000
                                   )
                               ] 
                            )
                        ]
                    )
                }
            }
        }
        stage("Deploy Prod")  {
            when {
                expression {
                    params.DEPLOY == 'prod'
                    branch 'main'
                }
            }
            steps {
                script {
                    sshPublisher (
                        publishers: [
                            sshPublisherDesc(
                               configName: 'ProdAja',
                               verbose: false,
                               transfers: [
                                   sshTransfer(
                                       execCommand: "cd /home/prodaja/app; docker-compose up -d",
                                       execTimeout: 1200000
                                   )
                               ] 
                            )
                        ]
                    )
                }
            }
        }
    }
}