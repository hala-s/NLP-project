const {isValidURL} = require("../URLChecker.js");

describe ("isValidURL" , () => {
    test("should return false for invalid URLs", () => {
        expect(isValidURL("HELLO !!!!")).toBeFalsy();
    })

    test("should return false for email addresses", () => {
        expect(isValidURL("mailto:test@example.com")).toBeFalsy();
      });
    
      test("should return false for empty strings", () => {
        expect(isValidURL("")).toBeFalsy();
      });
})