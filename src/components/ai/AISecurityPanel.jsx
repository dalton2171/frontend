import AIThreatScanner from "./AIThreatScanner";

function AISecurityPanel() {
  return (
    <section className="py-20 px-6">

      <div className="text-center mb-12">

        <h1 className="text-5xl font-black mb-4">
          AI Security{" "}
          <span className="text-cyan-400">
            Shield
          </span>
        </h1>

        <p className="text-gray-400">
          Intelligent cyber defense &
          threat moderation system
        </p>

      </div>

      <div className="max-w-4xl mx-auto">

        <AIThreatScanner />

      </div>

    </section>
  );
}

export default AISecurityPanel;