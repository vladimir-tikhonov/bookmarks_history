import storageApi from './Api';

const STORAGE_KEY = 'tree_dump';

export async function setTreeDump(dump: object) {
    return storageApi.set({ [STORAGE_KEY]: JSON.stringify(dump) });
}

export async function getTreeDump(): Promise<any[]> {
    const stringifiedDump = await storageApi.get(STORAGE_KEY);
    return JSON.parse(stringifiedDump[STORAGE_KEY] || []);
}
