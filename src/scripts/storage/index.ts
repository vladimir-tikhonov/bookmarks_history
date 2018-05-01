import storageApi from './Api';

const STORAGE_KEY = 'history';

export async function append(data: object) {
    const existingEntries = await getAllUnparsed();
    existingEntries.push(JSON.stringify(data));
    return storageApi.local.set({ [STORAGE_KEY]: existingEntries });
}

export async function getAll() {
    const unparsedEntries = await getAllUnparsed();
    return unparsedEntries.map((entry) => JSON.parse(entry));
}

async function getAllUnparsed(): Promise<string[]> {
    const requestResult = await storageApi.local.get(STORAGE_KEY);
    return requestResult[STORAGE_KEY] || [];
}
