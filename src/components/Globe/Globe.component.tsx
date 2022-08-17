import * as React from "react";
import { useWebViewMessage } from "react-native-react-bridge";

/* @ts-ignore */
import webApp from "../../../../../../globe";

import { _Controller } from "./Globe.controller";
import { _Lifecycle } from "./Globe.lifecycle";
import { _Styles } from "./Globe.styles";

function _Base(): JSX.Element | null {
    const isVideoPlaying: ReturnType<typeof Store.Reducers.UI.Selectors.isVideoPlayingSelector> =
        Store.Hooks.useSelector(Store.Reducers.UI.Selectors.isVideoPlayingSelector);

    const styles: ReturnType<typeof _Styles.useStyles> = _Styles.useStyles();

    const theme: ReturnType<typeof Hooks.Theme.useTheme> = Hooks.Theme.useTheme();

    const [expanded, setExpanded]: Interfaces.React.UseState<boolean> = React.useState<boolean>(false);
    const [hidden, setHidden]: Interfaces.React.UseState<boolean> = React.useState<boolean>(false);

    const { countdown, createCountDown }: ReturnType<typeof _Controller.useCountDown> = _Controller.useCountDown();
    const { handleArrowPress }: ReturnType<typeof _Controller.usePressHandlers> =
        _Controller.usePressHandlers(setExpanded);
    const { isWebviewLoaded, handleWebviewLoaded }: ReturnType<typeof _Controller.useWebviewLoaded> =
        _Controller.useWebviewLoaded();

    const { data } = Api.Analytics.Hooks.useUserCountQuery();

    const { ref, onMessage, emit }: ReturnType<typeof useWebViewMessage> = useWebViewMessage(handleWebviewLoaded);

    const useReloadWebView: ReturnType<typeof _Controller.useReloadWebView> =
        _Controller.useReloadWebView(ref);

    _Lifecycle.useDidMount({ createCountDown });
    _Lifecycle.useWatchVideoState({ isVideoPlaying, setHidden });
    _Lifecycle.useWatchWebviewStatus({ isWebviewLoaded, emit });

    return (
        <ReactNative.View style={styles.container}>
            <ReactNative.View
                style={[
                    styles.headerContainer,
                    expanded && styles.containerExpanded,
                    hidden && styles.containerHidden,
                ]}>
                <ReactNative.View style={styles.globeContainer}>
                    <ReactNative.Text style={styles.title}>Total number of members</ReactNative.Text>
                    <ReactNative.Text style={styles.numberOfMembers}>
                        {Helpers.Number.numberToCommaSeperatedThousand(data?.count)}
                    </ReactNative.Text>
                    <RNWebView.WebView
                        ref={ref}
                        source={{ html: webApp }}
                        onMessage={onMessage}
                        style={styles.webView}
                        onContentProcessDidTerminate={useReloadWebView}
                    />
                    {!isWebviewLoaded && <Components.Common.Loader.Component style={styles.globeLoader} />}

                    <ReactNative.Text style={styles.title}>Countdown to phase 2</ReactNative.Text>

                    {countdown ? (
                        <ReactNative.Text style={styles.numberOfMembers}>{countdown}</ReactNative.Text>
                    ) : (
                        <ReactNative.View style={styles.loaderContainer}>
                            <Components.Common.Loader.Component />
                        </ReactNative.View>
                    )}
                </ReactNative.View>
                <ReactNative.Pressable style={styles.triangle} onPress={handleArrowPress}>
                    {expanded ? (
                        <Assets.Icons.XPopupRemove
                            width={theme.spacing(6)}
                            height={theme.spacing(6)}
                            style={styles.icon}
                        />
                    ) : (
                        <Assets.Icons.Arrow width={theme.spacing(6)} height={theme.spacing(6)} style={styles.icon} />
                    )}
                </ReactNative.Pressable>
            </ReactNative.View>

            {expanded && <ReactNative.Pressable onPress={handleArrowPress} style={styles.overlay} />}
        </ReactNative.View>
    );
}

export const _Component: Interfaces.Components.DefaultMemoComponent = React.memo(_Base);
