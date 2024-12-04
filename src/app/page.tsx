import { elements } from '@/data/elements.json';

export default function Home() {
  return (
      <div className="grid grid-cols-18 gap-1 w-full">
        {elements.map((element) => {
          const gridRow = element.ypos;
          const gridColumn = element.xpos;
          
          return (
            <div
              key={element.number}
              className="relative flex flex-col justify-center items-center p-1 w-full min-w-0 aspect-square text-xs border border-black dark:border-white hover:z-10 hover:scale-105 transition-transform"
              style={{
                gridRow,
                gridColumn
              }}
            >
              <div className="font-semibold">{element.symbol}</div>
              <div className="text-[8px] truncate">{element.name}</div>
            </div>
          );
        })}
      </div>
  );
}
