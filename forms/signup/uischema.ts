export default {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "label": "First Name",
      "scope": "#/properties/firstName"
    },
    {
      "type": "Control",
      "label": "Last Name",
      "scope": "#/properties/lastName"
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
      "label": "Password",
      "scope": "#/properties/password",
      "options": {
        "format": "password"
      }
    }
  ]
}