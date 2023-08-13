import {useNetwork} from 'wagmi';
import POLICY_ABI from '../shared/abi/PolicyManager.json';
import ORACLE_COMMITTEE_ABI from '../shared/abi/OracleCommittee.json';
import GENERIC_DATA_PROVIDER from '../shared/abi/GenericDataProvider.json';

export interface PolicyContractMap {
    [chainId: number]: {
        address: string,
        abi: any
    };
}
export interface OracleCommitteeContractMap {
    [chainId: number]: {
        abi: any
    };
}

export function usePolicyContract() {
    const {chain} = useNetwork();

    const policyContract: PolicyContractMap = {
        5: {
            address: '0xC9Fd4F40b09DE3B07ccD83613A0ceAD5e8159Bb8',
            abi: POLICY_ABI.abi,
        }

    };

    return chain?.id ? policyContract[chain?.id] : undefined;
}
export function useOracleCommitteeContract(){
    const {chain} = useNetwork();

    const policyContract: OracleCommitteeContractMap = {
        5: {
            abi: ORACLE_COMMITTEE_ABI.abi,
        }

    };

    return chain?.id ? policyContract[chain?.id] : undefined;
}

export function useDataProviderContract(){
    const {chain} = useNetwork();

    const policyContract: OracleCommitteeContractMap = {
        5: {
            abi: GENERIC_DATA_PROVIDER.abi,
        }
    };

    return chain?.id ? policyContract[chain?.id] : undefined;
}



// export function useOracleCommitteeContract(): `0x${string}` | undefined {
//     const { chain } = useNetwork();
//
//     const policyContract: PolicyContractMap = {
//         5: '0x090C0d8570E14B785B3F7c8003D229a5ad966D6e'
//     };
//
//     const contractAddress = chain?.id ? policyContract[chain.id] : undefined;
//
//     return contractAddress ? contractAddress as `0x${string}` : undefined;
// }
//
// export function usePolicyContract(): `0x${string}` | undefined {
//     const { chain } = useNetwork();
//
//     const policyContract: PolicyContractMap = {
//         5: '0x090C0d8570E14B785B3F7c8003D229a5ad966D6e'
//     };
//
//     const contractAddress = chain?.id ? policyContract[chain.id] : undefined;
//
//     return contractAddress ? contractAddress as `0x${string}` : undefined;
// }