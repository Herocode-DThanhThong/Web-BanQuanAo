import React, { ChangeEvent, useState, useEffect } from "react";
import { MenuItem, TextField } from "@mui/material";
import { useQueryUrl } from "@/hooks/use-query-url";
import { getUrl } from "@/utils/getUrl";

const Filter = () => {
  const { router, categoryType, search, price, createdAt, query } =
    useQueryUrl();

  const [selectedFilter, setSelectedFilter] = useState("default");
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== "default") {
      const sortValue = e.target.value.split("-")[1] === "desc" ? "-1" : "1";
      let queryUrl = "";
      if (e.target.value.split("-")[0] === "createdAt") {
        queryUrl = getUrl(1, search, "", categoryType, sortValue);
      } else {
        queryUrl = getUrl(1, search, sortValue, categoryType, "");
      }
      return router.push(`/products?${queryUrl}`);
    }
    const queryUrl = getUrl(1, search, "", categoryType, "");

    router.push(`/products?${queryUrl}`);
  };

  useEffect(() => {
    if (price) {
      setSelectedFilter(price === "-1" ? "price-desc" : "price-asc");
    } else if (createdAt) {
      setSelectedFilter(
        createdAt === "-1" ? "createdAt-desc" : "createdAt-asc"
      );
    } else {
      setSelectedFilter("default");
    }
  }, [query]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="font-semibold capitalize text-2xl">
        {categoryType ? categoryType : "Tất cả sản phẩm"}
      </h1>
      <TextField
        id="standard-select-currency"
        select
        label="Bộ lọc"
        variant="standard"
        value={selectedFilter}
        onChange={handleChange}
      >
        <MenuItem value={"default"}>Mặc định</MenuItem>
        <MenuItem value={"price-asc"}>Giá từ thấp đến cao</MenuItem>
        <MenuItem value={"price-desc"}>Giá từ cao xuống thấp</MenuItem>
        <MenuItem value={"createdAt-desc"}>Mới nhất</MenuItem>
        <MenuItem value={"createdAt-asc"}>Cũ nhất</MenuItem>
      </TextField>
    </div>
  );
};

export default Filter;
