## Background
Last month I was writing dropboxignore tool that is helping me in managing my Dropbox backup. Unfortunately developing JS projects inside Dropbox sync directory results in huge CPU load caused by indexing the node_modules.  

That is exactly a problem worth solving. I decided to  use Selective Sync in Dropbox and .gitignore structure and rules. It is the idea behind the [dropboxignore](https://github.com/MichalKarol/dropboxignore). Usage of inotify allow me to watch sync directory and exclude them as soon as detected, causing my Dropbox backup to have now way less files and my CPU to keep cool in hot summer in Wrocław. 

After all of development and testing I decided to publish it on [pypi.org](https://pypi.org). The documentation on packaging is very good and you should definitely check it: [Packaging Python Projects](https://packaging.python.org/tutorials/packaging-projects/), but let me summarize it in 4 points.

## setup.py - all information about package in single file
``` python
import setuptools
import os.path as p


with open('README.md', 'r') as fh:
    long_description = fh.read()

the_lib_directory = p.dirname(p.realpath(__file__))
requirement_path = p.join(the_lib_directory, 'requirements.txt')
install_requires = []
if p.isfile(requirement_path):
    with open(requirement_path) as f:
        install_requires = f.read().splitlines()


setuptools.setup(
    name='dropboxignore',
    version='0.2.0',
    scripts=['dropboxignore.py'],
    author='Michał Karol',
    author_email='michal.p.karol@gmail.com',
    description='Tool allowing for watching sync directory and setting Dropbox to ignore paths using .dropboxignore',
    long_description=long_description,
    long_description_content_type="text/markdown",
    url='https://github.com/MichalKarol/dropboxignore',
    packages=setuptools.find_packages(exclude=['tests']),
    classifiers=[
        'Programming Language :: Python :: 3.6',
        'Programming Language :: Python :: 3.7',
        'License :: OSI Approved :: MIT License',
        'Operating System :: POSIX :: Linux',
    ],
    install_requires=install_requires,
    entry_points={
        'console_scripts': [
            'dropboxignore = dropboxignore:main',
        ],
    }
)

```

As you can see main part of the file is setuptools.setup function that configure and keep all information about package.

### Keyword explanation
* **name** - name of the package
* **version** - version of the package (use major.minor.patch)
* **scripts** - files that should end up in PATH
* **author** - author of the package
* **author_email** - way of contacting with author
* **description** - short description of package contents
* **long_description** - longer description that is used on detailed package site
* **long_description_content_type** - format of long description, Allowed values: text/plain, text/markdown or text/x-rst
* **url** - URL to the package homepage or repository
* **packages** - list of packages that should end up in package eg. all except from tests dir
* **classifiers** - list of tags that describe the package, list of all available classifiers is on [pypi.org/classifiers](https://pypi.org/classifiers)
* **install_requires** - list of package requirements eg. pyinotify>=0.9.6
* **entry_points** - describes the how script can be executed and setting aliases. That way you can execute `nameofscript.py` by invoking `nameofscript` which feels better to use inside a shell

## Building the package
``` sh
python3 -m pip install --user --upgrade setuptools wheel
python3 setup.py sdist bdist_wheel
```
As a result of this step, you should have .whl and .tar.gz files inside `dist` directory. 

## Deploying the package to test.pypi.org
Requirements: Active account on test.pypi.org

``` sh
python3 -m pip install --user --upgrade twine
python3 -m twine upload -u $USERNAME -p $PASSWORD --repository-url https://test.pypi.org/legacy/ dist/*
```

## Deploying the package to pypi.org
Requirements: Active account on pypi.org - it is not the same account as on test.pypi.org

``` sh
python3 -m pip install --user --upgrade twine
python3 -m twine upload -u $USERNAME -p $PASSWORD dist/*
```

## Summary
After all of steps your shiny new Python package should be available to all users using pip.  
I recommend site [pypistats.org](https://pypistats.org), that allows you to monitor how successful your package is.

Happy coding!