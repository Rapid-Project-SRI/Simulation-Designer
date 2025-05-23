export interface PatternItem<T> {
    data: T;
    delayTicks: number; // Delay in ticks.
}

export interface Pattern<T> {
    id: string;           // Unique identifier for the pattern
    name: string;         // Display name
    length: number;       // Total length in ticks
    events: Map<number, T>;  // Events mapped by their tick
    tags?: string[];      // Optional tags for categorization
    description?: string; // Optional description
    dataType: DataType; // Type of data used in the pattern
}

export enum DataType {
    NUMBER = 'number',
    STRING = 'string',
    BOOLEAN = 'boolean',
    OBJECT = 'object'
}