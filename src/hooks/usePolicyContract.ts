import { useNetwork } from 'wagmi';

interface PolicyContractMap {
    [chainId: number]: string;
}

export function usePolicyContract(): `0x${string}` | undefined {
    const { chain } = useNetwork();

    const policyContract: PolicyContractMap = {
        5: '0x6a61a1231a3118dff17b31e4fb6271deb7df2ee4'
    };

    const contractAddress = chain?.id ? policyContract[chain.id] : undefined;

    return contractAddress ? contractAddress as `0x${string}` : undefined;
}