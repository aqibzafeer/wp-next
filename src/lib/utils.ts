// Utility functions for the app

export const getImageUrl = (src: string | undefined): string => {
  if (!src) return "";
  return src;
};

export const stripHtml = (html: string): string => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
  }).format(price);
};

export const calculateDiscount = (
  originalPrice: number,
  salePrice: number
): number => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
