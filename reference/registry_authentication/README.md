# Registry Authentication

If you are using private images, Storyscript Cloud will need to authenticate with the image registries to pull from your account.

The most common way to authenticate with image registries is via a [Docker configuration file](https://docs.docker.com/engine/reference/commandline/cli/#configuration-files).

You can generate this configuration file for your registry by following these instructions while using the credentials and image values from the [list of supported registries](#supported-registries):

1. Create a file `credentials.env` and populate it with credentials corresponding to your registry:
```bash
vim credentials.env
```
2. Set the environment variable `IMAGE` to point to the associated docker config generator image:
```bash
IMAGE=<docker_config_generator_image>
```
3. Run the following Docker command, which will process your credentials and create a standardized docker configuration file `config.json`:
```bash
docker run -it --rm \
	--env-file=credentials.env \
	-v "$(pwd):/opt/data/" \
	-v "/var/run/docker.sock:/var/run/docker.sock" \
	$IMAGE /opt/data/config.json
```

4. Upload the generated `config.json` to Storyscript Cloud using a unique name
```bash
story registry create -n <my_dockerhub_config> -f ./config.json
```

## Supported Registries

### - Docker Hub, Quay.io etc

- Populate `credentials.env`:
```
DOCKER_USERNAME=...
DOCKER_PASSWORD=...
DOCKER_REGISTRY=https://index.docker.io/v1/
```
**Note**: The `DOCKER_REGISTRY` endpoint can be changed to reference a registry other than Docker Hub, such as Quay.io, as long as the registry authenticates with the `docker login` command.

- Set the config generator image name:
```bash
IMAGE=codeship/dockercfg-generator
```

### - Google Cloud Registry

- Populate `credentials.env`:
```
# The email associated with the Google API credentials
GOOGLE_AUTH_EMAIL=gcloud-user@myapp-130450.iam.gserviceaccount.com
# The ID associated with the project
GOOGLE_PROJECT_ID=myapp-130450
# The API credential JSON file, merged onto a single line
GOOGLE_AUTH_JSON=...
```

- Set the config generator image name:
```bash
IMAGE=codeship/gcr-dockercfg-generator
```

### - Amazon Elastic Container Registry

As per AWS documentation, the generated docker config should be valid for 48 hours.

- Populate `credentials.env`
```
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1
```

- Set the config generator image name:
```bash
IMAGE=codeship/aws-ecr-dockercfg-generator
```

### - Azure Container Registry

- Populate `credentials.env`
```
# Your username of the Admin user of the registry
AZURE_USERNAME=...
# The password associated with the above admin user
AZURE_PASSWORD=...
# The URL of the registry you want to access (in the form of NAME.azurecr.io)
AZURE_REGISTRY=...
```

- Set the config generator name:
```bash
IMAGE=codeship/azure-dockercfg-generator
```

### - IBM Cloud Registry

- Populate `credentials.env`
```
# Your IBM Cloud API key
BLUEMIX_API_KEY=...
```

- Set the config generator image name:
```bash
IMAGE=codeship/ibm-bluemix-dockercfg-generator
```
