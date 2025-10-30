# JupyterHub
This is a simple guide to launch a JupyterLab instance from a GPU node

``` { .bash }
# Create a conda environment
module load anaconda
conda create --name lab python=3.12
conda activate lab

# Install dependencies
conda install -y conda-forge::tensorflow-gpu conda-forge::cuda conda-forge::cudnn
pip install jupyterlab ipykernel
```

``` { .bash }
# Launch a Slurm job on a GPU node
srun -A <slurm_account> -p gpu -N 1 --gpus=1 --pty bash
```

``` { .bash }
# Launch Jupyter
conda activate lab
jupyter lab --no-browser --ip=$(host $(hostname) | awk '/10.119.12/ {print $4}')
```
