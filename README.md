# Lambdafunction_to_perform_crudoperation_onrds

-Basic Introduction:
The code is written in Nodejs, and Sequelize(with Postgres). The code is deployed and hosted on AWS lambda with AWS RDS database and wehn trigger via http API calls it perfrom crud operation to the rds instance.

-Create AWS RDS instance
```
1. Login to your AWS account
2. Create RDS instance from database services(free tier) with Postgres. (i.e. database-instance1)
3. In Additional information give your database a name.
4. Allow public access to your database
5. Let remaining settings be default. After creating RDS instance save the endpoint into clipboard. (You will host your db on this host)
```

-Connect this rds to your p4admin in your local system
```
1.Create a new server in postgres (i.e. aws_rds)
2. In the connection tab in hostname/address add the RDS endpoint from AWS.
3.You will see the database under the aws_rds.
```

-Create a role for your lambda function 
```
1.Go to IAM. then in roles create a new role
2. Attach policy to it ( AmazonRDS full access)
3.Name your lambdarole add tags if you want and save.

```
-create a lambda function

```
1.Go to lambda , create a new function (lambdards)
2.fill requerid infomartion add role from existing role and choose the required role.
3. add vpn (same use in db instance) and security group
3. add code. you can upload the code via zip file and then set the index.handler.
4. if you want to write a inline code copy the index.js and paste it .
5. create a layer in lambda.
6. deploy the zip file (including node_modules, package.js and package-lock.js file)
7. add the layer to your lambda function 
8. Add the trigger
9. select api gateway option choose new api create a http api.
8.copy the invoke url in the clipboard
```

-Run and test the function
```
1. deploy the test the function
2. you can see the logs if the database is connected and check the db in p4admin and you can see the table is created.
3. Open postman paste the api invoke lambda url and choose the http request of your choice.
```

