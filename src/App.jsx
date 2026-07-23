import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

import Dashboard from "./pages/Dashboard";
import Company from "./pages/Company";
import Industry from "./pages/Industry";
import Comparison from "./pages/Comparison";
import AIAnalyst from "./pages/AIAnalyst";
import Reports from "./pages/Reports";

import companies from "./data/companies";

const DEFAULT_PAGE = "dashboard";

const pageConfig = {
  dashboard: {
    title: "Command Center",
    description: "Financial intelligence overview",
  },
  company: {
    title: "Company Intelligence",
    description: "Company performance and financial health",
  },
  industry: {
    title: "Industry Intelligence",
    description: "Sector movement and company rankings",
  },
  comparison: {
    title: "Comparison Workspace",
    description: "Side-by-side financial analysis",
  },
  ai: {
    title: "JadeStar AI Analyst",
    description: "AI-powered financial research",
  },
  reports: {
    title: "Financial Reports",
    description: "Professional research production",
  },
};

const validPages = Object.keys(pageConfig);

function getPageFromHash() {
  const hashPage = window.location.hash.replace("#/", "").trim();

  if (validPages.includes(hashPage)) {
    return hashPage;
  }

  return DEFAULT_PAGE;
}

export default function App() {
  const companyList = companies?.length ? companies : [];

  const [page, setPage] = useState(() => getPageFromHash());

  const [selectedCompanyId, setSelectedCompanyId] = useState(() => {
    const firstCompany = companyList[0];

    return (
      firstCompany?.id ||
      firstCompany?.ticker ||
      firstCompany?.symbol ||
      firstCompany?.name ||
      ""
    );
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const selectedCompany = useMemo(() => {
    if (!companyList.length) {
      return null;
    }

    return (
      companyList.find((company) => {
        const identifiers = [
          company.id,
          company.ticker,
          company.symbol,
          company.name,
        ];

        return identifiers.includes(selectedCompanyId);
      }) || companyList[0]
    );
  }, [companyList, selectedCompanyId]);

  const navigate = useCallback((nextPage) => {
    if (!validPages.includes(nextPage)) {
      return;
    }

    setPage(nextPage);

    const nextHash = `#/${nextPage}`;

    if (window.location.hash !== nextHash) {
      window.history.pushState(
        { page: nextPage },
        "",
        nextHash
      );
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const selectCompany = useCallback(
    (companyOrId, destination = null) => {
      if (!companyOrId) {
        return;
      }

      const nextCompanyId =
        typeof companyOrId === "object"
          ? companyOrId.id ||
            companyOrId.ticker ||
            companyOrId.symbol ||
            companyOrId.name
          : companyOrId;

      setSelectedCompanyId(nextCompanyId);

      if (destination) {
        navigate(destination);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(
        { page: DEFAULT_PAGE },
        "",
        `#/${DEFAULT_PAGE}`
      );
    }

    const handleLocationChange = () => {
      setPage(getPageFromHash());
    };

    window.addEventListener("hashchange", handleLocationChange);
    window.addEventListener("popstate", handleLocationChange);

    return () => {
      window.removeEventListener(
        "hashchange",
        handleLocationChange
      );

      window.removeEventListener(
        "popstate",
        handleLocationChange
      );
    };
  }, []);

  useEffect(() => {
    const currentConfig =
      pageConfig[page] || pageConfig[DEFAULT_PAGE];

    document.title = `${currentConfig.title} | JadeStar Intelligence`;
  }, [page]);

  const sharedPageProps = {
    page,
    navigate,
    onNavigate: navigate,
    selectedCompany,
    selectedCompanyId,
    companies: companyList,
    onSelectCompany: selectCompany,
  };

  const content = useMemo(() => {
    switch (page) {
      case "company":
        return <Company {...sharedPageProps} />;

      case "industry":
        return <Industry {...sharedPageProps} />;

      case "comparison":
        return <Comparison {...sharedPageProps} />;

      case "ai":
        return <AIAnalyst {...sharedPageProps} />;

      case "reports":
        return <Reports {...sharedPageProps} />;

      case "dashboard":
      default:
        return <Dashboard {...sharedPageProps} />;
    }
  }, [
    page,
    navigate,
    selectedCompany,
    selectedCompanyId,
    companyList,
    selectCompany,
  ]);

  const currentPage =
    pageConfig[page] || pageConfig[DEFAULT_PAGE];

  return (
    <div
      className={
        sidebarCollapsed
          ? "app-layout sidebar-is-collapsed"
          : "app-layout"
      }
    >
      <Sidebar
        page={page}
        setPage={navigate}
        navigate={navigate}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        selectedCompany={selectedCompany}
      />

      <div className="main-area">
        <Header
          page={page}
          pageTitle={currentPage.title}
          pageDescription={currentPage.description}
          navigate={navigate}
          onNavigate={navigate}
          companies={companyList}
          selectedCompany={selectedCompany}
          selectedCompanyId={selectedCompanyId}
          onSelectCompany={selectCompany}
          sidebarCollapsed={sidebarCollapsed}
          onToggleSidebar={() =>
            setSidebarCollapsed((current) => !current)
          }
        />

        <main className="app-page-content" key={page}>
          {content}
        </main>
      </div>
    </div>
  );
}