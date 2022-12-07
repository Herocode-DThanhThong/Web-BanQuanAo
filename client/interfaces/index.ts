export interface ListResponse<T> {
  data: T;
  pagination?: {
    limit: number;
    page: number;
    total: number;
  };
  message: string;
}

export interface Address {
  default: boolean;
  receiverName: string;
  gender: string;
  phone: string;
  address: string;
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  birthday: string;
  gender: string;
  email: string;
  phone: string;
  addressList: Address[];
  role?: "ADMIN" | "EMPLOYEE" | "CUSTOMER";
  password?: string;
}

export interface Token {
  id: string;
  exp: number;
  iat: number;
}

export interface INavigation {
  title: string;
  url: string;
}

export interface UserInfo {
  _id: string;
  role: string;
}

export interface Category {
  _id?: string;
  categoryName: string;
  types: Array<string>;
}

export interface Image {
  public_id: string;
  url: string;
}

export interface Product {
  _id?: string;
  title: string;
  description: string;
  size: Array<string>;
  price: number;
  images: Array<Image>;
  category: {
    categoryName: string;
    categoryType: string;
  };
}

export interface SelectedProduct {
  _id?: string;
  title: string;
  description: string;
  size: string;
  price: number;
  images: Array<Image>;
  category: {
    categoryName: string;
    categoryType: string;
  };
  quantity: number;
}

export interface Carts {
  productCart: SelectedProduct[];
  userId: string;
}

export interface Receipt {
  _id?: string;
  productCart: SelectedProduct[];
  userInfo: User;
  confirmed: boolean;
}
