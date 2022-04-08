// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint totalWaves = 0;
    address[] public wavedAddress;
    mapping (address => uint) waves;
    mapping (address => bool) waveAddressTracking;


    constructor() {
        console.log("Yo, I'm a contract, written in Solidity with the help of Hardhat and I am smart!");
    }

    function wave() public {
        totalWaves++;
        waves[msg.sender]++;
        if (waveAddressTracking[msg.sender] != true) {
            wavedAddress.push(msg.sender);
        }
        waveAddressTracking[msg.sender] = true;
        console.log("%s waved %d times", msg.sender, waves[msg.sender]);
    }

    function getWaves() public view returns (uint) {
       console.log("%s waves in total from %s account(s)", totalWaves, wavedAddress.length);
        return totalWaves;
    }

    function getAccountWaves() public view returns (uint) {
       console.log("%s has waved %s times", msg.sender, waves[msg.sender]);
       return waves[msg.sender];
    }

    function getListOfAccountsAndWavesCount() public view {
        for (uint i = 0; i < wavedAddress.length; i++) {
            console.log("%s has waved %s times", wavedAddress[i], waves[wavedAddress[i]]);
        }
    }

}