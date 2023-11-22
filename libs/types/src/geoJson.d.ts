declare namespace GeoJSON {
  /**
   * GeometryTypes
   *
   * The valid values for the 'type' property of GeoJSON geometry objects.
   * https://tools.ietf.org/html/rfc7946#section-1.4
   */
  type GeometryTypes = Geometry["type"];

  /**
   * Types
   *
   * The value values for the 'type' property of GeoJSON Objects.
   * https://tools.ietf.org/html/rfc7946#section-1.4
   */
  type Types = GeoJSON["type"];

  /**
   * Bounding box
   *
   * A GeoJSON object MAY have a member named 'bbox' to include information on the coordinate range for its Geometries, Features, or FeatureCollections.
   * The value of the bbox member MUST be an array of length 2*n where n is the number of dimensions represented in the contained geometries,
   * with all axes of the most southwesterly point followed by all axes of the more northeasterly point.
   * The axes order of a bbox follows the axes order of geometries.
   * https://tools.ietf.org/html/rfc7946#section-5
   */
  type BBox2d = [number, number, number, number];
  type BBox3d = [number, number, number, number, number, number];
  type BBox = BBox2d | BBox3d;

  /**
   * Id
   *
   * If a Feature has a commonly used identifier, that identifier SHOULD be included as a member of
   * the Feature object with the name 'id', and the value of this member is either a JSON string or number.
   * https://tools.ietf.org/html/rfc7946#section-3.2
   */
  type Id = string | number;

  /**
   * Position
   *
   * Array should contain between two and three elements.
   * The previous GeoJSON specification allowed more elements (e.g., which could be used to represent M values),
   * but the current specification only allows X, Y, and (optionally) Z to be defined.
   * https://tools.ietf.org/html/rfc7946#section-3.1.1
   */
  type Position = [number, number] | [number, number, number];

  /**
   * Properties
   *
   * A Feature object has a member with the name 'properties'.
   * The value of the properties member is an object (any JSON object or a JSON null value).
   * https://tools.ietf.org/html/rfc7946#section-3.2
   */
  type Properties = { [name: string]: unknown } | null;

  /**
   * GeoJSON Object
   *
   * The GeoJSON specification also allows [foreign members](https://tools.ietf.org/html/rfc7946#section-6.1)
   * Developers should use '&' type in TypeScript or extend the interface to add these foreign members.
   * https://tools.ietf.org/html/rfc7946#section-3
   */
  interface GeoJSONObject {
    // Don't include foreign members directly into this type def.
    // in order to preserve type safety.
    // [key: string]: any;
    /**
     * Specifies the type of GeoJSON object.
     */
    type: Types;
    /**
     * Bounding box of the coordinate range of the object's Geometries, Features, or Feature Collections.
     * The value of the bbox member is an array of length 2*n where n is the number of dimensions
     * represented in the contained geometries, with all axes of the most southwesterly point
     * followed by all axes of the more northeasterly point.
     * The axes order of a bbox follows the axes order of geometries.
     * https://tools.ietf.org/html/rfc7946#section-5
     */
    bbox?: BBox | undefined;
  }

  /**
   * Geometry
   *
   * https://tools.ietf.org/html/rfc7946#section-3
   */
  type Geometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon | GeometryCollection;

  /**
   * Point Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.2
   */
  interface Point extends GeoJSONObject {
    type: "Point";
    coordinates: Position;
  }

  /**
   * MultiPoint Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.3
   */
  interface MultiPoint extends GeoJSONObject {
    type: "MultiPoint";
    coordinates: Position[];
  }

  /**
   * LineString Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.4
   */
  interface LineString extends GeoJSONObject {
    type: "LineString";
    coordinates: Position[];
  }

  /**
   * MultiLineString Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.5
   */
  interface MultiLineString extends GeoJSONObject {
    type: "MultiLineString";
    coordinates: Position[][];
  }

  /**
   * Polygon Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.6
   */
  interface Polygon extends GeoJSONObject {
    type: "Polygon";
    coordinates: Position[][];
  }

  /**
   * MultiPolygon Geometry Object
   *
   * https://tools.ietf.org/html/rfc7946#section-3.1.7
   */
  interface MultiPolygon extends GeoJSONObject {
    type: "MultiPolygon";
    coordinates: Position[][][];
  }

  /**
   * GeometryCollection
   *
   * A GeoJSON object with type 'GeometryCollection' is a Geometry object.
   * A GeometryCollection has a member with the name 'geometries'.
   * The value of 'geometries' is an array.  Each element of this array is a GeoJSON Geometry object.
   * It is possible for this array to be empty.
   * https://tools.ietf.org/html/rfc7946#section-3.1.8
   */
  interface GeometryCollection<G extends Geometry = Geometry> extends GeoJSONObject {
    type: "GeometryCollection";
    geometries: G[];
  }

  /**
   * Feature
   *
   * A Feature object represents a spatially bounded thing.
   * Every Feature object is a GeoJSON object no matter where it occurs in a GeoJSON text.
   * https://tools.ietf.org/html/rfc7946#section-3.2
   */
  interface Feature<G extends Geometry | null = Geometry, P = Properties> extends GeoJSONObject {
    type: "Feature";
    /**
     * The feature's geometry
     */
    geometry: G;
    /**
     * A value that uniquely identifies this feature in a
     * https://tools.ietf.org/html/rfc7946#section-3.2.
     */
    id?: Id | undefined;
    /**
     * Properties associated with this feature.
     */
    properties: P;
  }

  /**
   * Feature Collection
   *
   * A GeoJSON object with the type 'FeatureCollection' is a FeatureCollection object.
   * A FeatureCollection object has a member with the name 'features'.
   * The value of 'features' is a JSON array. Each element of the array is a Feature object as defined above.
   * It is possible for this array to be empty.
   * https://tools.ietf.org/html/rfc7946#section-3.3
   */
  interface FeatureCollection<G extends Geometry | null = Geometry, P = Properties> extends GeoJSONObject {
    type: "FeatureCollection";
    features: Feature<G, P>[];
  }
}

/**
 * GeoJSON (RFC 7946) 的类型定义
 */
declare type GeoJSON = GeoJSON.Geometry | GeoJSON.Feature | GeoJSON.FeatureCollection;
