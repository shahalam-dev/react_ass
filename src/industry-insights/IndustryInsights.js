import React, { useEffect } from 'react';
import './IndustryInsights.css';

const jobTrends = [
  {
    title: "Remote Work Continues to Dominate",
    description: "Companies are shifting to hybrid and remote-first models, especially in tech, marketing, and customer service sectors."
  },
  {
    title: "AI & Automation Skills in High Demand",
    description: "Roles involving AI, data science, machine learning, and automation tools are growing rapidly across industries."
  },
  {
    title: "Green Jobs on the Rise",
    description: "Sustainability and clean energy sectors are seeing increased hiring as companies push for greener operations."
  },
  {
    title: "Soft Skills Becoming More Valuable",
    description: "Critical thinking, communication, emotional intelligence, and adaptability are highly valued across job roles."
  },
  {
    title: "Freelancing & Gig Economy Growth",
    description: "More professionals are opting for freelance opportunities offering flexibility, autonomy, and multiple income streams."
  },
  {
    title: "Cybersecurity Talent Shortage",
    description: "Demand for cybersecurity professionals continues to surge due to increasing digital threats."
  }
];

function createTrendCard(trend) {
  return (
    <div className="card" key={trend.title}>
      <h2 className="card-title">{trend.title}</h2>
      <p className="card-desc">{trend.description}</p>
    </div>
  );
}

const IndustryInsights = () => {
  useEffect(() => {
    document.title = "Industry Insights";
  }, []);

  return (
    <div className="trend-container">
      {jobTrends.map(createTrendCard)}
    </div>
  );
};

export default IndustryInsights;
