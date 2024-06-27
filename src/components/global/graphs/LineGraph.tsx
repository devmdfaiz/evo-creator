import { LineChart, Line } from "recharts";

const LineGraph = ({ data, key }: { data: any[] | undefined; key: string | undefined }) => {

  return (
    <LineChart width={300} height={100} data={data}>
      <Line type="monotone" dataKey={"value"} stroke="#E9570C" strokeWidth={2} />
    </LineChart>
  );
};

export default LineGraph;
