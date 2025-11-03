# Data Storage
There are several storage volumes available at C3.

* **HOME**: NFS volume mounted on all login and compute nodes at */home*
* **Lustre**: parallel file system comprised of 16 OSTs distributed across 2 storage nodes. It is mounted on all login and compute nodes at */lustre*
* **Scratch**: temporary local NVMe scratch storage available on all compute nodes. You can access it at */scratch*, */tmp* and */var/tmp* after launching a Slurm job. Please note that everything stored here will be automatically deleted after your Slurm job ends