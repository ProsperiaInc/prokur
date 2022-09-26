export default {
  "type": "VerticalLayout",
  "elements": [
    {
      "type": "Group",
      "label": "Company details",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "label": "Company name",
                  "scope": "#/properties/legal_name"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/title"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "label": "Prokur Public URL",
                  "scope": "#/properties/slug"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/publicURL"
                }
              ]
            },
            {
              "type": "HorizontalLayout",
              "elements": [
                {
                  "type": "Control",
                  "scope": "#/properties/industryCategory"
                },
                {
                  "type": "Control",
                  "scope": "#/properties/businessId"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/companySize",
              "options": {
                "format": "radio",
                "enum_titles": [
                  "Less than 250",
                  "Less than 500",
                  "Less than 1,000",
                  "More than 1,000"
                ]
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/companyType",
              "options": {
                "format": "radio",
                "enum_titles": [
                  "Private",
                  "Public",
                  "Non-profit",
                  "Government"
                ]
              }
            }
          ]
        }
      ]
    },
    {
      "type": "Group",
      "label": "Company identity",
      "elements": [
        {
          "type": "VerticalLayout",
          "elements": [
            {
              "type": "Control",
              "scope": "#/properties/companyTagLine"
            },
            {
              "type": "Control",
              "scope": "#/properties/companyDescription",
              "options": {
                "multi": true,
                "rows": 5
              }
            },
            {
              "type": "Control",
              "scope": "#/properties/fileMediaUpload"
            }
          ]
        }
      ]
    }
  ]
}