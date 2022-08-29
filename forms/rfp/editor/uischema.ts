export default [
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "label": "Title",
            "scope": "#/properties/title"
          },
          {
            "type": "Control",
            "label": "Inquiry Deadline",
            "scope": "#/properties/inquiry_deadline"
          }
        ]
      },
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "label": "Close Date",
            "scope": "#/properties/close_date"
          },
          {
            "type": "Control",
            "label": "Budget",
            "scope": "#/properties/budgetCurrency"
          }
        ]
      },
      {
        "type": "HorizontalLayout",
        "elements": [
          {
            "type": "Control",
            "label": "RFP Primary Category",
            "scope": "#/properties/categories"
          },
          {
            "type": "Control",
            "label": "RFPP Secondary Category",
            "scope": "#/properties/rfpSecondaryCategory",
            "rule": {
              "effect": "HIDE",
              "condition": {
                "type": "LEAF",
                "scope": "#/properties/rfpPrimaryCategory",
                "expectedValue": "Never"
              }
            }
          }
        ]
      },
      {
        "type": "VerticalLayout",
        "elements": [
          {
            "type": "Control",
            "label": "Tags",
            "scope": "#/properties/tagsTags"
          }
        ]
      }
    ]
  },
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/scope_summary",
        "options": {
          "multi": true,
          "rows": "4"
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/scope_requirements"
      }
    ]
  },
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/evaluation_summary",
        "options": {
          "multi": true,
          "rows": 4
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/evaluation_criteria",
        "options": {
          "multi": true,
          "rows": 4
        }
      },
      {
        "type": "Control",
        "scope": "#/properties/evaluationMetrics"
      }
    ]
  },
  {
    "type": "VerticalLayout",
    "elements": [
      {
        "type": "Control",
        "scope": "#/properties/multi_attachmentMultipleUpload"
      }
    ]
  }
]