

/**
 * Creates a URL path for a page
 * @param pageName - The name of the page (e.g., "Shop", "Contact")
 * @returns The URL path (e.g., "/shop", "/contact")
 */
export function createPageUrl(pageName: string): string {
    if (!pageName) return '/';
    
    // Convert to lowercase and replace spaces with hyphens
    return '/' + pageName.toLowerCase().replace(/ /g, '-');
}

/**
 * Formats currency with the appropriate symbol
 * @param amount - The amount to format
 * @param currency - The currency code (ILS, USD, EUR)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'ILS'): string {
    const symbols: Record<string, string> = {
        ILS: '₪',
        USD: '$',
        EUR: '€'
    };
    return `${symbols[currency] || '₪'}${amount.toFixed(2)}`;
}

/**
 * Formats a date string to Hebrew locale
 * @param dateStr - The date string to format
 * @returns Formatted date string
 */
export function formatDate(dateStr: string): string {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('he-IL');
}

/**
 * Gets the CSS class for order status badge
 * @param status - The order status
 * @returns CSS class string
 */
export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        pending: 'bg-orange-100 text-orange-800',
        paid: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        cancelled: 'bg-red-100 text-red-800',
        refunded: 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
}

/**
 * Gets the Hebrew text for order status
 * @param status - The order status
 * @returns Hebrew status text
 */
export function getStatusText(status: string): string {
    const texts: Record<string, string> = {
        pending: 'ממתין',
        paid: 'שולם',
        completed: 'הושלם',
        cancelled: 'בוטל',
        refunded: 'הוחזר'
    };
    return texts[status] || status;
}