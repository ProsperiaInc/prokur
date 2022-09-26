import { COUNTRIES_LIST } from 'utils/constants'

export default {
  "type": "object",
  "properties": {
    "first_name": {
      "type": "string"
    },
    "last_name": {
      "type": "string"
    },
    "company_name": {
      "type": "string"
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "country": {
      "type": "string",
      "enum": COUNTRIES_LIST
    },
    "password": {
      "type": "string",
      "format": "password"
    }
  },
  "required": [
    "first_name",
    "last_name",
    "company_name",
    "email",
    "country",
    "password"
  ]
}