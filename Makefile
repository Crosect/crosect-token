deploy:
	- npx hardhat clean
	- npx hardhat compile
	- npx hardhat run scripts/deploy.js --network etherium
 	- npx hardhat verify --network etherium 0xa9E7F791B669f2535d100B196F615cA019d137b9 --show-stack-traces