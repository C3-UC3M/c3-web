# Storage and Quotas
You can store your data persistently in two separate places: your */home* directory and Lustre. We recommend Lustre for large files, as */home* space is quite limited.

## Home
Each project has 100 GB of storage space allocated in the */home* volume. It is shared among all users of the project.



## Lustre
Your project has an associated directory in the Lustre file system that you can access:
**/lustre/<rate\>/<project\>**, where *rate* is your CAI user type (uc3m_a, uc3m_a0, uc3m_art60, opi_b or ext_c) and *project* is your project's acronym from the form you submitted.

All users of your project can access said directory. Note that Lustre storage space is also shared among all users of your project.



## Storage Quotas
You can check your project's storage quotas and usage by logging in. You will see the welcome message along with something like this:
``` { .console .no-copy }
Available storage:
    /home:   Used: 78.69 GB, Quota: 100.00 GB
    /lustre: Used: 0.00 GB, Quota: 0.00 GB
```
Note that it displays the total for all users of your project. To check your individual user's disk usage please employ the *du* command. 

You can also check your Lustre storage quota from the command line:
``` { .bash }
lfs quota -h -p $(lfs project -d /lustre/<rate>/<project>/ | awk '/lustre/ {print $1}') /lustre
```
??? example "Example output"
    ``` { .console .no-copy }
    Disk quotas for prj 407200082 (pid 407200082):
        Filesystem    used   quota   limit   grace   files   quota   limit   grace
        /lustre/  3.732T      0k      4T       - 20684509       0       0       -
    pid 407200082 is using default file quota setting
    ```
