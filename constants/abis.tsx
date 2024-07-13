export const crypticAscentABI = [
    {
      "inputs": [{"internalType": "address", "name": "_gameToken", "type": "address"}],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_playerCount", "type": "uint256"}],
      "name": "createGame",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"}],
      "name": "stake",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"},
                 {"internalType": "address[]", "name": "_winners", "type": "address[]"},
                 {"internalType": "uint256[]", "name": "_scores", "type": "uint256[]"}],
      "name": "distributePayouts",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"}],
      "name": "transferStakesToOwner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"}],
      "name": "handleExpiredGame",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"}],
      "name": "getGameInfo",
      "outputs": [
        {"internalType": "uint256", "name": "totalStake", "type": "uint256"},
        {"internalType": "uint256", "name": "remainingPlayers", "type": "uint256"},
        {"internalType": "bool", "name": "isActive", "type": "bool"},
        {"internalType": "bool", "name": "isCompleted", "type": "bool"},
        {"internalType": "uint256", "name": "creationTime", "type": "uint256"}
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "_gameId", "type": "uint256"},
                 {"internalType": "address", "name": "_player", "type": "address"}],
      "name": "isPlayerInGame",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "unpause",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "contract IERC20", "name": "_token", "type": "address"},
                 {"internalType": "address", "name": "_to", "type": "address"},
                 {"internalType": "uint256", "name": "_amount", "type": "uint256"}],
      "name": "withdrawToken",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"},
        {"indexed": false, "internalType": "uint256", "name": "playerCount", "type": "uint256"}
      ],
      "name": "GameCreated",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"},
        {"indexed": false, "internalType": "address", "name": "player", "type": "address"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "PlayerStaked",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"},
        {"indexed": false, "internalType": "uint256", "name": "totalStake", "type": "uint256"}
      ],
      "name": "GameStarted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"},
        {"indexed": false, "internalType": "address[]", "name": "winners", "type": "address[]"},
        {"indexed": false, "internalType": "uint256[]", "name": "rewards", "type": "uint256[]"}
      ],
      "name": "PayoutDistributed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"}],
      "name": "GameCompleted",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"},
        {"indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "AllStakesTransferredToOwner",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [{"indexed": true, "internalType": "uint256", "name": "gameId", "type": "uint256"}],
      "name": "GameExpired",
      "type": "event"
    }
  ];
  
  export const mockERC20ABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [{"internalType": "address", "name": "to", "type": "address"},
                 {"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "mint",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "burn",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "to", "type": "address"},
                 {"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "transfer",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "from", "type": "address"},
                 {"internalType": "address", "name": "to", "type": "address"},
                 {"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "transferFrom",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "spender", "type": "address"},
                 {"internalType": "uint256", "name": "amount", "type": "uint256"}],
      "name": "approve",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
      "name": "balanceOf",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalSupply",
      "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "name",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "symbol",
      "outputs": [{"internalType": "string", "name": "", "type": "string"}],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "decimals",
      "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
      "stateMutability": "view",
      "type": "function"
    }
  ];