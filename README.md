### Using gulp
    Sass is compiled in "./src/components" by default
    and all directories are being watched.

    You can change directory or directories you want to watch by adding
    "src" parameter to config.json file that you need to make if you don't have it already.

    Example:

    You have folders:
        ./src/components/
            - HelloWorld
            - HelloWorld1
            - HelloWorld2

    (for one specific directory) (this will compile "HelloWorld1" in this case, because "./src/components" is the default path)
    {
        "src":1
    }

    or

    (for multiple specific directories) (this will compile "HelloWorld" and "HelloWorld2")
    {
        "src":[0,2]
    }

    BUT if you want to compile other directories in other path you need to set "path" parameter.

    Example:

    You have folders:
        ./src/Hello/
            - HelloWorld
            - HelloWorld1
            - HelloWorld2

    (this will compile sass in "HelloWorld2" folder in "./src/Hello" path if directory exists
    and has "scss" folder with .scss files in it)
    {
        "path": "./src/Hello",
        "src":2
    }