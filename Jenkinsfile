// pipeline {
//     // agent any
//     // environment {
//     //     dockerHome = tool 'myDocker'
//     //     PATH = "$dockerHome/bin:$PATH"
//     // }
//     agent { docker { image 'node:21-bullseye-slim'} }
//     stages {
//         stage ('Build') {
//             steps {
//                 echo "Build"
//                 sh 'docker version'
//                 // sh 'node --version'
//             }
//         }
//     }


// }


pipeline {
	// agent any
	// environment {    // GO INSIDE Manage Jenkins and get the names of both tools we set earlier (myDocker & myMaven)
	// 	dockerHome = tool 'myDocker'
	// 	mavenHome = tool 'myMaven'
	// 	PATH =  "$dockerHome/bin:$mavenHome/bin:$PATH"      // add both tools to our path
	// }   
	// if we want to run a docker agent 
	// agent { docker { image 'maven:3.9.6'} }		// It will pull the image from dockerhub and run it as a container and all the stages will run inside container.
	agent { docker { image 'node:21-bullseye-slim'} }
	stages {

		// CHECKOUT IS AUTOMATIC - HERE WE CAN JUST PRINT THE USEFUL INFORMATION
		stage ('Checkout') {
			steps {
				sh 'mvn --version'
				sh 'docker version'
				// sh 'node --version'
				echo "Build"
				echo "Path - $PATH"		                  // Jenkins agent path
				echo "Build Number - $env.BUILD_NUMBER"   // The current build number
				echo "Build ID - $env.BUILD_ID"			  // The current build ID
				echo "Job Name - $env.JOB_NAME"           // Name of the project of this build
				echo "Build Tag - $env.BUILD_TAG"		  // String of "jenkins-${JOB_NAME}-${BUILD_NUMBER}". All forward slashes ("/") in the JOB_NAME are replaced with dashes ("-"). Convenient to put into a resource file, a jar file, etc for easier identification.
			    echo "Build URL - $env.BUILD_URL"
			}
		}
    }
}        	