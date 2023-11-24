declare namespace AMap {
  namespace View2D {}

  /** @deprecated AMap Web API 2.x 中已废弃 */
  class View2D {
    public static Tu: {
      "AMap.DistrictLayer": ["MVT"];
      "AMap.GltfLoader": ["AMap.CustomLayer", "Map3D"];
      "AMap.Heatmap": ["AMap.CustomLayer"];
      "AMap.IndoorMap": ["AMap.CustomLayer", "cvector"];
      "AMap.IndoorMap3D": ["Map3D"];
      "AMap.LabelsLayer": ["rbush", "promise"];
      "AMap.MarkerList": ["AMap.TplUtils"];
      Map3D: ["vectorlayer", "wgl", "AMap.CustomLayer", "rbush"];
      overlay: ["style"];
      vectorForeign: ["gridmap", "MVT"];
    };

    /** 扩展另一个 Bounds 对象，将坐标最大值应用于返回的新 Bounds */
    public static extend(bounds: BoundsLike): Bounds;
    /** 扩展另一个 Bounds 对象，将坐标最大值应用于 Bounds */
    public static include(bounds: BoundsLike): void;
  }
}
