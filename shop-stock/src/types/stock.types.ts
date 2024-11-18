export interface StockQuery {
  plu?: string;
  shop_id?: string;
  from?: string;
  to?: string;
}

export interface StockFilter {
  product?: { plu: number };
  shop?: number;
  date?: { $gte: Date; $lte: Date };
}
