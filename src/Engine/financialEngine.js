import companies from "../data/companies";
import RatioEngine from "./ratioEngine";

class FinancialEngine {
  constructor() {
    this.companies = companies;
    this.lookup = new Map();

    this.buildLookup();
  }

  buildLookup() {
    this.lookup.clear();

    this.companies.forEach((company) => {
      if (company.id) {
        this.lookup.set(
          company.id.toLowerCase(),
          company
        );
      }

      if (company.name) {
        this.lookup.set(
          company.name.toLowerCase(),
          company
        );
      }

      if (company.ticker) {
        this.lookup.set(
          company.ticker.toLowerCase(),
          company
        );
      }
    });
  }

  enrichCompany(company) {
    if (!company) {
      return null;
    }

    return {
      ...company,
      calculatedRatios:
        RatioEngine.calculateAll(company),
    };
  }

  getCompanies() {
    return this.companies.map((company) =>
      this.enrichCompany(company)
    );
  }

  getCompany(identifier) {
    if (!identifier) {
      return null;
    }

    const company = this.lookup.get(
      String(identifier).toLowerCase()
    );

    return this.enrichCompany(company);
  }

  search(query) {
    if (!query) {
      return [];
    }

    const normalizedQuery = String(query).toLowerCase();

    return this.companies
      .filter((company) => {
        return (
          company.name
            ?.toLowerCase()
            .includes(normalizedQuery) ||
          company.ticker
            ?.toLowerCase()
            .includes(normalizedQuery) ||
          company.overview?.industry
            ?.toLowerCase()
            .includes(normalizedQuery)
        );
      })
      .map((company) => this.enrichCompany(company));
  }

  getIndustry(industry) {
    if (!industry) {
      return [];
    }

    const normalizedIndustry =
      String(industry).toLowerCase();

    return this.companies
      .filter(
        (company) =>
          company.overview?.industry?.toLowerCase() ===
          normalizedIndustry
      )
      .map((company) => this.enrichCompany(company));
  }

  addCompany(company) {
    if (!company?.name || !company?.ticker) {
      throw new Error(
        "A company must include a name and ticker."
      );
    }

    this.companies.push(company);
    this.buildLookup();

    return this.enrichCompany(company);
  }
}

export default new FinancialEngine();