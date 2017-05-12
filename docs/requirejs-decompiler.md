# Require.js Decompiler

## Algorithm

### Naive

This just searches for `define` calls with their first argument being an id string.

The problem with this algorithm is that it does not take care of the scope.

### Root augmentation

This algorithm discovers every `define` call and mark it as the root of its own `defineZone` (ie. the area "owned" by this `define`).

The next step is to grow the zone to the leafs: every sub-node gets the `ownerDefine` of its parent. During this traversal, we check
the presence of nested `define` (a `define` call in an other `define` call) and count the number `define` calls in the subtree of
each node.
Each define call is still the root of its own subtree so if we splitted the modules right now, we would get the same result as with the naive algorithm.
The improvement of this algorithm, is that we now extend the root of `defineZone` to the top (in the direction of the program root)
while there are no conflicts: the parent of the current root has only one `subDefine` (the one we are currently extending).

## API

### `requireJS.decompile(options: DecompilerOptions): Promise<void>`

### Interfaces

#### `DecompilerOptions`

 - `filePath` {`string`}: The path to the file to decompile.
 - `outputDir` {`string`}: The path to the directory were the result should be stored.
 - `fileExtension` {`string`} (default: `"js"`): Appends this extension to output files.
 - `unresolvedDir` {`string`} (default: `"__unresolved"`): The name of the directory in `outputDir` for unresolved modules.
