export type SpyObj<T> = T & {
  [k in keyof T]: jest.Mock<any>;
};
