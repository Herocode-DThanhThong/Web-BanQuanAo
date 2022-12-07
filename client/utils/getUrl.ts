import queryString from "query-string";
export const getUrl = (
  page: number,
  search: string,
  price: string,
  categoryType: string,
  createdAt: string
) => {
  const objectQuery = {
    page,
    search,
    price,
    categoryType,
    createdAt,
  };

  for (let key in objectQuery) {
    if (!objectQuery[key as keyof typeof objectQuery])
      delete objectQuery[key as keyof typeof objectQuery];
  }

  return `${queryString.stringify(objectQuery)}`;
};
