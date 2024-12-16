"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerServiceMockClient = void 0;
const common_1 = require("@nestjs/common");
let CustomerServiceMockClient = class CustomerServiceMockClient {
    async getCustomer(customerId) {
        console.log('mock customer client');
        // Simple mock logic: Only a specific ID returns a valid customer
        if (customerId === 'cust123') {
            return { id: 'cust123', name: 'Mock Customer', valid: true };
        }
        return null; // Return null for any other customer ID
    }
};
exports.CustomerServiceMockClient = CustomerServiceMockClient;
exports.CustomerServiceMockClient = CustomerServiceMockClient = __decorate([
    (0, common_1.Injectable)()
], CustomerServiceMockClient);
