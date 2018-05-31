import chromep from 'chrome-promise';

const STORAGE_KEY = 'history';

export async function appendEvent(data: object) {
    const existingEntries = await getAllEventsUnparsed();
    existingEntries.push(JSON.stringify(data));
    return chromep.storage.local.set({ [STORAGE_KEY]: existingEntries });
}

export async function getAllEvents() {
    const unparsedEntries = await getAllEventsUnparsed();
    return unparsedEntries.map((entry) => JSON.parse(entry));
}

async function getAllEventsUnparsed(): Promise<string[]> {
    const requestResult = await chromep.storage.local.get(STORAGE_KEY);
    return requestResult[STORAGE_KEY] || [];
}
