export default [
  {
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter your first name"
      },
      "lastName": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter your second name"
      },
      "email": {
        "type": "string",
        "minLength": 3,
        "format": "email",
        "description": "Please enter your email"
      },
      "phone": {
        "type": "string",
        "minLength": 3,
        "description": "Please enter your phone number."
      },
      "country": {
        "type": "string",
        "enum": [
          "DE",
          "IT",
          "JP",
          "US",
          "RU",
          "Other"
        ]
      },
      "state": {
        "type": "string",
        "enum": [
          "DE",
          "IT",
          "JP",
          "US",
          "RU",
          "Other"
        ]
      },
      "city": {
        "type": "string"
      },
      "zip": {
        "type": "string"
      }
    }
  },
  {
    "type": "object",
    "properties": {
      "companyName": {
        "type": "string"
      },
      "title": {
        "type": "string"
      },
      "url": {
        "type": "string"
      },
      "publicURL": {
        "type": "string"
      },
      "industryCategory": {
        "type": "string"
      },
      "secondaryCategory": {
        "type": "string"
      },
      "vendorId": {
        "type": "string"
      },
      "companyTagLine": {
        "type": "string"
      },
      "companyDescription": {
        "type": "string"
      },
      "companySize": {
        "type": "string",
        "enum": [
          "<250",
          "<500",
          "<1,000",
          ">1,000"
        ]
      },
      "companyType": {
        "type": "string",
        "enum": [
          "1",
          "2",
          "3",
          "4"
        ]
      },
      "fileMediaUpload": {
        "type": "array"
      }
    }
  }
]