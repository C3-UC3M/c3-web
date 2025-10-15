The C3 supercomputing cluster has the following technical specifications:

* 90 compute nodes with the following specifications per node:
    * Dual processor backplane with two AMD EPYC 7713 CPUs, each with 64 cores (128 cores total).
    * 1024GB DDR4-3200 ECC RDIMM RAM.
    * 3.5TB NVMe PCIe Gen 4.0 local SSD storage for scratch space.

* 5 GPU nodes with the following specifications per node:
    * Dual processor motherboard with two AMD EPYC 7513 CPUs, each with 32 cores (64 cores total).
    * 512GB DDR4 3200 ECC RDIMM RAM.
    * 7TB NVMe PCIe Gen 4.0 local SSD storage for scratch space.

* 42 NVIDIA A40 GPUs (336 Tensor Cores, 84 RT Cores and 48 GB GDDR6 ECC memory each)

* High availability storage system featuring:
    * Lustre FS, with 540TB of capacity and high redundancy.
    * NFS with DRAM access, and 64TB of capacity.

* 100Gbps HDR Infiniband network for computation and data storage.