export type SafeUser = {
  name: string;
  email: string;
  role: string;
};

export type SafeGroup = {
  id: number;
  name: string;
  name_multilang: {
    ru: string;
    uk: string;
  };
  description_multilang: {
    ru: string;
    uk: string;
  };
  image: string;
  parent_group_id: number | null;
  order: number;
};

export type HiddenGroups = {
  id: number;
  name: string;
};

export type SafeProduct = {
  id: number;
  name: string;
  name_multilang: {
    ru: string;
    uk: string;
  };
  description_multilang: {
    ru: string;
    uk: string;
  };
  selling_type: string;
  presence: string;
  in_stock: boolean;
  price: number;
  groupId: number;
  main_image: string;
  status: string;
  quantity_in_stock: number;
  measure_unit: string;
};

export type PaginationData = {
  page: number;
  perPage: number;
  totalPages: number;
};

export type PaginationResult = {
  products: SafeProduct[];
  paginationData: PaginationData;
};

export type CartStateItem = {
  product: SafeProduct;
  quantity: number;
  price: number;
};

export type DeliveryOptionType = {
  value: string;
  label: string;
};

export type LocationOptionType = {
  value: { city: string; cityId: string };
  label: string;
};

export type DivisionOptionType = {
  value: string;
  label: string;
};
