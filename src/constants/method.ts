export class Method {
  constructor(
    opt: Partial<Method> = {},
    public name: string = opt.name || null,
    public returnType: string = opt.returnType || null,
    public modifier: 'public' | 'private' = opt.modifier || 'public'
  ) {
  }
}
