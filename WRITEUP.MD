## Project writeup

OptiStable is a full stack, multi-chain protocol that allows anyone to insure a stablecoin against depegging, and gives people providing collateral against a depeg the ability to earn by collecting premiums.

The protocol is built on three key features:

1. A complex oracle service built on a custom OP Stack that aggregates price data from multiple sources, including from Layer 1, other chains, and from web2
2. A series of contracts that manage policies, payouts, and a committee , and that gives people the ability to trade an ERC20 token representing their position with others.
3. A front end that allows people to buy and sell policies, and that renders policies and price data in real time from the contract backend.

