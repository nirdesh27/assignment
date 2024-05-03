# assignment

- two types of deployment setup are there

1. local setup
   1.1 Install all dependecies by npm install
   1.2 Install mongodb on local machine and run (collection name auth).
   1.3 Start script is defined in package.json file (npm start).
   1.4 Test all Test cases by npm run test.
   1.5 Test all apis provided in postman collection.
   1.6 Use localSetup collection of local instance.
   1.6.1 Added separate collections for kubernetes and local setup.
2. kubernetes pods setup for local machine
   2.1 Need to change two file for kuberntes setup.
   2.1.1 app.ts and index.ts.
   2.1.2 Uncomment app.ts secure part to false for test.
   2.1.3 Comment the local mongodb connection part and uncomment the mongoservice part in index.ts file.
   2.2 Need to add process.env.JWT_KEY variable value in env by Kubctl create secret generic jet-secret —from-literal=JWT_KEY=asdf
   2.3 Install kubernets and docker also install skaffold as well
   2.4 After done will all changes run skaffold dev
   2.2.1 Need to add host name /etc/hosts
