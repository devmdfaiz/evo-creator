export default function TypographyList({ lists }: { lists: any[] }) {
  return (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
      {lists.map((list) => (
        <li>{list}</li>
      ))}
    </ul>
  );
}
