import chromep from 'chrome-promise';

const STORAGE_KEY = 'tree_dump';

export async function setTreeDump(dump: object) {
    return chromep.storage.local.set({ [STORAGE_KEY]: JSON.stringify(dump) });
}

export async function getTreeDump(): Promise<any[]> {
    const stringifiedDump = await chromep.storage.local.get(STORAGE_KEY);
    return JSON.parse(stringifiedDump[STORAGE_KEY] || []);
}
