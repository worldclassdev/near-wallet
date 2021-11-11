import { createSelector } from "reselect";

const SLICE_NAME = 'account';

// Top level selectors
export const selectAccountSlice = (state) => state[SLICE_NAME];

// Second level selectors 
export const selectAccountId = createSelector(selectAccountSlice, (account) => account.accountId);

export const selectAccountHas2fa = createSelector(selectAccountSlice, (account) => account.has2fa);

export const selectAccountHasLockup = createSelector(selectAccountSlice, (account) => account.hasLockup);

export const selectAccountAuthorizedApps = createSelector(selectAccountSlice, (account) => account.authorizedApps || []);

export const selectAccountFullAccessKeys = createSelector(selectAccountSlice, (account) => account.fullAccessKeys || []);

export const selectAccountLedgerKey = createSelector(selectAccountSlice, (account) => account.ledgerKey);

// balance - state
export const selectBalance = createSelector(selectAccountSlice, (account) => account.balance || {});

export const selectAccountBalanceLockedAmount = createSelector(selectBalance, (balance) => balance.lockedAmount || '');

// accountsBalance - state
export const selectAccountAccountsBalances = createSelector(selectAccountSlice, (account) => account.accountsBalance || {});

// localStorage - state
export const selectAccountLocalStorage = createSelector(selectAccountSlice, (account) => account.localStorage || {});

export const selectAccountLocalStorageAccountId = createSelector(selectAccountLocalStorage, (localStorage) => localStorage.accountId);

// helperWalletState - state
export const selectAccountHelperWalletState = createSelector(selectAccountSlice, (account) => account.accountHelperWalletState || {});

export const selectAccountRequiredUnlockBalance = createSelector(selectAccountHelperWalletState, (accountHelperWalletState) => accountHelperWalletState.requiredUnlockBalance);

export const selectAccountFundedAccountNeedsDeposit = createSelector(selectAccountHelperWalletState, (accountHelperWalletState) => accountHelperWalletState.fundedAccountNeedsDeposit);

// url - state
export const selectAccountUrl = createSelector(selectAccountSlice, (account) => account.url || {});

export const selectAccountUrlReferrer = createSelector(selectAccountUrl, (url) => url.referrer);

export const selectAccountUrlContractId = createSelector(selectAccountUrl, (url) => url.contract_id);

export const selectAccountUrlPublicKey = createSelector(selectAccountUrl, (url) => url.public_key);

export const selectAccountUrlMethodNames = createSelector(selectAccountUrl, (url) => url.methodNames);

export const selectAccountUrlTitle = createSelector(selectAccountUrl, (url) => url.title);

export const selectAccountUrlSuccessUrl = createSelector(selectAccountUrl, (url) => url.success_url);

export const selectAccountUrlRedirectUrl = createSelector(selectAccountUrl, (url) => url.redirectUrl);
