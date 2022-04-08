// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint totalWaves = 0;

    constructor() {
        console.log("Yo, I'm a contract, written in Solidity with the help of Hardhat and I am smart!");
    }

    function wave() public {
        totalWaves++;
        console.log("%s just waved!", msg.sender);
    }

    function getWaves() public view returns (uint) {
       console.log("%s accounts has waved", totalWaves);
        return totalWaves;
    }
}