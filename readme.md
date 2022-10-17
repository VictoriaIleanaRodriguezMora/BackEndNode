# CONSIGNA

> Instruction: Implement a program that contains a class called Container that receives the name of the file with which it is going to work and implements the following methods:

~ save(Object): Number - Receives an object, saves it to the file, returns the assigned id.

~ getById(Number): Object - Receives an id and returns the object with that id, or null if not present.

~ getAll(): Object[] - Returns an array of the objects present in the file.

~ deleteById(Number): void - Deletes the object with the searched id from the file.

~ deleteAll(): void - Deletes all objects present in the file.

> Method save():
> I need to generate the Code Error ENOENT: no such file or directory. I can do that, IF i use the function readFile, no with writeFile. Because, with write, if the file doesn't exist, it creates it. So it doesn't fail.
> Like writeFile, it outputs it, catches it at the beginning, and outputs the file, with an empty Array. IMPORTANT! Put _await_ in the readLine to enter the if/catch.
> The "data" argument in _writeFile_ must be of type string or an instance of Buffer, TypedArray, or DataView. If Received an instance of Array, doesn't work. Also need the Callback Function in the 3rd parameter, or, it wont work neither: TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. _Received undefined_

# So, when I've just finish it. I run it, and it gives the error codes, but, finally runs the 1st writeFile, which creates a json with an empty Array. So, if I run again, it won't do anything.  Because nothing fails.

> To don't use push, this time, I 've used the *Spread Operator*. And it has worked! _parsedFile = [...parsedFile, ObjectToInsert]_

> I need, to have in variables, the file, and the parsed file, because if not, I cannot insert things in the Array. So, then I used the _SP_, to copy the things that the file has and add a new one.

_If I try to use twice save() Methods, at the same time, it breaks for some reason._  

# ------------------------------------------------------------------------------------------

> Method getById()
> As I can't have variables in the body at the Class,  I've to catch the _file_ and the _parsedFile_ in every single Method.
> In the parsedFile, I have made a loop to find the position which arrives by parameter and > In the parsedFile, I have made a loop to find the position which arrives by parameter  I compare it with the elements of the array.
> If, isnot the same, return _null_

# ------------------------------------------------------------------------------------------

> Method getAll()
> This method return all the _parsedFile_
# ------------------------------------------------------------------------------------------

> deleteById ()
> I have to write de file at the end. USE S*P*LICE
> When I tried to use Splice, inside the loop, it doesn't work. I need local variables in the function that take value in the loop, and when it's done, I do the splice and write the file

# ------------------------------------------------------------------------------------------

> Method deleteAll()
> This method delete all by the Splice Method



