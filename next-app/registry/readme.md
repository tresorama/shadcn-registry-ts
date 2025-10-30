# registry directory

- input
  - this folder is where we put our registry items (source of truth)
- output-deriver
  - code for converting `input` to `output`
  - derived data:
    - `next`: for next app rendering purpose
    - `shadcn cli`: for generate shadcn public files – that are then served by next public folder.
- output-static-generator 
  - scripts used to derive `input` into `output` and save to disk in `output-static-artifacts`.  
- output-static-artifacts
  - the not-git-tracked folder where static generated files are saved by `output-static-generator`
  - these files are used as source when `output-reader` uses `readMode=static`
- output-reader
  - this folder contains the code used by `next` and `shadcn cli` to read `output` files