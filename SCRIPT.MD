# Video script

# Intro

OptiStable is a full stack, multi-chain protocol that allows anyone to insure a stablecoin against depegging, and gives people providing collateral against a depeg the ability to earn by collecting premiums.

The protocol is built on three key features:
1. A complex oracle service built on a custom OP Stack that aggregates price data from multiple sources, including from Layer 1, other chains, and from web2
2. A series of contracts that manage policies, payouts, and a committee , and that gives people the ability to trade an ERC20 token representing their position with others.
3. A front end that allows people to buy and sell policies, and that renders policies and price data in real time from the contract backend.

# Homepage

* We'll start our demo with the home page. Here, we can see the total amount of stablecoins that are being insured and the total being provided as collateral
* We can then see the active policies, and the upcoming policies.
* (Slightly blur UI and show a graphic of the policy lifecycle)

* A policy has three phases in its lifecycle:
  1. A period in which people can subscribe to the policy by insuring tokens or providing collateral
  2. A period in which the policy is active and the underlying stablecoin is actively being monitored by the oracle committee for a depeg
  3. And the final phase is when the policy becomes closed at some L1 block, either by the majority of price sources reporting a depeg, or by the policy expiring

Let's subscribe to one of the upcoming policies now

# Subscribe

* Using this form, I can subscribe to an upcoming policy
* I'll select the currency pair I want to insure (IN THE VIDEO: highlight the left side), here I'll do USDC/USDT
* (Fluff) I'll insure 1000 USDC and submit a transaction to subscribe to the policy
* (Fluff) Wait a moment and you'll see the total amount of insured tokens tick up below. 
* Let's switch accounts and provide collateral 
* (Record both variations of the below) 
  * Same steps as before
  * Same steps as before, but now I care about the right side of the pair
* You'll notice that the total amount of insured tokens and collateral are mismatched. 
* This is okay, the contract will match the insured to insurers on a FIFO basis when the policy becomes active
* Let's go back to the home page and wait for the policy to become active
* There it is, let's take a look at the policy

# Policy
* On the policy page, we can see all the underpinnings of OptiStable
* Going from top to bottom, you'll see your own stake in the policy right at the beginning.
* But what's this iUSDC token?
* This is an ERC20 token deployed to Layer 1 that represents your position in the policy.
* This tokens are minted and distributed when the policy becomes active (Put a note in the video saying that "the collateral token is cUSDT")
* When the policy is closed, you can burn these tokens to get the insured token if it didn't become depegged, or the collateral token if it did.
* (Fluff) As an ERC20 token, you can do with it what you will, including trading it on uniswap if you so desire.
* Moving on to the other parts of the policy, you'll see the policy details, including the policy's oracle committee.
* This section right here is the heart of OptiStable (Side note: Our contract is great, but we want to upsell the OP Stack since that's where our sponsors are)
* The oracle committee is powered by a custom oracle service we built using the OP Stack.
* On every block of our app chain, the data providers for the committee will fetch price data for the insured stablecoin from a wide variety of sources
* Reading price data from well establish Layer 1 sources, like we're doing with Chainlink price feeds here
* Reading prices from the next generation of low-latency oracles, like we're doing with Redstone
* Reading price data from web2 sources, like we're doing with CoinGecko
* And most excitingly, reading price data from other chains
* (Placeholder) We'll explain our cross chain interactions here

# Conclusion:
* (Will write this out later)