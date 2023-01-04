type Catch = string | number

interface Schema {
    catch: Catch[];
    transform: (value: any) => any;
}

interface SchemaFunction {
    [key: string]: Schema
}

export function useMappedValues (schema: Schema, input: any) {
    return schema.catch.map((property: Catch) => input[property]);
}

export function useFilteredValues (values: any) {
    return values.filter((value: any) => value !== undefined);
}

export function useCatchedValues (schema: Schema, input: object) {
    const mappedValues = useMappedValues(schema, input);
    const filteredValues = useFilteredValues(mappedValues);

    return filteredValues
}

export function useTransformedValue (transform: any, value: any) {
    return transform(value);
}

export function useNormalizedData (schema: SchemaFunction, input: any) {
    const schemaWithKeyAndValue: SchemaFunction = {};

    for (const key in schema) {
        //console.log(schema[key])

        const potentialValues = useCatchedValues(schema[key], input);

        schemaWithKeyAndValue[key] = useTransformedValue(schema[key].transform, potentialValues[0]);
    }

    //console.log(schemaWithKeyAndValue)

    return schemaWithKeyAndValue;
}
