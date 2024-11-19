import { useEffect, useState } from "react";
import { useGetListData } from "../api/getListData";
import { Card } from "./Card";
import { Spinner } from "./Spinner";
import { useStore } from "../store";
import { ToggleButton } from "./Buttons";

export const Entrypoint = () => {
  const {data, isLoading} = useGetListData();
  const setItems = useStore(state => state.setItems);
  const deletedItems = useStore(state => state.deletedItems);
  const items = useStore(state => state.items);
  const [isExpanded, setIsExpanded] = useState(false);
  

  useEffect(() => {
    if (isLoading) {
      return;
    }
    setItems(data?.filter((item) => item.isVisible) ?? [])
  }, [data, isLoading]);


  if (isLoading) {
    return <Spinner />;
  }

  function toggleDeleted() {
      setIsExpanded(!isExpanded);
  }

  return (
    <div className="flex gap-x-4 max-w-screen-lg">
      <div className="w-[375px]">
        <h1 className="mb-1 font-medium text-lg">My Awesome List ({items.length})</h1>
        <div className="flex flex-col gap-y-3" >
          {items.map((card) => (
            <Card key={card.id} title={card.title} description={card.description} id={card.id} />
          ))}
        </div>
      </div>
      <div className="w-[375px]">
        <div className="flex items-center justify-between">
          <h1 className="mb-1 font-medium text-lg">Deleted Cards ({deletedItems.length})</h1>
          <ToggleButton onClick={toggleDeleted}
          >
            {isExpanded ? "Hide" : "Reveal"}
          </ToggleButton>
        </div>
        <div className="flex flex-col gap-y-3">
          {isExpanded && deletedItems?.map((card) => (
            <Card key={card.id} id={card.id} title={card.title} isDeleted/>
          ))}
        </div>
      </div>
    </div>
  );
};
