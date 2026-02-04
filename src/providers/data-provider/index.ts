"use client";

import dataProviderSimpleRest from "@refinedev/simple-rest";

const API_URL = "http://localhost:5010/api";

export const dataProvider = dataProviderSimpleRest(API_URL);
