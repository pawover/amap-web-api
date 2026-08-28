import { APILoader } from "amap-web-react";
import { Map, Marker } from "amap-web-react/amap";

const CENTER: [number, number] = [116.397428, 39.90923];

export function App () {
  const aKey = import.meta.env.VITE_AMAP_AKEY ?? "";
  const sKey = import.meta.env.VITE_AMAP_SKEY ?? "";

  if (!aKey) {
    return (
      <div style={{ padding: 16 }}>
        请在
        <code>playground/.env</code>
        中配置
        <code>VITE_AMAP_KEY=你的高德Key</code>
        后重新运行。
      </div>
    );
  }

  return (
    <APILoader
      aKey={aKey}
      sKey={sKey}
    >
      <Map
        center={CENTER}
        zoom={11}
        style={{ width: "100%", height: "100%" }}
      >
        <Marker
          title="北京"
          position={CENTER}
        />
      </Map>
    </APILoader>
  );
}
