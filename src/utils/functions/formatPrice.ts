export function formatPrice(price: number | string | null): string {
    if (price === null) return "0";
    const numericPrice =
      typeof price === "string" ? Number.parseFloat(price) : price;
    if (isNaN(numericPrice)) return "0";
    return numericPrice.toLocaleString("en-US", {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
    });
  }