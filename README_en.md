# welcome to mirage X

using Typescript and react, mirage allows users to create items in resonite!

to get started, run

``` bash
npm install
```

fill out the .env file with the following information

``` bash
APP_CODE="SampleMirageXApp"
MIRAGE_URL="http://localhost:3000/"
MIRAGE_PORT="3000"
MIRAGE_SERVER_ID="xxx"
MIRAGE_HOST_CV_PATH=
MIRAGE_USE_SSL_CV_PATH=
CV_OWNER_ID=
AUTH_URL="https://auth.resonite.love/"
PLATFORM_API_URL="https://api.resonite.com/"
PLATFORM_ASSETS_URL="https://assetx.resonite.com/"
PERFORMANCE_TEST_CODE=""
```

then copy the config.private.sample.json file to config.private.json and fill it out with the following information

``` json
{
  "feedbackLink": "resrec:///U-xxx/xxx" // where resrec is a *Public folder* link. the server gets cranky if you use anything else.
}

```

then run

```bash

npm run dev
```

to start the server.

```

to edit the template and see your changes in real time, grab the output.brson from /dist/res and drag drop it into the window of resonite, and find /src/core/main/index.tsx to edit the template to get started.

## Create Unit

MirageX uses a unique concept called Unit as the minimum unit when synchronising with Resonite. Units are grouped in packages according to use cases. 

creating your own unit is also possible.

`.Create a package directory under` /src/core/unit/package/`. You can use an existing package or the provided template at the following location.` /src/core/unit/package/000_template`.

copy the template and place it under the package directory you just created.
Also, name the directory with an arbitrary Unit name that you want to use, this will be reflected in resonite in a few.

Edit `detail.ts` under the copied template. You can change the name, description, and other settings of the Unit.
Add an import statement for the Unit to each package with the following command. (Run after adding or removing new Units.)

> npm run unitPackage:sync

If you have created a new package, you can use `. /src/core/unit/main.ts` and `. /src/core/unit/res.ts` with a statement to import the unit package you created.

from there, define the same unit in resonite by creating the required slots and add any additional information you need.

save it to a public folder where the feedback link is located in the config.private.json file.

then run the following command to apply the latest object from the registered folder to the unit name xxxx.

> npm run feedback:unit xxxx

where xxxx is the name of the unit you created.

The following command will regenerate `. /dist/res/src/output.brson`, grab it and drag and drop it back into Resonite to update the Unit list, props and anything else you have changed.

(If you are running `npm run dev`, it will detect the change and regenerate automatically without doing the following.)



this readme is partialy translated from the japanese README.md in the original repository, and is not complete. Please refer to the original repository for more information.
```