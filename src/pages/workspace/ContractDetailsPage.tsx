import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const ContractDetailsPage = () => {
  const { id } = useParams();

  const [contract, setContract] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContract = async () => {
      const { data, error } = await supabase
        .from("contracts")
        .select("*")
        .eq("id", id)
        .single();

      if (!error) {
        setContract(data);
      }

      setLoading(false);
    };

    if (id) {
      loadContract();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-muted-foreground">
        Loading contract analysis...
      </div>
    );
  }

  if (!contract) {
    return (
      <div className="p-8 text-red-500">
        Contract not found.
      </div>
    );
  }

  const analysis = contract.ai_analysis;

  const riskStyle = (risk?: string) => {
  const value = risk?.toLowerCase();

  if (value === "low") {
    return "bg-green-100 text-green-700 border-green-200";
  }

  if (value === "medium") {
    return "bg-orange-100 text-orange-700 border-orange-200";
  }

  if (value === "high") {
    return "bg-red-100 text-red-700 border-red-200";
  }

  return "bg-secondary text-muted-foreground border-border";
};

return (
  <div className="space-y-6">

    {/* HEADER */}
    <div>
      <h1 className="text-3xl font-bold">
        {contract.contract_title}
      </h1>

      <p className="text-muted-foreground mt-2">
        AI Construction Contract Analysis
      </p>
    </div>

    {/* SCORE CARDS */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Completeness Score
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {contract.completeness_score ?? 0}%
        </h2>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Overall Risk
        </p>

        <span
          className={`inline-block mt-3 px-4 py-2 rounded-full border font-semibold ${riskStyle(
            analysis?.overall_risk
          )}`}
        >
          {analysis?.overall_risk ?? "Unknown"}
        </span>
      </div>

      <div className="bg-card border rounded-2xl p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Extracted Clauses
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {analysis?.number_of_extracted_clauses ?? 0}
        </h2>
      </div>
    </div>

    {/* EXTRACTED CLAUSES */}
    <div className="bg-card border rounded-2xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-4">
        Extracted Clauses
      </h2>

      <div className="space-y-4">
        {analysis?.extracted_clauses?.map((clause: any, index: number) => (
          <div
            key={index}
            className="border rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">
                {clause.clause_category}
              </h3>

              <span
                className={`text-sm px-3 py-1 rounded-full border font-medium ${riskStyle(
                  clause.risk_level
                )}`}
              >
                {clause.risk_level}
              </span>
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              Status: {clause.status}
            </p>

            <p className="text-sm leading-6">
              {clause.extracted_text}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* AMBIGUOUS CLAUSES */}
    <div className="bg-card border rounded-2xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-4">
        Ambiguous Clauses
      </h2>

      <div className="space-y-4">
        {analysis?.ai_recommendations?.ambiguous_clauses?.map(
          (item: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold mb-2">
                {item.clause}
              </h3>

              <p className="text-sm mb-2">
                {item.issue}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.recommendation}
              </p>
            </div>
          )
        )}
      </div>
    </div>

    {/* MISSING CLAUSES */}
    <div className="bg-card border rounded-2xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold mb-4">
        Missing Core Clauses
      </h2>

      <div className="space-y-4">
        {analysis?.ai_recommendations?.missing_core_clauses?.map(
          (item: any, index: number) => (
            <div
              key={index}
              className="border rounded-xl p-4"
            >
              <h3 className="font-semibold mb-2">
                {item.clause}
              </h3>

              <p className="text-sm mb-2">
                {item.importance}
              </p>

              <p className="text-sm text-muted-foreground">
                {item.recommendation}
              </p>
            </div>
          )
        )}
      </div>
    </div>

  </div>
);
};

export default ContractDetailsPage;