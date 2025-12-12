
It's common in a project to have a lot of development tasks that you execute with the CLI in your local machine.  
This **Task Runner** will help you to automate those tasks.  

Features:
- **Auto-Discovery of scripts** from `task/scripts` directory to populate the launcher
- **Easy Launcher UX**: Select script with Arrow up/down and press Enter to execute
- **Support all script languages**: Script are simple scripts files, they can be anything that can be launched in the machine

Imagine that your project has this file tree structure:

```bash
. your-project
├── docker
│   ├── docker-compose.yml
├── next-js
│   ├── ...
├── task
│   ├── run.sh
│   └── scripts
│       ├── 0--MISC--make-scripts-executable.sh
│       ├── 2--DEV--LAUNCH-docker-container--DB.sh
│       ├── 2--DEV--LAUNCH-docker-container--OTHER-SERVICE.sh
│       ├── 2--DEV--STOP--docker-container--ALL.sh
│       └── 2--DEV--STOP+DESTROY-VOLUME--docker-container--ALL.sh
```

When you need to run a task:
- You first go to the root of the project directory with the CLI
- Then run `task/run.sh` in the CLI to launch the script launcher
- Select the script with arrows and press enter to run
- Done!


:::tip
This **Task Runner** is not a complex solution, but it's a good starting point to automate the CLI.  

When you need cross-platform support or more features, reach these:
- Taskfile – https://taskfile.dev/
- Make – https://www.gnu.org/software/make/
- Just – https://just.systems/
- Run – https://github.com/adonovan/run
- Mage – https://magefile.org/
- Invoke (Python) – https://www.pyinvoke.org/
- Rake (Ruby) – https://ruby.github.io/rake/
- pypyr – https://pypyr.io/
- Goke – https://github.com/nathanxurui/goke
- Whiz – https://github.com/whiz-dev/whiz
- Maki – https://github.com/grillazz/maki
:::


### Run a script

Go to the root of the project directory.  

Run the script launcher
```bash 
./task/run.sh
```  

Select the script with arrows and press enter.

### Add new script

1. Create a script file in the `task/scripts` directory (or duplicate an existing one)  
    :::tip
    By default the Launcher search for script files in the `task/scripts` directory.  
    If you want to change the `scripts` directory name, do it, but then update the constant `SCRIPTS_DIR` in `task/run.sh`.
    :::
2. Rename the file as you'd like it to be called in the launcher UI  
3. Code it  
    :::tip
    Because you launch the script launcher from the root of the project, it's recommended that the code inside the script assumes that the current working directory is the root of the project.
    :::
4. Make it executable  
    Run `chmod +x SCRIPT_FILE_PATH`  

    :::tip
    To simplify the process, we provide a pre-made script that will make all the scripts in the `task/scripts` directory executable.  
    Just run `./task/run.sh` and select the `0--MISC--make-scripts-executable.sh` script.  

    **NOTE:** if you updated the scripts directory name, you must update the `0--MISC--make-scripts-executable.sh` script too.
    :::
5. Now if you run `./task/run.sh` you will see the new script in the launcher


