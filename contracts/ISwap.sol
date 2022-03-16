// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

interface ISwapper {
    function tokenPrice() external view returns (int256);

    function getToken(uint256 amountin) external returns (uint256 amountout);
}
