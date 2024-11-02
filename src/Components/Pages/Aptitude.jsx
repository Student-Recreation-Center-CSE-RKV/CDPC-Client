import React, { useState, useEffect } from "react";
import "./Aptitude.css";

function Aptitude() {
  // State for search input
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [resources, setResources] = useState([]);
  const [companyPapers, setCompanyPapers] = useState([]);

  // Mock API call to fetch resources and company-specific papers
  useEffect(() => {
    async function fetchResources() {
      const apiResources = [
        {
          name: "Quantitative Aptitude Guide",
          description: "A guide to help with quantitative aptitude.",
          link: "https://www.indiabix.com/aptitude/questions-and-answers/",
          category: "Quantitative Aptitude",
          youtube: "https://www.youtube.com/watch?v=SeM5EuZohRg",
        },
        {
          name: "Logical Reasoning Practice",
          description: "Practice questions for logical reasoning.",
          link: "https://www.indiabix.com/logical-reasoning/questions-and-answers/",
          category: "Logical Reasoning",
          youtube: "https://www.youtube.com/watch?app=desktop&v=-fQH5lVaXyo",
        },
        {
          name: "Verbal Ability Mastery",
          description: "Improve your verbal ability with this resource.",
          link: "https://www.indiabix.com/verbal-ability/questions-and-answers/",
          category: "Verbal Ability",
          youtube: "https://www.youtube.com/watch?v=cJxMjpKFb3A",
        },
        {
          name: "Quantitative Aptitude Mock Test",
          description: "Mock test for quantitative aptitude preparation.",
          link: "https://www.indiabix.com/online-test/aptitude-test/",
          category: "Quantitative Aptitude",
          youtube: "https://www.youtube.com/watch?v=SeM5EuZohRg",
        },
        {
          name: "Logical Reasoning Video",
          description: "Video tutorials for logical reasoning practice.",
          link: "https://www.google.com/search?channel=fs&client=ubuntu&q=logical+reasoning+video",
          category: "Logical Reasoning",
          youtube: "https://www.youtube.com/watch?v=ckpplQNxPh4",
        },
      ];
      setResources(apiResources);

      // Mock API for Company-Specific Placement Question Papers
      const apiCompanyPapers = [
        {
          company: "Google Aptitude Paper",
          link: "https://www.example.com/google-placement-paper",
          description: "Google's aptitude questions for placement"
        },
        {
          company: "Microsoft Aptitude Paper",
          link: "https://www.example.com/microsoft-placement-paper",
          description: "Microsoft aptitude questions for placement"
        },
        {
          company: "Amazon Aptitude Paper",
          link: "https://www.example.com/amazon-placement-paper",
          description: "Amazon's aptitude questions for placements."
        },
        {
          company: "TCS Aptitude Paper",
          link: "https://www.example.com/tcs-placement-paper",
          description: "TCS  aptitude questions for placements."
        },
        {
          company: "Infoys Aptitude Paper",
          link: "https://www.example.com/infosys-placement-paper",
          description: "Infosys Aptitude questions for placements."
        }
      ];
      setCompanyPapers(apiCompanyPapers);
    }

    fetchResources();
  }, []);

  // Filter resources based on search term and category
  const filteredResources = resources.filter((resource) => {
    return (
      (category === "All" || resource.category === category) &&
      (resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="App">
      <header className="App-header">
        <br />
        <h1>Aptitude, Reasoning, and Verbal Ability Preparation</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
          autoComplete="off" // Prevents the autofill and associated buttons like save
        />

        {/* Category Filter */}
        <div className="category-filter">
          <label htmlFor="category">Filter by Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Quantitative Aptitude">Quantitative Aptitude</option>
            <option value="Logical Reasoning">Logical Reasoning</option>
            <option value="Verbal Ability">Verbal Ability</option>
          </select>
        </div>

        {/* Display filtered resources */}
        <div className="resources">
          {filteredResources.map((resource, index) => (
            <div key={index} className="resource-card">
              <h3>{resource.name}</h3>
              <p>{resource.description}</p>
              <a
                href={resource.link}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                Access Resource
              </a>
              <a
                href={resource.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="youtube-link"
              >
                Watch Video
              </a>
            </div>
          ))}
        </div>

<br/>
        {/* Company-Specific Placement Question Papers in Long Containers */}
        <div className="company-papers">
          <h2>Company Wise Aptitude Question Papers</h2>
          <br/>
          {companyPapers.map((paper, index) => (
            <div key={index} className="paper-container">
              <h3>{paper.company}</h3>
              <p>{paper.description}</p>
              <a
                href={paper.link}
                target="_blank"
                rel="noopener noreferrer"
                className="paper-link"
              >
                Download Paper
              </a>
            </div>
          ))}
        </div>

        {/* Take a Test */}
        <div className="take-test">
          <h2>Take a Test</h2>
          <p>Test your knowledge with a mock test for Aptitude, Reasoning, and Verbal Ability.</p>
          <a
            href="https://www.indiabix.com/online-test/"
            target="_blank"
            rel="noopener noreferrer"
            className="test-link"
          >
            Take Mock Test
          </a>
        </div>
      </header>
    </div>
  );
}

export default Aptitude;
