import { useCyber } from "../../context/CyberContext";

function SecurityStatus() {
  const { securityStatus } = useCyber();

  return (
    <div className="glass-card p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">
        Security Systems
      </h2>

      <div className="space-y-4">

        {Object.entries(securityStatus).map(
          ([key, value], i) => (
            <div
              key={i}
              className="flex justify-between"
            >
              <span className="capitalize">
                {key}
              </span>

              <span
                className={
                  value
                    ? "text-green-400"
                    : "text-red-400"
                }
              >
                {value
                  ? "ACTIVE"
                  : "OFFLINE"}
              </span>
            </div>
          )
        )}

      </div>
    </div>
  );
}

export default SecurityStatus;