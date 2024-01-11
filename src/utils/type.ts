enum DataType {
  String = 'string',
  Number = 'number',
  Array = 'array',
  Undefined = 'undefined',
  Null = 'null',
  Symbol = 'symbol',
  Function = 'function',
  Object = 'object',
  Set = 'set',
  Map = 'map',
}

//获取类型
export const getType = (args: unknown) => {
  return Object.prototype.toString
    .call(args)
    .replace(/\[object\s(\w+)\]/, '$1')
    .toLocaleLowerCase();
};

export const isString = (value: unknown): value is string => {
  return typeof value === DataType.String;
};
