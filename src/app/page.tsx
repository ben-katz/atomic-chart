import { elements } from '@/data/elements.json';
import Link from 'next/link';

// Group elements by category
const groupedElements = elements.reduce((acc, element) => {
  const category = element.category || 'Other';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(element);
  return acc;
}, {} as Record<string, typeof elements>);

// Helper function to generate empty grid positions
const emptyGridPositions = Array.from({ length: 18 * 10 }, (_, index) => {
  const ypos = Math.floor(index / 18) + 1;
  const xpos = (index % 18) + 1;
  return { ypos, xpos };
}).filter(pos =>
  !elements.some(el => el.xpos === pos.xpos && el.ypos === pos.ypos)
);

export default function Home() {
  return (
    <>
      {/* Desktop view - periodic table grid */}
      <div className="hidden lg:grid grid-cols-18 gap-[2px] w-full box-border">
        {elements.map((element) => (
          <Link
            title={element.name}
            key={element.number}
            href={`/elements/${element.name.toLowerCase()}`}
            className="cursor-pointer relative flex flex-col justify-center items-center p-1 w-full min-w-0 aspect-square text-xs bg-white dark:bg-black border border-black dark:border-white hover:z-10 hover:scale-150 transition-transform box-border"
            style={{
              gridRow: element.ypos,
              gridColumn: element.xpos
            }}
          >
            <div className="font-semibold">{element.symbol}</div>
            <div className="text-[8px] truncate">{element.name}</div>
          </Link>
        ))}

        {/* Add empty grid boxes */}
        {emptyGridPositions.map((pos, index) => (
          <div
            key={`empty-${index}`}
            className="border min-w-0 border-black/30 dark:border-white/20 aspect-square box-border"
            style={{
              gridRow: pos.ypos,
              gridColumn: pos.xpos
            }}
          />
        ))}
      </div>

      {/* Mobile view - categorized list */}
      <div className="lg:hidden w-full">
        {Object.entries(groupedElements).map(([category, categoryElements]) => (
          <div key={category} className="pb-8">
            <h2 className="font-bold text-lg mb-2">{category}</h2>
            <div className="grid grid-cols-2 gap-2">
              {categoryElements.map((element) => (
                <Link
                  title={element.name}
                  key={element.number}
                  href={`/elements/${element.name.toLowerCase()}`}
                  className="flex items-center p-2 border"
                >
                  <div className="font-semibold text-lg mr-2">{element.symbol}</div>
                  <div className="text-sm">{element.name}</div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
