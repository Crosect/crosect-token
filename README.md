# CCS-TOKEN

```shell
yarn
npx hardhat createWallet
npx hardhat getBalance --address <address string from createWallet task>
```

### Deploy

```shell
npx hardhat run scripts/deploy.js --network sepolia
npx hardhat verify --network sepolia <address>
```

```
 📄 sepolia-network
 0xA99DefF54cb51a3DB696925db90A0B6Dcde29458
 📄 etherium-network
 0xa9E7F791B669f2535d100B196F615cA019d137b9
```