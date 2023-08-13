import { DataProvider, OracleCommittee, Policy } from '../types';
import { dataProviderToLogo, dataProviderToTitle, stablecoins } from './common';

/*
These were generators written so we could draft out the frontend.
None of them are in use in the live app
 */

export const generatePolicy = (): Policy => {
    const values = generateUniqueKeyPairs(stablecoins);
    const thisPolicy = getRandomElementFromArray(values);
    const amt = getRandomBigInt(7);
    return {
        address: `0x${generateHexString(32)}`,
        insuredTokenAddress: thisPolicy[0],
        collateralTokenAddress: thisPolicy[1],
        insuredAmount: amt,
        collateralAmount: amt,
    };
};

export const generateOracleCommittee = (): OracleCommittee => {
    const startingBlock = getRandomBigInt(7);
    const providers = [
        generateDataProvider('USDC'),
        generateDataProvider('USDT'),
        generateDataProvider('DAI'),
    ];
    console.log(getRandomNumber(0, providers.length));
    return {
        startingBlock: startingBlock,
        endingBlock: startingBlock + 1000n,
        providers: providers.map((d) => d.address),
        minProvidersForQuorum: Math.ceil(providers.length / 2),
        providersReportingDepegs: getRandomNumber(0, providers.length),
    };
};

export const generateDataProvider = (
    symbol: 'USDC' | 'USDT' | 'DAI'
): DataProvider => {
    const oracleTypes = [
        'chainlink-price-feed',
        'chainlink-base-ccip-price-feed',
        'coingecko',
        'hyperlane',
        'layerzero',
    ];
    const oracleType = getRandomElementFromArray(oracleTypes);
    return {
        symbol: symbol,
        logo: dataProviderToLogo(oracleType),
        title: dataProviderToTitle(oracleType),
        address: `0x${generateHexString(32)}`,
        lastBlockNum: getRandomBigInt(7),
        depegTolerance: 5n,
        depegged: getRandomBool(),
        minBlocksToSwitchStatus: 5,
        switchStatusCounter: getRandomNumber(2, 5), //the current number of sequential depegs
        onChain: getRandomBool(),
        decimals: getRandomNumber(8, 12),
        stableValue: 10n ** 18n,
        lastObservation: getRandomBigInt(7),
        oracleType: oracleType, //this is actually bytes32
    };
};
export const generateUniqueKeyPairs = (obj: object) => {
    const keys = Object.keys(obj);
    const pairs = [];

    for (let i = 0; i < keys.length - 1; i++) {
        for (let j = i + 1; j < keys.length; j++) {
            pairs.push([keys[i], keys[j]]);
        }
    }

    return pairs;
};

export const getRandomElementFromArray = (array: any[]) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
};

export const generateHexString = (length: number): string => {
    let result = '';
    const hexChars = '0123456789ABCDEFabcdef';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * hexChars.length);
        result += hexChars.charAt(randomIndex);
    }

    // Convert some characters to lowercase
    return result
        .split('')
        .map((char) => (Math.random() < 0.5 ? char.toLowerCase() : char))
        .join('');
};

export const getRandomBigInt = (maxDigits: number) => {
    const randomDigits = [];
    for (let i = 0; i < maxDigits; i++) {
        randomDigits.push(Math.floor(Math.random() * 10));
    }
    return BigInt(randomDigits.join(''));
};

export const getRandomNumber = (start: number, finish: number): number => {
    if (start > finish) {
        throw new Error('Start value must be less than finish value.');
    }
    const range = finish - start + 1;
    return Math.floor(Math.random() * range) + start;
};

export const getRandomBool = () => {
    return Math.random() < 0.5;
};
