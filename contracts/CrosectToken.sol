// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/// [Max Supply] ➔ 1.000.000.000 Token.
/// @custom:security-contact support@crosect.com
contract CrosectToken is Ownable, ERC20 {
    constructor() ERC20("Crosect Token", "CCS") {
        _mint(msg.sender, 1000000000 * 10 ** decimals());
    }

    function burn(uint256 value) external {
        _burn(msg.sender, value);
    }
}