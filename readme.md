# CONSIGNA

> > Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

~ save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.

~ getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.

~ getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.

~ deleteById(Number): void - Elimina del archivo el objeto con el id buscado.

~ deleteAll(): void - Elimina todos los objetos presentes en el archivo.

> Method save():
> I need to generate the Code Error ENOENT: no such file or directory. I can do that, IF i use the function readFile, no with writeFile. Because, with write, if the file doesn't exist, it creates it. So it doesn't fail.
> Like writeFile, it outputs it, catches it at the beginning, and outputs the file, with an empty Array. IMPORTANT! Put _await_ in the readLine to enter the if/catch.
> The "data" argument in _writeFile_ must be of type string or an instance of Buffer, TypedArray, or DataView. If Received an instance of Array, doesn't work. Also need the Callback Function in the 3rd parameter, or, it wont work neither: TypeError [ERR_INVALID_CALLBACK]: Callback must be a function. _Received undefined_

# So, when I've just finish it. I run it, and it gives the error codes, but, finally runs the 1st writeFile, which creates a json with an empty Array. So, if I run again, it won't do anything.  Because nothing fails.

> To don't use push, this time, I 've used the *Spread Operator*. And it has worked! _parsedFile = [...parsedFile, ObjectToInsert]_

> I need, to have in variables, the file, and the parsed file, because if not, I cannot insert things in the Array. So, then I used the _SP_, to copy the things that the file has and add a new one.