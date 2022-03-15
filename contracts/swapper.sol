// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract SwapToken {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: rinkyby
     * Aggregator: ADA/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0x9326BFA02ADD2366b30bacB125260Af641031331
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        return price;
    }

    function swapToken(uint256 amountin)
        external
        view
        returns (uint256 amountout)
    {
        int256 getPrice = getLatestPrice();
        uint256 actualPrice = uint256(getPrice / 10**8);
        amountout = actualPrice * amountin;
        //tx.answer / 10 ** 8
    }
}
