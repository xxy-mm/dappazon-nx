// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract Dappazon is ReentrancyGuard {
    address public owner;
    // structs
    struct Item {
        uint id;
        string name;
        string image;
        string category;
        uint price;
        uint rating;
        uint stock;
    }

    struct Order {
        uint orderId;
        uint time;
        uint itemId;
        address buyer;
        uint amount;
    }
    // mappings
    mapping(uint itemId => Item item) public items;
    mapping(address buyer => uint orderCount) public orderCount;
    // using the orderCount above to set the orderIndex
    mapping(address buyer => mapping(uint orderIndex => Order order))
        public orders;

    // events
    event Buy(uint time, uint itemId, address buyer, uint totalSpent);
    event AddItem(uint time, uint itemId, string itemName);
    event Withdraw(uint time, uint balance);

    constructor() {
        owner = msg.sender;
    }

    function addItem(
        uint id,
        string memory name,
        string memory image,
        string memory category,
        uint price,
        uint rating,
        uint stock
    ) public {
        require(
            bytes(items[id].name).length == 0,
            "We don't have this item, please check your order."
        );
        Item memory item = Item(
            id,
            name,
            image,
            category,
            price,
            rating,
            stock
        );
        items[item.id] = item;
        emit AddItem(block.timestamp, id, name);
    }

    function buy(uint itemId, uint amount) public payable {
        require(amount > 0, "The minimal amount is 1.");
        // find item
        Item memory item = items[itemId];
        buyItem(item, amount);
    }

    function buyItem(
        Item memory _item,
        uint _amount
    )
        private
        nonReentrant
        itemExists(_item)
        itemHasStock(_item, _amount)
        itemTotalSpent(_item, _amount)
    {
        // create order
        Order memory order = Order(
            orderCount[msg.sender],
            block.timestamp,
            _item.id,
            msg.sender,
            _amount
        );
        // store the order
        orders[msg.sender][orderCount[msg.sender]] = order;
        // increase the orderId
        orderCount[msg.sender]++;
        // decrease the stock
        items[_item.id].stock -= _amount;

        emit Buy(block.timestamp, _item.id, msg.sender, msg.value);
    }

    function withdraw() public onlyOwner nonReentrant {
        uint balance = address(this).balance;
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "withdraw failed");
        emit Withdraw(block.timestamp, balance);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can do this.");
        _;
    }

    modifier itemExists(Item memory item) {
        require(
            bytes(item.name).length > 0,
            "We don't have this item, please check your order."
        );
        _;
    }

    modifier itemHasStock(Item memory item, uint amount) {
        require(
            item.stock >= amount,
            string.concat(
                "Item out of stock, we currently only have ",
                Strings.toString(item.stock),
                "."
            )
        );
        _;
    }

    modifier itemTotalSpent(Item memory item, uint amount) {
        require(msg.value >= item.price * amount, "Not enough ether provided.");
        _;
    }
}
