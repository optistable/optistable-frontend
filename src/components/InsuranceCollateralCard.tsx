import Link from 'next/link';
import React from 'react';
import { CardWithHeader } from '../components/CardWithHeader';
import { amounts } from '../components/common';
import { getRandomBigInt } from '../components/generators';

export const InsuranceCollateralCard: React.FC<{
    insured: boolean;
}> = ({ insured }) => (
    <CardWithHeader headerText={insured ? 'Total Insured' : 'Total Collateral'}>
        <div className="space-y-4">
            <div className="amount-bar">{...amounts()}</div>
            <p className="text-center text-4xl">
                ${getRandomBigInt(7).toLocaleString()}
            </p>
        </div>
        <div className="flex justify-center">
            <Link href={"/subscribe-insured"}>
                <div className="contained-button flex w-fit text-center text-2xl">
                    {insured ? 'Get Insured' : 'Provide Collateral'}
                </div>
            </Link>
        </div>
    </CardWithHeader>
);
