// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./IERC.sol";

contract Swapper {
    AggregatorV3Interface internal priceFeed;
    IERC20 internal usdtToken =
        IERC20(0xdAC17F958D2ee523a2206206994597C13D831ec7);
    IERC20 internal linkToken =
        IERC20(0x514910771AF9Ca656af840dff83E8264EcF986CA);

    constructor() {
        priceFeed = AggregatorV3Interface(
            0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8
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

    function swapUSDTtoLink(uint256 amountIn)
        public
        returns (uint256 amountOut)
    {
        require(usdtToken.transferFrom(msg.sender, address(this), amountIn));
        uint256 pricePerDai = uint256(tokenPrice());
        uint256 conversion = pricePerDai / amountIn;
        amountOut = conversion / 18;
        linkToken._transfer(address(this), msg.sender, amountOut);
    }

    function swapLinktoUSDT(uint256 amountIn)
        public
        returns (uint256 amountOut)
    {
        require(linkToken.transferFrom(msg.sender, address(this), amountIn));
        uint256 pricePerDai = uint256(tokenPrice());
        uint256 conversion = pricePerDai * amountIn;
        amountOut = conversion / 18;
        usdtToken._transfer(address(this), msg.sender, amountOut);
    }
}
