export type ClassNameXParam = string | string[] | Record<string, boolean> | void;

export function classNameX(...params: ClassNameXParam[]): string {
  return params
    .map((item) => {
      if (typeof item === 'string') {
        return item.trim();
      }

      if (Array.isArray(item)) {
        return classNameX(...item);
      }

      if (typeof item === 'object') {
        Object.keys(item)
          .map((key) => {
            if (!!item[key]) {
              return key;
            }

            return void 0;
          })
          .filter(Boolean)
          .join(' ');
      }

      return void 0;
    })
    .filter(Boolean)
    .join(' ');
}
