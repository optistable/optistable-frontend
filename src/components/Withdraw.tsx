import React, { useState } from 'react';
import { useNetwork } from 'wagmi';
import WithdrawToken from './WithdrawToken';

interface TokenEntry {
    address: `0x${string}`;
}

interface TokenMap {
    [chainId: string]: TokenEntry;
}

const tokens: TokenMap[] = [
    {
        5: {
            address:
                '0x5487f2703E3C858E46346c837F9BAe66789ea03D' as `0x${string}`,
        },
        84531: {
            address:
                '0x83bc958F2583b8a2dFBEaf7491d4Ac1268C7f2f7' as `0x${string}`,
        },
    },
    {
        5: {
            address:
                '0x0F1317DE1136c0433f6A8F77a58BF3751f06A362' as `0x${string}`,
        },
        84531: {
            address:
                '0xee2Bb000fa811dd5576bF2093896C1C5b00f1c52' as `0x${string}`,
        },
    },
    {
        5: {
            address:
                '0x8a32b1c0A9CaAF42303BDFbaa829aE0dB877669b' as `0x${string}`,
        },
        84531: {
            address:
                '0x69d66356FcF62d8eAb1FB2d86f3374508D611b3d' as `0x${string}`,
        },
    },
    {
        5: {
            address:
                '0x6324840a44bc461825aA60a178D942C5278ba6f1' as `0x${string}`,
        },
        84531: {
            address:
                '0x0c4Ebb89e161110C36F035B539e5c48Aa5DA12e8' as `0x${string}`,
        },
    },
    {
        5: {
            address:
                '0xa9a9935025FC7cdf25B1224b4c36A9A1b31e769f' as `0x${string}`,
        },
        84531: {
            address:
                '0x90fA38b44b7ee27907D6e07993b965E7CcDA01E2' as `0x${string}`,
        },
    },
    {
        5: {
            address:
                '0x355e785BeC1846F7fb569dB3a220419376868d1a' as `0x${string}`,
        },
        84531: {
            address:
                '0x63279fAC2901C671fE2e15A04D3700d5f9Efc0d8' as `0x${string}`,
        },
    },
];

const Withdraw: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const { chain } = useNetwork();

    return (
        <div className="relative z-20">
            <div
                className="nav-link ml-4 flex items-center rounded p-2 text-xl font-bold"
                style={{ backgroundColor: 'white', color: '#8014a4' }}
            >
                <button
                    className="px-4 py-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    Withdraw
                </button>
            </div>
            {menuOpen && (
                <div className="fixed inset-y-0 right-0 w-1/2 bg-black p-4 shadow-lg">
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-white">
                            Select Token to Withdraw
                        </h2>
                        <button
                            className="text-xl text-white"
                            onClick={() => setMenuOpen(false)}
                        >
                            &#x2715; {/* Close "X" symbol */}
                        </button>
                    </div>
                    <ul className="flex flex-col gap-4">
                        {tokens.map((token, index) => (
                            <WithdrawToken
                                key={index}
                                token={
                                    token[chain?.id ? chain.id.toString() : '5']
                                        .address
                                }
                            />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
