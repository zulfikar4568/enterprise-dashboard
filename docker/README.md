# 1. Build Image
## Download the docker project endix
```bash
git clone --branch v5.0.5 --config core.autocrlf=false https://github.com/mendix/docker-mendix-buildpack
cd docker-mendix-buildpack
```

## Transfer mendix application into linux for building the app
```bash
multipass transfer -r "C:\Users\Opex L390\Zulfikar\MENDIX\Mendix App\Enterprise Dashboard-main" docker-instance:/home/ubuntu/docker-mendix-buildpack/build
```
## Build the image
```bash
# Create dependencies
docker build -t mendix-rootfs:app -f rootfs-app.dockerfile .
docker build -t mendix-rootfs:builder -f rootfs-builder.dockerfile .

# Create images application
docker build --build-arg BUILD_PATH=build --tag zulfikar4568/cxo-dashboard:v1.0.0 .
docker images

# Push Docker image
docker push zulfikar4568/cxo-dashboard:v1.0.0
```

# 2. Using Existing Image

## Transfer the compose into docker environment
```bash
multipass transfer -r "C:\Users\Opex L390\Zulfikar\MENDIX\Mendix Project\cxo-dashboard\docker" docker-instance:/home/ubuntu/docker
```

## Running the application
```bash
cd ~/docker
docker compose up -d