// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./IERC.sol";

contract Swapper {
    AggregatorV3Interface internal priceFeed;
    IERC20 internal daiToken =
        IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    IERC20 internal linkToken =
        IERC20(0x514910771AF9Ca656af840dff83E8264EcF986CA);

    constructor() {
        priceFeed = AggregatorV3Interface(
            0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8
        );
    }

    // clo to usd = 0x10D35eFa5C26C3d994C511576641248405465AeF

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

    function swapDAItoLink(uint256 amountIn)
        public
        returns (uint256 amountOut)
    {
        require(daiToken.transferFrom(msg.sender, address(this), amountIn));
        uint256 pricePerDai = uint256(tokenPrice());
        uint256 conversion = pricePerDai / amountIn;
        amountOut = conversion / 18;
        linkToken._transfer(address(this), msg.sender, amountOut);
    }

    function swapLinktoDAI(uint256 amountIn)
        public
        returns (uint256 amountOut)
    {
        require(linkToken.transferFrom(msg.sender, address(this), amountIn));
        uint256 pricePerDai = uint256(tokenPrice());
        uint256 conversion = pricePerDai * amountIn;
        amountOut = conversion / 18;
        daiToken._transfer(address(this), msg.sender, amountOut);
    }
}
