'use client';
import Image from 'next/image';
import {useEffect} from 'react';
import {DataProvider} from '../../types';
import {generateDataProvider, generateOracleCommittee, generatePolicy} from '../../components/generators';
import {useRouter} from 'next/router';
import {usePolicyContract} from '../../hooks';
import {useContractRead, useContractReads} from 'wagmi';
import {useOracleCommitteeContract} from '../../hooks/usePolicyContract';


const hexToRgb = (hex: string) => {
    // Remove pound sign if present
    hex = hex.replace(/^#/, '');

    // Parse the hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return [r, g, b];
};

const transitionColors = (startColor: [number, number, number], endColor: [number, number, number], steps: number) => {

    const rStep = (endColor[0] - startColor[0]) / (steps - 1);
    const gStep = (endColor[1] - startColor[1]) / (steps - 1);
    const bStep = (endColor[2] - startColor[2]) / (steps - 1);

    const transitionColorsArray = [];

    for (let i = 0; i < steps; i++) {
        const r = Math.round(endColor[0] + i * rStep);
        const g = Math.round(endColor[1] + i * gStep);
        const b = Math.round(endColor[2] + i * bStep);

        const hexColor = `#${(r < 16 ? '0' : '') + r.toString(16)}${(g < 16 ? '0' : '') + g.toString(16)}${(b < 16 ? '0' : '') + b.toString(16)}`;

        transitionColorsArray.push(hexColor);
    }

    return transitionColorsArray;
};

const ProviderCard = ({provider}: { provider: DataProvider }) => {
    useEffect(() => {
        const fetchData = async () => {
            //TODO @ferrodri, re-fetch a provider's data here
        };
        const interval = setInterval(fetchData, 5000);
        return () => {
            clearInterval(interval);
        };
    }, []);
    return (<div className={'card w-3xl h-full'}>
            <div className={' justify-between text-center'}>

                <Image className={'m-auto'} src={provider.logo} height={80} alt={'logo'}/>
                <div className={'text-xl'}>{provider.title}</div>
                <div className={'text-xl'}>${provider.lastObservation?.toLocaleString()}</div>
                {/*TODO color hint when depegged vs depegged*/}
                <div className={'text-xl'} style={{color: provider.depegged ? '#ffa28a' : '#a3ff90'}}>
                    {provider.depegged ? 'Depegged' : 'Not Depegged'}
                </div>
            </div>
        </div>
    );
};
export default function PolicyDrilldown() {

    const router = useRouter();
    const policyId = router.query.policyId;

    console.log("policyId: ", policyId);
    const policyContract = usePolicyContract();
    const oracleCommitteeContract = useOracleCommitteeContract();
    const { data: policyData, isError: policyError, isLoading: policyLoading} = useContractRead(
        {
            ...policyContract,
            method: 'getMetadataForPolicy',
            args: [policyId]
        }
    )
    const { data: committeeAddressData, isError: committeeAddressError, isLoading: committeeAddressLoading} = useContractRead({
        ...policyContract,
        method: 'getOracleCommitteeAddress',
        args: [policyId]
    })

    const {data: committeeData, isError: committeeError, isLoading: committeeLoading} = useContractRead({
        ...oracleCommitteeContract,
        method: "getOracleMetadata",
        address: committeeAddressData,
    })

    const {data: providerData, isError: providerError
        , isLoading: providerLoading} = useContractReads({
        // contracts: committeeData?.providers.map((providerAddress: string) => ({
        contracts: committeeData?.[5].map((providerAddress: string) => ({
                ...oracleCommitteeContract,
                method: "getProviderMetadata",
                address: providerAddress
        }))
})

    console.log("policyError: ", policyError)

    console.log("policyData:", policyData)

    console.log("committeeAddressData: ", committeeAddressData)
    console.log("committeeData: ", committeeData)

    if(!policyId) return <div>Policy not found</div>


    // params.policyId for policy
    const committee = generateOracleCommittee();
    const providers = [generateDataProvider('USDC'), generateDataProvider('USDT'), generateDataProvider('DAI')];


    console.log(`mix(#FF0000, #00FF00, ${(committee.providersReportingDepegs / committee.providers.length) * 100}%)`);
    console.log('TEST');
    return(!policyLoading && !committeeAddressLoading && !committeeLoading && !providerLoading && <div className={'grid grid-cols-6 gap-8'}>
            <div className={'col-span-5 space-y-8'}>
                <p className={'text-5xl mt-16'}>Committee</p>
                <p className={'text-3xl mt-16'} style={{
                    color: `mix(#FF0000, #00FF00, ${(committee.providersReportingDepegs / committee.providers.length) * 100}%)`
                }}>
                    {committee.providersReportingDepegs}/{committee.providers.length} Depegged
                </p>

                <div className={'grid grid-cols-3 gap-8'}>
                    {providers.map((provider, i) => {
                        return (
                            <div key={i} className={'grid-cols-1'}>
                                <ProviderCard provider={provider}/>
                            </div>);
                    })}
                </div>
                <div className={'grid grid-cols-3'}>
                </div>

            </div>
        </div>
    );

}
