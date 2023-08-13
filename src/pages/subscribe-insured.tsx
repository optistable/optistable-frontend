import { MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useContractWrite } from 'wagmi';
import { stablecoins } from '../components/common';
import { getRandomNumber } from '../components/generators';
import { usePolicyContract } from '../hooks';
import { useIsMounted } from '../hooks/useIsMounted';
import POLICYABI from '../shared/abi/Policy.json';
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
        <MenuItem value={stablecoin.address} key={key} disabled={disabled}>
            <div className={'flex items-center space-x-4'}>
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

    const { writeAsync } = useContractWrite({
        mode: 'recklesslyUnprepared',
        address: Policy,
        abi: POLICYABI,
        functionName: 'subscribeAsInsurer',
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

    // TODO @ferrodri, subscribe to policy here
    const onSubmit = handleSubmit(async (data) => {
        console.log('Raw form values', data);
    });

    async function subscribeAsInsured() {
        const tx = await writeAsync({
            recklesslySetUnpreparedArgs: [policyId, amount],
        });
        console.log('tx: ', tx);
        await tx.wait();
    }
    return (
        <>
            {isMounted && (
                <div className={'mt-16 flex flex-col items-center space-y-8'}>
                    <div className={'card max-w-xl space-y-4'}>
                        <p className={'mb-8 text-3xl'}>
                            Subscribe to an upcoming policy
                        </p>

                        <TextField
                            label={'Amount to insure'}
                            sx={{ backgroundColor: '#062b55', width: '70%' }}
                            {...register('amount', { required: true })}
                            error={!!formState.errors.amount}
                            onChange={(e) =>
                                setAmount(parseInt(e.target.value))
                            }
                        />

                        <Select
                            fullWidth
                            label={'Token'}
                            labelId={'Token'}
                            {...register('insurerToken', {
                                validate: (v) =>
                                    v !== getValues('collateralToken'),
                            })}
                            error={!!formState.errors.insurerToken}
                            sx={{ width: '30%', backgroundColor: '#062b55' }}
                        >
                            {Object.values(stablecoins).map((v, i) =>
                                StablecoinMenuItem(v, i)
                            )}
                        </Select>
                        <TextField
                            label={'Collateral'}
                            sx={{ backgroundColor: '#062b55', width: '70%' }}
                            disabled
                            value={amount}
                        />
                        <Select
                            fullWidth
                            label={'Token'}
                            labelId={'Token'}
                            {...register('insurerToken', {
                                validate: (v) =>
                                    v !== getValues('collateralToken'),
                            })}
                            error={!!formState.errors.insurerToken}
                            sx={{ width: '30%', backgroundColor: '#062b55' }}
                        >
                            {Object.values(stablecoins).map((v, i) =>
                                StablecoinMenuItem(
                                    v,
                                    i,
                                    getValues('insurerToken')
                                )
                            )}
                        </Select>

                        {/*<input type={"text"} className={"test-input"}/>*/}
                        <div
                            className={
                                'flex items-center justify-center space-x-4 text-4xl'
                            }
                        >
                            <p className={'mr-16'}>Premium</p>
                            {stablecoins[
                                getValues('insurerToken').toString()
                            ].icon(50, 50)}
                            <p>{getRandomNumber(100, 1000)}</p>
                        </div>

                        <p className={'text-center text-2xl'}>
                            Activates in {getRandomNumber(100, 1000)} blocks
                        </p>
                        <div className={'flex justify-center'}>
                            <button
                                className={'contained-button text-xl3 m-auto'}
                                onClick={subscribeAsInsured}
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
