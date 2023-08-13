import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MaterialSyncAltIcon from '../../public/material-sync-alt.svg';
import { stablecoins } from '../components/common';
import { Policy } from '../types';

export const PolicyCard = ({ policy }: { policy: Policy }) => (
    <Link href={`/policy/${policy.address.toString()}`} passHref>
        <div
            className="action-card card mx-4 my-4 max-w-md  justify-center space-y-4 "
            key={policy.address.toString()}
        >
            <div className="flex justify-center space-x-4">
                <div>
                    {stablecoins[policy.insuredTokenAddress.toString()].icon(
                        80,
                        0
                    )}
                </div>
                <div className="flex items-center" style={{ color: '#FFF' }}>
                    <Image
                        src={MaterialSyncAltIcon}
                        alt="sync"
                        height={80}
                        color={'white'}
                        className={'material-icons'}
                    />
                </div>
                <div>
                    {stablecoins[policy.insuredTokenAddress.toString()].icon(
                        80,
                        0
                    )}
                </div>
            </div>
            <p className="text-center text-4xl">
                ${policy.insuredAmount.toLocaleString()}
            </p>
            <p className="text-center text-xl">0/5 Depegged</p>
        </div>
    </Link>
);
