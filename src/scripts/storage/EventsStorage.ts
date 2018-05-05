import storageApi from './Api';

const STORAGE_KEY = 'history';

export async function appendEvent(data: object) {
    const existingEntries = await getAllEventsUnparsed();
    existingEntries.push(JSON.stringify(data));
    return storageApi.set({ [STORAGE_KEY]: existingEntries });
}

export async function getAllEvents() {
    const unparsedEntries = await getAllEventsUnparsed();
    return unparsedEntries.map((entry) => JSON.parse(entry));
}

async function getAllEventsUnparsed(): Promise<string[]> {
    const requestResult = await storageApi.get(STORAGE_KEY);
    return requestResult[STORAGE_KEY] || [];
}
