import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import MaterialSyncAltIcon from '../../public/material-sync-alt.svg';
import { stablecoins } from '../components/common';
import { Policy } from '../types';

export const PolicyCard = ({ policy, totalProviders, depeggedProviders, activatedPolicies }:
    { policy: Policy, totalProviders: number, depeggedProviders: string, activatedPolicies: boolean }) => {
    // console.log("PolicyCard totalProviders: ", totalProviders)
    // console.log("PolicyCard depeggedProviders: ", depeggedProviders)
    return <Link href={activatedPolicies
        ? `/policy/${policy.policyId}`
    : `/subscribe-insured?${policy.insuredTokenAddress}&${policy.collateralTokenAddress}`} passHref>
        <div
            className="action-card card mx-4 my-4 max-w-md  justify-center space-y-4 "
            key={policy.policyId}
        >
            <div className="flex justify-center space-x-4">
                <div>
                    {stablecoins[policy.insuredTokenAddress.toString()].icon(
                        80,
                        0
                    )}
                </div>
                <div className="flex items-center" style={{color: '#FFF'}}>
                    <Image
                        src={MaterialSyncAltIcon}
                        alt="sync"
                        height={80}
                        color={'white'}
                        className={'material-icons'}
                    />
                </div>
                <div>
                    {stablecoins[policy.collateralTokenAddress.toString()].icon(
                        80,
                        0
                    )}
                </div>
            </div>
            <p className="text-center text-4xl">
                {/*TODO @ferrodri, how can we get the total insured here?*/}
                ${policy.insuredAmount.toLocaleString()}

            </p>
            {activatedPolicies
            ? <p className="text-center text-xl">{depeggedProviders || 1 }/{totalProviders?.toString() || 5} Depegged</p>
            //     No need for a link below because the entire card is a link
            : <div className={"contained-button"}>Subscribe Now</div>}
        </div>
    </Link>
};
