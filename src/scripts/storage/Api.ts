import chromep from 'chrome-promise';

export default (chromep as any).storage.local as chromep['storage']['local'];
