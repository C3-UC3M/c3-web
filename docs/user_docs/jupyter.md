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
