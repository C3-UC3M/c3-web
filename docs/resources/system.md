The C3 supercomputing cluster has the following technical specifications:

* 90 compute nodes with the following specifications per node:
    * Dual processor backplane with two AMD EPYC 7713 CPUs, each with 64 cores (128 cores total).
    * 1024GB DDR4-3200 ECC RDIMM RAM.
    * 3.5TB PCIe Gen4 NVMe SSD for local scratch space.

* 5 GPU nodes with the following specifications per node:
    * Dual processor motherboard with two AMD EPYC 7513 CPUs, each with 32 cores (64 cores total).
    * 512GB DDR4 3200 ECC RDIMM RAM.
    * 7TB PCIe Gen4 NVMe SSD for local scratch space.

* 42 NVIDIA A40 GPUs (336 Tensor Cores, 84 RT Cores and 48GB GDDR6 ECC memory each)

* High availability storage system featuring:
    * Lustre FS, with 546TB of capacity and high redundancy.
    * NFS with RDMA access, and 48TB of capacity.

* 100Gbps HDR Infiniband network for computation and data storage.