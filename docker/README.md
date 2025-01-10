# 1. Setup the Docker Instance on Ubuntu using Multipass

**On Terminal 1**
## Install Ubuntu using multipass
You can download multipass from this [link](https://canonical.com/multipass/install). After installation complete you can run this command to start the ubuntu server.
```bash
multipass launch -c 4 -m 8G -d 20G -n docker-instance
multipass shell docker-instance
```
## Install Docker on Ubuntu
You can navigate to this [link](https://docs.docker.com/engine/install/ubuntu/).
If you get permission issue with the docker you can fix the docker permissions issues from this [link](https://stackoverflow.com/questions/48957195/how-to-fix-docker-got-permission-denied-issue)

## Install Python on Ubuntu
You need to have python installed to build mendix application
```bash
# Check first the python3
python3 --version
sudo apt update
sudo apt install python3
```

## Clone the mendix builder
```bash
git clone --branch v5.0.5 --config core.autocrlf=false https://github.com/mendix/docker-mendix-buildpack
cd docker-mendix-buildpack
```

# 2. Copy the project file to ubuntu server

**On Terminal 2**
```bash
multipass transfer -r "C:\Users\isnae\OneDrive\Dokumen\Mendix\Enterprise Dashboard-main" docker-instance:/home/ubuntu/docker-mendix-buildpack/build
```

If you don't have the project, you can extract the `Enterprise Dashboard-main.rar` file

# 3. Build the app inside ubuntu server

**On Terminal 1**
```bash
# Create dependencies
docker build -t mendix-rootfs:app -f rootfs-app.dockerfile .
docker build -t mendix-rootfs:builder -f rootfs-builder.dockerfile .

# Create images application
docker build --build-arg BUILD_PATH=build --tag zulfikar4568/enterprise-dashboard:v1.0.0 .
docker images

# Push Docker image
docker push zulfikar4568/enterprise-dashboard:v1.0.0
```

# 4. Stop the Ubuntu server
You can shutdown the ubuntu server to save the memory usage, because the purpose of this is only to build the image
```bash
multipass stop docker-instance
```

# 5. Running the application
```bash
cd ~/docker
docker compose up -d --build
```