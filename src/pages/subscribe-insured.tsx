import { MenuItem, Select } from '@mui/material';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContractRead, useContractWrite } from 'wagmi';
import { stablecoins } from '../components/common';
import { getRandomNumber } from '../components/generators';
import { usePolicyContract } from '../hooks';
import { useIsMounted } from '../hooks/useIsMounted';
import { Stablecoin } from '../types';

type FormValues = {
    amount: number;
    insurerToken: string;
    collateralToken: string;
};

const StablecoinMenuItem = (
    stablecoin: Stablecoin,
    key: number,
    disableAddress?: string
) => {
    const disabled = stablecoin.address === disableAddress;
    return (
        <MenuItem
            value={stablecoin.address}
            key={key}
            disabled={disabled}
            style={{ backgroundColor: '#062b55' }}
        >
            <div className={'flex h-8 items-center space-x-4 text-white'}>
                {stablecoin.icon(25, 25)}
                <p className={'text-xl'}>{stablecoin.symbol}</p>
            </div>
        </MenuItem>
    );
};

export default function Subscribe() {
    const policyId = 0;
    const amount = 500;
    const isMounted = useIsMounted();
    const Policy = usePolicyContract();

    const queryParams = useSearchParams();
    const [subscribingAsInsured, setSubscribingAsInsured] = useState(
        queryParams.get('insured') === 'true'
    );

    const { data: allPolicies } = useContractRead({
        address: Policy?.address,
        abi: Policy?.abi,
        functionName: 'allPolicies',
    });

    const { writeAsync: subscribeAsInsured } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: Policy?.address,
        abi: Policy?.abi,
        functionName: 'subscribeAsInsured',
    });

    const { writeAsync: subscribeAsInsurer } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: Policy?.address,
        abi: Policy?.abi,
        functionName: 'subscribeAsInsured',
    });

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
        watch,
        formState,
        control,
    } = useForm<FormValues>({
        defaultValues: {
            insurerToken: Object.values(stablecoins)[0].address,
            collateralToken: Object.values(stablecoins)[1].address,
        },
    });

    // TODO @ferrodri, this is now wired up
    const onSubmit = handleSubmit(async (data) => {
        console.log('Raw form values', data, subscribingAsInsured);
        const tx = subscribingAsInsured
            ? await subscribeAsInsured({
                  recklesslySetUnpreparedArgs: [policyId, amount],
              })
            : await subscribeAsInsurer({
                  recklesslySetUnpreparedArgs: [policyId, amount],
              });
        console.log('tx: ', tx);
        await tx.wait();
    });

    return (
        <>
            {isMounted && (
                <div className={'mt-16 flex flex-col items-center space-y-8'}>
                    <form
                        className={'card max-w-2xl space-y-4'}
                        onSubmit={onSubmit}
                    >
                        <p className={'mb-8 text-center text-3xl'}>
                            Subscribe to an upcoming policy
                        </p>

                        {/*TODO Primary color hardcoding, can't get tailwind to load properly*/}
                        {/*#6f109d is secondary at 800*/}
                        <div
                            className={
                                'grid h-10 grid-cols-2 rounded-l-full rounded-r-full text-center text-xl transition-all duration-200 ease-in-out'
                            }
                            style={{
                                border: subscribingAsInsured
                                    ? '1px solid #09fbd3'
                                    : '1px solid #6f109d',
                            }}
                        >
                            <div
                                className={
                                    'col-span-1 flex cursor-pointer items-center justify-center rounded-l-full text-center transition-all duration-200 ease-in-out'
                                }
                                style={{
                                    backgroundColor: subscribingAsInsured
                                        ? '#09fbd3'
                                        : 'unset',
                                    color: subscribingAsInsured
                                        ? '#000'
                                        : '#FFF',
                                }}
                                onClick={() => setSubscribingAsInsured(true)}
                            >
                                Get Insurance
                            </div>
                            <div
                                className={
                                    'col-span-1 flex cursor-pointer items-center justify-center rounded-r-full text-center transition-all duration-200 ease-in-out'
                                }
                                style={{
                                    backgroundColor: !subscribingAsInsured
                                        ? '#8014a4'
                                        : 'unset',
                                    color: '#FFF',
                                }}
                                onClick={() => setSubscribingAsInsured(false)}
                            >
                                Provide Collateral
                            </div>
                        </div>
                        <div className={'flex items-center'}>
                            <label
                                className={'mr-4 text-2xl'}
                                htmlFor={'insured-token-amount'}
                            >
                                To Insure:{' '}
                            </label>

                            <input
                                id={'insured-token-amount'}
                                type={'number'}
                                className={'h-16 text-5xl'}
                                style={{
                                    backgroundColor: !subscribingAsInsured
                                        ? '#052448'
                                        : '#062b55',
                                    width: '50%',
                                    color: !subscribingAsInsured
                                        ? '#AAA'
                                        : '#FFF',

                                    border: !subscribingAsInsured
                                        ? 'unset'
                                        : '1px solid white',
                                }}
                                {...register('amount', { required: true })}
                                disabled={!subscribingAsInsured}
                            />

                            <Select
                                fullWidth
                                {...register('insurerToken', {
                                    validate: (v) =>
                                        v !== getValues('collateralToken'),
                                })}
                                defaultValue={
                                    Object.values(stablecoins)[0].address
                                }
                                error={!!formState.errors.insurerToken}
                                sx={{
                                    width: '30%',
                                    backgroundColor: '#062b55',
                                }}
                            >
                                {Object.values(stablecoins).map((v, i) =>
                                    StablecoinMenuItem(v, i)
                                )}
                            </Select>
                        </div>
                        <div className={'flex items-center'}>
                            <label
                                htmlFor={'collateral-token-amount'}
                                className={'mr-4 text-2xl'}
                            >
                                Collateral:{' '}
                            </label>
                            <input
                                id={'collateral-token-amount'}
                                type={'text'}
                                className={'h-16 text-5xl'}
                                style={{
                                    backgroundColor: subscribingAsInsured
                                        ? '#052448'
                                        : '#062b55',
                                    width: '50%',
                                    color: subscribingAsInsured
                                        ? '#AAA'
                                        : '#FFF',
                                    border: subscribingAsInsured
                                        ? 'unset'
                                        : '1px solid white',
                                }}
                                value={watch('amount')}
                                disabled={subscribingAsInsured}
                            />
                            <Select
                                fullWidth
                                {...register('insurerToken', {
                                    validate: (v) =>
                                        v !== getValues('collateralToken'),
                                })}
                                error={!!formState.errors.insurerToken}
                                sx={{
                                    width: '30%',
                                    backgroundColor: '#062b55',
                                }}
                                defaultValue={
                                    Object.values(stablecoins)[1].address
                                }
                            >
                                {Object.values(stablecoins).map((v, i) =>
                                    StablecoinMenuItem(
                                        v,
                                        i,
                                        getValues('insurerToken')
                                    )
                                )}
                            </Select>
                        </div>
                        {/*<input type={"text"} className={"test-input"}/>*/}
                        {subscribingAsInsured && <div
                            className={
                                'flex items-center justify-center space-x-4 '
                            }
                        >
                            <p className={'mr-8 text-2xl'}>Premium</p>
                            {stablecoins[
                                getValues('insurerToken').toString()
                            ].icon(50, 50)}
                            <p className={'text-4xl'}>
                                {watch('amount')
                                    ? watch('amount') * 0.05
                                    : '???'}
                            </p>
                        </div>}

                        <p className={'text-center text-2xl'}>
                            Policy activates in {getRandomNumber(100, 1000)}{' '}
                            blocks
                        </p>
                        <div className={'flex justify-center'}>
                            <button
                                type={'submit'}
                                className={
                                    'contained-uncolored-button text-xl3 m-auto'
                                }
                                style={{
                                    backgroundColor: subscribingAsInsured
                                        ? '#09fbd3'
                                        : '#8014a4',
                                    color: subscribingAsInsured
                                        ? '#000'
                                        : '#FFF',
                                }}
                            >
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}
