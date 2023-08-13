'use client';
import Image, { StaticImageData } from 'next/image';
import { ReactElement, useEffect } from 'react';
import { DataProvider } from '../../types';
import {
    generateDataProvider,
    generateOracleCommittee,
} from '../../components/generators';
import { useRouter } from 'next/router';
import { usePolicyContract } from '../../hooks';
import { useContractRead, useContractReads } from 'wagmi';
import {
    useDataProviderContract,
    useOracleCommitteeContract,
} from '../../hooks/usePolicyContract';
import {
    dataProviderToLogo,
    dataProviderToTitle,
} from '../../components/common';

const hexToRgb = (hex: string) => {
    // Remove pound sign if present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
};

const transitionColors = (
    startColor: [number, number, number],
    endColor: [number, number, number],
    steps: number
) => {
    const rStep = (endColor[0] - startColor[0]) / (steps - 1);
    const gStep = (endColor[1] - startColor[1]) / (steps - 1);
    const bStep = (endColor[2] - startColor[2]) / (steps - 1);

    const transitionColorsArray = [];

    for (let i = 0; i < steps; i++) {
        const r = Math.round(endColor[0] + i * rStep);
        const g = Math.round(endColor[1] + i * gStep);
        const b = Math.round(endColor[2] + i * bStep);

        const hexColor = `#${(r < 16 ? '0' : '') + r.toString(16)}${
            (g < 16 ? '0' : '') + g.toString(16)
        }${(b < 16 ? '0' : '') + b.toString(16)}`;

        transitionColorsArray.push(hexColor);
    }

    return transitionColorsArray;
};

const ProviderCard = ({ provider }: { provider: DataProvider }) => {
    const humanReadablePrice = Number(provider.lastObservation) / 100000000;

    return (
        <div className={'card w-3xl h-full'}>
            <div className={' justify-between text-center'}>
                <Image
                    className={'m-auto'}
                    src={provider.logo}
                    height={80}
                    alt={'logo'}
                />
                <div className={'text-xl'}>{provider.title}</div>
                <div className={'text-xl'}>${humanReadablePrice}</div>
                {/*TODO color hint when depegged vs depegged*/}
                <div
                    className={'text-xl'}
                    style={{ color: provider.depegged ? '#ffa28a' : '#a3ff90' }}
                >
                    {provider.depegged ? 'Depegged' : 'Not Depegged'}
                </div>
            </div>
        </div>
    );
};
export default function PolicyDrilldown() {
    const router = useRouter();
    const policyId = router.query.policyId;

    console.log('policyId: ', policyId);
    const policyContract = usePolicyContract();
    const oracleCommitteeContract = useOracleCommitteeContract();
    const dataProviderContract = useDataProviderContract();
    const {
        data: policyData,
        isError: policyError,
        isLoading: policyLoading,
    } = useContractRead({
        ...policyContract,
        functionName: 'getMetadataForPolicy',
        args: [policyId],
    });

    const {
        data: committeeData,
        isError: committeeError,
        isLoading: committeeLoading,
    } = useContractRead({
        ...oracleCommitteeContract,
        functionName: 'getOracleMetadata',
        address: policyData?.[5],
    });

    const {
        data: providerData,
        isError: providerError,
        isLoading: providerLoading,
    } = useContractReads({
        // contracts: committeeData?.providers.map((providerAddress: string) => ({
        contracts: committeeData?.[5].map((providerAddress: string) => {
            return {
                ...dataProviderContract,
                functionName: 'getProviderMetadata',
                address: providerAddress,
                watch: true,
            };
        }),
    });

    console.log('policyError: ', policyError);

    console.log('policyData:', policyData);

    console.log('committeeData: ', committeeData);

    console.log('providerData: ', providerData);
    if (!policyId) {
        return <div>Policy not found</div>;
    }

    //Bytes32 raw strings
    //  "0x636861696e6c696e6b2d646174612d6665656400000000000000000000000000"
    // "0x636861696e6c696e6b2d636369702d6261736500000000000000000000000000"
    // "0x72656473746f6e652d646174612d666565640000000000000000000000000000"
    //     "0x6c617965722d7a65726f2d6f702d676f65726c69000000000000000000000000"
    //     "0x636f696e6765636b6f0000000000000000000000000000000000000000000000"

    // params.policyId for policy
    const committee = generateOracleCommittee();
    const providers = [
        generateDataProvider('USDC'),
        generateDataProvider('USDT'),
        generateDataProvider('DAI'),
    ];

    console.log(
        `mix(#FF0000, #00FF00, ${
            (committee.providersReportingDepegs / committee.providers.length) *
            100
        }%)`
    );
    console.log('TEST');

    return (
        !policyLoading &&
        !committeeLoading &&
        !providerLoading && (
            <div className={'grid grid-cols-6 gap-8'}>
                <div className={'col-span-5 space-y-8'}>
                    <p className={'mt-16 text-5xl'}>Committee</p>
                    <p
                        className={'mt-16 text-3xl'}
                        style={{
                            color: `mix(#FF0000, #00FF00, ${
                                (committee.providersReportingDepegs /
                                    committee.providers.length) *
                                100
                            }%)`,
                        }}
                    >
                        {committee.providersReportingDepegs}/
                        {committee.providers.length} Depegged
                    </p>

                    <div className={'grid grid-cols-3 gap-8'}>
                        {providerData.map((provider, i) => {
                            const [
                                symbol,
                                oracleType,
                                lastBlockNum,
                                lastObservation,
                                switchStatusCounter,
                                lastObservationDepegged,
                            ] = provider;
                            const p: DataProvider = {
                                symbol: symbol,
                                oracleType: oracleType,
                                logo: dataProviderToLogo(oracleType),
                                title: dataProviderToTitle(oracleType),
                                lastBlockNum: lastBlockNum,
                                switchStatusCounter: switchStatusCounter,
                                lastObservation: lastObservation,
                                depegged: lastObservationDepegged, //Not an accurate value
                            };
                            return (
                                <div key={i} className={'grid-cols-1'}>
                                    <ProviderCard provider={p} />
                                </div>
                            );
                        })}
                    </div>
                    <div className={'grid grid-cols-3'}></div>
                </div>
            </div>
        )
    );
}
