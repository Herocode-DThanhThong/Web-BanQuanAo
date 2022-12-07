import { useRouter } from "next/router";

export const useQueryUrl = () => {
  const router = useRouter();
  const { query } = router;

  const page = Number(query.page || 1);
  const search = (query.search as string) || "";
  const categoryType = (query.categoryType as string) || "";
  const price = (query.price as string) || "";
  const createdAt = (query.createdAt as string) || "";

  return {
    router,
    page,
    search,
    categoryType,
    price,
    createdAt,
    query,
  };
};
