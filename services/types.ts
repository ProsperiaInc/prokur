export type User = {
  id: number,
  company_id: number,
  email: string,
  first_name: string,
  last_name: string,
  phone: any,
  title: any,
  address1: any,
  address2: any,
  city: any,
  state: any,
  zip: any,
  remember_token: string,
  status: string,
  email_verified_at: string,
  last_login: string,
  created_at: string,
  updated_at: string,
  full_name: string,
  avatar_url: string,
  assigned_role: string,
  usage_type: string,
  desired_company_name: string,
  company: {
    id: number,
    business_type_id: any,
    category_id: any,
    secondary_category_id: any,
    usage_type: string,
    slug: any,
    legal_name: string,
    tagline: any,
    description: any,
    size: any,
    doing_business_as: any,
    federal_tax_id: any,
    dun: any,
    naics_code: any,
    website: any,
    address1: any,
    address2: any,
    city: any,
    state: any,
    zip: any,
    created_at: string,
    updated_at: string,
    logo_url: string,
    public_uri: string,
    business_type: any,
    category: any,
    secondary_category: any
  }
}

export type Auth = {
  access_token: string,
  token_type: string
  expires_in: number,
  user: User
}

export type RFP = {
  "id": string,
  "name": string,
  "deadline_date": string,
  "closed_date": string,
  "created_at": string,
  "updated_at": string,
  "created_by_user_id": number,
  "proposals_count": number,
  "status": string,
  "company": object | null,
  "share_links": [
    {
      "id": number,
      "rfp_id": string,
      "channel_id": number,
      "token": string,
      "name": string | null,
      "password": string | null,
      "created_at": string,
      "updated_at": string,
      "share_link": string,
      "channel": {
          "id": number,
          "name": string,
          "created_at": string,
          "updated_at": string
      }
    }
  ],
  "created_by": {
      "id": number,
      "email": string,
      "first_name": string,
      "last_name": string,
      "full_name": string,
      "avatar_url": string,
      "assigned_role": string,
      "usage_type": any,
      "company": object | null
  }
}