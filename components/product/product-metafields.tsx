import { getMetaobjectsFromMetafield } from "lib/shopify";
import { Metafield, ProductOption } from "lib/shopify/types";

// Helper function to format metafield keys for display
function formatMetafieldKey(key: string): string {
  const wordsToRemove = ['final', 'test', 'variancy'];
  
  // Split the key by either an underscore or a hyphen
  return key
    .split(/_|-/)
    .filter(word => !wordsToRemove.includes(word.toLowerCase()))
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
// Helper function to format metafield values based on type
function formatMetafieldValue(metafield: Metafield): string | React.ReactNode {
  switch (metafield.type) {
    case 'boolean':
      return metafield.value === 'true' ? 'Yes' : 'No';
    
    case 'date':
      return new Date(metafield.value).toLocaleDateString();
    
    case 'date_time':
      return new Date(metafield.value).toLocaleString();
    
    case 'json':
      try {
        const parsed = JSON.parse(metafield.value);
        return (
          <pre className="text-sm bg-gray-50 p-2 rounded overflow-x-auto dark:bg-gray-800">
            {JSON.stringify(parsed, null, 2)}
          </pre>
        );
      } catch {
        return metafield.value;
      }
    
    case 'money':
      try {
        const money = JSON.parse(metafield.value);
        return `${money.currency_code} ${money.amount}`;
      } catch {
        return metafield.value;
      }
    
    case 'rating':
      try {
        const rating = JSON.parse(metafield.value);
        return `${rating.value}/${rating.scale}`;
      } catch {
        return metafield.value;
      }
    
    case 'url':
      return (
        <a 
          href={metafield.value} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-600 hover:text-blue-800 underline dark:text-blue-400 dark:hover:text-blue-300"
        >
          {metafield.value}
        </a>
      );
    
    case 'multi_line_text_field':
      return (
        <div className="whitespace-pre-wrap">
          {metafield.value}
        </div>
      );
    
    default:
      return metafield.value;
  }
}
function GroupedMetaobjectDisplay({ metafield, metafields }: { metafield: Metafield; metafields: Metafield[] }) {
  // Fetches all metaobjects associated with this specific key
  const metaobjects = getMetaobjectsFromMetafield(metafields, metafield.namespace, metafield.key);

  if (!metaobjects || metaobjects.length === 0) {
    return null;
  }
  // Extract the display value from each metaobject.
  // This assumes the field you want to show has a key of 'label'.
  const displayValues = metaobjects
    .map(mo => {
      // Find the first field that does not contain a Shopify GID.
      // This makes it generic and not dependent on a specific key like 'label'.
      const displayField = mo.fields.find(field => !field.value.includes('gid://shopify/'));
      
      // Return the value of that field.
      return displayField?.value;
    })
    .filter(Boolean) as string[];

  if (displayValues.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr,2fr] items-start gap-x-4 gap-y-2">
      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
        {formatMetafieldKey(metafield.key)}
      </span>
      <div className="flex flex-wrap gap-2">
        {displayValues.map((value, index) => (
          <span
            key={index}
            className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
          >
            {value}
          </span>
        ))}
      </div>
    </div>
  );
}

// Main component to display all metafields
export function ProductMetafields({ metafields, options }: { metafields: Metafield[]; options: ProductOption[] }) {
  // Filter out empty metafields and system metafields you might not want to show
  const displayableMetafields = metafields.filter(metafield =>
    metafield && 
    !options.map((option)=> option.name.toLowerCase()).includes(formatMetafieldKey(metafield.key).toLowerCase()) &&
    metafield.value && 
    metafield.value.trim() !== '' &&
    !metafield.key.startsWith('_') // Filter out system metafields that start with underscore
  );

  if (!displayableMetafields.length) {
    return null;
  }

  return (
    <div className="my-4 border-t border-gray-200 pt-8 dark:border-gray-700">
      <h3 className="text-xl font-semibold mb-6 text-gray-900 dark:text-white">
        Product Details
      </h3>
      
      <div className="space-y-6">
        {displayableMetafields.map((metafield) => (
          <div key={`${metafield.namespace}.${metafield.key}`} className="space-y-2">
            {/* <div className="font-medium text-gray-900 dark:text-white">
              {formatMetafieldKey(metafield.key)}
            </div> */}
            
            <div className="text-gray-700 dark:text-gray-300">
              {metafield.type === 'list.metaobject_reference' || metafield.type === 'metaobject_reference' ? (
                // <MetaobjectReferences metafield={metafield} metafields={metafields} />
                <GroupedMetaobjectDisplay metafield={metafield} metafields={metafields} />
              ) : (
                <div className="bg-gray-50 rounded-lg p-3 dark:bg-gray-800">
                  {formatMetafieldValue(metafield)}
                </div>
              )}
            </div>
            
            {/* Optional: Show metafield type for debugging
            <div className="text-xs text-gray-400">
              Type: {metafield.type} | Namespace: {metafield.namespace}
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}