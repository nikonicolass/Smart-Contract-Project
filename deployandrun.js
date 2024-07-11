pragma solidity 0.8.26;
// SPDX-License-Identifier: MIT
contract MyToken {
  
    constructor() {
        owner = msg.sender;
    }

    // public variables here
    string public name = "Xmax";
    string public symbol = "XX";
    uint public totalSupply = 0;
    address public owner;
    
    //emmits Events
    event Increase(address indexed to, uint amount);
    event Decrease(address indexed from, uint amount);
    event Transfer(address indexed from, address indexed to, uint amount);
    
    //errors
    error InsufficientBalance(uint balance, uint withdrawAmount);
  
    // mapping variable here
    mapping(address => uint) public balances;
    
    //Modifiers
    modifier onlyOwner {
      assert(msg.sender == owner);
      _;
    }
    
    // add function
    function add (address _address, uint _value) public onlyOwner{
        totalSupply += _value;
        balances[_address] += _value;
        emit Increase(_address, _value);
    }
    
    // low function
    function low (address _address, uint _value) public{
        if(balances[_address] >= _value){
          revert InsufficientBalance({balance: balances[_address], withdrawAmount: _value});
        }else{  
          totalSupply -= _value;
          balances[_address] -= _value;
          emit Decrease(_address, _value);
        }
}

    function transfer (address _reciver, uint _value ) public{
        require(balances[msg.sender] >= _value , "Account balance must be greater than transfered value!");
        balances[msg.sender] -= _value;
        balances[_reciver] += _value;
        emit Transfer(msg.sender, _reciver, _value);
    }

}
