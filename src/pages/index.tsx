import React from 'react';
import { InsuranceCollateralCard } from '../components/InsuranceCollateralCard';
import { PolicyCard } from '../components/PolicyCard';
import { generatePolicy } from '../components/generators';
import { useIsMounted } from '../hooks/useIsMounted';

export default function Home() {
    const isMounted = useIsMounted();

    return (
        <>
            {isMounted && (
                <div className="container flex flex-col items-center space-y-2">
                    <div className="col-span-5 space-y-8">
                        <p className="title mt-16 text-5xl">Dashboard</p>
                        <div className="grid grid-cols-2 gap-2">
                            <div className="col-span-1">
                                <InsuranceCollateralCard insured />
                            </div>
                            <div className="col-span-1">
                                <InsuranceCollateralCard insured={false} />
                            </div>
                        </div>
                        <p className="title mt-16 text-5xl">
                            Upcoming Policies
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                        </div>
                        <p className="title mt-16 text-5xl">Active Policies</p>
                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                            <div className="col-span-1">
                                <PolicyCard policy={generatePolicy()} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
