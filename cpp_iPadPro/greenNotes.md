# Green Notes
_noted derived from studies in the green C++ app on iPad Pro_

* The function named main is a special function in all C++ programs; it is the function called when the program is run. The execution of all C++ programs begins with the main function, regardless of where the function is actually located within the code.

* Notice that the statement ends with a semicolon (;). This character marks the end of the statement, just as the period ends a sentence in English. All C++ statements must end with a semicolon character. One of the most common syntax errors in C++ is forgetting to end a statement with a semicolon.

* `cout` and `std::cout` both are same functionally, where the only difference is that if we use `cout`, `namespace std` must be used in the program or if you are not using `std namespace` then you should use `std::cout`

_arguably this would be fine_
```cpp
#include <iostream>
using namespace std;

void main() {
    cout << "Kaska";
}
```
_and this is also_
```cpp
#include <iostream>

void main() {
    std::cout << "Kaska";
}
```

* `main()` is a function with a special characteristic that the program execution always starts with; this means the `main()` function has to contain arguments **and** a return type
* `int` and `void` are return types; where `void` is used to communicate that _there will not be a return type_, this is okay technically, but it produces warnings in the program compiler and isn't a safe or wise general use practice 

