**Compiler** that will compile some list-like function calls into
some C-like function calls.

The two functions `add` and `subtract` would be written like this:
            LISP                  C
2 + 2       (add 2 2)             add(2, 2)
4 - 2       (subtract 4 2)        subtract(4, 2)
2 + (4 - 2) (add 2 (subtract 4 2) add(2, subtract(4, 2))

Most compilers break down to three primary stages:
1. **Parsing** is taking raw code and turning it into a more
abstract representation of the code.
2. **Transformation** takes this abstract representation and
manipulates it to do whatever the compiler needs to do.
3. **Code generation** takes the transformed represantation of
the code and turns it into new code.
