const BG_COUNT = 13;

// `index` may be missing or a numeric string from the API. Coerce safely so we
// never build a `transactions-bg-NaN.png` URL (broken image).
export default function backgroundImage(index) {
    const num = Number(index);
    const safe = Number.isFinite(num) ? Math.trunc(num) : 0;
    const slot = ((safe % BG_COUNT) + BG_COUNT) % BG_COUNT; // 0..12, handles negatives
    return `https://oister-transactions.s3.ap-south-1.amazonaws.com/transactions-bg/transactions-bg-${slot + 1}.png`;
}
