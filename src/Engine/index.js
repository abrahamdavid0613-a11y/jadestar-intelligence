import FinancialEngine from "./financialEngine";
import RatioEngine from "./ratioEngine";

const Engine = {
  getCompanies() {
    return FinancialEngine.getCompanies();
  },

  getCompany(identifier) {
    return FinancialEngine.getCompany(identifier);
  },

  search(query) {
    return FinancialEngine.search(query);
  },

  getIndustry(industry) {
    return FinancialEngine.getIndustry(industry);
  },

  addCompany(company) {
    return FinancialEngine.addCompany(company);
  },

  calculateRatios(company) {
    return RatioEngine.calculateAll(company);
  },

  financial: FinancialEngine,
  ratios: RatioEngine,
};

export default Engine;