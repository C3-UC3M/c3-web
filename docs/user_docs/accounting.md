# Accounting
Whenever you log in you will see your accumulated compute hours for the current month (only for your user). If you need to check more details, you can run the ***my_account*** command from any login node.

??? example "You will see this after loggin in:"
    ``` { .text .no-copy }
    Resource consumption for user cpetre (current month):
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T11:59:59 (2379600 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas    cpetre            cpu     3142 
    uc3mhpc                cuentadepruebas    cpetre       gres/gpu        0 
    
    For more information about resource usage please use the my_account command
    ```



## How to use *my_account*
Here you will find examples of how to use the *my_account* command.

### Accounts and Users
Let us say you want to see the resource comsumption of an entire account, not just of your user, for the current month:
``` { .bash }
my_account -a <account_name> -m
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -m
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T12:59:59 (2383200 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas                      cpu     3142 
    uc3mhpc                cuentadepruebas                 gres/gpu        0 
    ```

If you need the usage of each user in the Slurm account:
``` { .bash }
my_account -a <account_name> -v -m
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -v -m
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T12:59:59 (2383200 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas                      cpu     3142 
    uc3mhpc                cuentadepruebas                 gres/gpu        0 
    uc3mhpc                cuentadepruebas    cpetre            cpu     3142 
    uc3mhpc                cuentadepruebas    cpetre       gres/gpu        0 
    uc3mhpc                cuentadepruebas   pruebas            cpu       44 
    uc3mhpc                cuentadepruebas   pruebas       gres/gpu        0 
    ```

If you need the usage of a specific user within a specific account:
``` { .bash }
my_account -a <account_name> -u <user_name> -m
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -u pruebas -m
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T13:59:59 (2386800 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name        Used 
    --------- ------------------------------ --------- -------------- ----------- 
    uc3mhpc                cuentadepruebas   pruebas            cpu          44 
    uc3mhpc                cuentadepruebas   pruebas       gres/gpu           0 
    ```

If you need to check a specific user's usage:
``` { .bash }
my_account -u <user_name> -m
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -u pruebas -m
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T13:59:59 (2386800 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name        Used 
    --------- ------------------------------ --------- -------------- ----------- 
    uc3mhpc                cuentadepruebas   pruebas            cpu          44 
    uc3mhpc                cuentadepruebas   pruebas       gres/gpu           0 
    ```



### Date related options
To show the usage during the current month use the ***-m*** flag:
``` { .bash }
my_account -a <account_name> -m
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -m
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-10-01T00:00:00 - 2025-10-28T12:59:59 (2383200 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas                      cpu     3142 
    uc3mhpc                cuentadepruebas                 gres/gpu        0 
    ```

To show the all-time usage (since the account was created until now) use the ***-t*** flag:
``` { .bash }
my_account -a <account_name> -t
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -t
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 1970-01-01T00:00:00 - 2025-10-27T23:59:59 (1761609600 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name       Used 
    --------- ------------------------------ --------- -------------- ---------- 
    uc3mhpc                cuentadepruebas                      cpu    2364799 
    uc3mhpc                cuentadepruebas                 gres/gpu        953 
    ```

You can also specify a custom date range with the ***-s*** and ***-e*** options. Note that the date format must be **YYYY-MM-DDTHH:MM:SS**:
``` { .bash }
my_account -a <account_name> -s <YYYY-MM-DDTHH:MM:SS> -e <YYYY-MM-DDTHH:MM:SS>
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas -s 2025-09-01T00:00:00 -e 2025-10-31T23:59:59
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 2025-09-01T00:00:00 - 2025-10-28T12:59:59 (4975200 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas                      cpu    19027 
    uc3mhpc                cuentadepruebas                 gres/gpu      109 
    ```



### Multiple accounts/users
If you need to display the usage of multiple Slurm accounts and/or users, you can specify a comma-separated list of them:
``` { .bash }
my_account -a <account_name>[,<account_name>]* -t
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas,acct_tests_1 -t
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 1970-01-01T00:00:00 - 2025-10-27T23:59:59 (1761609600 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                   acct_tests_1                      cpu        1 
    uc3mhpc                   acct_tests_1                 gres/gpu        0 
    uc3mhpc                cuentadepruebas                      cpu  2364799 
    uc3mhpc                cuentadepruebas                 gres/gpu      953 
    ```

``` { .bash }
my_account -u <user_name>[,<user_name>]* -t
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -u cpetre,pruebas -t
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 1970-01-01T00:00:00 - 2025-10-27T23:59:59 (1761609600 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                cuentadepruebas    cpetre            cpu     7242 
    uc3mhpc                cuentadepruebas    cpetre       gres/gpu        2 
    uc3mhpc                cuentadepruebas   pruebas            cpu       44 
    uc3mhpc                cuentadepruebas   pruebas       gres/gpu        0 
    ```

``` { .bash }
my_account -a <account_name>[,<account_name>]* -u <user_name>[,<user_name>]* -t
```
??? example "Example Output"
    ``` { .text .no-copy }
    [cpetre@srvlogin02 ~]$ my_account -a cuentadepruebas,acct_tests_1 -u cpetre,pruebas -t
    --------------------------------------------------------------------------------
    Cluster/Account/User Utilization 1970-01-01T00:00:00 - 2025-10-27T23:59:59 (1761609600 secs)
    Usage reported in TRES Hours
    --------------------------------------------------------------------------------
    Cluster                        Account     Login      TRES Name     Used 
    --------- ------------------------------ --------- -------------- -------- 
    uc3mhpc                   acct_tests_1    cpetre            cpu        1 
    uc3mhpc                   acct_tests_1    cpetre       gres/gpu        0 
    uc3mhpc                cuentadepruebas    cpetre            cpu     7242 
    uc3mhpc                cuentadepruebas    cpetre       gres/gpu        2 
    uc3mhpc                cuentadepruebas   pruebas            cpu       44 
    uc3mhpc                cuentadepruebas   pruebas       gres/gpu        0 
    ```
