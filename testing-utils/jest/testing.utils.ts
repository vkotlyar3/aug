import { SpyObj } from './spy-obj.type';

export const createSpyObj = <T>(baseConstructorName: string, namesOfMethods: string[]): SpyObj<T> => {
  return namesOfMethods.reduce((acc, nameOfMethod, index) => {
    acc[namesOfMethods[index]] = jest.fn();
    return acc;
  }, {} as SpyObj<T>);
};
