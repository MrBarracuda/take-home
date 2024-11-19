import { FC, useState } from "react";
import { ListItem } from "../api/getListData";
import { DeleteButton, ExpandButton } from "./Buttons";
import { ChevronDownIcon, ChevronUpIcon } from "./icons";
import { useStore } from "../store";

type CardProps = {
  title: ListItem["title"];
  description?: ListItem["description"];
  id: ListItem["id"];
  isDeleted?: boolean;
};

export const Card: FC<CardProps> = ({ title, description = "", id, isDeleted = false }) => {
  const { deleteItem } = useStore(state => state);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleDelete = () => {
    deleteItem(id, title);
  };

  if (isDeleted) { 
    return (
      <div className="border border-black px-2 py-1.5">
        <h1 className="font-medium">{title}</h1>
      </div>
    )
  }

  return (
    <div className="border border-black px-2 py-1.5">
      <div className="flex justify-between mb-0.5">
        <h1 className="font-medium">{title}</h1>
        <div className="flex">
          <ExpandButton onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </ExpandButton>
          <DeleteButton onClick={handleDelete} />
        </div>
      </div>
      {isExpanded && <p className="text-sm transition easy-in-out delay-1000">{description}</p>}
    </div>
  );
};
