# JupyterLab
This is a simple guide to launch a JupyterLab instance from a GPU node.

To execute JupyterLab instances on a GPU node you have to first create a Conda environment following these instructions. **Note: you only have to do this once.**
``` { .bash }
# Create a conda environment
module load anaconda
conda create --name lab python=3.12
conda activate lab

# Install dependencies
conda install -y conda-forge::tensorflow-gpu conda-forge::cuda conda-forge::cudnn
pip install jupyterlab ipykernel
```

To launch your JupyterLab instance first allocate a GPU job:
``` { .bash }
# Launch a Slurm job on a GPU node
srun -A <slurm_account> -p gpu -N 1 --gpus=1 --pty bash
```

Now launch your JupyterLab instance:
``` { .bash }
# Launch Jupyter
module load anaconda
conda activate lab
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
    Since we only allow **ports 8888 through 8897**, you might have to specify it manually, otherwise you won't be able to connect to your Jupyter instance easily:
    ``` { .bash }
    jupyter lab --no-browser --ip=$(host $(hostname) | awk '/10.119.12/ {print $4}') --port=<port>
    ```