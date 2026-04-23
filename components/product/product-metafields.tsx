import { cn } from '@/lib/utils';
import {
  CalendarDays,
  Circle,
  Diamond,
  Gem,
  Layers,
  Palette,
  Ruler,
  Scissors,
  Sparkles,
  Tag,
  Users,
  Weight,
} from 'lucide-react';
import { getMetaobjectsFromMetafield } from 'lib/shopify';
import { Metafield, ProductOption } from 'lib/shopify/types';

// Helper function to format metafield keys for display
function formatMetafieldKey(key: string): string {
  const wordsToRemove = ['final', 'test', 'variancy', 'custom'];

  // Split the key by either an underscore or a hyphen
  return key
    .split(/_|-/)
    .filter((word) => !wordsToRemove.includes(word.toLowerCase()))
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
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
          <pre className="overflow-x-auto rounded-md bg-neutral-100 p-2 text-xs dark:bg-neutral-800/70">
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
          className="text-blue-600 underline-offset-2 hover:underline dark:text-blue-400"
        >
          {metafield.value}
        </a>
      );

    case 'multi_line_text_field':
      return <div className="whitespace-pre-wrap">{metafield.value}</div>;

    default:
      return metafield.value;
  }
}

// Pick a subtle, themed icon based on the metafield key.
// Purely presentational; does not affect data extraction.
function getIconForKey(key: string) {
  const k = key.toLowerCase();
  if (k.includes('carat') || k.includes('weight')) return Weight;
  if (k.includes('clarity')) return Sparkles;
  if (k.includes('cut')) return Scissors;
  if (k.includes('color') || k.includes('colour')) return Palette;
  if (k.includes('material') || k.includes('metal')) return Layers;
  if (k.includes('gender')) return Users;
  if (k.includes('age')) return CalendarDays;
  if (k.includes('size') || k.includes('length') || k.includes('width')) return Ruler;
  if (k.includes('diamond') || k.includes('stone') || k.includes('gem')) return Gem;
  if (k.includes('shape')) return Diamond;
  if (k.includes('tag') || k.includes('category')) return Tag;
  return Circle;
}

function MetafieldRow({
  label,
  icon: Icon,
  children,
  wide = false,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative flex flex-col gap-1.5 rounded-lg border border-neutral-200/70 bg-white/60 p-4 backdrop-blur-sm transition-colors hover:border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700',
        wide && 'sm:col-span-2'
      )}
    >
      <div className="flex items-center gap-2">
        <Icon className="h-3.5 w-3.5 text-neutral-400 dark:text-neutral-500" />
        <span className="text-[11px] font-medium tracking-[0.08em] text-neutral-500 uppercase dark:text-neutral-400">
          {label}
        </span>
      </div>
      <div className="pl-[22px] text-base font-medium text-neutral-900 dark:text-neutral-50">
        {children}
      </div>
    </div>
  );
}

function GroupedMetaobjectDisplay({
  metafield,
  metafields,
}: {
  metafield: Metafield;
  metafields: Metafield[];
}) {
  // Fetches all metaobjects associated with this specific key
  const metaobjects = getMetaobjectsFromMetafield(metafields, metafield.namespace, metafield.key);
  if (!metaobjects || metaobjects.length === 0) {
    return null;
  }
  // Extract the display value from each metaobject.
  const displayValues = metaobjects
    .map((mo) => {
      // Find the first field that does not contain a Shopify GID.
      // This makes it generic and not dependent on a specific key like 'label'.
      const displayField = mo.fields.find((field) => !field.value.includes('gid://shopify/'));

      return displayField?.value;
    })
    .filter(Boolean) as string[];

  if (displayValues.length === 0) {
    return null;
  }

  const Icon = getIconForKey(metafield.key);
  const isSingle = displayValues.length === 1;

  return (
    <MetafieldRow
      label={formatMetafieldKey(metafield.key)}
      icon={Icon}
      wide={displayValues.length > 3}
    >
      {isSingle ? (
        <span>{displayValues[0]}</span>
      ) : (
        <div className="flex flex-wrap gap-1.5">
          {displayValues.map((value, index) => (
            <span
              key={index}
              className="inline-flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-0.5 text-xs font-medium text-neutral-700 dark:border-neutral-700 dark:bg-neutral-800/70 dark:text-neutral-200"
            >
              {value}
            </span>
          ))}
        </div>
      )}
    </MetafieldRow>
  );
}

// Main component to display all metafields
export function ProductMetafields({
  metafields,
  options,
}: {
  metafields: Metafield[];
  options: ProductOption[];
}) {
  // Filter out empty metafields and system metafields you might not want to show
  const displayableMetafields = metafields.filter(
    (metafield) =>
      metafield &&
      !options
        .map((option) => option.name.toLowerCase())
        .includes(formatMetafieldKey(metafield.key).toLowerCase()) &&
      metafield.value &&
      metafield.value.trim() !== '' &&
      !metafield.key.startsWith('_') // Filter out system metafields that start with underscore
  );
  if (!displayableMetafields.length) {
    return null;
  }

  return (
    <section className="my-6 border-t border-neutral-200 pt-8 dark:border-neutral-800">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Gem className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
          <h3 className="text-[11px] font-semibold tracking-[0.18em] text-neutral-500 uppercase dark:text-neutral-400">
            Product Details
          </h3>
        </div>
        <div
          aria-hidden
          className="ml-4 h-px flex-1 bg-gradient-to-r from-neutral-200 to-transparent dark:from-neutral-800"
        />
      </div>

      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        {displayableMetafields.map((metafield) => {
          const key = `${metafield.namespace}.${metafield.key}`;
          const Icon = getIconForKey(metafield.key);
          const isMetaobject =
            metafield.type === 'list.metaobject_reference' ||
            metafield.type === 'metaobject_reference';

          if (isMetaobject) {
            return (
              <GroupedMetaobjectDisplay
                key={key}
                metafield={metafield}
                metafields={metafields}
              />
            );
          }

          const isLong =
            metafield.type === 'multi_line_text_field' || metafield.type === 'json';

          return (
            <MetafieldRow
              key={key}
              label={formatMetafieldKey(metafield.key)}
              icon={Icon}
              wide={isLong}
            >
              {formatMetafieldValue(metafield)}
            </MetafieldRow>
          );
        })}
      </div>
    </section>
  );
}
