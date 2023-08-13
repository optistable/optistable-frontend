import { useAccount, useContractReads, useContractWrite } from 'wagmi';
import { usePolicyContract } from '../hooks';
import POLICY_WRAPPER_ABI from '../shared/abi/PolicyWrapper.json';

interface Props {
    token: `0x${string}`;
}

const WithdrawToken: React.FC<Props> = ({ token }) => {
    const Policy = usePolicyContract();
    const policyId = 0;
    const { address } = useAccount();
    const { data } = useContractReads({
        contracts: [
            {
                address: token,
                abi: POLICY_WRAPPER_ABI.abi,
                functionName: 'name',
            },
            {
                address: token,
                abi: POLICY_WRAPPER_ABI.abi,
                functionName: 'symbol',
            },
            {
                address: token,
                abi: POLICY_WRAPPER_ABI.abi,
                functionName: 'balanceOf',
                args: [address],
            },
        ],
        watch: true,
    });
    const name = data?.[0] as string;
    const symbol = data?.[1] as string;
    const balanceOf = Number(data?.[2]) as number;

    const { writeAsync } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: Policy?.address,
        abi: Policy?.abi,
        functionName: 'withdrawAsInsured',
        args: [policyId, balanceOf],
    });

    return (
        <li className="flex items-center gap-4">
            <div
                className="flex h-24 w-24 flex-shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: '#8014A4' }}
            >
                <span className="text-xs font-thin text-white">{symbol}</span>
            </div>
            <div className="flex-grow">
                <h3 className="text-lg font-semibold text-white">{name}</h3>
                <p className="text-gray-300">Balance: {balanceOf}</p>
            </div>
            <button
                className="nav-link ml-4 flex items-center rounded p-2 text-xl font-bold"
                style={{
                    backgroundColor: 'white',
                    color: '#8014a4',
                }}
                onClick={() => {
                    writeAsync();
                    // Implement your withdraw logic here
                    console.log(`Withdrawing ${symbol}`);
                }}
            >
                Withdraw
            </button>
        </li>
    );
};

export default WithdrawToken;
