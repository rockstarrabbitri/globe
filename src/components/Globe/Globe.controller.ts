import * as React from "react";
import { useWebViewMessage } from "react-native-react-bridge";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { _Interfaces } from "./Globe.interfaces";

export namespace _Controller {
    const minute: Readonly<number> = 1000 * 60;

    const hour: Readonly<number> = minute * 60;

    const day: Readonly<number> = hour * 24;

    export function useCountDown(): _Interfaces.UseCountDown {
        const countdownInterval: React.MutableRefObject<ReturnType<typeof setInterval> | undefined> =
            React.useRef<ReturnType<typeof setInterval>>();
        const [countdown, setCountdown]: Interfaces.React.UseState<string> = React.useState<string>("");

        const createCountDown: _Interfaces.UseCountDown["createCountDown"] = React.useCallback<
            _Interfaces.UseCountDown["createCountDown"]
        >((date: Date | string): void => {
            const countDownDate: number = new Date(date).getTime();

            countdownInterval.current = setInterval(function (): void {
                const now: number = new Date().getTime();

                const distance: number = countDownDate - now;

                const days: number = Math.floor(distance / day);
                const hours: number = Math.floor((distance % day) / hour);
                const minutes: number = Math.floor((distance % hour) / minute);
                const seconds: number = Math.floor((distance % minute) / 1000);

                if (day <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {
                    setCountdown("Hi there!");
                    return;
                }

                setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            }, 1000);
        }, []);

        React.useEffect((): Interfaces.Dummies.VoidFunc => {
            return function cleanup(): void {
                if (!countdownInterval.current) {
                    return;
                }

                clearInterval(countdownInterval.current);
            };
        }, []);

        return {
            countdown,
            createCountDown,
        };
    }

    export function useFetchRemoteConfig(
        createCountDown: _Interfaces.UseCountDown["createCountDown"]
    ): Interfaces.Dummies.VoidFunc {
        const remoteConfig: ReturnType<typeof Services.Firebase.RemoteConfig.Hooks.useRemoteConfig> =
            Services.Firebase.RemoteConfig.Hooks.useRemoteConfig();

        return React.useCallback((): void => {
            try {
                const releaseDate = remoteConfig?.release_date?._value || "15.08.2022";
                const separatedDate = releaseDate.split(".");

                createCountDown(new Date(+separatedDate[2], +separatedDate[1] - 1, +separatedDate[0]));
            } catch (e: unknown) {
                console.warn("Error in parsing remote config");
            }
        }, [createCountDown, remoteConfig]);
    }

    export function useOnSnapshot(
        emit: ReturnType<typeof useWebViewMessage>["emit"]
    ): Services.Firebase.Firestore.Interfaces.OnSnapshot<Models.SignupLocations> {
        const dispatch: ReturnType<typeof Store.Hooks.useDispatch> = Store.Hooks.useDispatch();

        return React.useCallback<Services.Firebase.Firestore.Interfaces.OnSnapshot<Models.SignupLocations>>(
            (snapshot: FirebaseFirestoreTypes.QuerySnapshot<Models.SignupLocations>): void => {
                const places: _Interfaces.Marker[] = [];

                if (snapshot.docs.length > 0) {
                    snapshot.docs.forEach(
                        (doc: FirebaseFirestoreTypes.QueryDocumentSnapshot<Models.SignupLocations>): void => {
                            const data: Models.SignupLocations = doc.data();

                            places.push({
                                lat: String(Number(data.latitude).toFixed(2)),
                                lng: String(Number(data.longitude).toFixed(2)),
                                size: "0.35",
                            });
                        }
                    );
                }

                const uniqPlaces = places.reduce((accumValue: _Interfaces.Marker[], currentValue) => {
                    if (accumValue.some(marker => marker.lat === currentValue.lat && marker.lng === currentValue.lng)) {
                        return accumValue;
                    }
                    return [...accumValue, currentValue];
                }, []);

                emit({ type: "points", data: uniqPlaces });
            },
            [dispatch, emit]
        );
    }

    export function usePressHandlers(setExpanded: Interfaces.React.UseState<boolean>[1]): _Interfaces.UsePressHandlers {
        const handleArrowPress = React.useCallback((): void => {
            Helpers.Animation.animate();
            setExpanded((value: boolean): boolean => !value);
        }, [setExpanded]);

        return {
            handleArrowPress,
        };
    }

    export function useWebviewLoaded(): _Interfaces.UseWebviewLoaded {
        const [isWebviewLoaded, setIsWebviewLoaded]: Interfaces.React.UseState<boolean> =
            React.useState<boolean>(false);

        const handleWebviewLoaded: Interfaces.Dummies.VoidFunc =
            React.useCallback<Interfaces.Dummies.VoidFunc>((): void => {
                setIsWebviewLoaded(true);
            }, [setIsWebviewLoaded]);

        return {
            isWebviewLoaded,
            handleWebviewLoaded,
        };
    }

    export function useReloadWebView(
        webViewRef: React.RefObject<RNWebView.default>
    ): Interfaces.Dummies.VoidFunc {
        return React.useCallback((): void => {
            webViewRef.current?.reload();
        }, []);
    }
}
