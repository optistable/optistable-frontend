import React, {Suspense} from 'react';
import {InsuranceCollateralCard} from '../components/InsuranceCollateralCard';
import {PolicyCard} from '../components/PolicyCard';
import {generatePolicy, getRandomBigInt} from '../components/generators';
import {useIsMounted} from '../hooks/useIsMounted';
import {usePolicyContract} from '../hooks';
import {useContractRead, useContractReads} from 'wagmi';
import {PolicyContractMap, useOracleCommitteeContract} from '../hooks/usePolicyContract';


const ActivePolicies: React.FC<{ policyContract: PolicyContractMap, policies: string[], activatedPolicies: boolean }> = ({
    policyContract,
    policies,
    activatedPolicies
}) => {
    const {data: dataPolicies, isError: isErrorPolicies, isLoading: isLoadingPolicies} = useContractReads({
        contracts: policies?.map((policy) => ({
            ...policyContract,
            functionName: 'getMetadataForPolicy',
            args: [policy],
        })),
    });

    const {data: oracleAddresses, isError: isErrorOracles, isLoading: isLoadingOracles} = useContractReads({
        contracts: policies?.map((policy) => ({
            ...policyContract,
            functionName: 'getOracleCommitteeAddress',
            args: [policy],
        })),
    });

    const oracleContract = useOracleCommitteeContract();
    const {data: oracleMeta, isError: isErrorDepegs, isLoading: isLoadingDepegs} = useContractReads({
        contracts: oracleAddresses?.map((oracle) => ({
            ...oracleContract,
            address: oracle,
            functionName: 'getOracleMetadata',
        }))
    });

    return (!isLoadingPolicies && !isLoadingOracles && !isLoadingDepegs && <div className="grid grid-cols-3 gap-2">
            {dataPolicies?.filter(policy => {
                if(!policy) return false
                const [, , , , , , policyActivated] = policy;
                return activatedPolicies ? policyActivated : !policyActivated;
            }).map((policy, i) => {
                console.log('Reading policy');
                const [policyId, policyPremiumPCT, policyBlock, policyAsset, policyCollateral, policyAssetSymbolBytes32, policyActivated] = policy;
                const [symbol, l1TokenAddress, startingBlock, endingBlock, providersReportingDepeg, providers] = oracleMeta[i]

                console.log(providers)
                console.log(providersReportingDepeg)
                return (<div className="col-span-1" key={`active-policy-${policyId}-${i}`}>
                    <PolicyCard policy={{
                    policyId,
                    insuredTokenAddress: policyAsset,
                    collateralTokenAddress: policyCollateral,
                    insuredAmount: getRandomBigInt(7), //TODO @ferrodri, how can we fetch this?
                    collateralAmount: getRandomBigInt(7) //TODO @ferrodri, how can we fetch this?
                    }} totalProviders={providers.length} depeggedProviders={providersReportingDepeg.toString()}
                                activatedPolicies={activatedPolicies}/> </div>)
                console.log(policyId, policyPremiumPCT, policyBlock, policyAsset, policyCollateral, policyAssetSymbolBytes32, policyActivated);
                // console.log(oracleAddress);
                console.log(symbol, l1TokenAddress, startingBlock, endingBlock, providersReportingDepeg, providers)
                // console.log(depeg, providers)
                return <span/>;
            })}
        </div>
    );
};

export default function Home() {
    const isMounted = useIsMounted();

    const policyContract = usePolicyContract();
    const {data: data1, isError: isError1, isLoading: isLoading1} = useContractRead({
        ...policyContract,
        functionName: 'getAllPolicies',
    });


    return (
        <>
            {isMounted && !isLoading1 && (
                <div className="container flex flex-col items-center space-y-2 mt-16">
                    <div className="col-span-5">
                        <p className="title text-5xl">Dashboard</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-1">
                                <InsuranceCollateralCard insured/>
                            </div>
                            <div className="col-span-1">
                                <InsuranceCollateralCard insured={false}/>
                            </div>
                        </div>
                        <p className="title text-5xl">
                            Upcoming Policies
                        </p>
                        <p className="title mt-16 text-5xl">Active Policies</p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()}/>
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()}/>
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()}/>
                            </div>
                        </div>

                        <p className="title mt-16 text-5xl">Active Policies</p>
                        <ActivePolicies policyContract={policyContract} policies={data1} activatedPolicies={true}/>
                    </div>
                </div>
            )}
        </>
    );
}
