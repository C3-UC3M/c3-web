# Install your own SW with Spack
You can install your own software with Spack. First install Spack in your HOME directory. We will refer to this Spack instance as **local Spack** to distinguish it from the cluster-provided Spack or *global Spack*.
``` { .bash }
git clone --depth=2 https://github.com/spack/spack.git ~/spack
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

For more details please check the [official Spack documentation](https://spack.readthedocs.io/en/latest/index.html).

### Proxy workarounds
When you install a package with Spack it usually needs to download some files, but sometimes the UC3M proxy will block these downloads, and you will get an error. For instance, if you tried to install *git*:
``` { .bash }
spack install git %aocc
```

You would see an error like this:
``` { .text .no-copy }
==> Error: FetchError: All fetchers failed for resource-git-manpages-xvnirzmom7c4nenkzihpyi6twm6wpz5t
        https://mirror.spack.io/_source-cache/archive/49/4954390466c125e82dce4a978dd1dadda13a916564d908cfdbd319f2e174a8ae.tar.gz: DetailedHTTPError: GET https://mirror.spack.io/_source-cache/archive/49/4954390466c125e82dce4a978dd1dadda13a916564d908cfdbd319f2e174a8ae.tar.gz returned 404: Not Found
    https://www.kernel.org/pub/software/scm/git/git-manpages-2.53.0.tar.gz: DetailedURLError: GET https://www.kernel.org/pub/software/scm/git/git-manpages-2.53.0.tar.gz errored with: Tunnel connection failed: 403 Filtered
```
Spack is looking for a tarball at *https://mirror.spack.io/_source-cache/archive/49/4954390466c125e82dce4a978dd1dadda13a916564d908cfdbd319f2e174a8ae.tar.gz*, but it doesn't exist, so it tries to get it from the source (*https://www.kernel.org/pub/software/scm/git/git-manpages-2.53.0.tar.gz*), which gets blocked by the proxy.

Now, to work around this we can download the missing file ourselves, copy it to C3 and then put it somewhere Spack can see it.

1. Set up a local mirror on the cluster. We will inject any missing dependencies here:
``` { .bash }
# assuming you have Spack installed in your HOME directory
mkdir ~/spack/mirror
spack mirror add local_spack_mirror file://$HOME/spack/mirror/
```

2. Download missing dependencies offline (from your computer) and copy them to C3
``` { .bash }
wget https://www.kernel.org/pub/software/scm/git/git-manpages-2.53.0.tar.gz
scp git-manpages-2.53.0.tar.gz <user>@c3.uc3m.es:~
```

3. Let's put it in the local mirror and rename it according to the hash that Spack looks for in the error message
``` { .bash }
mkdir -p ~/spack/mirror/_source-cache/archive/49
mv ~/git-manpages-2.53.0.tar.gz ~/spack/mirror/_source-cache/archive/49/4954390466c125e82dce4a978dd1dadda13a916564d908cfdbd319f2e174a8ae.tar.gz
```

4. Now install it
``` { .bash }
spack install git %aocc
```

??? info
    Now every time you install something with Spack you get a warning about your local mirror:
    ``` { .text .no-copy }
    ==> Warning: The following issues were ignored while updating the indices of binary caches
    Multiple errors during fetching:
            Error 1: BuildcacheIndexNotExists: Index not found in cache file:///home/user/spack/mirror/v3/manifests/index/index.manifest.json
            Error 2: BuildcacheIndexNotExists: Index not found in cache file:///home/user/spack/mirror/build_cache/index.json
    ```

    To suppress this warning let's tell Spack that this mirror is just for source code, not a buildcache. Edit this file:
    ``` { .bash }
    nano ~/.spack/mirrors.yaml
    ```

    Its contents should look like this (replace "user" with your username):
    ``` { .text }
    mirrors:
    local_spack_mirror:
        url: file:///home/user/spack/mirror/
        source: true
        binary: false
    ```