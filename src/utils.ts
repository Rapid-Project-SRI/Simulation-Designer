import { DataType } from './FlowStore';

export const getDefaultValueForType = (type: DataType): any => {
    switch (type) {
        case DataType.NUMBER:
            return 0;
        case DataType.STRING:
            return "";
        case DataType.BOOLEAN:
            return false;
        case DataType.OBJECT:
            return {};
        default:
            return null;
    }
};