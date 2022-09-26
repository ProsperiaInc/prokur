export default {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "label": "First Name",
      "scope": "#/properties/first_name"
    },
    {
      "type": "Control",
      "label": "Last Name",
      "scope": "#/properties/last_name"
    },
    {
      "type": "Control",
      "label": "Email",
      "scope": "#/properties/email"
    },
    {
      "type": "Control",
      "label": "Country",
      "scope": "#/properties/country"
    },
    {
      "type": "Control",
      "label": "Company Name",
      "scope": "#/properties/company_name"
    },
    {
      "type": "Control",
      "label": "Password",
      "scope": "#/properties/password",
      "options": {
        "format": "password"
      }
    }
  ]
}