import * as React from "react";

import { _Interfaces } from "./Globe.interfaces";
import { _Controller } from "./Globe.controller";
import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export namespace _Lifecycle {
    export function useDidMount({ createCountDown }: _Interfaces.UseDidMountArgs): void {
        const fetchRemoteConfig: ReturnType<typeof _Controller.useFetchRemoteConfig> =
            _Controller.useFetchRemoteConfig(createCountDown);

        React.useEffect((): void => {
            fetchRemoteConfig();
        }, [fetchRemoteConfig]);
    }

    export function useWatchVideoState({ isVideoPlaying, setHidden }: _Interfaces.UseWatchVideoState): void {
        const [initial, setInitial]: Interfaces.React.UseState<boolean> = React.useState<boolean>(true);

        React.useEffect((): void => {
            if (initial) {
                setInitial(false);
                return;
            }

            Helpers.Animation.animate();
            setHidden(isVideoPlaying);
        }, [isVideoPlaying]);
    }

    export function useWatchWebviewStatus({ isWebviewLoaded, emit }: _Interfaces.UseWatchWebviewStatus): void {
        const dispatch: ReturnType<typeof Store.Hooks.useDispatch> = Store.Hooks.useDispatch();
        const onSnapshot: ReturnType<typeof _Controller.useOnSnapshot> = _Controller.useOnSnapshot(emit);
        const firestore = React.useRef<Services.Firebase.Firestore.Core>(new Services.Firebase.Firestore.Core());

        const getWebViewData = React.useCallback(async () => {
            const locations: FirebaseFirestoreTypes.QuerySnapshot<Models.SignupLocations> = await firestore.current.request<Models.SignupLocations>(
                Services.Firebase.Firestore.Enums.Collections.SignupLocations,
                50,
            )
            onSnapshot(locations);
            firestore.current.subscribe<Models.SignupLocations>(
                Services.Firebase.Firestore.Enums.Collections.SignupLocations,
                onSnapshot,
            );
        }, [dispatch, onSnapshot, isWebviewLoaded])

        React.useEffect((): Interfaces.Dummies.VoidFunc | void => {
            if (!isWebviewLoaded) {
                return;
            }

            getWebViewData();

            return function cleanup(): void {
                firestore.current.unsubscribe();
            };

        }, [getWebViewData]);
    }
}
