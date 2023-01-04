<h1 align='center'>nordi</h1>

<p align="center">
<a href="https://www.npmjs.com/package/nordi" target="_blank"><img src="https://img.shields.io/npm/v/nordi?style=flat&colorA=130f40&colorB=474787" alt="npm version"></a>
<a href="https://www.npmjs.com/package/nordi" target="_blank"><img src="https://img.shields.io/bundlephobia/min/nordi?style=flat&colorA=130f40&colorB=474787" alt="npm size"></a>
<a href="https://www.npmjs.com/package/nordi" target="_blank"><img src="https://img.shields.io/npm/dm/nordi?flat&colorA=130f40&colorB=474787" alt="npm downloads"></a>
<a href="https://github.com/oritwoen/nordi" target="_blank"><img src="https://img.shields.io/github/stars/oritwoen/nordi?flat&colorA=130f40&colorB=474787" lt="github stars"></a>
</p>

<p align="center">
Normalize data with interfaces.
</p>

## Why?

In many projects where it is necessary to use different APIs for the same purpose, there is a huge problem with standardization.

It is always a waste of time and almost always writing new functions and data normalization separately for each project.

What if there was a simple function that normalizes data according to a predetermined pattern? – it was on the basis of this thought that `nordi` was created.


## Install

```bash
npm install --save nordi

# Using pnpm
pnpm add nordi

# Using yarn
yarn add nordi
```


## Usage

### 1. Define Interface

To normalize data, you need to create an interface/schema beforehand.

The principle of operation is very simple. `catch` grabs the appropriate variable from the object and `transform` converts it to the selected format.

```ts
const blockInterface = {
    hash: {
        catch: ['hash', 'blockhash'],
        transform: (value: any) => String(value)
    },

    number: {
        catch: ['height', 'number', 'blockHeight'],
        transform: (value: any) => Number(value)
    },
}
```

### 2. Prepare a dataset

Of course, different data sets are required to normalize different data.

For example, I used blocks of various cryptocurrencies here.

```ts
const solanaBlock = {
    "blockhash": "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VZHirAn",
    "blockHeight": 0
}

const bitcoinBlock = {
    "hash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "height": 0
}

const ethereumBlock = {
    "hash": "0x0000000000000000000000000000000000000000",
    "number": 0,
}
```

### 3. Normalization

Of course, different data sets are required to normalize different data.

For example, I used blocks of various cryptocurrencies here.

```ts
const { useNormalizedData } from 'nordi'

const normalizedSolanaBlock = useNormalizedData(blockInterface, solanaBlock)
const normalizedBitcoinBlock = useNormalizedData(blockInterface, bitcoinBlock)
const normalizedEthereumBlock = useNormalizedData(blockInterface, ethereumBlock)

console.log(normalizedSolanaBlock)

//{
//  hash: "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VZHirAn"
//  number: 0
//}
```

## License

MIT License © 2023 [Dominik Opyd](https://github.com/oritwoen)
