class RatioEngine {
  divide(numerator, denominator) {
    const top = Number(numerator);
    const bottom = Number(denominator);

    if (
      !Number.isFinite(top) ||
      !Number.isFinite(bottom) ||
      bottom === 0
    ) {
      return null;
    }

    return top / bottom;
  }

  round(value, decimals = 2) {
    if (!Number.isFinite(value)) {
      return null;
    }

    const multiplier = 10 ** decimals;

    return Math.round((value + Number.EPSILON) * multiplier) / multiplier;
  }

  calculateCurrentRatio(balanceSheet = {}) {
    const result = this.divide(
      balanceSheet.currentAssets,
      balanceSheet.currentLiabilities
    );

    return this.round(result);
  }

  calculateQuickRatio(balanceSheet = {}) {
    const quickAssets =
      Number(balanceSheet.cash || 0) +
      Number(balanceSheet.shortTermInvestments || 0) +
      Number(balanceSheet.receivables || 0);

    const result = this.divide(
      quickAssets,
      balanceSheet.currentLiabilities
    );

    return this.round(result);
  }

  calculateGrossMargin(incomeStatement = {}) {
    const result = this.divide(
      incomeStatement.grossProfit,
      incomeStatement.revenue
    );

    return this.round(result * 100);
  }

  calculateOperatingMargin(incomeStatement = {}) {
    const result = this.divide(
      incomeStatement.operatingIncome,
      incomeStatement.revenue
    );

    return this.round(result * 100);
  }

  calculateProfitMargin(incomeStatement = {}) {
    const result = this.divide(
      incomeStatement.netIncome,
      incomeStatement.revenue
    );

    return this.round(result * 100);
  }

  calculateReturnOnAssets(
    balanceSheet = {},
    incomeStatement = {}
  ) {
    const result = this.divide(
      incomeStatement.netIncome,
      balanceSheet.totalAssets
    );

    return this.round(result * 100);
  }

  calculateReturnOnEquity(
    balanceSheet = {},
    incomeStatement = {}
  ) {
    const result = this.divide(
      incomeStatement.netIncome,
      balanceSheet.totalEquity
    );

    return this.round(result * 100);
  }

  calculateDebtToAssets(balanceSheet = {}) {
    const result = this.divide(
      balanceSheet.totalLiabilities,
      balanceSheet.totalAssets
    );

    return this.round(result * 100);
  }

  calculateDebtToEquity(balanceSheet = {}) {
    const result = this.divide(
      balanceSheet.totalLiabilities,
      balanceSheet.totalEquity
    );

    return this.round(result);
  }

  calculateInterestCoverage(incomeStatement = {}) {
    const earningsBeforeInterestAndTaxes =
      Number(incomeStatement.incomeBeforeTaxes || 0) +
      Number(incomeStatement.interestExpense || 0);

    const result = this.divide(
      earningsBeforeInterestAndTaxes,
      incomeStatement.interestExpense
    );

    return this.round(result);
  }

  calculateAssetTurnover(
    balanceSheet = {},
    incomeStatement = {}
  ) {
    const result = this.divide(
      incomeStatement.revenue,
      balanceSheet.totalAssets
    );

    return this.round(result);
  }

  calculateEquityMultiplier(balanceSheet = {}) {
    const result = this.divide(
      balanceSheet.totalAssets,
      balanceSheet.totalEquity
    );

    return this.round(result);
  }

  calculateAll(company = {}) {
    const balanceSheet =
      company.statements?.balanceSheet || {};

    const incomeStatement =
      company.statements?.incomeStatement || {};

    return {
      liquidity: {
        currentRatio:
          this.calculateCurrentRatio(balanceSheet),

        quickRatio:
          this.calculateQuickRatio(balanceSheet),
      },

      profitability: {
        grossMargin:
          this.calculateGrossMargin(incomeStatement),

        operatingMargin:
          this.calculateOperatingMargin(incomeStatement),

        profitMargin:
          this.calculateProfitMargin(incomeStatement),

        returnOnAssets:
          this.calculateReturnOnAssets(
            balanceSheet,
            incomeStatement
          ),

        returnOnEquity:
          this.calculateReturnOnEquity(
            balanceSheet,
            incomeStatement
          ),
      },

      solvency: {
        debtToAssets:
          this.calculateDebtToAssets(balanceSheet),

        debtToEquity:
          this.calculateDebtToEquity(balanceSheet),

        interestCoverage:
          this.calculateInterestCoverage(incomeStatement),
      },

      efficiency: {
        assetTurnover:
          this.calculateAssetTurnover(
            balanceSheet,
            incomeStatement
          ),

        equityMultiplier:
          this.calculateEquityMultiplier(balanceSheet),
      },
    };
  }
}

export default new RatioEngine();