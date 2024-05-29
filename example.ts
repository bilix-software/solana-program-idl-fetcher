import { AnchorProvider, Program, Wallet } from '@project-serum/anchor';
import { Connection, Keypair, clusterApiUrl } from '@solana/web3.js';
import * as fs from 'fs';
import promptSync from 'prompt-sync';

const prompt = promptSync();
const program_address = prompt('Please enter the program address: ');
const network = prompt('Do you want to use mainnet-beta or devnet? (mainnet-beta/devnet): ');

class Example {
    private program_address: string;
    private provider: AnchorProvider;

    constructor(program_address: string, network: string) {
        this.program_address = program_address;
        const connection = new Connection(
            clusterApiUrl(network === 'mainnet-beta' ? 'mainnet-beta' : 'devnet'),
            'confirmed'
        );
        this.provider = new AnchorProvider(connection, new Wallet(new Keypair()), AnchorProvider.defaultOptions());
    }

    async main() {
        try {
            const idl = await Program.fetchIdl(this.program_address, this.provider);
            console.log(idl);
            if (idl == null) {
                console.log('IDL not found');
                return;
            }

            // Save the IDL to a JSON file
            const filename = `${this.program_address}_idl.json`;
            fs.writeFileSync(filename, JSON.stringify(idl, null, 2), 'utf8');
            console.log(`IDL saved to ${filename}`);
        } catch (error) {
            console.error('Error in main function:', error);
        }
    }
}

const example = new Example(program_address, network);
example.main();