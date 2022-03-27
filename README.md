# toshi-nest

The toshi-nest is for fledgling work e.g. reusable Node components to share across TUI and other projects

to see the documentation, run `yarn i-all`, and then `yarn run dev`

### How to add the package to your project

- generate a github access token with [these instructions](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)
- in your terminal, run `npm login --scope=@gns-science --registry=https://npm.pkg.github.com`, and then use your github credentials to log in.
- add a file in the root directory of your project called `.npmrc`.
- add this line to the file `@gns-science:registry=https://npm.pkg.github.com/`
- in your terminal, in your project directory, run `yarn add @gns-science/toshi-nest`
