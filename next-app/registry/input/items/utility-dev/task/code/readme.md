# Task Runner

A simple task runner.  

Features: 
- **Auto-Discovery of scripts** from `task/scripts` directory to populate the launcher
- **Easy Launcher UX**: Select script with Arrow up/down and press Enter to execute
- **All script languages support**: Script are simple scripts files, they can be anything that can be launched in the machine

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