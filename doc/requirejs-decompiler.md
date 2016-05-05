# Require.js Decompiler

## Algorithm

### Naive

This just searches for `define` calls with their first argument being an id string.

The problem with this algorithm is that it does not take care of the scope.

### Territory flags

We first discover every `define` call and assign an id to each of them.
We then proceed to explore

Then, we mark each sub-node (and the call himself) by an id pointing to the nearest ancestor `define` (called the `owner`).
At this point, some nodes don't have any owner (their `owner` attribute is `null`) and some owned nodes might referer to external nodes.

Once every node is marked we traverse the tree to the root and note how many

## API

### `requireJS.decompile(options: DecompilerOptions): Promise<void>`

### Interfaces

#### `DecompilerOptions`

 - `filePath` {`string`}: The path to the file to decompile.
 - `outputDir` {`string`}: The path to the directory were the result should be stored.
 - `fileExtension` {`string`} (default: `"js"`): Appends this extension to output files.
 - `unresolvedDir` {`string`} (default: `"__unresolved"`): The name of the directory in `outputDir` for unresolved modules.
