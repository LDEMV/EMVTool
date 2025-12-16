/**
 * EMV Tag Definitions
 * Base tag definitions for all card schemes
 */

// Common EMV tag descriptions (base for all card schemes)
// Common EMV tag descriptions (base for all card schemes)
export const EMV_TAGS = {
  '5F57': 'Account Type',
  '9F01': 'Acquirer Identifier',
  '9F40': 'Additional Terminal Capabilities',
  '81': 'Amount, Authorised (Binary)',
  '9F02': 'Amount, Authorized (Numeric)',
  '9F04': 'Amount, Other (Binary)',
  '9F03': 'Amount, Other (Numeric)',
  '9F3A': 'Amount, Reference Currency',
  '9F26': 'Application Cryptogram',
  '9F42': 'Application Currency Code',
  '9F44': 'Application Currency Exponent',
  '9F05': 'Application Discretionary Data',
  '5F25': 'Application Effective Date',
  '5F24': 'Application Expiration Date',
  '94': 'Application File Locator (AFL)',
  '4F': 'Application Dedicated File (ADF) Name',
  '9F06': 'Application Identifier (AID) - terminal',
  '82': 'Application Interchange Profile',
  '50': 'Application Label',
  '9F12': 'Application Preferred Name',
  '5A': 'Application Primary Account Number (PAN)',
  '5F34': 'Application Primary Account Number (PAN) Sequence Number',
  '9F3B': 'Application Reference Currency',
  '9F43': 'Application Reference Currency Exponent',
  '9F07': 'Application Usage Control',
  '9F08': 'Application Version Number',
  '9F09': 'Application Version Number (Payment System)',
  '9F36': 'Application Transaction Counter (ATC)',
  '8A': 'Authorisation Response Code',
  '89': 'Authorisation Code',
  '5F54': 'Bank Identifier Code (BIC)',
  'A1': 'Biometric Header Template (BHT)',
  '7F60': 'Biometric Information Template (BIT)',
  '90': 'Biometric Solution ID',
  '81': 'Biometric Type',
  '82': 'Biometric Subtype',
  '9F30': 'Biometric Terminal Capabilities',
  'BF4C': 'Biometric Try Counters Template',
  'BF4E': 'Biometric Verification Data Template',
  '9F31': 'Card BIT Group Template',
  '8C': 'Card Risk Management Data Object List 1 (CDOL1)',
  '8D': 'Card Risk Management Data Object List 2 (CDOL2)',
  '5F20': 'Cardholder Name',
  '9F0B': 'Cardholder Name Extended',
  '8E': 'Cardholder Verification Method (CVM) List',
  '9F34': 'Cardholder Verification Method (CVM) Results',
  '8F': 'Certification Authority Public Key Index (ICC)',
  '9F22': 'Certification Authority Public Key Index (Terminal)',
  '9F45': 'Data Authentication Code',
  '84': 'Dedicated File (DF) Name',
  '9F49': 'Dynamic Data Authentication Data Object List (DDOL)',
  'DF51': 'Enciphered Biometric Data',
  'DF50': 'Enciphered Biometric Key Seed',
  'DF52': 'MAC of Enciphered Biometric Data',
  '6F': 'File Control Information (FCI) Template',
  'BF0C': 'File Control Information (FCI) Issuer Discretionary Data',
  '9F2D': 'Integrated Circuit Card (ICC) PIN Encipherment Public Key Certificate',
  '9F2E': 'Integrated Circuit Card (ICC) PIN Encipherment Public Key Exponent',
  '9F2F': 'Integrated Circuit Card (ICC) PIN Encipherment Public Key Remainder',
  '9F46': 'Integrated Circuit Card (ICC) Public Key Certificate',
  '9F47': 'Integrated Circuit Card (ICC) Public Key Exponent',
  '9F48': 'Integrated Circuit Card (ICC) Public Key Remainder',
  '5F53': 'International Bank Account Number (IBAN)',
  '90': 'Issuer Public Key Certificate',
  '9F32': 'Issuer Public Key Exponent',
  '92': 'Issuer Public Key Remainder',
  '86': 'Issuer Script Command',
  '9F18': 'Issuer Script Identifier',
  '71': 'Issuer Script Template 1',
  '72': 'Issuer Script Template 2',
  '5F50': 'Issuer URL',
  '5F28': 'Issuer Country Code (Numeric)',
  '5F55': 'Issuer Country Code (alpha2 format)',
  '5F56': 'Issuer Country Code (alpha3 format)',
  '42': 'Issuer Identification Number (IIN)',
  '9F0C': 'Issuer Identification Number Extended (IINE)',
  '9F10': 'Issuer Application Data',
  '9F11': 'Issuer Code Table Index',
  '9F0D': 'Issuer Action Code - Default',
  '9F0E': 'Issuer Action Code - Denial',
  '9F0F': 'Issuer Action Code - Online',
  '5F2D': 'Language Preference',
  '9F25': 'Last 4 Digits of PAN',
  '9F13': 'Last Online Application Transaction Counter (ATC) Register',
  '9F4D': 'Log Entry',
  '9F4F': 'Log Format',
  '9F14': 'Lower Consecutive Offline Limit',
  '9F15': 'Merchant Category Code',
  '9F16': 'Merchant Identifier',
  '9F4E': 'Merchant Name and Location',
  'BF4A': 'Offline BIT Group Template',
  'BF4B': 'Online BIT Group Template',
  '9F24': 'Payment Account Reference (PAR)',
  '9F17': 'Personal Identification Number (PIN) Try Counter',
  '9F39': 'Point-of-Service (POS) Entry Mode',
  'BF4D': 'Preferred Attempts Template',
  'DF50': 'Preferred Facial Attempts / Facial Try Counter',
  'DF51': 'Preferred Finger Attempts / Finger Try Counter',
  'DF52': 'Preferred Iris Attempts / Iris Try Counter',
  'DF53': 'Preferred Palm Attempts / Palm Try Counter',
  'DF54': 'Preferred Voice Attempts / Voice Try Counter',
  '88': 'Short File Identifier (SFI)',
  '5F30': 'Service Code',
  '93': 'Signed Static Application Data',
  '9F4B': 'Signed Dynamic Application Data',
  '9F4A': 'Static Data Authentication Tag List',
  '9F33': 'Terminal Capabilities',
  '9F1A': 'Terminal Country Code',
  '9F1B': 'Terminal Floor Limit',
  '9F1C': 'Terminal Identification',
  '9F1D': 'Terminal Risk Management Data',
  '9F35': 'Terminal Type',
  '95': 'Terminal Verification Results',
  '9F19': 'Token Requestor ID',
  '9F1F': 'Track 1 Discretionary Data',
  '9F20': 'Track 2 Discretionary Data',
  '57': 'Track 2 Equivalent Data',
  '97': 'Transaction Certificate Data Object List (TDOL)',
  '98': 'Transaction Certificate (TC) Hash Value',
  '5F2A': 'Transaction Currency Code',
  '5F36': 'Transaction Currency Exponent',
  '9A': 'Transaction Date',
  '99': 'Transaction Personal Identification Number (PIN) Data',
  '9F3C': 'Transaction Reference Currency Code',
  '9F3D': 'Transaction Reference Currency Exponent',
  '9F41': 'Transaction Sequence Counter',
  '9B': 'Transaction Status Information',
  '9F21': 'Transaction Time',
  '9C': 'Transaction Type',
  '9F37': 'Unpredictable Number',
  '9F23': 'Upper Consecutive Offline Limit',
  '9D': 'Directory Definition File (DDF) Name',
  '73': 'Directory Discretionary Template',
  '70': 'READ RECORD Response Message Template',
  '77': 'Response Message Template Format 2',
  '80': 'Response Message Template Format 1'
};

// VISA specific extensions
export const VISA_TAGS = {
  ...EMV_TAGS,
  // VISA specific tags
  '9F6E': 'Form Factor Indicator',
  '9F7C': 'Customer Exclusive Data'
};

// Mastercard specific extensions
export const MASTERCARD_TAGS = {
  ...EMV_TAGS,
  // Mastercard specific tags
  '9F6E': 'Third Party Data',
  '9F7E': 'Personal Identification Number (PIN) Try Limit'
};

// JCB specific extensions
export const JCB_TAGS = {
  ...EMV_TAGS
  // JCB specific tags can be added here
};

// UnionPay specific extensions
export const UNIONPAY_TAGS = {
  ...EMV_TAGS,
  // UnionPay specific tags
  '9F61': 'Amount, Authorised Binary',
  '9F62': 'Upper Consecutive Offline Limit',
  '9F63': 'Lower Consecutive Offline Limit',
  '9F66': 'Terminal Transaction Qualifiers (TTQ)',
  '9F77': 'Consecutive Transaction Count'
};

// Discover specific extensions
export const DISCOVER_TAGS = {
  ...EMV_TAGS
  // Discover specific tags can be added here
};

// AMEX specific extensions
export const AMEX_TAGS = {
  ...EMV_TAGS,
  // AMEX specific tags
  '9F6E': 'Form Factor Indicator (Contactless)'
};

/**
 * Get tag definitions based on card scheme
 * @param {string} scheme - Card scheme
 * @returns {Object} Tag definitions for the specified scheme
 */
export function getTagDefinitions(scheme = 'EMV') {
  switch(scheme.toUpperCase()) {
    case 'VISA':
      return VISA_TAGS;
    case 'MASTERCARD':
      return MASTERCARD_TAGS;
    case 'JCB':
      return JCB_TAGS;
    case 'UNIONPAY':
      return UNIONPAY_TAGS;
    case 'DISCOVER':
      return DISCOVER_TAGS;
    case 'AMEX':
      return AMEX_TAGS;
    default: // EMV
      return EMV_TAGS;
  }
}