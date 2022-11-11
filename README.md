**Scripts list:**


* `npm run start:dev` - Start app in dev environment

* `npm run start:prod` - Start app in production environment

* `npm run build:dev` - Build app with dev environment

* `npm run build:prod` - Build app with production environment

* `npm run eject` - Eject react application

* `npm run prettier` - Lint all files with prettier

* `npm run eslint` - Lint all files with eslint

* `npm run pre-commit` - Run lint-staged ( see more in .lintstagedrc)

**CODE STYLE**

* **Commit rules**

**Please name your commit as this example** 

**type(scope?): subject**

**Type can be one of constant words in lower case:** 

* feature
* styles
* tests
* refactoring
* revert
* fix
* hotfix
* docs
* ci

**Scope can be any word in upper case and should be in scopes left and right and end with ':', but please name it in general:**

* API
* REDUX
* SERVER
* PROJECT MANAGEMENT
* TIME REPORT 
* etc

**If commit is important and have some breaking changes please note it with '!' after scope before ':'**

**Subject can be a little description in sensitive case**

**Please make commit that is going to describe the only one task with one type , 
one scope and short description , max length should be not more than 82 symbols**

**Example of the correct commit:**

feature(PROJECT REPORT): Added button to download XLS devs reports

**WITH BREAKING CHANGES**

feature(ROUTER)!: Updated react router dom to v6.4

See more about commit rules:


[https://github.com/conventional-changelog/commitlint](https://www.conventionalcommits.org/en/v1.0.0/#specification)


[https://www.conventionalcommits.org/en/v1.0.0/#specification](https://www.conventionalcommits.org/en/v1.0.0/#specification)

