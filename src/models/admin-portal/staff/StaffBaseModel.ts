import { SelectOption } from "../../CommonModel";

export interface SelectOptionsForStaff {
  States: SelectOption[],
  StaffStatus: SelectOption[],
  Group: SelectOption[],
  ChartTemplate: SelectOption[],
}


export interface StaffSearchParams{
    id: string;
    first_name: string;
    last_name: string;
    status?: number;
    email: string;
    phone: string;
    state_id: string;
    suburb: string;
    street: string;
    postcode: string;
    page: number;
    page_size: number;
}

export interface StaffAddData {
  first_name: string;
  last_name: string;
  status: string;
  notes: string;
  email: string;
  phone: string;
  state_id: string;
  states_id: string[];
  group_ids: string[];
  suburb: string;
  street: string;
  postcode: string;
  chart_template_id: string;
  phone_agent: string;
}

export interface StaffAddFormProps {
  visible: boolean;
  onCreate: (values: StaffAddData) => void;
  onCancel: () => void;
  StaffStore: any
}


export interface StaffUpdateFormProps {
  visible: boolean;
  onUpdate: (values: StaffAddData) => void;
  onCancel: () => void;
  StaffStore: any
}

interface StateInfo{
  state_id:string;
  full_name:string;
  short_name:string;
}


export interface StaffUpdateData {
  avatar: string;
  chart_template_id: string;
  email: string;
  email_Signture: string;
  first_name: string;
  groups: string[]
  id: string;
  is_deleted: boolean
  last_name: string;
  login_access: boolean
  notes: string;
  phone: string;
  phone_agent: string;
  postcode: string;
  signature: string;
  state_id: string;
  state_name: string;
  states: Array<StateInfo>;
  states_id: string[];
  status: number;
  status_name: string;
  street: string;
  suburb: string;
}

