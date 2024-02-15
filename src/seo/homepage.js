const SeoHomepage = [
  {
    id: 1,
    templateName: 'homepage',
    description: 'homepage',
    keywords: 'homepage',
    content: 'homepage'
  }
]

const SeoProductpage = [
  {
    id: 1,
    templateName: '',
    description: 'Product',
    keywords: 'Product',
    content: 'Product'
  },
  {
    id: 2,
    templateName: '',
    description: 'Product',
    keywords: 'Product',
    content: 'Product'
  }
]

const HomeContent = [
  /////////////////////////////////////// HOME //////////////////////////////////////////////////////
  ////////////// 0 ////////////////
  {
    id: 1,
    head: `Create an Item`,
    body: `Item is a product, of a or service offered by your company, or something you buy as a part of your supplies or raw materials.`,
    footer: `Items are integral to everything you do in ERPNext - from billing, purchasing to managing inventory. Everything you buy or sell, whether it is a physical product or a service is an Item. Items can be stock, non-stock, variants, serialized, batched, assets etc.  `
  },

  ////////////// 1 ////////////////
  {
    id: 2,
    head: `Create a Customer`,
    body: `The Customer master is at the heart of your sales transactions. Customers are linked in Quotations, Sales Orders, Invoices, and Payments. Customers can be either numbered or identified by name (you would typically do this based on the number of customers you have).`,
    footer: `Through Customer’s master, you can effectively track essentials like:
               - Customer’s multiple address and contacts
               - Account Receivables
               - Credit Limit and Credit Period`
  },

  ////////////// 2 ////////////////
  {
    id: 3,
    head: `All about sales invoice`,
    body: `A Sales Invoice is a bill that you send to your Customers against which the Customer makes the payment. Sales Invoice is an accounting transaction. On submission of Sales Invoice, the system updates the receivable and books income against a Customer Account.`
  }
]

export { SeoHomepage, SeoProductpage, HomeContent }
