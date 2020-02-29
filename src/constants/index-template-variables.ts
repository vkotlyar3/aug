export class IndexTemplateVariables {
  constructor(
    opt: Partial<IndexTemplateVariables> = {},
    public entityName: string = opt.entityName || null,
    public entityType: string = opt.entityType || null,
    public entityPath: string = opt.entityPath || null,
    public spyDeclarations: string = opt.spyDeclarations || null,
    public spyArguments: string = opt.spyArguments || null,
    public spyInitializations: string = opt.spyInitializations || null,
    public spyImports: string = opt.spyImports || null,
    public methodsTests: string = opt.methodsTests || '',
    public spyUtilsPath: string = opt.spyUtilsPath || null,
  ) {
  }
}
