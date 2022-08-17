import * as React from "react";
import { useWebViewMessage } from "react-native-react-bridge";

export namespace _Interfaces {
    export interface UseCountDown {
        countdown: string;
        createCountDown: (date: Date) => void;
    }

    export interface UseDidMountArgs {
        createCountDown: UseCountDown["createCountDown"];
    }

    export interface UseWatchWebviewStatus {
        isWebviewLoaded: boolean;
        emit: ReturnType<typeof useWebViewMessage>["emit"];
    }

    export interface UseWatchVideoState {
        isVideoPlaying: boolean;
        setHidden: Interfaces.React.UseState<boolean>[1];
    }

    export interface UsePressHandlers {
        handleArrowPress: Interfaces.Dummies.VoidFunc;
    }

    export interface UseWebviewLoaded {
        isWebviewLoaded: boolean;
        handleWebviewLoaded: Interfaces.Dummies.VoidFunc;
    }

    export interface Styles {
        container: ReactNative.ViewStyle;
        containerExpanded: ReactNative.ViewStyle;
        containerHidden: ReactNative.ViewStyle;
        globeContainer: ReactNative.ViewStyle;
        globeLoader: ReactNative.ViewStyle;
        headerContainer: ReactNative.ViewStyle;
        loaderContainer: ReactNative.ViewStyle;
        triangle: ReactNative.ViewStyle;
        triangleBorder: ReactNative.ViewStyle;
        triangleBorderSecond: ReactNative.ViewStyle;
        webView: ReactNative.ViewStyle;
        title: ReactNative.TextStyle;
        numberOfMembers: ReactNative.TextStyle;
        icon: ReactNative.ViewStyle;
        countdownTitle: ReactNative.TextStyle;
        countdownText: ReactNative.TextStyle;
        numberOfUsersContainer: ReactNative.ViewStyle;
        overlay: ReactNative.ViewStyle;
    }

    export interface Marker {
        lat: string;
        lng: string;
        size: string;
    }
}
