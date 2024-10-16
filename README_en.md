# welcome to mirage X

using Typescript and react, mirage allows users to create items in resonite!

to get started, run

``` bash
npm install
```

then

```bash

npm run dev
```

to edit the template and see your changes in real time, grab the output.brson from /dist/res and drag drop it into the window of resonite, and find /src/core/main/index.tsx to edit the template to get started.

## Create Unit

`.Create a package directory under` /src/core/unit/package/`. You can use an existing package or the provided template at the following location.` /src/core/unit/package/000_template`.

copy the template and place it under the package directory you just created.
Also, name the directory with an arbitrary Unit name that you want to use.

Edit `detail.ts` under the copied template. You can change the name, description, and other settings of the Unit.
Add an import statement for the Unit to each package with the following command. (Run after adding or removing new Units.)

> npm run unitPackage:sync

If you have created a new package, you can use `. /src/core/unit/main.ts` and `. /src/core/unit/res.ts` with a statement to import the unit package you created.

The following command will regenerate `. /dist/res/src/output.brson`, grab it and drag and drop it back into Resonite to update the Unit list, props and anything else you have changed.

(If you are running `npm run dev`, it will detect the change and regenerate automatically without doing the following.)



this readme is partialy translated from the japanese README.md in the original repository, and is not complete. Please refer to the original repository for more information.
```