import { COUNTRIES_LIST } from 'utils/constants'

export default {
  "type": "object",
  "properties": {
    "firstName": {
      "type": "string"
    },
    "lastName": {
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
    "firstName",
    "lastName",
    "email",
    "country",
    "password"
  ]
}