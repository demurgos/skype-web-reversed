# Require.js Decompiler

## API

### `requireJS.decompile(options: DecompilerOptions): Promise<void>`

### Interfaces

#### `DecompilerOptions`

 - `filePath` {`string`}: The path to the file to decompile.
 - `outputDir` {`string`}: The path to the directory were the result should be stored.
 - `fileExtension` {`string`} (default: `"js"`): Appends this extension to output files.
 - `unresolvedDir` {`string`} (default: `"__unresolved"`): The name of the directory in `outputDir` for unresolved modules.
