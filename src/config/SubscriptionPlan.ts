import { SubscriptionPlan } from "../constants";

export default {
    [SubscriptionPlan.BASIC]: {
        pricePerUserPerMonth: 0,
        currency: "USD",
        MAX_USERS: 2,
        MAX_STORAGE_IN_GIGABYTE: 1,
        PROJECT_INTEGRATION: 1
    },
    [SubscriptionPlan.ADVANCED]: {
        pricePerUserPerMonth: 9.99,
        currency: "USD",
        MAX_USERS: 5,
        MAX_STORAGE_IN_GIGABYTE: 5,
        PROJECT_INTEGRATION: 2
    },
    [SubscriptionPlan.PREMIUM]: {
        pricePerUserPerMonth: 19.99,
        currency: "USD",
        MAX_USERS: 10,
        MAX_STORAGE_IN_GIGABYTE: 10,
        PROJECT_INTEGRATION: 4
    },
    [SubscriptionPlan.CUSTOM]: {}
}