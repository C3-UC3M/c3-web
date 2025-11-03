# Install your own SW with Spack
You can install your own software with Spack. First install Spack in your HOME directory. We will refer to this Spack instance as **local Spack** to distinguish it from the cluster-provided Spack or *global Spack*.
``` { .bash }
git clone --depth=2 --branch=releases/v1.0 https://github.com/spack/spack.git ~/spack
```

Activate your **local Spack** instance:
``` { .bash }
SPACK_LOCAL_ROOT=${HOME}/spack
source ${SPACK_LOCAL_ROOT}/share/spack/setup-env.sh
```
You can put those two lines in your *~/.bashrc* instead of the *SPACK_GLOBAL_ROOT* ones to have your **local Spack** automatically activated every time you log in.

You will see that there is nothing installed initially:
``` { .bash }
spack find
```

## Access Global Spack packages from your Local Spack
If you want to use packages from the *global Spack* instance alongside those installed by you, run this command. It will create a YAML file that configures your **local Spack** to see the global Spack packages as well:
``` { .bash }
cat << EOF > ${HOME}/spack/etc/spack/defaults/upstreams.yaml
upstreams:
    spack-instance-1:
        install_tree: /opt/ohpc/pub/spack/opt/spack
EOF
```

Now you should see all the global packages:
``` { .bash }
spack find
```


## Before installing: select compilers
Before you start installing packages you should check which compilers are available to Spack. To list them:
``` { .bash }
spack compilers
```

We recommend adding the AOCC compiler (clang-based, AMD-optimized). It is available from the *global Spack* instance. Load it and add it:
``` { .bash }
spack load aocc@5.0.0
spack compiler find
```

Now it should show up:
``` { .bash }
spack compilers
```


## Installing packages
Now we can start installing packages.

### Look up packages
List all installable packages:
``` { .bash }
spack list
```

You can also search for a package:
``` { .bash }
spack list <package name>
```
??? example
    ``` { .bash }
    spack list mpi
    ```

Once you find the package you want to install check its information (source, versions, compilation variants):
``` { .bash }
spack info <package>
```

### Basic installation
Install a package:
``` { .bash }
spack install <package>
```
??? example
    ``` { .bash }
    spack install mpich
    ```

If you want a specific version:
Install a package:
``` { .bash }
spack install <package>@<version>
```
??? example
    ``` { .bash }
    spack install mpich@4.2.3
    ```

You can also tell Spack which compiler to use. We recommend using AOCC to produce AMD-optimized code:
``` { .bash }
spack install <package>@<version> %<compiler>
```
??? example
    ``` { .bash }
    spack install mpich@4.2.3 %aocc
    ```

Since there are multiple GCC versions available, you might want to specify a compiler version:
``` { .bash }
spack install <package>@<version> %<compiler>@<version>
```
??? example
    ``` { .bash }
    spack install mpich@4.2.3 %gcc@12.2.0
    ```

### Advanced installation
Now we will specify some compilation options using Spack *variants*. With `spack info` you can see all the available variants of a package. Some can be turned on and off (*true* or *false*), others have named options.

Following the mpich example, let us check some of its variants:
``` { .bash }
spack info mpich
```
``` { .text .no-copy }
Variants:
    argobots [false]                false, true
        Enable Argobots support
    build_system [autotools]        autotools
        Build systems supported by the package
    cuda [false]                    false, true
        Build with CUDA
    device [ch4]                    ch3, ch3:sock, ch4
        Abstract Device Interface (ADI)
        implementation. The ch4 device is in experimental state for versions
        before 3.4.
```
Each variant has a default value; for example *cuda* is disabled by default and *device* is configured as *ch4*.

Install a package with specific variants:
``` { .bash }
spack install <package>@<version> +<variant set to true> ~<variant set to false> <variant>=<value> %<compiler>@<version>
```
??? example
    Let us say we want to install **mpich** with *argobots* on, *cuda* off and *device* as "ch3":
    ``` { .bash }
    spack install mpich@4.2.3 +argobots ~cuda device=ch3 %aocc@5.0.0
    ```

You can also specify version and variants for dependencies:
``` { .bash }
spack install <package>@<version> <variant>=<value> ^<dependency>@<dependency version><dependency variants> %<compiler>@<version>
```
??? example
    Let us say we want to install **mpich** with *argobots* on, *cuda* off and *device* as "ch3":
    ``` { .bash }
    spack install mpich@4.2.3 netmod=ucx ^ucx@1.18.0 %aocc@5.0.0
    spack install mpich@4.2.3 netmod=ucx ^ucx@1.18.0+cma~dm %aocc@5.0.0
    ```

For more details please check the [official Spack documentation](https://spack-tutorial.readthedocs.io/en/latest/tutorial_basics.html).