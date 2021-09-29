export interface ItemListItem{
  isEditing:Boolean;
  isAdding:Boolean;
  price_type_id:String;
  price_type_name:String;
  created_by: String;
  created_time: Date;
  effective_end_date: Date;
  effective_start_date: Date;
  financial_year_String: String;
  has_warning: Boolean;
  id: String;
  is_deleted: Boolean;
  ndis_support_item_id: String;
  ndis_support_item_name: String;
  ndis_supprot_item_id: String;
  price: String;
  price_control: Number;
  price_control_name:  String;
  price_guide_effective_id:  String;
  price_guide_type_id:  String;
  price_guide_type_name: String;
  quote: Number;
  quote_name: String;
  registration_group: String;
  state_price_list: StatePriceItem[];
  support_area_id: String;
  support_area_name: String;
  support_item: String;
  support_item_description:String;
  support_item_number: String;
  unit_of_measure: Number;
  unit_of_measure_name:String;
  updated_by:String;
  updated_time: Date;
  warning_info: String;
}

export interface StatePriceItem{
  price: Number;
  price_guide_id:String;
  price_guide_short_name:String;
  price_string: String;
  sort_code: String;
  support_item_price_guide_id: String;
}
