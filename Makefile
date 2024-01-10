
.PHONY: run-mongodb
run-mongodb:
	@echo Starting Mongo Database Container
	-docker run -d \
		-e MONGO_INITDB_ROOT_USERNAME=admin \
		-e MONGO_INITDB_ROOT_PASSWORD=password \
		-v mongo-data:/data/db \
		-p 27017:27017 \
		--net custom-mongo-network \
		--name mongodb \
		mongo:latest

.PHONY: run-mongo-express
run-mongo-express:
	@echo Starting Mongo Database Container
	-docker run -d \
		-e ME_CONFIG_MONGODB_ADMINUSERNAME=admin \
		-e ME_CONFIG_MONGODB_ADMINPASSWORD=password \
		-e ME_CONFIG_MONGODB_SERVER=mongodb \
		-p 8080:8081 \
		--net custom-mongo-network \
		mongo-express:latest
