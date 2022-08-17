import React, { useRef, useState, useCallback } from "react";
import { emit, webViewRender, useNativeMessage } from "react-native-react-bridge/lib/web";
import Globe from "react-globe.gl";

import { countries } from "./countries";
/* @ts-ignore */
function App() {
    const [places, setPlaces] = useState([]);
    const [arcs, setArcs] = useState();
    const globeEl = useRef();

    // useNativeMessage hook receives message from React Native
    useNativeMessage((message) => {
        setPlaces(message.data);
    });

    React.useEffect(() => {
        // Auto-rotate
        globeEl.current.controls().autoRotate = true;
        globeEl.current.controls().autoRotateSpeed = 3;
        globeEl.current.controls().enableZoom = false;

        emit({ type: "loaded" });
    }, []);
    const style = { display: "flex", alignItems: "center", justifyContent: "center" };
    return (
        <div style={style}>
            <Globe
                ref={globeEl}
                animateIn
                backgroundColor={"black"}
                arcsData={arcs}
                arcStartLat={(d) => +d.startlat}
                arcStartLng={(d) => +d.startlng}
                arcEndLat={(d) => +d.endlat}
                arcEndLng={(d) => +d.endlng}
                arcDashLength={0.25}
                arcDashGap={1}
                arcLabel={(d) => +d.label}
                arcDashInitialGap={() => Math.random()}
                arcDashAnimateTime={4000}
                arcColor={() => "#9cff00"}
                arcsTransitionDuration={0}
                pointsData={places.slice(0, 20000)}
                pointColor={() => "white"}
                pointAltitude={0.01}
                pointLabel={"city"}
                pointRadius="size"
                hexPolygonsData={countries.features}
                hexPolygonResolutio={3}
                hexPolygonMargin={0.7}
                showAtmosphere
                hexPolygonColor={() => "#F05D07"}
                atmosphereColor={"#f5b38c"}
                height={360}
                width={360}
            />
        </div>
    );
}

export default webViewRender(<App />);
