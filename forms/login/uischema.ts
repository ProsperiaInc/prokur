export default {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Control",
      "label": "Email",
      "scope": "#/properties/email"
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