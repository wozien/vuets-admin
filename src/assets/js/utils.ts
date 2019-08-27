function getType(val: any) {
  return Object.prototype.toString.call(val).slice(8, -1);
}

export function deepCopy(obj: any) {
  let res,
    type = getType(obj);

  if (type === 'Object') {
    res = {};
  } else if (type === 'Array') {
    res = [];
  } else {
    return obj;
  }

  // 对象每个属性的复制
  for (let key in obj) {
    let value = obj[key];
    if (getType(value) === 'Object' || getType(value) === 'Array') {
      // 递归深拷贝子对象
      (res as any)[key] = deepCopy(value);
    } else {
      (res as any)[key] = value;
    }
  }

  return res;
}
