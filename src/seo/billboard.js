const Tital = [
  {
    id: 1,
    buttonName: 'Review Chart of Accounts'
  }
]

const AccountingContent = [
  {
    id: 1,
    head: `Chart Of Accounts`,
    body: `ERPNext sets up a simple chart of accounts for each Company you create, but you can modify it according to business and legal requirements.`
  },

  ////////////// 4 ////////////////
  {
    id: 2,
    head: `Setting up Taxes`,
    body: `ERPNext lets you configure your taxes so that they are automatically applied in your buying and selling transactions. You can configure them globally or even on Items. ERPNext taxes are pre-configured for most regions.`
  },

  ////////////// 5 ////////////////
  {
    id: 3,
    head: `Account Settings `,
    body: `In ERPNext, Accounting features are configurable as per your business needs. Accounts Settings is the place to define some of your accounting preferences like:  `,
    footer: `- Credit Limit and over billing settings
               - Taxation preferences
               - Deferred accounting preferences`
  },

  ////////////// 6 ////////////////
  {
    id: 4,
    head: `Cost Centers for Budgeting and Analysis`,
    body: `While your Books of Accounts are framed to fulfill statutory requirements, you can set up Cost Center and Accounting Dimensions to address your companies reporting and budgeting requirements.  `,
    footer: `Click here to learn more about how Cost Center and Dimensions allow you to get advanced financial analytics reports from ERPNext.`
  },

  ////////////// 7 ////////////////
  {
    id: 5,
    head: `Create your first Purchase Invoice `,
    body: `A Purchase Invoice is a bill received from a Supplier for a product(s) or service(s) delivery to your company. You can track payables through Purchase Invoice and process Payment Entries against it.`,
    footer: `Purchase Invoices can also be created against a Purchase Order or Purchase Receipt.`
  },

  ////////////// 8 ////////////////
  {
    id: 6,
    head: `Updating Opening Balances `,
    body: `Once you close the financial statement in previous accounting software, you can update the same as opening in your ERPNext's Balance Sheet accounts. This will allow you to get complete financial statements from ERPNext in the coming years, and discontinue the parallel accounting system right away. `
  },

  ////////////// 9 ////////////////
  {
    id: 7,
    head: `Financial Statements `,
    body: `In ERPNext, you can get crucial financial reports like [Balance Sheet] and [Profit and Loss] statements with a click of a button. You can run in the report for a different period and plot analytics charts premised on statement data. For more reports, check sections like Financial Statements, General Ledger, and Profitability reports. `
  }
]

const AccountingYourShortcut = [
  {
    name: 'Chart of Accounts',
    bgcolorbutton: 'secondary.D',
    route: '/app/accounting/account'
  },
  {
    name: 'Sales Invice',
    bgcolorbutton: 'secondary.C',
    route: '/app/accounting/sales-invoice'
  },
  {
    name: 'Purchase Invoice',
    bgcolorbutton: 'secondary.D',
    route: '/app/accounting/purchase-invoice'
  },
  {
    name: 'Journal Entry',
    bgcolorbutton: 'secondary.C',
    route: '/app/accounting/journal-entry'
  },
  {
    name: 'Payment Entry',
    bgcolorbutton: 'secondary.D',
    route: '/app/accounting/payment-entry'
  },
  {
    name: 'Accounts Receivable',
    bgcolorbutton: 'secondary.C',
    route: '/app/accounting/accounts-receivable'
  },
  {
    name: 'General Ledger',
    bgcolorbutton: 'secondary.D',
    route: '/app/accounting/general-ledger'
  },
  {
    name: 'Trial Balance',
    bgcolorbutton: 'secondary.C',
    route: '/app/accounting/trial-balance'
  },
  {
    name: 'Dashboard',
    bgcolorbutton: 'secondary.D',
    route: '/app/accounting/dashboard'
  },
  {
    name: 'Learn Accounting',
    bgcolorbutton: 'secondary.C',
    route: 'https://frappe.school/courses/erpnext-accounting?utm_source=in_app'
  }
]

const AccountingReport = [
  {
    id: 1,
    name: 'Accounting Masters',
    submenus: [
      {
        id: 1,
        name: 'Company',
        route: '/app/accounting/company',
        imgIcon: 'icon-account'
      },
      {
        id: 2,
        name: 'Chart of Accounts',
        route: '/app/accounting/account',
        imgIcon: 'icon-account'
      }
    ]
  },
  {
    id: 2,
    name: 'Accounts Receivable',
    submenus: [
      {
        id: 1,
        name: 'Sales Invoice',
        route: '/app/selling/sales-invoice',
        imgIcon: 'icon-account'
      },
      {
        id: 2,
        name: 'Customer',
        route: '/app/selling/customer',
        imgIcon: 'icon-account'
      }
    ]
  },
  {
    id: 3,
    name: 'Accounts Payable',
    submenus: [
      {
        id: 1,
        name: 'Purchase Invoice',
        route: '/app/buying/purchase-invoice',
        imgIcon: 'icon-account'
      },
      {
        id: 2,
        name: 'Supplier',
        route: '/app/buying/supplier',
        imgIcon: 'icon-account'
      }
    ]
  }
]

export { Tital, AccountingContent, AccountingYourShortcut, AccountingReport }
