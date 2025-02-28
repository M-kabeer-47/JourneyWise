export interface Currency {
    code: string
    name: string
    symbol: string
  }
  
  export const currencies: Currency[] = [
    { code: "USD", name: "US Dollar", symbol: "$" },
    { code: "EUR", name: "Euro", symbol: "€" },
    { code: "GBP", name: "British Pound", symbol: "£" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF" },
    { code: "CNY", name: "Chinese Yuan", symbol: "¥" },
    { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$" },
    { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$" },
    { code: "SEK", name: "Swedish Krona", symbol: "kr" },
    { code: "KRW", name: "South Korean Won", symbol: "₩" },
    { code: "SGD", name: "Singapore Dollar", symbol: "S$" },
    { code: "NOK", name: "Norwegian Krone", symbol: "kr" },
    { code: "MXN", name: "Mexican Peso", symbol: "$" },
    { code: "INR", name: "Indian Rupee", symbol: "₹" },
    { code: "RUB", name: "Russian Ruble", symbol: "₽" },
    { code: "ZAR", name: "South African Rand", symbol: "R" },
    { code: "BRL", name: "Brazilian Real", symbol: "R$" },
    { code: "AED", name: "UAE Dirham", symbol: "د.إ" },
  ];