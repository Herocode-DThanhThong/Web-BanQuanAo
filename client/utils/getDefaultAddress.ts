import { Address } from "@/interfaces/index";

export const getDefaultAddress = (addressList: Address[]) => {
  return addressList.find((add, idx) => add.default);
};
