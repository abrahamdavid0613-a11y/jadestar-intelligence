const companies = [
  {
    id: "costco",
    name: "Costco Wholesale Corporation",
    ticker: "COST",

    overview: {
      industry: "Retail",
      headquarters: "Issaquah, Washington",
      financialScore: "87/100",
    },

    statements: {
      balanceSheet: {
        cash: 14161,
        shortTermInvestments: 1123,
        receivables: 3203,
        inventory: 18116,
        otherCurrentAssets: 1777,
        currentAssets: 38380,
        currentLiabilities: 37838,
        longTermDebt: 6483,
        totalAssets: 77099,
        totalLiabilities: 49161,
        totalEquity: 27938,
      },

      incomeStatement: {
        netSales: 269912,
        membershipFees: 5323,
        revenue: 275235,
        merchandiseCosts: 239886,
        grossProfit: 35349,
        sellingGeneralAdministrative: 24966,
        operatingIncome: 10383,
        interestExpense: 154,
        interestIncomeAndOther: 589,
        incomeBeforeTaxes: 10818,
        incomeTaxes: 2719,
        netIncome: 8099,
      },
    },

    financials: {
      revenue: "$275.2B",
      netIncome: "$8.1B",
      operatingIncome: "$10.4B",
      profitMargin: "2.94%",
    },

    liquidity: {
      currentRatio: "1.01",
      quickRatio: "0.48",
    },

    profitability: {
      grossMargin: "12.8%",
      returnOnAssets: "10.5%",
      returnOnEquity: "29.0%",
    },

    solvency: {
      debtToAssets: "63.8%",
      interestCoverage: "70.2x",
    },

    risks: [
      "High dependence on membership revenue",
      "Retail competition pressure",
      "Limited inventory flexibility",
    ],

    strengths: [
      "Strong membership model",
      "Consistent revenue growth",
      "High customer loyalty",
    ],
  },
];

export default companies;