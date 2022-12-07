import { Router, Request, Response } from "express";
const router: Router = Router();
import Products from "../models/Product";
router.get("/", async (req: Request, res: Response) => {
  const { page, createdAt, price, categoryType, search } = req.query;

  try {
    // Pagination
    const pageNumber = Number(page) * 1 || 1;
    const limit = 10;
    const skip = (pageNumber - 1) * limit;
    const priceNumber = price ? Number(price) : null;
    const createdAtNumber = createdAt ? Number(createdAt) : null;

    const sort: Record<string, any> = {
      price: priceNumber,
      createdAt: createdAtNumber,
    };

    for (let key in sort) {
      if (!sort[key]) delete sort[key];
    }

    let queryData: any = categoryType
      ? { "category.categoryType": categoryType }
      : {};

    if (search) {
      queryData = {
        ...queryData,
        title: { $regex: search },
      };
    }

    const products = await Products.find(queryData)
      .sort(sort)
      .limit(limit)
      .skip(skip);

    const totalProduct = await Products.find(queryData).count();

    return res.status(200).json({
      data: products,
      pagination: {
        limit: 10,
        page: pageNumber,
        total: totalProduct,
      },
      message: "Lấy tất cả sản phẩm thành công",
    });
  } catch (error) {
    //console.log(error);
    return res.json({
      data: null,
      message: "Server error",
    });
  }
});
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const product = await Products.findById(req.params.id);

    if (!product)
      return res
        .status(400)
        .json({ data: null, message: "Không tìm thấy sản phẩm" });

    return res.status(200).json({
      data: product,
      message: "Lấy sản phẩm thành công",
    });
  } catch (error) {
    return res.json({
      data: null,
      message: "Server error",
    });
  }
});

export default router;
