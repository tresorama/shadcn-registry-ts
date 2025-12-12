
It's common  in a project to have a lot of development task that you execute with the CLI in your local machine.  
This **Task Runner** will help you to automate those tasks.  

Features:
- Auto-Discovery every script files in `task/scripts` to populate the launcher
- Arrow up/down + Enter are uesd to navigate and launch the script
- Script are simple bash scripts files, but can be anything that can be launched

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
- you go to the root of the project directory
- you run the `task/run.sh` script
- select the script with arrows and press enter
- done


:::tip
This is not a complex solution, but it's a good starting point to automate the CLI.  
When you need cross-platform support or more, reach these:
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
select the script with arrows and press enter

### Add new script

You just need to create a new bash script in the `task/scripts` directory, and make it executable.

Steps:
- create a new bash script file in the `task/scripts` directory (or duplicate an existing one)
- rename the file as as you would like it to be called it in the launcher
- code it
- make it executable (directly with `chmod +x SCRIPT_FILE_PATH` or run the `0--MISC--make-scripts-executable.sh` script)

:::tip
You can alter the constants in `task/run.sh` to change the scripts directory location.
:::

:::tip
A `0--MISC--make-scripts-executable.sh` script is included in the `task/scripts` directory, you can use it to make the scripts executable after you created it.
:::

:::tip
Because you launch the script launcher from the root of the project, it's recommended that the code of the script assumes that the current working directory is the root of the project.
:::