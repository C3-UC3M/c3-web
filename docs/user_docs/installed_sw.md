# Installed Software
Software packages on C3 are available as **Lmod modules** and/or **Spack packages**. Here we will cover how to use the provided software environment.

## Modules (Lmod)
To list available modules:
``` { .bash }
module avail
```
??? info "Default module version"
    If there are multiple versions of the same module, one of them will be the default version, marked with a **(D)**. If you load a module without specifying a version the default will be chosen.

To check which modules are currently loaded:
``` { .bash }
module list
```

To load a module:
``` { .bash }
module load <module_name>
```

To load a specific version:
``` { .bash }
module load <module_name>/<version>
```
??? example
    ``` { .bash }
    module load cuda/11.0
    ```

To unload a module:
``` { .bash }
module unload <module_name>
```

To swap one module for another:
``` { .bash }
module swap <module_name>/<version> <module_name>/<version>
```
??? example
    ``` { .bash }
    module switch cuda/12.8 cuda/11.0
    ```

To unload all modules:
``` { .bash }
module purge
```

To get information about a module:
``` { .bash }
module spider <module_name>
```
??? example
    ``` { .console .no-copy }
    [user@srvlogin03 ~]$ module spider cuda

    --------------------------------------------------------------------------------------------------------------------------------------------------------
    cuda:
    --------------------------------------------------------------------------------------------------------------------------------------------------------
        Versions:
            cuda/11.0
            cuda/12.8
        Other possible modules matches:
            nvhpc-hpcx-2.20-cuda12  nvhpc-hpcx-cuda12

    --------------------------------------------------------------------------------------------------------------------------------------------------------
    To find other possible module matches execute:

        $ module -r spider '.*cuda.*'

    --------------------------------------------------------------------------------------------------------------------------------------------------------
    For detailed information about a specific "cuda" package (including how to load the modules) use the module's full name.
    Note that names that have a trailing (E) are extensions provided by other modules.
    For example:

        $ module spider cuda/12.8
    --------------------------------------------------------------------------------------------------------------------------------------------------------
    ```


For more information please check the [official Lmod documentation](https://lmod.readthedocs.io/en/latest/).



## Spack
Many software packages on the cluster are available through Spack. To access them you must activate the cluster Spack instance, aka **global Spack**:
``` { .bash }
SPACK_GLOBAL_ROOT=/opt/ohpc/pub/spack
source ${SPACK_GLOBAL_ROOT}/share/spack/setup-env.sh
```
You can put those two lines in your *~/.bashrc* to have global Spack automatically activated every time you log in.

Now we will go through some commonly used Spack commands. You can check the [official Spack documentation](https://spack-tutorial.readthedocs.io/en/latest/tutorial_basics.html) for more details.
### Basic commands
List available packages:
``` { .bash }
spack find
```

Load a package:
``` { .bash }
spack load <package>
```

Check which packages you have loaded:
``` { .bash }
spack find --loaded
```

Unload a package:
``` { .bash }
spack unload <package>
```


### Advanced commands
List available packages with more details (variants, i.e. compilation options):
``` { .bash }
spack find -v
```

Check package information (source, versions, variants):
``` { .bash }
spack info <package>
```

List packages that were compiled with a specific compiler:
``` { .bash }
spack find %<compiler>@<version>
```
??? example
    ``` { .bash }
    spack find %gcc@12.2.0
    ```

List available packages with their installation path:
``` { .bash }
spack find -p
```

There could be multiple instances of the same package, with different versions and/or variants. Each package has a unique hash to identify it. List packages with hash:
``` { .bash }
spack find -l
```

Load a specific package instance using the hash:
``` { .bash }
spack load <package>/<hash>
```

Let us say you need a specific version of mpich that uses UCX. First list the available packages:
``` { .bash }
spack find -vl mpich
```
??? example "Available MPICH packages"
    ``` { .console .no-copy }
    -- linux-rocky8-zen3 / aocc@5.0.0 -------------------------------
    ulhdpg3 mpich@4.2.2~argobots~cuda+fortran~hcoll+hwloc+hydra~level_zero+libxml2+pci~rocm+romio~slurm+vci+verbs+wrapperrpath~xpmem build_system=autotools datatype-engine=auto device=ch4 netmod=ucx pmi=default
    r4faawj mpich@4.2.2~argobots~cuda+fortran+hwloc+hydra~level_zero+libxml2+pci~rocm+romio~slurm+vci+verbs+wrapperrpath~xpmem build_system=autotools datatype-engine=auto device=ch4 netmod=ofi pmi=default
    ==> 2 installed packages
    ```
Now load the UCX one:
``` { .bash }
spack load mpich/ulhdpg3
```



## Custom Software
If you need additional software, you can try to install it through Spack following [this guide](install_custom_sw_spack.md).

If you cannot install it on your own, please contact us at [c3-uc3m@uc3m.es](mailto:c3-uc3m@uc3m.es)