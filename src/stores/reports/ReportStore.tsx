import { action, makeObservable, observable, runInAction } from "mobx"
import { ReportsSales, ReportsTopSellers, ReportsTotal } from "../../interfaces/Reports"
import Api from "../../services/Api"

export class ReportStore {
    @observable public coupons: ReportsTotal[] | null = null
    @observable public customers: ReportsTotal[] | null = null
    @observable public orders: ReportsTotal[] | null = null
    @observable public products: ReportsTotal[] | null = null
    @observable public reviews: ReportsTotal[] | null = null
    @observable public sales: ReportsSales[] | null = null
    @observable public topSellers: ReportsTopSellers[] | null = null
    @observable public isLoading = false
    @observable public error: Error | null = null

    private loadIndex = 0

    constructor() {
        makeObservable(this)
    }

    @action
    public async loadCoupons(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.coupons = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let coupons: ReportsTotal[] | null = null

        try {
            coupons = await Api.get<ReportsTotal[]>("/wp-json/wc/v3/reports/coupons/totals")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.coupons = coupons
        })
    }

    @action
    public async loadCustomers(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.customers = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let customers: ReportsTotal[] | null = null

        try {
            customers = await Api.get<ReportsTotal[]>("/wp-json/wc/v3/reports/customers/totals")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.customers = customers
        })
    }

    @action
    public async loadOrders(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.orders = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let orders: ReportsTotal[] | null = null

        try {
            orders = await Api.get<ReportsTotal[]>("/wp-json/wc/v3/reports/orders/totals")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.orders = orders
        })
    }

    @action
    public async loadProducts(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.products = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let products: ReportsTotal[] | null = null

        try {
            products = await Api.get<ReportsTotal[]>("/wp-json/wc/v3/reports/products/totals")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.products = products
        })
    }

    @action
    public async loadReviews(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.reviews = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let reviews: ReportsTotal[] | null = null

        try {
            reviews = await Api.get<ReportsTotal[]>("/wp-json/wc/v3/reports/reviews/totals")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.reviews = reviews
        })
    }

    @action
    public async loadSales(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.sales = null

        const loadIndex = ++this.loadIndex
        let error: Error | null = null
        let sales: ReportsSales[] | null = null

        try {
            sales = await Api.get<ReportsSales[]>("/wp-json/wc/v3/reports/sales")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.sales = sales
        })
    }

    @action
    public async loadTopSellers(): Promise<void> {
        this.isLoading = true
        this.error = null
        this.topSellers = null

        const loadIndex = ++this.loadIndex

        let error: Error | null = null
        let topSellers: ReportsTopSellers[] | null = null

        try {
            topSellers = await Api.get<ReportsTopSellers[]>("/wp-json/wc/v3/reports/top_sellers")
        } catch (e) {
            error = e
        }

        if (loadIndex !== this.loadIndex) {
            return
        }

        runInAction(() => {
            this.isLoading = false
            this.error = error
            this.topSellers = topSellers
        })
    }
}
