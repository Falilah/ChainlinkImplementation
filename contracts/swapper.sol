// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Swapper {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Rinkeby
     * Aggregator: EUR/USD
     * Address: 0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x78F9e60608bF48a1155b4B2A5e31F32318a1d85F
        );
    }

    /**
     * Returns the latest price
     */
    function tokenPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();

        return price;
    }

    function getToken(uint256 amountin)
        external
        view
        returns (uint256 amountout)
    {
        int256 getPrice = tokenPrice();
        uint256 actualPrice = uint256(getPrice);
        amountout = actualPrice * amountin;
        //tx.answer / 10 ** 8
    }
}
