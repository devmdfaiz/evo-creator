export const ls = typeof window !== "undefined" && localStorage;

export const setLsItem = (key: string, value: any) => {
  if (ls) {
    ls.setItem(key, JSON.stringify(value));
    return true;
  } else {
    return false;
  }
};

export const getLsItem = (key: string) => {
  if (ls) {
    const value = JSON.parse(ls.getItem(key)!)
    return value;
  } else {
    return false;
  }
};

export const removeLsItem = (key: string) => {
  if (ls) {
    ls.removeItem(key);
    return true;
  } else {
    return false;
  }
};
