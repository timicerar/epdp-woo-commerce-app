import axios, { AxiosRequestConfig, CancelTokenSource } from "axios"
import Base64 from "crypto-js/enc-base64"
import hmacSHA1 from "crypto-js/hmac-sha1"
import OAuth from "oauth-1.0a"

const apiUrl = `http://studentdocker.informatika.uni-mb.si:20287`

enum HttpMethod {
    POST = "POST",
    PUT = "PUT",
    GET = "GET",
    DELETE = "DELETE",
}

interface IFetchOptions {
    allow204?: boolean
    cancelTokenSource?: CancelTokenSource
}

class Api {
    private httpAgent = axios.create()

    public get<T>(url: string, options?: IFetchOptions): Promise<T> {
        const headers: Record<string, string> = {}

        headers["Access-Control-Allow-Origin"] = "*"

        const oauth = this.generateOAuth(this.generateApiUrl(url), HttpMethod.GET)

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                method: HttpMethod.GET,
                headers,
                withCredentials: true,
                params: oauth,
            },
            options,
        )
    }

    public put<T>(url: string, body?: {} | FormData, options?: IFetchOptions): Promise<T> {
        const headers: Record<string, string> = {}

        let parsedBody: string | FormData | undefined

        if (body instanceof FormData) {
            headers["Content-Type"] = "multipart/form-data"
            parsedBody = body
        } else if (body) {
            headers["Content-Type"] = "application/json"
            parsedBody = JSON.stringify(body)
        }

        headers["Access-Control-Allow-Origin"] = "*"

        const oauth = this.generateOAuth(this.generateApiUrl(url), HttpMethod.PUT)

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                data: parsedBody,
                headers,
                method: HttpMethod.PUT,
                withCredentials: true,
                params: oauth,
            },
            options,
        )
    }

    public post<T>(url: string, body?: {} | FormData, options?: IFetchOptions): Promise<T> {
        const headers: Record<string, string> = {}

        let parsedBody: string | FormData | undefined

        if (body instanceof FormData) {
            parsedBody = body
            headers["Content-Type"] = "multipart/form-data"
        } else if (body) {
            headers["Content-Type"] = "application/json"
            parsedBody = JSON.stringify(body)
        }

        headers["Access-Control-Allow-Origin"] = "*"

        const oauth = this.generateOAuth(this.generateApiUrl(url), HttpMethod.POST)

        return this.request<T>(
            {
                url: this.generateApiUrl(url),
                data: parsedBody,
                headers,
                method: HttpMethod.POST,
                withCredentials: true,
                params: oauth,
            },
            options,
        )
    }

    public delete(url: string, options?: IFetchOptions): Promise<void> {
        const headers: Record<string, string> = {}

        const oauth = this.generateOAuth(this.generateApiUrl(url), HttpMethod.DELETE)

        return this.request<void>(
            {
                url: this.generateApiUrl(url),
                headers,
                method: HttpMethod.DELETE,
                withCredentials: true,
                params: oauth,
            },
            { allow204: true, ...options },
        )
    }

    public generateApiUrl(url: string): string {
        return `${apiUrl}${url}`
    }

    private generateOAuth(url: string, method: HttpMethod) {
        const oauth = new OAuth({
            consumer: {
                key: "ck_96a7a620afca55a2f78d51bca42b074c253a7b1a",
                secret: "cs_4707ddc1f244d6a9d4ae450aa165547f4bf53b64",
            },
            signature_method: "HMAC-SHA1",
            hash_function: (baseString: string, key: string) => Base64.stringify(hmacSHA1(baseString, key)),
        })

        return oauth.authorize({ url, method })
    }

    private async request<T>(requestConfig: AxiosRequestConfig, options?: IFetchOptions): Promise<T> {
        if (options && options.cancelTokenSource) {
            requestConfig.cancelToken = options.cancelTokenSource.token
        }

        try {
            const { data } = await this.httpAgent.request<T>(requestConfig)

            if (!data && !options?.allow204) {
                throw new Error("No data")
            }

            return data
        } catch (e) {
            throw new Error(e)
        }
    }
}

export default new Api()
