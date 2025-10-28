# Cluster Access
In this page you will find information about how to connect to C3. You can do it either via SSH (CLI) or RDP (GUI).

Once your C3 access has been approved you will receive a welcome email with a temporary password. You will be prompted to change it the first time you log in via SSH.

## SSH
You can connect to C3 via SSH with your username like this:
``` { .bash }
ssh <user_name>@c3.uc3m.es
```

We recommend you to generate a key pair to avoid typing your password every time you log in.
=== "Linux/macOS"
    Generate the SSH private/public key pair:
    ``` { .bash }
    ssh-keygen -t ed25519 -b 512 -C "$(whoami)@$(hostname)-$(date +'%d-%m-%Y')" -f ~/.ssh/id_ed25519
    ```
    Now copy the public key:
    ``` { .bash }
    cat ~/.ssh/id_ed25519.pub
    ```
    ??? example "It should look like this:"
        ``` { .text .nocopy }
        ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIG1IrqJzJwncJte06FkDJjG8wsjcNEXd1/jXOe6g+90M user@hostname-28-10-2025
        ```
    
=== "Windows"
    ``` { .powershell }
    ssh-keygen -t ed25519 -b 512
    ```

Finally log into the cluster and paste your public key in your ~/.ssh/authorized_keys file:
``` { .bash }
nano ~/.ssh/authorized_keys
```
Now you should be able to log into C3 without a password.



## RDP
All login nodes provide a graphical environment through RDP. You will need an RDP client to log in in this way.
=== "Linux"
=== "Windows"

??? warning "Expired Passwords"
    If you are trying to log in via RDP with an expired password, you might encounter issues. Remember that if you log in via SSH with an expired password, you will automatically be prompted to change it.



## Transfer files
If you need to transfer files from your computer to C3, there are many ways to do it. Here we will go over a few.
=== "Linux/macOS (CLI)"
    Open a terminal and run this command with your username:
    ``` { .bash }
    sftp <user_name>@c3.uc3m.es
    ```

    Now you have an SFTP shell from which you can upload and download files to and from the cluster.
    To upload a single file from your computer to the cluster:
    ``` { .text }
    put <local_file_path> <remote_file_path>
    ```
    ??? example "Example output"
        ``` { .text .no-copy }
        sftp> put /home/cosmin/test/test_file1 /home/cpetre/
        Uploading /home/cosmin/test/test_file1 to /home/cpetre/test_file1
        test_file1                                                                        100%    6     1.7KB/s   00:00    
        ```
    
    To upload an entire directory:
    ``` { .text }
    put -r <local_file_path> <remote_file_path>
    ```
    ??? example "Example output"
        ``` { .text .no-copy }
        sftp> put -r /home/cosmin/test/test_dir1/ /home/cpetre/
        Uploading /home/cosmin/test/test_dir1/ to /home/cpetre/test_dir1
        Entering /home/cosmin/test/test_dir1/
        test_file2                                                                        100%    7     1.7KB/s   00:00    
        test_file3                                                                        100%    7     2.1KB/s   00:00    
        ```

    To download a single file from the cluster to your computer:
    ``` { .text }
    get <remote_file_path> <local_file_path>
    ```
    ??? example "Example output"
        ``` { .text .no-copy }
        sftp> get /home/cpetre/test_file4 /home/cosmin/test/
        Fetching /home/cpetre/test_file4 to /home/cosmin/test/test_file4
        test_file4                                                                        100%   14     2.4KB/s   00:00    
        ```

    To download an entire directory:
    ``` { .text }
    get -r <remote_file_path> <local_file_path>
    ```
    ??? example "Example output"
        ``` { .text .no-copy }
        sftp> get -r /home/cpetre/test_dir2/ /home/cosmin/test/
        Fetching /home/cpetre/test_dir2/ to /home/cosmin/test/test_dir2
        Retrieving /home/cpetre/test_dir2
        test_file5                                                                        100%   16     3.1KB/s   00:00    
        test_file6                                                                        100%   16     3.1KB/s   00:00    
        test_file7                                                                        100%   16     3.1KB/s   00:00    
        ```

=== "Linux/macOS (GUI)"
    ``` { .bash }
    ```

=== "Windows (WinSCP)"
    ``` { .powershell }
    ```
