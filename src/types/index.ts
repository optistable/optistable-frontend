/* eslint-disable no-unused-vars */
import { StaticImageData } from 'next/image';
import { ReactElement } from 'react';

export enum Chain {
  Goerli = 5
}

// TODO @ferrodri, verify matches contract
export type Policy = {
  policyId: string,
  insuredTokenAddress: string;
  collateralTokenAddress: string;
  insuredAmount: bigint;
  collateralAmount: bigint;
};

// TODO @ferrodri, verify matches contract
export type OracleCommittee = {
  startingBlock: bigint;
  endingBlock: bigint;
  providers: string[];
  minProvidersForQuorum: number;
  providersReportingDepegs: number;
};

// TODO @ferrodri, verify matches contract
export type DataProvider = {
  symbol: string;
  address: string;
  logo: StaticImageData;
  title: ReactElement;
  lastBlockNum: bigint;
  depegTolerance: bigint;
  minBlocksToSwitchStatus: number;
  switchStatusCounter: number; //the current number of sequential depegs
  onChain: boolean;
  decimals: number;
  stableValue: bigint;
  lastObservation: bigint;
  depegged: boolean;
  oracleType: string; //this is actually bytes32
};

export type Stablecoin = {
  address: string;
  symbol: string;
  name: string;
  icon: (height: number, width: number) => ReactElement;
  color: string;
};
