// BDT formatter (Indian-grouped lakh/crore)
export const BDT = '৳';
export const formatBDT = (n) => `${BDT} ${Number(n ?? 0).toLocaleString('en-IN')}`;
