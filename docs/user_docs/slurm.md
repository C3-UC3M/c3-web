# Slurm
SLURM (Simple Linux Utility for Resource Management) is a cluster management and job scheduling system used in high-performance computing (HPC) clusters. This manual covers the basic commands for submitting and managing jobs in our SLURM environment.

## Basic Commands
* **sinfo**: Displays cluster nodes status
* **sbatch**: Run a job in batch mode
* **srun**: Executes an interactive job or a job step within a script/sbatch job
* **squeue**: Shows active and queued jobs
* **scancel**: Cancel a job
* **sacct**: Shows job history



## Accounting
In order to launch jobs with Slurm (*sbatch*, *salloc*, *srun*) you must specify a billing account aka Slurm account with the **-A** or **--account** options. You can check which Slurm account your project is associated to like this:
```
sacctmgr show user $USER withassoc format=User,Account%30
```

??? example "Example output"
    ``` { .bash .no-copy }
    [pruebas@srvlogin02 ~]$ sacctmgr show user $USER withassoc format=User,Account%30
        User                        Account  
    ---------- ------------------------------  
      pruebas                cuentadepruebas
    ```

### Common pitfalls
If the name of the Slurm account is too long it could be displayed with a + sign at the end, like this:
``` { .yaml .no-copy }
[pruebas@srvlogin02 ~]$ sacctmgr show user $USER withassoc format=User,Account
     User    Account  
---------- ----------  
  pruebas cuentadep+
```
In this example, **cuentadep+ is not a valid Slurm account!** If you try to launch jobs with cuentadep+ you will get an error. The correct account is cuentadepruebas (the full name).

To ensure that you get the full account name, specify a longer length for the account, e.g. 40 characters (**Account%40**) until you don’t see a + sign at the end:
```
sacctmgr show user $USER withassoc format=User,Account%40
sacctmgr show user $USER withassoc format=User,Account%<number of characters>
```


??? warning "Multiple Slurm Accounts"
    If you are part of more than one project you will have one user login with access to multiple Slurm accounts. Let us take Bob for an example: he is a researcher working on 2 different projects, Project-Apples and Project-Oranges. Bob has a single user login (**bob**) with access to 2 Slurm accounts: **project_apples** and **project_oranges**. When Bob works on Project-Apples he should use the corresponding project_apples Slurm account, like this:
    ```
    srun -A project_apples --pty bash
    ```

    **When you launch jobs please make sure to assign them to the correct Slurm account.**


### Ease of use
If you only have one Slurm account we recommend that you add these lines at the end of your **~/.bashrc**. Every time you log in this will export an environment variable that contains your account name, so that you can reference it easily. Just replace *cuentadepruebas* with your full Slurm account name.
```
# set up Slurm Account
export SLURM_BILLING_ACCOUNT=cuentadepruebas
```

Now you can launch jobs like this:
```
srun -A $SLURM_BILLING_ACCOUNT --pty bash
```



## Launch Jobs
There are several ways to launch jobs in Slurm. Here we cover the two main approaches.

### Interactive Jobs
Interactive mode is useful for tests, development or if you just need to work directly on a compute node.

Example 1. Simple interactive session: Requests default resources and opens a bash shell in the allocated compute node
```
srun -A <slurm account> --pty bash
```

Example 2. Specify resources: This requests 1 node, 4 processes (cores), 1 hour runtime and 4GB of RAM
```
srun --account <slurm account> --pty --nodes=1 --ntasks=4 --time=01:00:00 --mem=4G bash
```
For more advanced customization please check the [official Slurm documentation for srun](https://slurm.schedmd.com/srun.html).


### Batch Jobs
Ideal for production workloads or long jobs. We have a script that contains all job instructions.

Example sbatch script (my_job.sbatch). Replace <slurm account\> with your Slurm account
```
#!/bin/bash

#SBATCH --job-name=my_job
#SBATCH --account=<slurm account>
#SBATCH --output=output_%j.out
#SBATCH --error=error_%j.err
#SBATCH --ntasks=4
#SBATCH --time=02:00:00
#SBATCH --mem=8G

# load modules (optional)
module load python/3.10

# run the program
python my_script.py
```

For more advanced customization please check the [official Slurm documentation for sbatch](https://slurm.schedmd.com/sbatch.html).



## Monitor Jobs

Display all running/queued jobs
```
squeue
```

Display only your jobs
```
squeue -u $USER
```

Check job details
```
scontrol show job <job_id>
```

Cancel job
```
scancel <job_id>
```

List job history
```
sacct -u $USER
```



## Additional Documentation
If you need help with something that is not covered in this guide please check the [official Slurm Documentation](https://slurm.schedmd.com/documentation.html).