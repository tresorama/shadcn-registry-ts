# Task Runner

This task runner:
- read every script files in scripts dir to popoulate the list
- ask the user which script to run

## Run a script

1. Run the script launcher  
    ```bash 
    ./task/run.sh
    ```
2. Select the script with arrows and press enter

## Add new script

1. Duplicate an existing script and rename it, then write the script.  
2. Assumes that the current working directory is the root of the project inside the code
3. Make it executable  
    ```bash
    ./task/run.sh
    # select
    0--MISC--make-scripts-executable.sh
    ```