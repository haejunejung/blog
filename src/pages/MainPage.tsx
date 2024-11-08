import List from "@/components/List";
import ListItem from "@/components/ListItem";
import { mdxContentList } from "@/lib/MDXContentList";
import { Link } from "wouter";

interface MDXListItemProps {
  title: string;
  summary: string;
  path: string;
}

const MDXListItem: React.FC<Readonly<MDXListItemProps>> = ({
  title,
  summary,
  path,
}) => {
  return (
    <Link to={path}>
      <ListItem>
        <ListItem.Right>
          <ListItem.Title title={title} />
          <ListItem.Summary summary={summary} />
        </ListItem.Right>
      </ListItem>
    </Link>
  );
};

const MainPage = () => {
  return (
    <>
      {mdxContentList.map((mdxContent) => (
        <List<MDXListItemProps>
          key={mdxContent.title}
          title={mdxContent.title}
          items={mdxContent.items}
          renderItem={MDXListItem}
        />
      ))}
    </>
  );
};

export default MainPage;
