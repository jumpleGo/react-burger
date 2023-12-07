export const compareArrs = <T extends { _id: string }[]>(
  arr1: T,
  arr2: T,
): boolean => arr1.every((item, index) => item._id === arr2[index]._id);
