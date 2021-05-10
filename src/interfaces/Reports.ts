export interface ReportsTotal {
    slug: string
    name: string
    total: number
}

export interface ReportsSales {
    total_sales: string
    net_sales: string
    average_sales: string
    total_orders: number
    total_items: number
    total_tax: string
    total_shipping: string
    total_refunds: number
    total_discount: string
    totals_grouped_by: string
    total_customers: number
}

export interface ReportsTopSellers {
    title: string
    product_id: number
    quantity: number
}
