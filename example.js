"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const fs = __importStar(require("fs"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const prompt = (0, prompt_sync_1.default)();
const program_address = prompt('Please enter the program address: ');
const network = prompt('Do you want to use mainnet-beta or devnet? (mainnet-beta/devnet): ');
class Example {
    constructor(program_address, network) {
        this.program_address = program_address;
        const connection = new web3_js_1.Connection((0, web3_js_1.clusterApiUrl)(network === 'mainnet-beta' ? 'mainnet-beta' : 'devnet'), 'confirmed');
        this.provider = new anchor_1.AnchorProvider(connection, new anchor_1.Wallet(new web3_js_1.Keypair()), anchor_1.AnchorProvider.defaultOptions());
    }
    main() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idl = yield anchor_1.Program.fetchIdl(this.program_address, this.provider);
                console.log(idl);
                if (idl == null) {
                    console.log('IDL not found');
                    return;
                }
                // Save the IDL to a JSON file
                const filename = `${this.program_address}_idl.json`;
                fs.writeFileSync(filename, JSON.stringify(idl, null, 2), 'utf8');
                console.log(`IDL saved to ${filename}`);
            }
            catch (error) {
                console.error('Error in main function:', error);
            }
        });
    }
}
const example = new Example(program_address, network);
example.main();
