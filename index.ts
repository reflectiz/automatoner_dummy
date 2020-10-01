export module automatoner_dummy {
    function getRandomInt(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    export enum status {
        NotReady = -2,
        NotScanned = -1,
        OK = 0,
        NoProductPage = 1,
        CantAddToCart = 2,
        CantAccessCheckout = 3,
        CheckoutFailed = 4,
    }

    const storage: { [id: string]: { readyOn: Date, status: status, data: {} } } = {};

    export function scanDomain(domain: string) {
        if (getRandomInt(0, 20) === 0)
            return;

        storage[domain] = {
            readyOn: new Date(Date.now() + getRandomInt(30 * 1000, 12 * 60 * 1000)),
            status: getRandomInt(0, 4),
            data: { dummyData: "" },
        };
    }

    export function getResults(domain: string) {
        if (!storage[domain])
            return { status: status.NotScanned };

        if (storage[domain].readyOn > new Date())
            return { status: status.NotReady };

        return { status: storage[domain].status, data: storage[domain].data };
    }
}