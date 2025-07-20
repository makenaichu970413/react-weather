export declare type PYup<TMessageKey = string> = {
  // t?: any;
  label?: string | null;
  message?: Partial<Record<TMessageKey, string | null>>;
  onCustom?: ((value: any, context: TestContext<AnyObject>) => void) | null; //? Can "throw error"
};

export declare type VValid<T> = Partial<Record<NestedKeys<T>, any>>;
