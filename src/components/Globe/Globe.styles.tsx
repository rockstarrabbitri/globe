import * as React from "react";

import { _Interfaces } from "./Globe.interfaces";

export namespace _Styles {
    export function useStyles(): _Interfaces.Styles {
        const theme: ReturnType<typeof Hooks.Theme.useTheme> = Hooks.Theme.useTheme();

        return React.useMemo<_Interfaces.Styles>(
            (): _Interfaces.Styles =>
                ReactNative.StyleSheet.create<_Interfaces.Styles>({
                    container: {
                        position: "absolute",
                    },
                    containerExpanded: {
                        marginTop: 0,
                    },
                    containerHidden: {
                        marginTop: -theme.spacing(120),
                    },
                    globeContainer: {
                        height: theme.spacing(100),
                        backgroundColor: theme.colors.dark,
                    },
                    loaderContainer: {
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        height: 24,
                    },
                    globeLoader: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginLeft: -12,
                    },
                    icon: {
                        marginTop: -theme.spacing(8),
                    },
                    headerContainer: {
                        marginTop: -theme.spacing(80),
                        zIndex: 1,
                    },
                    triangle: {
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderBottomWidth: 0,
                        borderRightWidth: theme.platform.width / 2,
                        borderTopWidth: 40,
                        borderLeftWidth: theme.platform.width / 2,

                        borderBottomColor: "transparent",
                        borderLeftColor: "transparent",
                        borderRightColor: "transparent",
                        borderTopColor: theme.colors.dark,
                        zIndex: 1,

                        alignItems: "center",
                        justifyContent: "center",
                    },
                    triangleBorder: {
                        position: "absolute",
                        bottom: -5,
                        width: 0,
                        height: 0,
                        backgroundColor: "transparent",
                        borderStyle: "solid",
                        borderBottomWidth: 0,
                        borderRightWidth: 210,
                        borderTopWidth: 48,
                        borderLeftWidth: 180,
                        borderBottomColor: "transparent",
                        borderRightColor: "transparent",
                        borderTopColor: "white",
                        borderLeftColor: "transparent",
                    },
                    triangleBorderSecond: {
                        position: "absolute",
                        backgroundColor: "white",
                        width: "100%",
                        height: 5,
                    },
                    webView: {
                        backgroundColor: "transparent",
                    },
                    title: {
                        color: theme.colors.bright,
                        textAlign: "center",
                        marginTop: 40,
                        fontWeight: "500",
                        fontSize: 14,
                        fontFamily: "Avenir",
                    },
                    numberOfMembers: {
                        color: theme.colors.secondary,
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "800",
                    },
                    overlay: {
                        position: "absolute",
                        backgroundColor: theme.colors.primary,
                        opacity: 0.7,
                        height: 1000,
                        width: "100%",
                    },
                    countdownTitle: {
                        color: "#FFFFFF",
                        textAlign: "center",
                        marginTop: 60,
                        fontWeight: "500",
                        fontSize: 14,
                        fontFamily: "Avenir",
                    },
                    countdownText: {
                        color: "#F05D07",
                        textAlign: "center",
                        fontSize: 20,
                        fontWeight: "800",
                        marginBottom: 20,
                        fontFamily: "Avenir",
                    },
                    numberOfUsersContainer: {
                        position: "absolute",
                        top: 0,
                        alignSelf: "center",
                    },
                }),
            [theme]
        );
    }
}
