import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils/utils";
import LineGraph from "../global/graphs/LineGraph";

type Props = {
  title: string;
  goal: string | number;
  desc: string;
  data?: any[] | undefined;
  key?: string | undefined;
};

const SmallCard = ({ title, goal, desc, data, key }: Props) => {
  const splitDesc = desc.split("%");

  const indicator = splitDesc[0].includes("-") ? 0 : 1;

  return (
    <Card className={cn("grow rounded-sm")}>
      <CardHeader>
        <CardDescription className={cn("text-foreground")}>
          {title}
        </CardDescription>
        <CardTitle className={cn("text-2xl font-bold")}>{goal}</CardTitle>
        <CardDescription>
          <span
            className={`${
              indicator === 0
                ? "bg-red-700/20 text-red-700"
                : "bg-green-700/20 text-green-700"
            } px-2 py-1 rounded-md`}
          >{`${splitDesc[0]}%`}</span>{" "}
          {splitDesc[1]}
        </CardDescription>
      </CardHeader>
      {data && <CardContent>{<LineGraph data={data} key={key} />}</CardContent>}
    </Card>
  );
};

export default SmallCard;
