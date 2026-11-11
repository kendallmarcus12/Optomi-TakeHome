import { readFileSync, existsSync, writeFileSync, renameSync } from 'node:fs'
import { Address } from "../schema/__generated__/resolvers-types";
import { Addresses } from "../schema/address/types";

export class AddressDataStore {
    private entries = new Map<string, Address>();
    private filePath?: string;

    constructor(seed: Addresses = {}, filePath?: string) {
        this.filePath = filePath;
        for (const [name, address] of Object.entries(seed)) {
            this.entries.set(name, address);
        }
    }

    // Used at app startup
    static fromFile(path: string): AddressDataStore {
        const seed = existsSync(path) ? JSON.parse(readFileSync(path, 'utf-8')) : {};
        return new AddressDataStore(seed, path);
    }

    getAll(): { name: string; address: Address }[] {
        return [...this.entries].map(([name, address]) => ({ name, address }))
    }

    getByName(name: string): Address | undefined {
        return this.entries.get(name)
    }

    create(name: string, address: Address = {}): Address {
        if (this.entries.has(name)) throw new Error(`"${name}" already exists`)
        this.entries.set(name, address)
        try {
            this.persist()
        } catch (err) {
            this.entries.delete(name) // roll back so memory and file stay in sync
            throw err
        }
        return address
    }

    clear() {
        this.entries.clear();
        this.persist();
    }

    private persist() {
        if (!this.filePath) return
        const tmp = this.filePath + '.tmp'
        writeFileSync(tmp, JSON.stringify(Object.fromEntries(this.entries), null, 2))
        renameSync(tmp, this.filePath) // atomic swap, so a crash mid-write can't corrupt the file
    }
}