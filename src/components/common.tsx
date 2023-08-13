import Image, { StaticImageData } from 'next/image';
import Link from 'next/link';
import React, { ReactElement } from 'react';
import BaseLogo from '../../public/base-logo.jpeg';
import CarmenLogo from '../../public/carmen-sandiego.png';
import ChainlinkLogo from '../../public/chainlink-logo.svg';
import CoingeckoLogo from '../../public/coingecko.png';
import DAIIcon from '../../public/dai-logo.svg';
import GarfieldLogo from '../../public/garfield.png';
import HyperlaneLogo from '../../public/hyperlane.png';
import LayerZeroLogo from '../../public/layer-zero.svg';
import RiddlerLogo from '../../public/riddler.png';
import TheGraphLogo from '../../public/the-graph-logo.svg';
import USDCIcon from '../../public/usdc.svg';
import USDTIcon from '../../public/usdt.svg';
import WaldoLogo from '../../public/waldo.png';
import { Stablecoin } from '../types';
import { getRandomBigInt, getRandomElementFromArray } from './generators';

export const dataProviderToLogo = (symbol: string): StaticImageData => {
    switch (symbol) {
        case 'chainlink-price-feed':
            return ChainlinkLogo;
        case 'chainlink-base-ccip-price-feed':
            return BaseLogo;
        case 'coingecko':
            return CoingeckoLogo;
        case 'hyperlane':
            return HyperlaneLogo;
        case 'layerzero':
            return LayerZeroLogo;
        case 'the-graph':
            return TheGraphLogo;
        default:
            return getRandomElementFromArray([
                WaldoLogo,
                CarmenLogo,
                RiddlerLogo,
                GarfieldLogo,
            ]);
    }
};
export const dataProviderToTitle = (symbol: string): ReactElement => {
    switch (symbol) {
        case 'chainlink-price-feed':
            return (
                <Link href={'https://docs.chain.link/data-feeds'}>
                    Chainlink Data Feeds
                </Link>
            );
        case 'chainlink-base-ccip-price-feed':
            return (
                <div className={'flex'}>
                    <Link href={'https://docs.chain.link/ccip'}>
                        Chainlink CCIP
                    </Link>
                    <p>&nbsp;</p>
                    <Link className={'flex'} href={'https://docs.base.org/'}>
                        on Base
                    </Link>
                </div>
            );
        case 'coingecko':
            return <Link href={'https://www.coingecko.com/en'}>Coingecko</Link>;
        case 'hyperlane':
            return <Link href={'https://www.hyperlane.xyz/'}>Hyperlane</Link>;
        case 'layerzero':
            return (
                <Link href={'https://www.layerzero.network/'}>LayerZero</Link>
            );
        case 'the-graph':
            return <Link href={'https://thegraph.com/'}>The Graph</Link>;
        default:
            return (
                <Link href={'https://www.youtube.com/watch?v=oHg5SJYRHA0'}>
                    Unknown
                </Link>
            );
    }
};
/*
TODO @ferrodri, verify addresses here (these are all ones that I minted, see command below to repeat for yourself (add yourself to the mint addresses in the script)
* forge script script/DeployStablecoinERC20.s.sol --private-key $PRIVATE_KEY --broadcast --rpc-url $ETH_RPC_URL
 */
export const stablecoins: {
    [key: string]: Stablecoin;
} = {
    '0x222e9a549274B796715a4af8a9BB96bC6EFCd13A': {
        address: '0x222e9a549274B796715a4af8a9BB96bC6EFCd13A',
        symbol: 'USDC',
        name: 'US Dollar Coin',
        icon: (height, width) => (
            <Image src={USDCIcon} height={height} width={width} alt={'USDC'} />
        ),
        color: '#3E73C4',
    },
    '0xECF58c7323C56290157675777d30A1E223db451a': {
        address: '0xECF58c7323C56290157675777d30A1E223db451a',
        symbol: 'USDT',
        name: 'Tether USD',
        icon: (height, width) => (
            <Image src={USDTIcon} height={height} width={width} alt={'USDT'} />
        ),
        color: '#6AAD97',
    },
    '0xC3c8f830DedF94D185250bA5ac348aC1455a0520': {
        address: '0xC3c8f830DedF94D185250bA5ac348aC1455a0520',
        symbol: 'DAI',
        name: 'I do not know what DAI stands for',
        icon: (height, width) => (
            <Image src={DAIIcon} height={height} width={width} alt={'DAI'} />
        ),
        color: '#F5AC37',
    },
    // GUSD: {address: "0x00000", symbol: "GUSD", name: "Gemini USD", icon: GUSDIcon},
    // USDP: {address: "0x00000", symbol: "USDP", name: "Paxos USD", icon: USDPIcon},
    // TUSD: {address: "0x00000", symbol: "TUSD", name: "True USD", icon: TUSDIcon},
    // USDD: {address: "0x00000", symbol: "USDD", name: "Decentralized USD", icon: USDDIcon},
    // BUSD: {address: "0x00000", symbol: "BUSD", name: "Binance USD", icon: BUSDIcon},
    // SEUR: {address: "0x00000", symbol: "SEUR", name: "Statis EUR", icon: SEURIcon},
};
const symbolToStablecoin: {
    [key: string]: Stablecoin;
} = {
    USDC: stablecoins['0x222e9a549274B796715a4af8a9BB96bC6EFCd13A'],
    USDT: stablecoins['0xECF58c7323C56290157675777d30A1E223db451a'],
    DAI: stablecoins['0xC3c8f830DedF94D185250bA5ac348aC1455a0520'],
};

//TODO This probably shouldn't be a function and instead should be wherever we're rendering the stablecoin
export const amounts = () => {
    const values = Object.values(stablecoins).map((stablecoin, index) => {
        return {
            symbol: stablecoin.symbol,
            color: stablecoin.color,
            amount: getRandomBigInt(7),
        };
    });
    const totalValue = values.reduce(
        (acc, curr) => acc + curr.amount,
        BigInt(0)
    );

    values.sort((a, b) => 0);

    let rem = 100;
    const elems = values.map((v, i) => {
        const widthVal = (Number(v.amount) * 100) / Number(totalValue);
        const width = i == values.length - 1 ? `${rem}%` : `${widthVal}%`;
        rem -= widthVal;
        return (
            <div
                key={i}
                style={{
                    backgroundColor: v.color,
                    width,
                }}
            ></div>
        );
    });
    console.log(elems);
    return elems;
};
