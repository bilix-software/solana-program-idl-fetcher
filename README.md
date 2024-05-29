# Solana Program IDL Fetcher

This repository provides tools and scripts for fetching the Interface Definition Language (IDL) of deployed programs on the Solana blockchain using the `@project-serum/anchor` library. This project is set up using TypeScript and includes essential modules to facilitate IDL fetching and management.

## Example
In this example you can see me run the script for the pump.fun program and the marinade finance program

![Example Output](solana-idl-fetcher.mp4)

## Features

- Fetch IDL of deployed programs on the Solana blockchain.
- Saves the IDL to a json file for further usage or storage
- Easy integration into existing projects.

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/)
- [TypeScript](https://www.typescriptlang.org/)

## Installation

To install the package, clone the repository and install the dependencies:

```bash
git clone https://github.com/bilix-software/solana-program-idl-fetcher.git
cd solana-program-idl-fetcher
npm install
```

## Usage

To compile and run the scripts:

1. Configure your environment variables as instructed.
2. Compile the TypeScript files:

```bash
npx tsc
```

3. Run the compiled JavaScript file:

```bash
node example.js
```

## Important Note

In order to use the `fetchIdl` method, an IDL must have been previously initialized via the Anchor CLI's `anchor idl init` command. For example, the `pump.fun` program with the ID `6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P` will not work on mainnet-beta, but if you try it on devnet it will actually return the valid program IDL.

```typescript
/**
 * Fetches an idl from the blockchain.
 *
 * In order to use this method, an IDL must have been previously initialized
 * via the anchor CLI's `anchor idl init` command.
 *
 * @param programId The on-chain address of the program.
 * @param provider  The network and wallet context.
 */
public static async fetchIdl<IDL extends Idl = Idl>(
  address: Address,
  provider?: Provider
): Promise<IDL | null> {
  provider = provider ?? getProvider();
  const programId = translateAddress(address);

  const idlAddr = await idlAddress(programId);
  const accountInfo = await provider.connection.getAccountInfo(idlAddr);
  if (!accountInfo) {
    return null;
  }
  // Chop off account discriminator.
  let idlAccount = decodeIdlAccount(accountInfo.data.slice(8));
  const inflatedIdl = inflate(idlAccount.data);
  return JSON.parse(utf8.decode(inflatedIdl));
}
```

## Project Structure

- `example.ts`: Main code file
- `package.json`: Project metadata and dependencies.
- `tsconfig.json`: TypeScript configuration file.


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to contact [info@bilix.io](mailto:info@bilix.io) for more details or any queries.