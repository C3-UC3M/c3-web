# JupyterLab
This is a simple guide to launch a JupyterLab instance from a GPU node.

To execute JupyterLab instances on a GPU node you have to first create a Python virtual environment following these instructions. You can use Conda or one of the Python versions available in LMOD. **Note: you only have to do this once.**
=== "Conda"
    ``` { .bash }
    # Create a conda environment
    module load anaconda
    conda create --name lab python=3.12
    conda activate lab

    # Install dependencies
    conda install -y conda-forge::tensorflow-gpu conda-forge::cuda conda-forge::cudnn
    pip install jupyterlab ipykernel
    ```
=== "Python modules"
    ``` { .bash }
    # Create a virtual environment
    module load python
    # feel free to change the venv installation path, it doesn't have to be in your home directory
    python3 -m venv ~/lab
    source ~/lab/bin/activate

    # Install dependencies
    pip install jupyterlab ipykernel
    pip install torch torchvision torchaudio
    ```

    ??? info "Available Python versions"
        ``` { .bash }
        module avail python
        ```
        ``` { .console .no-copy }
        ------------------------------------------------ /opt/ohpc/pub/modulefiles ------------------------------------------------
        python/3.10.19    python/3.11.14    python/3.12.12    python/3.13.11    python/3.14.3 (D)

        Where:
        D:  Default Module
        ```

To launch your JupyterLab instance first allocate a GPU job:
``` { .bash }
# Launch a Slurm job on a GPU node
srun -A <slurm_account> -p gpu -N 1 --gpus=1 --pty bash
```

Now launch your JupyterLab instance:
=== "Conda"
    ``` { .bash }
    # load conda environment
    module load anaconda
    conda activate lab
    ```
=== "Python modules"
    ``` { .bash }
    # load virtual environment
    # if your venv is stored somewhere else change this path accordingly
    source ~/lab/bin/activate
    ```

``` { .bash }
# Launch Jupyter
jupyter lab --no-browser --ip=$(host $(hostname) | awk '/10.119.12/ {print $4}')
```

You should see something like this.
``` { .console .no-copy hl_lines="4"}    
    To access the server, open this file in a browser:
        file:///home/c3_username/.local/share/jupyter/runtime/jpserver-619173-open.html
    Or copy and paste one of these URLs:
        http://10.119.12.71:8888/lab?token=58e3faf95c177d7e5e3f357b79ec7334b343930222067b81
        http://127.0.0.1:8888/lab?token=58e3faf95c177d7e5e3f357b79ec7334b343930222067b81
```
Now you can access your Jupyter instance from a web browser by following the first *http* URL.

???+ warning "Allowed Ports"
    Whenever you launch Jupyter without specifying a port it will try to use port 8888 by default. However, if 8888 is already in use it will use something else. 
    Since we only allow **ports 8888 through 8897** on the GPU nodes, you might have to specify it manually, otherwise you won't be able to connect to your Jupyter instance easily:
    ``` { .bash }
    jupyter lab --no-browser --ip=$(host $(hostname) | awk '/10.119.12/ {print $4}') --port=<port>
    ```