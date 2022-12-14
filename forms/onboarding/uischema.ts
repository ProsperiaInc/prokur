import courthouse from '/assets/images/courthouse.png'
import lock_outline from '/assets/images/lock_outline.png'
import globe from '/assets/images/globe.png'
import heart_tick from '/assets/images/heart-tick.png'

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
                  "label": "Title",
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
                  "label": "Industry Category",
                  "scope": "#/properties/industryCategory"
                },
                {
                  "type": "Control",
                  "label": "EIN",
                  "scope": "#/properties/businessId"
                }
              ]
            },
            {
              "type": "Control",
              "scope": "#/properties/companySize",
              "label": "Company Size",
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
              "label": "Company Type",
              "options": {
                "format": "radio",
                "enum_titles": [
                  "Private",
                  "Public",
                  "Non-profit",
                  "Government"
                ],
                "enum_images": [
                  courthouse,
                  lock_outline,
                  globe,
                  heart_tick
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
              "label": "Company Tag Line",
              "scope": "#/properties/companyTagLine"
            },
            {
              "type": "Control",
              "scope": "#/properties/companyDescription",
              "label": "Company Description",
              "options": {
                "multi": true,
                "rows": 5
              }
            },
            {
              "type": "Control",
              "label": "Logo",
              "scope": "#/properties/fileMediaUpload"
            }
          ]
        }
      ]
    }
  ]
}