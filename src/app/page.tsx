import { elements } from '@/data/elements.json';

// Group elements by category
const groupedElements = elements.reduce((acc, element) => {
  const category = element.category || 'Other';
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(element);
  return acc;
}, {} as Record<string, typeof elements>);

export default function Home() {
  return (
    <>
      {/* Desktop view - periodic table grid */}
      <div className="hidden md:grid grid-cols-18 gap-1 w-full">
        {elements.map((element) => (
          <div
            key={element.number}
            className="relative flex flex-col justify-center items-center p-1 w-full min-w-0 aspect-square text-xs border border-black dark:border-white hover:z-10 hover:scale-105 transition-transform"
            style={{
              gridRow: element.ypos,
              gridColumn: element.xpos
            }}
          >
            <div className="font-semibold">{element.symbol}</div>
            <div className="text-[8px] truncate">{element.name}</div>
          </div>
        ))}
      </div>

      {/* Mobile view - categorized list */}
      <div className="md:hidden w-full">
        {Object.entries(groupedElements).map(([category, categoryElements]) => (
          <div key={category} className="border-b pb-4">
            <h2 className="font-bold text-lg mb-2">{category}</h2>
            <div className="grid grid-cols-2 gap-2">
              {categoryElements.map((element) => (
                <div
                  key={element.number}
                  className="flex items-center p-2 border rounded"
                >
                  <div className="font-semibold text-lg mr-2">{element.symbol}</div>
                  <div className="text-sm">{element.name}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
