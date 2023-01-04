import { expect, it, describe } from 'vitest'
import { useMappedValues, useFilteredValues, useCatchedValues, useTransformedValue, useNormalizedData } from '../src'

const ethereumBlock = {
    "hash": "0x0000000000000000000000000000000000000000",
    "number": 0,
}

const bitcoinBlock = {
    "hash": "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f",
    "height": 0
}

const solanaBlock = {
    "blockhash": "4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZAMdL4VZHirAn",
    "blockHeight": 0
}

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

describe('useMappedValues', () => {
    const tests = [
        {
            name: 'hash',
            input: {
                data: ethereumBlock,
                schema: blockInterface.hash,
            }, 
            output: ethereumBlock.hash
        },
        {
            name: 'number',
            input: {
                data: bitcoinBlock,
                schema: blockInterface.number,
            }, 
            output: bitcoinBlock.height
        },
        {
            name: 'hash',
            input: {
                data: solanaBlock,
                schema: blockInterface.hash,
            }, 
            output: undefined
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const mapped = useMappedValues(test.input.schema, test.input.data)

            expect(mapped[0]).eq(test.output)
        })
    }
})

describe('useFilteredValues', () => {
    const tests = [
        {
            name: 'hash',
            input: [ethereumBlock.hash, null],
            output: ethereumBlock.hash
        },
        {
            name: 'number',
            input: [bitcoinBlock.height, null],
            output: bitcoinBlock.height
        },
        {
            name: 'number',
            input: [null, solanaBlock.blockHeight],
            output: null
        },
        {
            name: 'hash',
            input: [null, solanaBlock.blockhash],
            output: null
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const filtered = useFilteredValues(test.input)

            expect(filtered[0]).eq(test.output)
        })
    }
})

describe('useCatchedValues', () => {
    const tests = [
        {
            name: 'hash',
            input: {
                data: ethereumBlock,
                schema: blockInterface.hash,
            }, 
            output: ethereumBlock.hash
        },
        {
            name: 'number',
            input: {
                data: bitcoinBlock,
                schema: blockInterface.number,
            }, 
            output: bitcoinBlock.height
        },
        {
            name: 'hash',
            input: {
                data: solanaBlock,
                schema: blockInterface.hash,
            }, 
            output: solanaBlock.blockhash
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const catched = useCatchedValues(test.input.schema, test.input.data)

            expect(catched[0]).eq(test.output)
        })
    }
})

describe('useTransformedValue', () => {
    const tests = [
        {
            name: 'number to string',
            input: String,
            value: 0,
            output: "0"
        },
        {
            name: 'string to number',
            input: Number,
            value: "0",
            output: 0
        },
        {
            name: 'string to uppercase',
            input: (value) => value.toUpperCase(),
            value: "uppercase",
            output: "UPPERCASE"
        },
    ]

    for (const test of tests) {
        it(test.name, () => {
            const transformed = useTransformedValue(test.input, test.value)

            expect(transformed).eq(test.output)
        })
    }
})

describe('useNormalizedData', () => {
    const tests = [
        {
            name: 'normalize ethereum block',
            value: ethereumBlock,
            output: {
                hash: ethereumBlock.hash,
                number: ethereumBlock.number
            }
        },
        {
            name: 'bitcoin block',
            value: bitcoinBlock,
            output: {
                hash: bitcoinBlock.hash,
                number: bitcoinBlock.height
            }
        },
        {
            name: 'solana block',
            value: solanaBlock,
            output: {
                hash: solanaBlock.blockhash,
                number: solanaBlock.blockHeight
            }
        },
    ]

    for (const test of tests) {
        //console.log('blockInterface', test.input, test.value)

        it(test.name, () => {
            const normalized = useNormalizedData(blockInterface, test.value)

            //console.log('halo', test.input, normalized)

            expect(normalized.hash).eq(test.output.hash)
            expect(normalized.number).eq(test.output.number)
        })
    }
})
