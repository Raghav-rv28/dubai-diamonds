import { search } from "@/lib/shopify";
import { ProductFilter, ShopifyProduct } from "@/lib/shopify/types";
import { NextRequest } from "next/server";

function pickFieldsAsLabels(fields: Array<{ key: string; value: string; type: string }>): string[] {
  const labels: string[] = [];
  // Prefer common label/value keys
  const preferredKeys = new Set(["value", "label", "size", "ring_size", "name"]);
  const preferred = fields.filter((f) => preferredKeys.has(f.key) && typeof f.value === "string" && f.value.trim());
  if (preferred.length) {
    for (const f of preferred) labels.push(f.value.trim());
    return labels;
  }
  // Fallback: any non-empty string field
  for (const f of fields) {
    if (typeof f.value === "string" && f.value.trim()) labels.push(f.value.trim());
  }
  return labels;
}

function extractRingSizeStringsFromProduct(product: ShopifyProduct): string[] {
  const sizes: string[] = [];
  const mf =  product.metafields?.find(
    (m) => m?.namespace === "shopify" && m?.key === "ring-size"
  );
  if (!mf) return sizes;

  // 1) If references are present (list.metaobject_reference), derive labels from referenced metaobjects
  if (mf.references && mf.references.edges?.length) {
    for (const edge of mf.references.edges) {
      const node: any = (edge as any).node;
      if (node?.fields?.length) {
        for (const lbl of pickFieldsAsLabels(node.fields)) {
          sizes.push(lbl);
        }
      }
    }
    if (sizes.length) return sizes;
  }

  // 2) If single reference connection exists
  if (mf.reference && mf.reference.edges?.length) {
    for (const edge of mf.reference.edges) {
      const node: any = (edge as any).node;
      if (node?.fields?.length) {
        for (const lbl of pickFieldsAsLabels(node.fields)) {
          sizes.push(lbl);
        }
      }
    }
    if (sizes.length) return sizes;
  }

  // 3) Fallback: parse value as JSON array of strings
  if (mf.value && typeof mf.value === "string") {
    try {
      const parsed = JSON.parse(mf.value);
      if (Array.isArray(parsed)) {
        for (const item of parsed) {
          if (typeof item === "string" && item.trim()) sizes.push(item.trim());
        }
        if (sizes.length) return sizes;
      }
    } catch {}
    // 4) Last resort: split by common delimiters
    mf.value.split(/[\/,|]/).forEach((p) => {
      const t = p.trim();
      if (t) sizes.push(t);
    });
  }

  return sizes;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const tag = searchParams.get("tag") || undefined;
  // Exclude ringSize from options computation so we can see the full domain of the current result set
  const _ringSize = searchParams.get("ringSize");

  const productFilters: ProductFilter[] = [];
  if (tag) {
    productFilters.push({ tag });
  }

  const products = await search(q, undefined, undefined, productFilters);

  const set = new Set<string>();
  for (const p of products) {
    for (const s of extractRingSizeStringsFromProduct(p as any)) {
      if (s) set.add(s);
    }
  }

  const sizes = Array.from(set).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  return new Response(JSON.stringify({ sizes }), {
    headers: { "content-type": "application/json" },
  });
} 