import thunk from 'redux-thunk'
import { applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import * as Sentry from '@sentry/browser'

import { wallet } from '../../utils/wallet'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

/**
 * Lets you dispatch special actions with a { promise } field.
 *
 * This middleware will turn them into a single action at the beginning,
 * and a single success (or failure) action when the `promise` resolves.
 *
 * For convenience, `dispatch` will return the promise so the caller can wait.
 */
const readyStatePromise = store => next => action => {
    if (!action.payload || !action.payload.then) {
        return next(action)
    }

    function makeAction(ready, data) {
        const newAction = Object.assign({}, action)
        delete newAction.payload
        return Object.assign(newAction, { ready }, data)
    }

    next(makeAction(false))
    return action.payload.then(
        payload => {
            next(makeAction(true, { payload }))
            return payload
        },
        error => {
            console.warn('Error in background action:', error)
            Sentry.captureException(error);
            next(makeAction(true, { error: true, payload: error }))
            throw error
        }
    )
}

const thunkWithActiveAccount = store => next => action => {
    if (typeof action === 'function') {
        const dispatch = store.dispatch
        const getStateActiveAccount = () => {
            console.log(wallet.accountId);
            return getState()[wallet.accountId]
        }
        const getState = store.getState

        // ultimately: return action(dispatch, getStateActiveAccount, getState)
        return action(dispatch, getState, getStateActiveAccount)
    }
    return next(action)
}

console.log('thunk', thunk);

export default (history) => composeEnhancers(
    applyMiddleware(
        routerMiddleware(history),
        // thunk,
        readyStatePromise,
        thunkWithActiveAccount
    )
)