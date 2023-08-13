import React, { useState } from 'react';
import WithdrawToken from './WithdrawToken';

const tokens = [
    { address: '0x5487f2703E3C858E46346c837F9BAe66789ea03D' as `0x${string}` },
    { address: '0x0F1317DE1136c0433f6A8F77a58BF3751f06A362' as `0x${string}` },
    { address: '0x8a32b1c0A9CaAF42303BDFbaa829aE0dB877669b' as `0x${string}` },
    { address: '0x6324840a44bc461825aA60a178D942C5278ba6f1' as `0x${string}` },
    { address: '0xa9a9935025FC7cdf25B1224b4c36A9A1b31e769f' as `0x${string}` },
    { address: '0x355e785BeC1846F7fb569dB3a220419376868d1a' as `0x${string}` },
];

const Withdraw: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);

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
                            <WithdrawToken key={index} token={token.address} />
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Withdraw;
