export type SafeGroup = {
  id: number;
  name: string;
  name_multilang: {
    ru: string;
    uk: string;
  };
  image: string;
  parent_group_id: number | null;
  order: number;
};
