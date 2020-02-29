export class MethodTestTemplateVariables {
  constructor(
    opt: Partial<MethodTestTemplateVariables> = {},
    public methodName: string = opt.methodName || null,
    public entityType: string = opt.entityType || null,
  ) {
  }
}
