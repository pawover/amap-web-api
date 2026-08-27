declare global {
  namespace Loca {
    type LightType = AmbientLight | DirectionalLight | PointLight;
    type LayerType = LabelsLayer | LineLayer | LinkLayer | PointLayer | PolygonLayer | PrismLayer | ZMarkerLayer;
  }

}

export {};
