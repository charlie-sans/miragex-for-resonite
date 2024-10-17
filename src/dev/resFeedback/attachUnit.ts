import fs from "fs";
import path from "path";
import { res2yaml } from "../../lib/mirage-x/util/res2yaml";
import { readFileSync } from "../../lib/fileUtil";

const appCode = process.env.APP_CODE ?? "MirageX";

const args = process.argv.slice(2);

if (typeof args[0] !== "string") throw new Error("invalid args. set unit name");

const matchPattern = args[0];
const unitFilterRegex = new RegExp(`^${matchPattern}$`);
console.info(`matchPattern=${matchPattern}`);

const getObject = (o: any) => (o.Name.Data === "Holder" ? o.Children[0] : o);

const ResFeedbackOriginal = JSON.parse(
  fs.readFileSync(
    path.resolve(__dirname, "./ResFeedbackOriginal.json"),
    "utf-8"
  )
);

const ResFeedbackMetaOriginal = fs.readFileSync(
  path.resolve(__dirname, "./ResFeedbackMetaOriginal.json"),
  "utf-8"
);

const targets = fs
  .readdirSync(path.resolve(__dirname, "../../core/unit/package"))
  .flatMap((packageName) => {
    const dir = path.resolve(
      __dirname,
      `../../core/unit/package/${packageName}`
    );
    if (
      fs
        .statSync(
          path.resolve(__dirname, `../../core/unit/package/${packageName}`)
        )
        .isDirectory()
    ) {
      try {
        const units = fs.readdirSync(dir).flatMap((fileName) => {
          const filePath = path.resolve(
            __dirname,
            `../../core/unit/package/${packageName}/${fileName}`
          );
          try {
            console.log(filePath);
            return fs.statSync(filePath).isDirectory() ? [fileName] : [];
          } catch (e) {
            console.error(`Error reading file stats for ${filePath}`, e);
            return [];
          }
        });

        return [{ packageName, units }];
      } catch (e) {
        console.error(`error in ${packageName}`);
        console.error(e);
      }
    } else {
      return [];
    }
  });

const PackageParentObject = getObject(ResFeedbackOriginal.Object);

if (!PackageParentObject || !PackageParentObject.Children) {
  throw new Error("PackageParentObject or its Children property is undefined");
}
/*
const PackageObject = PackageParentObject.Children.find((o: any) => o.Name.Data == "Package"); // https://www.geeksforgeeks.org/typescript-array-find-method/
if (!PackageObject || !PackageObject.Children) {
  throw new Error("PackageObject or its Children property is undefined");
}

const Package = PackageObject.Children.find((o: any) => o.Name.Data == "Package");
console.log(Package)
if (!Package) {
  throw new Error("Package is undefined");
}
*/

const appcore = PackageParentObject.Children.find(
  (o: any) => o.Name.Data == appCode
);
const Packages = appcore.Children.find((o: any) => o.Name.Data == "Package");
if (!Packages || !Packages.Children) {
  throw new Error("Package is undefined");
}
const filteredTargets = targets
  .filter(
    (target): target is { packageName: string; units: string[] } =>
      target !== undefined
  )
  .map(({ packageName, units }) => ({
    packageName,
    units: units.filter(
      (unit) => `${packageName}/${unit}`.match(unitFilterRegex) !== null
    ),
  }));

filteredTargets.forEach(({ packageName, units }) => {
  const packageObject = Packages.Children.find(
    (o: any) => o.Name.Data === packageName
  );
  if (packageObject) {
    units.forEach((unit) => {
      const unitSlot = packageObject.Children.find(
        (o: any) => o.Name.Data === `${packageName}/${unit}`
      );

      const unitObject = {
        Object: unitSlot,
        Assets: ResFeedbackOriginal.Assets,
        TypeVersions: ResFeedbackOriginal.TypeVersions,
        Types: ResFeedbackOriginal.Types,
      };
      if (unit === "SphereMesh") {
        console.log("the thing is a sphere"); // please run goddammit :sadface:
      }
      if (unitSlot) {
        const unitObjectYaml = res2yaml(unitObject);
        const prevUnitObjectYaml = readFileSync({
          path: path.resolve(
            __dirname,
            `../../core/unit/package/${packageName}/${unit}/ResFeedback.yaml`
          ),
          errorHandler: () => "",
        });

        if (prevUnitObjectYaml === unitObjectYaml) {
          console.info(`no change in ${packageName}/${unit}`);
          return;
        }

        fs.writeFileSync(
          path.resolve(
            __dirname,
            `../../core/unit/package/${packageName}/${unit}/ResFeedback.json`
          ),
          JSON.stringify(unitObject, null, 2)
        );

        fs.writeFileSync(
          path.resolve(
            __dirname,
            `../../core/unit/package/${packageName}/${unit}/ResFeedback.yaml`
          ),
          unitObjectYaml
        );

        fs.writeFileSync(
          path.resolve(
            __dirname,
            `../../core/unit/package/${packageName}/${unit}/ResFeedbackMeta.json`
          ),
          ResFeedbackMetaOriginal
        );

        console.info(`attached to ${packageName}/${unit}`);
      }
    });
  }
});
