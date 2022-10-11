const categories = [
  {
      "id": 12,
      "label": "360 Degree Feedback Software"
  },
  {
      "id": 13,
      "label": "3D Architecture Software"
  },
  {
      "id": 14,
      "label": "3D CAD Software"
  },
  {
      "id": 15,
      "label": "AB Testing Software"
  },
  {
      "id": 16,
      "label": "Access Governance Software"
  },
  {
      "id": 17,
      "label": "Account Based Marketing Software"
  },
  {
      "id": 19,
      "label": "Accounting Practice Management Software"
  },
  {
      "id": 18,
      "label": "Accounting Software"
  },
  {
      "id": 20,
      "label": "Accounts Payable Software"
  },
  {
      "id": 21,
      "label": "Accounts Receivable Software"
  },
  {
      "id": 22,
      "label": "Accreditation Management Software"
  },
  {
      "id": 23,
      "label": "Ad Server Software"
  },
  {
      "id": 24,
      "label": "Address Verification Software"
  },
  {
      "id": 25,
      "label": "Admissions Software"
  },
  {
      "id": 26,
      "label": "Advertising Agency Software"
  },
  {
      "id": 27,
      "label": "Advocacy Software"
  },
  {
      "id": 28,
      "label": "Affiliate Software"
  },
  {
      "id": 29,
      "label": "Agile Project Management Tools"
  },
  {
      "id": 30,
      "label": "AIOps Platforms Software"
  },
  {
      "id": 31,
      "label": "Airline Reservation System"
  },
  {
      "id": 32,
      "label": "All-in-One Marketing Platform"
  },
  {
      "id": 33,
      "label": "Alumni Management Software"
  },
  {
      "id": 34,
      "label": "AML Software"
  },
  {
      "id": 35,
      "label": "Android Kiosk Software"
  },
  {
      "id": 36,
      "label": "Animal Shelter Software"
  },
  {
      "id": 37,
      "label": "Animation Software"
  },
  {
      "id": 38,
      "label": "Anti-spam Software"
  },
  {
      "id": 39,
      "label": "API Management Software"
  },
  {
      "id": 40,
      "label": "App Building Software"
  },
  {
      "id": 41,
      "label": "App Design Software"
  },
  {
      "id": 42,
      "label": "App Store Optimization (ASO) Tools"
  },
  {
      "id": 43,
      "label": "Apparel Management Software"
  },
  {
      "id": 44,
      "label": "Applicant Tracking Software"
  },
  {
      "id": 45,
      "label": "Application Development Software"
  },
  {
      "id": 46,
      "label": "Application Lifecycle Management Software"
  },
  {
      "id": 47,
      "label": "Application Performance Management Software"
  },
  {
      "id": 48,
      "label": "Applied Behavior Analysis (ABA)"
  },
  {
      "id": 49,
      "label": "Appointment Reminder Software"
  },
  {
      "id": 50,
      "label": "Appointment Scheduling Software"
  },
  {
      "id": 51,
      "label": "Arborist Software"
  },
  {
      "id": 52,
      "label": "Architectural CAD Software"
  },
  {
      "id": 53,
      "label": "Architecture Software"
  },
  {
      "id": 54,
      "label": "Archiving Software"
  },
  {
      "id": 55,
      "label": "Art Gallery Software"
  },
  {
      "id": 56,
      "label": "Artificial Intelligence Software"
  },
  {
      "id": 57,
      "label": "Assessment Software"
  },
  {
      "id": 58,
      "label": "Asset Tracking Software"
  },
  {
      "id": 59,
      "label": "Assisted Living Software"
  },
  {
      "id": 60,
      "label": "Association Management Software"
  },
  {
      "id": 61,
      "label": "Attendance Tracking Software"
  },
  {
      "id": 62,
      "label": "Auction Software"
  },
  {
      "id": 63,
      "label": "Audience Response Software"
  },
  {
      "id": 64,
      "label": "Audio Conferencing Software"
  },
  {
      "id": 65,
      "label": "Audio Editing Software"
  },
  {
      "id": 66,
      "label": "Audit Software"
  },
  {
      "id": 67,
      "label": "Augmented Reality Software"
  },
  {
      "id": 68,
      "label": "Authentication Software"
  },
  {
      "id": 69,
      "label": "Auto Body Software"
  },
  {
      "id": 71,
      "label": "Auto Dealer Accounting Software"
  },
  {
      "id": 70,
      "label": "Auto Dealer Software"
  },
  {
      "id": 72,
      "label": "Auto Dialer Software"
  },
  {
      "id": 73,
      "label": "Auto Repair Software"
  },
  {
      "id": 74,
      "label": "Automated Testing Software"
  },
  {
      "id": 75,
      "label": "Aviation Maintenance Software"
  },
  {
      "id": 76,
      "label": "B2B eCommerce Platform"
  },
  {
      "id": 77,
      "label": "Background Check Software"
  },
  {
      "id": 78,
      "label": "Backup Software"
  },
  {
      "id": 79,
      "label": "Bakery Software"
  },
  {
      "id": 80,
      "label": "Banking Software"
  },
  {
      "id": 81,
      "label": "Bankruptcy Software"
  },
  {
      "id": 82,
      "label": "Bar POS Software"
  },
  {
      "id": 83,
      "label": "Barbershop Software"
  },
  {
      "id": 84,
      "label": "Barcoding Software"
  },
  {
      "id": 85,
      "label": "Benefits Administration Software"
  },
  {
      "id": 86,
      "label": "Big Data Software"
  },
  {
      "id": 87,
      "label": "Billing and Invoicing Software"
  },
  {
      "id": 88,
      "label": "Billing and Provisioning Software"
  },
  {
      "id": 89,
      "label": "BIM Software"
  },
  {
      "id": 90,
      "label": "Blog Software"
  },
  {
      "id": 91,
      "label": "Board Management Software"
  },
  {
      "id": 92,
      "label": "Bookkeeper Software"
  },
  {
      "id": 93,
      "label": "Bot Detection and Mitigation Software"
  },
  {
      "id": 94,
      "label": "Brand Management Software"
  },
  {
      "id": 95,
      "label": "Brand Protection Software"
  },
  {
      "id": 96,
      "label": "Brewery Software"
  },
  {
      "id": 97,
      "label": "Browser Software"
  },
  {
      "id": 98,
      "label": "Budgeting Software"
  },
  {
      "id": 99,
      "label": "Bug Tracking Software"
  },
  {
      "id": 100,
      "label": "Building Maintenance Software"
  },
  {
      "id": 101,
      "label": "Business Card Software"
  },
  {
      "id": 102,
      "label": "Business Continuity Software"
  },
  {
      "id": 103,
      "label": "Business Intelligence Software"
  },
  {
      "id": 104,
      "label": "Business Management Software"
  },
  {
      "id": 105,
      "label": "Business Performance Management Software"
  },
  {
      "id": 106,
      "label": "Business Phone Systems"
  },
  {
      "id": 107,
      "label": "Business Plan Software"
  },
  {
      "id": 108,
      "label": "Business Process Management Software"
  },
  {
      "id": 109,
      "label": "Buyer Intent Software"
  },
  {
      "id": 110,
      "label": "Calendar Software"
  },
  {
      "id": 111,
      "label": "Calibration Management Software"
  },
  {
      "id": 112,
      "label": "Call Accounting Software"
  },
  {
      "id": 113,
      "label": "Call Center Software"
  },
  {
      "id": 114,
      "label": "Call Recording Software"
  },
  {
      "id": 115,
      "label": "Call Tracking Software"
  },
  {
      "id": 116,
      "label": "Camp Management Software"
  },
  {
      "id": 117,
      "label": "Campaign Management Software"
  },
  {
      "id": 118,
      "label": "Campground Management Software"
  },
  {
      "id": 119,
      "label": "Car Rental Software"
  },
  {
      "id": 120,
      "label": "Carpet Cleaning Software"
  },
  {
      "id": 121,
      "label": "Catalog Management Software"
  },
  {
      "id": 122,
      "label": "Catering Software"
  },
  {
      "id": 123,
      "label": "Cemetery Software"
  },
  {
      "id": 124,
      "label": "Change Management Software"
  },
  {
      "id": 125,
      "label": "Channel Management Software"
  },
  {
      "id": 126,
      "label": "Chemical Software"
  },
  {
      "id": 127,
      "label": "Chiropractic Software"
  },
  {
      "id": 128,
      "label": "Church Accounting Software"
  },
  {
      "id": 129,
      "label": "Church Management Software"
  },
  {
      "id": 130,
      "label": "Church Presentation Software"
  },
  {
      "id": 131,
      "label": "Claims Processing Software"
  },
  {
      "id": 132,
      "label": "Class Registration Software"
  },
  {
      "id": 133,
      "label": "Classroom Management Software"
  },
  {
      "id": 134,
      "label": "Click Fraud Software"
  },
  {
      "id": 135,
      "label": "Clinical Trial Management Software"
  },
  {
      "id": 136,
      "label": "Closed Captioning Software"
  },
  {
      "id": 137,
      "label": "Cloud Communication Platform"
  },
  {
      "id": 138,
      "label": "Cloud Management Software"
  },
  {
      "id": 139,
      "label": "Cloud PBX Software"
  },
  {
      "id": 140,
      "label": "Cloud Security Software"
  },
  {
      "id": 141,
      "label": "Cloud Storage Software"
  },
  {
      "id": 142,
      "label": "Club Management Software"
  },
  {
      "id": 143,
      "label": "CMDB Software"
  },
  {
      "id": 144,
      "label": "CMMS Software"
  },
  {
      "id": 145,
      "label": "Coaching Software"
  },
  {
      "id": 146,
      "label": "Code Enforcement Software"
  },
  {
      "id": 147,
      "label": "Collaboration Software"
  },
  {
      "id": 148,
      "label": "Commercial Insurance Software"
  },
  {
      "id": 149,
      "label": "Commercial Loan Software"
  },
  {
      "id": 150,
      "label": "Commercial Real Estate Software"
  },
  {
      "id": 151,
      "label": "Commission Software"
  },
  {
      "id": 152,
      "label": "Community Software"
  },
  {
      "id": 153,
      "label": "Company Secretarial Software"
  },
  {
      "id": 154,
      "label": "Compensation Management Software"
  },
  {
      "id": 155,
      "label": "Competitive Intelligence Software"
  },
  {
      "id": 156,
      "label": "Complaint Management Software"
  },
  {
      "id": 157,
      "label": "Compliance Software"
  },
  {
      "id": 158,
      "label": "Computer Repair Shop Software"
  },
  {
      "id": 159,
      "label": "Computer Security Software"
  },
  {
      "id": 160,
      "label": "Conference Software"
  },
  {
      "id": 161,
      "label": "Configuration Management Tools"
  },
  {
      "id": 162,
      "label": "Conflict Checking Software"
  },
  {
      "id": 163,
      "label": "Consignment Software"
  },
  {
      "id": 164,
      "label": "Construction Accounting Software"
  },
  {
      "id": 165,
      "label": "Construction Bid Management Software"
  },
  {
      "id": 166,
      "label": "Construction CRM Software"
  },
  {
      "id": 167,
      "label": "Construction Estimating Software"
  },
  {
      "id": 168,
      "label": "Construction Management Software"
  },
  {
      "id": 169,
      "label": "Construction Scheduling Software"
  },
  {
      "id": 170,
      "label": "Contact Center Software"
  },
  {
      "id": 171,
      "label": "Contact Management Software"
  },
  {
      "id": 172,
      "label": "Container Security Software"
  },
  {
      "id": 173,
      "label": "Content Collaboration Software"
  },
  {
      "id": 174,
      "label": "Content Delivery Network Software"
  },
  {
      "id": 175,
      "label": "Content Management Software (CMS)"
  },
  {
      "id": 176,
      "label": "Content Marketing Software"
  },
  {
      "id": 177,
      "label": "Contest Software"
  },
  {
      "id": 178,
      "label": "Continuous Integration Software"
  },
  {
      "id": 179,
      "label": "Contract Management Software"
  },
  {
      "id": 180,
      "label": "Contractor Management Software"
  },
  {
      "id": 181,
      "label": "Convenience Store Software"
  },
  {
      "id": 182,
      "label": "Conversational AI Platform"
  },
  {
      "id": 183,
      "label": "Conversational Marketing Platform"
  },
  {
      "id": 184,
      "label": "Corporate Tax Software"
  },
  {
      "id": 185,
      "label": "Corporate Wellness Software"
  },
  {
      "id": 186,
      "label": "Corrective and Preventive Action (CAPA) software"
  },
  {
      "id": 187,
      "label": "Courier Software"
  },
  {
      "id": 188,
      "label": "Course Authoring Software"
  },
  {
      "id": 189,
      "label": "Court Management Software"
  },
  {
      "id": 190,
      "label": "CPQ Software"
  },
  {
      "id": 191,
      "label": "Creative Management Software"
  },
  {
      "id": 192,
      "label": "Credentialing Software"
  },
  {
      "id": 193,
      "label": "CRM Software"
  },
  {
      "id": 194,
      "label": "Cryptocurrency Wallets"
  },
  {
      "id": 195,
      "label": "CTRM Software"
  },
  {
      "id": 196,
      "label": "Currency Exchange Software"
  },
  {
      "id": 197,
      "label": "Customer Advocacy Software"
  },
  {
      "id": 198,
      "label": "Customer Communications Management Software"
  },
  {
      "id": 199,
      "label": "Customer Data Platforms"
  },
  {
      "id": 200,
      "label": "Customer Engagement Software"
  },
  {
      "id": 201,
      "label": "Customer Experience Software"
  },
  {
      "id": 202,
      "label": "Customer Identity and Access Management (CIAM) Software"
  },
  {
      "id": 203,
      "label": "Customer Journey Mapping Tools"
  },
  {
      "id": 204,
      "label": "Customer Loyalty Software"
  },
  {
      "id": 205,
      "label": "Customer Reference Management Software"
  },
  {
      "id": 206,
      "label": "Customer Satisfaction Software"
  },
  {
      "id": 207,
      "label": "Customer Service Software"
  },
  {
      "id": 208,
      "label": "Customer Success Software"
  },
  {
      "id": 209,
      "label": "Customer Support Software"
  },
  {
      "id": 210,
      "label": "Cybersecurity Software"
  },
  {
      "id": 211,
      "label": "Dance Studio Software"
  },
  {
      "id": 212,
      "label": "Dashboard Software"
  },
  {
      "id": 213,
      "label": "Data Analysis Software"
  },
  {
      "id": 214,
      "label": "Data Center Management Software"
  },
  {
      "id": 215,
      "label": "Data Discovery Software"
  },
  {
      "id": 216,
      "label": "Data Entry Software"
  },
  {
      "id": 217,
      "label": "Data Extraction Software"
  },
  {
      "id": 218,
      "label": "Data Governance Software"
  },
  {
      "id": 219,
      "label": "Data Loss Prevention Software"
  },
  {
      "id": 221,
      "label": "Data Management Platforms (DMP)"
  },
  {
      "id": 220,
      "label": "Data Management Software"
  },
  {
      "id": 222,
      "label": "Data Mining Software"
  },
  {
      "id": 223,
      "label": "Data Preparation Software"
  },
  {
      "id": 224,
      "label": "Data Quality Software"
  },
  {
      "id": 225,
      "label": "Data Visualization Software"
  },
  {
      "id": 226,
      "label": "Data Warehouse Software"
  },
  {
      "id": 228,
      "label": "Database Monitoring Software"
  },
  {
      "id": 227,
      "label": "Database Software"
  },
  {
      "id": 229,
      "label": "Daycare Software"
  },
  {
      "id": 230,
      "label": "DDoS Protection Software"
  },
  {
      "id": 231,
      "label": "Debt Collection Software"
  },
  {
      "id": 232,
      "label": "Decision Support Software"
  },
  {
      "id": 233,
      "label": "Deep Learning Software"
  },
  {
      "id": 234,
      "label": "Delivery Management Software"
  },
  {
      "id": 235,
      "label": "Demand Planning Software"
  },
  {
      "id": 236,
      "label": "Demand Side Platform (DSP) Software"
  },
  {
      "id": 238,
      "label": "Dental Charting Software"
  },
  {
      "id": 239,
      "label": "Dental Imaging Software"
  },
  {
      "id": 237,
      "label": "Dental Practice Software"
  },
  {
      "id": 240,
      "label": "Dermatology Software"
  },
  {
      "id": 241,
      "label": "Desktop as a Service (DaaS) Software"
  },
  {
      "id": 242,
      "label": "DevOps Software"
  },
  {
      "id": 243,
      "label": "Diagram Software"
  },
  {
      "id": 244,
      "label": "Digital Adoption Platform"
  },
  {
      "id": 245,
      "label": "Digital Asset Management Software"
  },
  {
      "id": 246,
      "label": "Digital Experience Platforms (DXP) Software"
  },
  {
      "id": 247,
      "label": "Digital Forensics Software"
  },
  {
      "id": 248,
      "label": "Digital Rights Management Software"
  },
  {
      "id": 249,
      "label": "Digital Signage Software"
  },
  {
      "id": 250,
      "label": "Digital Signature Software"
  },
  {
      "id": 251,
      "label": "Digital Workplace Software"
  },
  {
      "id": 252,
      "label": "Direct Mail Automation Software"
  },
  {
      "id": 253,
      "label": "Directory Software"
  },
  {
      "id": 254,
      "label": "Disk Imaging Software"
  },
  {
      "id": 255,
      "label": "Display Advertising Software"
  },
  {
      "id": 256,
      "label": "Distribution Software"
  },
  {
      "id": 257,
      "label": "Dock Scheduling Software"
  },
  {
      "id": 258,
      "label": "Docketing Software"
  },
  {
      "id": 259,
      "label": "Document Control Software"
  },
  {
      "id": 260,
      "label": "Document Generation Software"
  },
  {
      "id": 261,
      "label": "Document Management Software"
  },
  {
      "id": 262,
      "label": "Document Version Control Software"
  },
  {
      "id": 263,
      "label": "Donation Management Software"
  },
  {
      "id": 264,
      "label": "Driving School Software"
  },
  {
      "id": 265,
      "label": "Dropshipping Software"
  },
  {
      "id": 266,
      "label": "Dry Cleaning Software"
  },
  {
      "id": 267,
      "label": "e-Prescribing Software"
  },
  {
      "id": 268,
      "label": "EAM Software"
  },
  {
      "id": 269,
      "label": "eCommerce Software"
  },
  {
      "id": 270,
      "label": "EDI Software"
  },
  {
      "id": 277,
      "label": "eDiscovery Software"
  },
  {
      "id": 271,
      "label": "EHS Management Software"
  },
  {
      "id": 272,
      "label": "eLearning Authoring Tools"
  },
  {
      "id": 273,
      "label": "Electrical Contractor Software"
  },
  {
      "id": 274,
      "label": "Electrical Design Software"
  },
  {
      "id": 275,
      "label": "Electrical Estimating Software"
  },
  {
      "id": 276,
      "label": "Electronic Data Capture Software"
  },
  {
      "id": 278,
      "label": "Electronic Lab Notebook Software"
  },
  {
      "id": 279,
      "label": "Electronic Medical Records (EMR) Software"
  },
  {
      "id": 280,
      "label": "Email Archiving Software"
  },
  {
      "id": 281,
      "label": "Email Management Software"
  },
  {
      "id": 282,
      "label": "Email Marketing Software"
  },
  {
      "id": 283,
      "label": "Email Security Software"
  },
  {
      "id": 284,
      "label": "Email Signature Software"
  },
  {
      "id": 285,
      "label": "Email Tracking Software"
  },
  {
      "id": 286,
      "label": "Email Verification Tools"
  },
  {
      "id": 287,
      "label": "Embedded Analytics Software"
  },
  {
      "id": 288,
      "label": "Emergency Notification Software"
  },
  {
      "id": 289,
      "label": "Emissions Management Software"
  },
  {
      "id": 290,
      "label": "Employee Advocacy Software"
  },
  {
      "id": 291,
      "label": "Employee Communication Tools"
  },
  {
      "id": 292,
      "label": "Employee Engagement Software"
  },
  {
      "id": 293,
      "label": "Employee Monitoring Software"
  },
  {
      "id": 294,
      "label": "Employee Recognition Software"
  },
  {
      "id": 295,
      "label": "Employee Scheduling Software"
  },
  {
      "id": 296,
      "label": "EMS Software"
  },
  {
      "id": 297,
      "label": "Encryption Software"
  },
  {
      "id": 298,
      "label": "Endpoint Detection And Response (EDR) software"
  },
  {
      "id": 299,
      "label": "Endpoint Protection Software"
  },
  {
      "id": 300,
      "label": "Energy Management Software"
  },
  {
      "id": 301,
      "label": "Engineering CAD Software"
  },
  {
      "id": 302,
      "label": "Enterprise Architecture Software"
  },
  {
      "id": 303,
      "label": "Enterprise Content Management Software"
  },
  {
      "id": 304,
      "label": "Enterprise Legal Management Software"
  },
  {
      "id": 306,
      "label": "Enterprise Search Software"
  },
  {
      "id": 307,
      "label": "Enterprise Service Bus (ESB) Software"
  },
  {
      "id": 308,
      "label": "Entity Management Software"
  },
  {
      "id": 309,
      "label": "Environmental Software"
  },
  {
      "id": 310,
      "label": "Equipment Maintenance Software"
  },
  {
      "id": 311,
      "label": "Equipment Rental Software"
  },
  {
      "id": 312,
      "label": "Equity Management Software"
  },
  {
      "id": 305,
      "label": "ERP Software"
  },
  {
      "id": 313,
      "label": "ETL Software"
  },
  {
      "id": 314,
      "label": "Event Booking Software"
  },
  {
      "id": 315,
      "label": "Event Check In Software"
  },
  {
      "id": 316,
      "label": "Event Management Software"
  },
  {
      "id": 317,
      "label": "Event Marketing Software"
  },
  {
      "id": 318,
      "label": "Exam Software"
  },
  {
      "id": 319,
      "label": "Expense Report Software"
  },
  {
      "id": 320,
      "label": "Facility Management Software"
  },
  {
      "id": 321,
      "label": "Farm Management Software"
  },
  {
      "id": 322,
      "label": "Fashion Design Software"
  },
  {
      "id": 323,
      "label": "Fax Server Software"
  },
  {
      "id": 324,
      "label": "Festival Management Software"
  },
  {
      "id": 325,
      "label": "Field Service Management Software"
  },
  {
      "id": 326,
      "label": "File Sharing Software"
  },
  {
      "id": 327,
      "label": "File Sync Software"
  },
  {
      "id": 328,
      "label": "Financial CRM Software"
  },
  {
      "id": 329,
      "label": "Financial Fraud Detection Software"
  },
  {
      "id": 330,
      "label": "Financial Management Software"
  },
  {
      "id": 331,
      "label": "Financial Reporting Software"
  },
  {
      "id": 332,
      "label": "Financial Risk Management Software"
  },
  {
      "id": 333,
      "label": "Financial Services Software"
  },
  {
      "id": 334,
      "label": "Fire Department Software"
  },
  {
      "id": 335,
      "label": "Firewall Software"
  },
  {
      "id": 336,
      "label": "Fitness Software"
  },
  {
      "id": 337,
      "label": "Fixed Asset Management Software"
  },
  {
      "id": 338,
      "label": "Fleet Maintenance Software"
  },
  {
      "id": 339,
      "label": "Fleet Management Software"
  },
  {
      "id": 340,
      "label": "Florist Software"
  },
  {
      "id": 341,
      "label": "Flowchart Software"
  },
  {
      "id": 342,
      "label": "Food Costing Software"
  },
  {
      "id": 343,
      "label": "Food Delivery Software"
  },
  {
      "id": 344,
      "label": "Food Service Distribution Software"
  },
  {
      "id": 345,
      "label": "Food Service Management Software"
  },
  {
      "id": 346,
      "label": "Food Traceability Software"
  },
  {
      "id": 347,
      "label": "Forestry Software"
  },
  {
      "id": 348,
      "label": "Form Builder Software"
  },
  {
      "id": 349,
      "label": "Forms Automation Software"
  },
  {
      "id": 4,
      "label": "Frameworks"
  },
  {
      "id": 350,
      "label": "Franchise Management Software"
  },
  {
      "id": 351,
      "label": "Freight Software"
  },
  {
      "id": 352,
      "label": "Fuel Management Software"
  },
  {
      "id": 353,
      "label": "Fund Accounting Software"
  },
  {
      "id": 354,
      "label": "Fundraising Software"
  },
  {
      "id": 355,
      "label": "Funeral Home Software"
  },
  {
      "id": 356,
      "label": "Game Development Software"
  },
  {
      "id": 357,
      "label": "Gamification Software"
  },
  {
      "id": 358,
      "label": "Gantt Chart Software"
  },
  {
      "id": 359,
      "label": "Garage Door Software"
  },
  {
      "id": 360,
      "label": "Garden Center Software"
  },
  {
      "id": 361,
      "label": "GDPR Compliance Software"
  },
  {
      "id": 362,
      "label": "GIS Software"
  },
  {
      "id": 363,
      "label": "Golf Course Software"
  },
  {
      "id": 364,
      "label": "Governance, Risk & Compliance (GRC) Software"
  },
  {
      "id": 365,
      "label": "Government Software"
  },
  {
      "id": 366,
      "label": "GPS Tracking Software"
  },
  {
      "id": 367,
      "label": "Gradebook Software"
  },
  {
      "id": 368,
      "label": "Grant Management Software"
  },
  {
      "id": 369,
      "label": "Graphic Design Software"
  },
  {
      "id": 370,
      "label": "Gym Management Software"
  },
  {
      "id": 371,
      "label": "Gymnastics Software"
  },
  {
      "id": 372,
      "label": "Handyman Software"
  },
  {
      "id": 373,
      "label": "Headless CMS Software"
  },
  {
      "id": 374,
      "label": "Headless eCommerce Software"
  },
  {
      "id": 375,
      "label": "Healthcare CRM Software"
  },
  {
      "id": 376,
      "label": "Heatmap Software"
  },
  {
      "id": 377,
      "label": "Hedge Fund Software"
  },
  {
      "id": 378,
      "label": "Help Desk Software"
  },
  {
      "id": 379,
      "label": "Higher Education Software"
  },
  {
      "id": 380,
      "label": "HIPAA Compliance Software"
  },
  {
      "id": 381,
      "label": "HOA Software"
  },
  {
      "id": 382,
      "label": "Home Builder Software"
  },
  {
      "id": 383,
      "label": "Home Care Software"
  },
  {
      "id": 384,
      "label": "Home Health Care Software"
  },
  {
      "id": 385,
      "label": "Home Inspection Software"
  },
  {
      "id": 386,
      "label": "Horse Software"
  },
  {
      "id": 387,
      "label": "Hospice Software"
  },
  {
      "id": 388,
      "label": "Hospital Management Software"
  },
  {
      "id": 389,
      "label": "Hospitality Property Management Software"
  },
  {
      "id": 390,
      "label": "Hostel Management Software"
  },
  {
      "id": 391,
      "label": "Hotel Channel Management Software"
  },
  {
      "id": 392,
      "label": "HR Analytics Software"
  },
  {
      "id": 393,
      "label": "Human Resources Software"
  },
  {
      "id": 394,
      "label": "Human Services Software"
  },
  {
      "id": 396,
      "label": "HVAC Estimating Software"
  },
  {
      "id": 395,
      "label": "HVAC Software"
  },
  {
      "id": 397,
      "label": "Hybrid Events Software"
  },
  {
      "id": 398,
      "label": "Idea Management Software"
  },
  {
      "id": 399,
      "label": "Identity Management Software"
  },
  {
      "id": 400,
      "label": "Incident Management Software"
  },
  {
      "id": 401,
      "label": "Influencer Marketing Software"
  },
  {
      "id": 402,
      "label": "Infrastructure-as-a-Service Solutions"
  },
  {
      "id": 403,
      "label": "Innovation Software"
  },
  {
      "id": 404,
      "label": "Inside Sales Software"
  },
  {
      "id": 405,
      "label": "Insight Engines Software"
  },
  {
      "id": 406,
      "label": "Inspection Software"
  },
  {
      "id": 408,
      "label": "Insurance Policy Software"
  },
  {
      "id": 409,
      "label": "Insurance Rating Software"
  },
  {
      "id": 407,
      "label": "Insurance Software"
  },
  {
      "id": 410,
      "label": "Integrated Development Environment (IDE) Software"
  },
  {
      "id": 411,
      "label": "Integrated Risk Management (IRM) Software"
  },
  {
      "id": 412,
      "label": "Integration Software"
  },
  {
      "id": 413,
      "label": "Intellectual Property Management Software"
  },
  {
      "id": 414,
      "label": "Internal Communications Software"
  },
  {
      "id": 415,
      "label": "Intranet Software"
  },
  {
      "id": 416,
      "label": "Inventory Control Software"
  },
  {
      "id": 417,
      "label": "Inventory Management Software"
  },
  {
      "id": 418,
      "label": "Investigation Management Software"
  },

]

export default {
  "type": "object",
  "properties": {
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
    "legal_name": {
      "type": "string"
    },
    "title": {
      "type": "string"
    },
    "slug": {
      "label": "Prokur Public URL",
      "type": "string"
    },
    "publicURL": {
      "type": "string",
      "readOnly": true
    },
    "industryCategory": {
      "type": "string",
      "oneOf": categories.map((item: any) => ({
        "const": `${item.id}`,
        "title": item.label
      }))
    },
    "businessId": {
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
  },
  "required": [
    'legal_name',
    'title',
    'slug',
    'industryCategory',
    'businessId',
    'companyTagLine',
    'companySize',
  ]
}