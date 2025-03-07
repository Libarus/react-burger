import {
    type ActionCreatorWithPayload,
    type ActionCreatorWithoutPayload,
    type Dispatch,
    type Middleware,
    type MiddlewareAPI,
    type UnknownAction,
} from '@reduxjs/toolkit';

import AuthAPI from '@/shared/api/auth-api';

import { RootState } from '../store';
import { TokenService } from '../token.service';

type WebSocketActions<T> = {
    connect: ActionCreatorWithPayload<string>;
    disconnect: ActionCreatorWithoutPayload;
    sendMessage: ActionCreatorWithoutPayload;
    onConnected: ActionCreatorWithoutPayload;
    onDisconnected: ActionCreatorWithPayload<{ code?: number; reason?: string }>;
    onMessageReceived: ActionCreatorWithPayload<T>;
    onError: ActionCreatorWithPayload<string>;
};

type WebSocketOptions = {
    withTokenRefresh: boolean;
};

const authAPI = new AuthAPI();

export function createWebSocketMiddleware<T extends { message?: string }>(
    { connect, disconnect, sendMessage, onConnected, onDisconnected, onMessageReceived, onError }: WebSocketActions<T>,
    { withTokenRefresh }: WebSocketOptions,
): Middleware<unknown, RootState, Dispatch<UnknownAction>> {
    let socket: WebSocket | null = null;
    let isConnected = false;
    let reconnectTimer = 0;
    let url: string;

    return ((store: MiddlewareAPI<Dispatch<UnknownAction>, RootState>) => (next: Dispatch<UnknownAction>) => (action: UnknownAction) => {
        if (connect.match(action)) {
            if (socket !== null) {
                socket.close();
                socket = null;
            }

            try {
                const token = TokenService.GetToken();
                if (!token) {
                    store.dispatch(onError('No token available'));
                    return next(action);
                }

                url = `${action.payload}?token=${token}`;
                socket = new WebSocket(url);
                isConnected = true;

                socket.onopen = () => {
                    store.dispatch(onConnected());
                };

                socket.onclose = event => {
                    store.dispatch(
                        onDisconnected({
                            code: event.code,
                            reason: event.reason,
                        }),
                    );
                    socket = null;

                    if (isConnected) {
                        reconnectTimer = window.setTimeout(() => {
                            store.dispatch(connect(url));
                        }, 3000);
                    }
                };

                socket.onmessage = event => {
                    const data = JSON.parse(event.data) as T;
                    store.dispatch(onMessageReceived(data));

                    if (withTokenRefresh && data.message === 'Invalid or missing token') {
                        authAPI.refreshToken().then(refreshData => {
                            const wssUrl = new URL(url);
                            wssUrl.searchParams.set('token', refreshData.accessToken.replace('Bearer ', ''));
                            store.dispatch(connect(wssUrl.toString()));
                        });

                        store.dispatch(disconnect());
                    }
                };

                socket.onerror = event => {
                    store.dispatch(onError(event.type));
                };
            } catch (error) {
                store.dispatch(onError(error instanceof Error ? error.message : String(error)));
            }
        }

        if (disconnect.match(action)) {
            if (socket !== null) {
                socket.close();
            }

            clearTimeout(reconnectTimer);
            isConnected = false;
            reconnectTimer = 0;
            socket = null;
        }

        if (sendMessage.match(action)) {
            if (socket !== null && socket.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify(action.payload));
            } else {
                console.warn('WebSocket is not open. Cannot send message.');
            }
        }

        return next(action);
    }) as Middleware;
}
