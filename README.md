# contratos

Programming language to create and bind packages, classes and processes.

## Index

1. [The idea](#the_idea)
2. [Playground](#playground)
3. [Installation](#installation)
4. [Get started](#get_started)
5. [Examples](#examples)
6. [Issues](#issues)
7. [License](#license)

## The idea

The idea of this language is that you create easily the contracts of 3 onthologies in which you should be able to wrap any software project:

 - `package`: any type of software module
 - `class`: a function that creates objects
 - `process`: a function

It is too simple, but this is the idea, to keep it simple, at least firstly.

## Playground

You can play freely with it at:

   - [`https://allnulled.github.io/contratos`](https://allnulled.github.io/contratos)

*There, you can use suggestions to find out the syntax of the language instead of continue reading.*

## Installation

```sh
$ npm install -g contratos
```

## Get started

### CLI usage

Write a simple `contratos` script (`simple.cnt`):

```
package package1
class ClassOne
process process1
```

Then compile it from the console:

```sh
$ contratos compile simple.cnt
```

A `simple.cnt.json` will be created representing the `ast` of your script. And that is all.

### API usage



## Syntax examples

These examples demonstrate all the available options per each idea: `package`, `class` and `process`.

### A package

```
package package1
 file "somefile.txt"
```

### A process

```
process process1
  file "x"
  uses classes Class1, Class2
  uses processes process1, process2
  that receives parameter1, parameter2
  that modifies parameter1, Class1.property
  that returns output
```

### A class

```
class A
  file "class-a"
  extends AncestorOfA
  implements MutationOfA1, MutationOfA2
  uses packages package1, package2, package3
  uses classes Class1, Class2, Class3
  uses processes process1, process2, process3
  has 
    static property property1 set to 100
    property property2 set to 200
    static method method1
      uses packages package1
      uses classes Class1, Class2
      uses processes process1, process2
      that receives parameter1, parameter2
      that modifies parameter1, Class1.property
      that returns output
    method method2
      uses packages package1
      uses classes Class1, Class2
      uses processes process1, process2
      that receives parameter1, parameter2
      that modifies parameter1, Class1.property
      that returns output
    described as a custom description.
```




## Issues

Please, send your issues and suggestions at the page of issues in the Github project, [here](https://github.com/allnulled/contratos/issues).

## License

This project is under [**WTFPL** or **do What The Fuck you want to Public License**](https://es.wikipedia.org/wiki/WTFPL), so do what you want with it.

