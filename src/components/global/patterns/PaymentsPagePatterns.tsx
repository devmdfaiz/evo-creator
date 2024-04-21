import styles from "./PaymentsPagePatterns.module.css";

const PaymentsPagePatterns = ({
  color = "#E9570C",
  className,
  type,
}: {
  color?: String;
  className?: String;
  type?: string;
}) => {
  const circle1 = {
    width: "50px",
    height: "50px",
  };

  const circle2 = {
    width: "80px",
    height: "80px",
  };

  const defultCircle2 = {
    width: "150px",
    height: "150px",
  };

  const defultCircle1 = {
    width: "110px",
    height: "110px",
  };

  return (
    <div
      style={{
        background: `${color}`,
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <ul className={`${styles.circles} overflow-hidden`}>
        {type === "preview" ? (
          <>
            <li className="6" style={circle1}></li>
            <li className="0" style={circle2}></li>
          </>
        ) : (
          <>
            <li className="6" style={defultCircle1}></li>
            <li className="0" style={defultCircle2}></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default PaymentsPagePatterns;
