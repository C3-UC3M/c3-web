<!-- From Docker to Apptainer Guide
Author: Diana E. Carrizales-Espinoza
Date: September 2025 -->

# From Docker to Apptainer

## Convert a Dockerfile into a .def apptainer file
Dockerfiles and Apptainer ```.def``` files are recipes for building container images. 

Dockerfile is used by Docker/Podman. Their images are layered—every instruction (RUN, COPY, etc.) creates a new layer. It needs a daemon (the Docker engine) to build and run. By default, containers run as root inside the container, though this can be restricted. Images are stored in Docker registries (docker.io and private registries).

Meanwhile, a ```.def``` file (short for definition file) is the recipe used to build a portable and immutable Apptainer (Singularity) image (.sif). No root is needed to run it, which is safe for HPC systems. The ```.def``` file has a section-based structure (%post, %environment, %files, etc.). It is composed of: 

- the base OS or container (e.g., ubuntu, alpine, fedora)--often bootstrapped from Docker images (you can reuse Dockerfiles indirectly)
-  software to install (e.g., python, nano, wget);
- environment variables; 
- files to copy inside; and 
- metadata about the container.


For example, if we have the next Dockerfile:


```bash
#CI base 
FROM ubuntu:16.04 
#Software dependencies installation
RUN apt-get update && apt-get install build-essential -y && apt-get install nano -y 
#Copy the app code to the container 
COPY . /home/yourFolder/ 
WORKDIR /home/yourFolder/ 
RUN make clean 
RUN make
```

```.def``` file equivalent to the Dockerfile would be:

```bash
Bootstrap: docker
From: ubuntu:16.04

%post
    # Update and install dependencies
    apt-get update && \
    apt-get install -y build-essential nano && \
    rm -rf /var/lib/apt/lists/*

    # Go to working directory
    cd /home/yorFolder

    # Compile the code
    make clean
    make

%files
    . /home/yourFolder

%workdir
    /home/yourFolder

%runscript
    # Default action when you run `apptainer run image.sif`
    exec ./main "$@"
```

Thus, a ```.def``` file is a recipe file for building containers and it specifies the following:

* ```Bootstrap / From ```: specifies the container's base image, similar to using 'FROM' in a Dockerfile in Docker. It defines the starting environment for building the container.
* ```%labels```: specifies the metadata.
* ```%environment```: defines the sets environment variables.
* ```%post```: defines the commands run at build time (like RUN in Dockerfile).
* ```%files```: copy files from host into container.
* ```%runscript```: specifies the default command when you run the container.
* ```%help ```: apptainer help image ```.sif```.

### Differences between a Dockerfile and a .def Apptainer file
Apptainer ```.def```  files describe images that build into a single portable ```.sif``` file that can be run without root privileges, which is why HPC systems prefer Apptainer.

| Feature                       | Dockerfile                                        | Apptainer `.def`                                                          |
| ----------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------- |
| **Base image**                | `FROM ubuntu:22.04`                               | `Bootstrap: docker` + `From: ubuntu:22.04`                                |
| **Build system**              | Built with `docker build`, produces layered image | Built with `apptainer build`, produces a single `.sif` file               |
| **File copies**               | `COPY ./src /app`                                 | `%files` section                                                          |
| **Environment**               | `ENV VAR=value`                                   | `%environment` section                                                    |
| **Run commands (build-time)** | `RUN apt-get install …`                           | `%post` section                                                           |
| **Default runtime command**   | `CMD ["python","app.py"]`                         | `%runscript` section                                                      |
| **Execution model**           | Runs as root inside container unless restricted   | By default runs as **the invoking user**, so safer (no root in container) |
| **Images**                    | Layered, stored in Docker daemon                  | Single compressed `.sif` file, portable (can copy with `scp`)             |


## Build an apptainer image (.sif)

To build a docker image we use the next command:

```bash
docker build -t image:name ./myfolder
```

The equivalent command to build an apptainer image would be:

```bash
apptainer build myImage.sif myfile.def
```

In this command you must indicate the name of a ```.sif``` image that you want to build and the ```.def``` file used to build the ```.sif``` image. 


> Note: always run the build from the directory containing your source code and Makefile. Otherwise, %files won’t copy anything, and you’ll see the “cannot stat” error.


If you have a docker image, you can use this image and convert it into a ```.sif``` file with the next command:

```bash
apptainer build imageName.sif docker-daemon://docker:image
```
Where:

* ```docker-daemon://<image>:<tag>``` tells Apptainer to grab the image from your local Docker daemon (not from DockerHub).
* ```imageName.sif``` is the Apptainer ```.sif``` output file you’ll be able to use with apptainer build, exec, instance or apptainer run.


## Use .sif image to build containers or instances

To run a container using a ```.sif``` image, you can use the next command:

```bash
apptainer run myImage.sif
```

If you need to run a command inside of the container, you can use:

```bash
apptainer exec myImage.sif ./command arg1 arg2
```

If you need to open a shell inside of the container, you can use:

```bash
apptainer shell myImage.sif
```

> Note: Unlike Docker, Apptainer does not support named background containers, so the --name and -d flags -- commonly used in the Docker commands -- don’t exist. Each apptainer exec runs the container fresh. 
>
>Also, Apptainer containers are ephemeral by default — each exec runs a fresh environment, so no --name or long-running container concept like Docker. Thus, Apptainer images are immutable and ephemeral, so you cannot “name” a running instance. 
However, you manage multiple instances either by different bind mounts, different PIDs, or passing an ID argument.

To start an instance of the Apptainer image, and have that instance execute your program inside itself -- like to how Docker runs containers in detached mode -- follow the next steps:

1. **Start an instance** 

An instance is like a long-running container that you can exec commands into multiple times:

```bash
apptainer instance start myImage.sif myInstanceName
```

Where:
* ```myImage.sif ```  is the SIF image.
* ```myInstanceName ``` is the instance name (like a static container name in Docker).

Once generated the Apptainer instance, you can check running instances:
```bash
apptainer instance list
```

* Also, you can create multiple instances of the same image, giving each a unique instance name:
```bash
sudo apptainer instance start myImage.sif myInstanceName0
sudo apptainer instance start myImage.sif myInstanceName1
```

2. **Execute code inside the instance**

Once generated the Apptainer instance, you can run your program inside it. For example:

```bash
apptainer exec instance://myInstanceName ./command arg1 arg2 > ./myFolder/myfile.txt
```

Where:
* ```instance://myInstanceName``` tells Apptainer to run the command inside the already running instance.
* All relative paths (./myFolder/myfile.txt) are relative to the container’s filesystem.

3. **Stop the instance when done**

```bash
sudo apptainer instance stop myInstanceName
```

> Note: There is no need to bind-mount files if everything your program needs is already present inside the ```.sif``` image.
But, if you want to share files from the host (as a volume in Docker), you can use --bind:
>
> ```bash
> sudo apptainer exec --bind /host/myfolder:/home/myFolder/sink instance://myInstanceName ./main ...
> ```


### Differences between run, exec and instance commands
1. **apptainer run**
- Runs the container’s default command (defined in %runscript in the ```.def``` file).
- It’s like docker run IMAGE.
    - Example:
    ```bash
    apptainer run myImageName.sif
    ```

If %runscript in the ```.def``` has:
```bash
%runscript
    echo "Hello from my container"
```
- _You must use it when you want to define the default container behavior._


2. **apptainer exec**
- Runs a specific command inside the container.
- It’s like docker exec CONTAINER command.
    - Example:
    ```bash
    apptainer exec myImageName.sif python3 script.py
    ```
- _You must use it when you need to run custom commands or bypass the default %runscript._


3. **apptainer instance**
- Apptainer supports long-lived containers, called instances (like Docker containers that keep running).
    - Start an instance:
    ```bash
    apptainer instance start myImageName.sif myInstance
    ```
    _This launches a background container named myInstance._

    - Run commands inside that instance:
    ```bash
    apptainer exec instance://myinstance python3 script.py
    ```

    - Stop it:
    ```bash
    apptainer instance stop myInstance
    ```
- _You must use instances when you want persistent state (e.g., web server, simulation workers) instead of one-off execution._


#### Docker vs Apptainer: commands comparison  
| Action                              | Docker                                                        | Apptainer                                 |
| ----------------------------------- | ------------------------------------------------------------- | ----------------------------------------- |
| Run default command                 | `docker run IMAGE`                                            | `apptainer run image.sif`                 |
| Run custom command                  | `docker run IMAGE command` OR `docker exec CONTAINER command` | `apptainer exec image.sif command`        |
| Start background container          | `docker run -d --name NAME IMAGE`                             | `apptainer instance start image.sif NAME` |
| Execute inside background container | `docker exec NAME command`                                    | `apptainer exec instance://NAME command`  |
| Stop background container           | `docker stop NAME`                                            | `apptainer instance stop NAME`            |

Where:
- ```run```: one-shot, default script.
- ```exec```: run any command inside.
- ```instance```: start/stop long-running containers (like daemons or workers).


> **Note**: Apptainer does not have a direct equivalent of Docker Compose.
Docker Compose is designed for orchestrating multiple long-running containers (such as services), while Apptainer is intended for HPC/scientific computing, where containers typically run single applications or batch jobs.