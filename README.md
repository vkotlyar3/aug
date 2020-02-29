## Description

Generating unit test template for entity based on static information of entity file. 
Include generating: 
- spy imports
- spy declaration
- spy initialization
- creating sut
- describes for public methods

Support: 
- jest
- jasmine

## Installing 

`npm i -g angular-unit-test-generator`

OR

`yarn global add angular-unit-test-generator`

## Using

After installation, go to folder with entity, which you want to test.
<br/>For example, entity - flows.service.ts
<br/>Run command - `aug flows.service.ts`
<br/>As a result, file flows.service.spec.ts will be generated

## Examples

Go to examples - [link](https://github.com/vkotlyar3/aug/tree/master/examples)

## Config 

Package can be configured by config in root of project - `aug.json`

### Fields:
 - spyUtilsPath 
    - Description - ES6 import for providing SpyObj and createSpyObj utils
    - Default value - angular-unit-test-generator/testing-utils/jest