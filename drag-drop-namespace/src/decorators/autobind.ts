namespace App {
  // autobind decorator
  export function autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value; // store original method
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        // getter executed when we access the function
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
