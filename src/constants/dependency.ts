export class Dependency {
  constructor(
    opt: Partial<Dependency> = {},
    public name: string = opt.name || null,
    public type: string = opt.type || null,
    public generic: string = opt.generic || null,
    public typeWithoutGeneric: string = opt.typeWithoutGeneric || null
  ) {
  }
}
