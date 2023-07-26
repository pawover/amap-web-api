declare namespace AMap {
  namespace GeometryUtil {
    /**
     * 计算 `点P1` 和 `点P2` 间的实际距离
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @returns {number} 实际距离，单位：米
     */
    function distance(p1: LngLatLike, p2: LngLatLike): number;
    /**
     * 计算 `路径L` 围成区域的实际面积
     *
     * @param {LngLatLike[]} l 路径L
     * @returns {number} 实际面积，单位：平方米
     */
    function ringArea(l: LngLatLike[]): number;
    /**
     * 计算一个带有绝对海拔的经纬度高度路径围成区域的实际面积
     *
     * @param {number} altitude 海拔高度
     * @returns {number} 区域面积，单位：平方米
     */
    function ringAreaByAltitude(altitude: number): number;
    /**
     * 判断 `路径L` 是否为顺时针
     *
     * @param {LngLatLike[]} l 路径L
     * @returns {boolean} 是否为顺时针
     */
    function isClockwise(l: LngLatLike[]): boolean;
    /**
     * 计算 `路径L` 的实际长度
     *
     * @param {LngLatLike[]} l 路径L
     * @returns {number} 实际长度，单位：米
     */
    function distanceOfLine(l: LngLatLike[]): number;
    /**
     * 计算 `区域R1` 和 `区域R2` 的交叉区域
     * - 只适用于凸多边形
     *
     * @param {LngLatLike[]} r1 区域R1
     * @param {LngLatLike[]} r2 区域R2
     * @returns {[number, number][]} 交叉区域
     */
    function ringRingClip(r1: LngLatLike[], r2: LngLatLike[]): [number, number][];
    /**
     * 判断 `区域R1` 和 `区域R2` 是否交叉
     *
     * @param {LngLatLike[]} r1 区域R1
     * @param {LngLatLike[]} r2 区域R2
     * @returns {boolean} 是否交叉
     */
    function doesRingRingIntersect(r1: LngLatLike[], r2: LngLatLike[]): boolean;
    /**
     * 判断 `路径L` 和 `区域R` 是否交叉
     *
     * @param {LngLatLike[]} l 路径L
     * @param {LngLatLike[]} r 区域R
     * @returns {boolean} 是否交叉
     */
    function doesLineRingIntersect(l: LngLatLike[], r: LngLatLike[]): boolean;
    /**
     * 判断 `路径P1` 和 `路径P2` 是否相交
     *
     * @param {LngLatLike[]} path1 路径P1
     * @param {LngLatLike[]} path2 路径P2
     * @returns {boolean} 是否相交
     */
    function doesLineLineIntersect(path1: LngLatLike[], path2: LngLatLike[]): boolean;
    /**
     * 判断由 `点P1` 和 `点P2` 组成的线段和 `区域R` 是否相交
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike[]} r 区域R
     * @returns {boolean} 是否相交
     */
    function doesSegmentRingIntersect(p1: LngLatLike, p2: LngLatLike, r: LngLatLike[]): boolean;
    /**
     * 判断由 `点P1` 和 `点P2` 组成的线段和 `组合区域RS` 是否相交
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike[][]} rs 组合区域RS
     * @returns {boolean} 是否相交
     */
    function doesSegmentPolygonIntersect(p1: LngLatLike, p2: LngLatLike, rs: LngLatLike[][]): boolean;
    /**
     * 判断由 `点P1` 和 `点P2` 组成的线段和 `路径L` 是否相交
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike[]} l 路径L
     * @returns {boolean} 是否相交
     */
    function doesSegmentLineIntersect(p1: LngLatLike, p2: LngLatLike, l: LngLatLike[]): boolean;
    /**
     * 判断由两点组成的线段和另一个由两点组成的线段是否相交
     *
     * @param {LngLatLike} p1A 线段1点1
     * @param {LngLatLike} p1B 线段1点2
     * @param {LngLatLike} p2A 线段2点1
     * @param {LngLatLike} p2B 线段2点2
     * @returns {boolean} 是否相交
     */
    function doesSegmentsIntersect(p1A: LngLatLike, p1B: LngLatLike, p2A: LngLatLike, p2B: LngLatLike): boolean;
    /**
     * 判断 `区域R1` 是否在 `区域R2` 内
     *
     * @param {LngLatLike[]} r1 区域R1
     * @param {LngLatLike[]} r2 区域R2
     * @returns {boolean} 是否在内
     */
    function isRingInRing(r1: LngLatLike[], r2: LngLatLike[]): boolean;
    /**
     * 判断 `点P` 是否在 `区域R` 内
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} r 区域R
     * @returns {boolean} 是否在内
     */
    function isPointInRing(p: LngLatLike, r: LngLatLike[]): boolean;
    /**
     * 判断 `点P` 是否在 `组合区域RS` 内
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[][]} rs 组合区域RS
     * @returns {boolean} 是否在内
     */
    function isPointInPolygon(p: LngLatLike, rs: LngLatLike[][]): boolean;
    /**
     * 将 `路径L` 变为顺时针
     *
     * @param {LngLatLike[]} l 路径L
     * @returns {LngLatLike[]} 路径
     */
    function makesureClockwise(l: LngLatLike[]): LngLatLike[];
    /**
     * 将 `路径L` 变为逆时针
     *
     * @param {LngLatLike[]} l 路径L
     * @returns {LngLatLike[]} 路径
     */
    function makesureAntiClockwise(l: LngLatLike[]): LngLatLike[];
    /**
     * 计算 由 `点P2` 和 `点P3` 组成的线段上距离 `点P1` 最近的点
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike} p3 点P3
     * @returns {LngLatLike} 最近的点
     */
    function closestOnSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike): LngLatLike;
    /**
     * 计算 `路径L` 上距离 `点P` 最近的点
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} l 路径L
     * @returns {LngLatLike} 最近的点
     */
    function closestOnLine(p: LngLatLike, l: LngLatLike[]): LngLatLike;
    /**
     * 计算 由 `点P2` 和 `点P3` 组成的线段到 `点P1` 的实际距离
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike} p3 点P3
     * @returns {number} 实际距离，单位：米
     */
    function distanceToSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike): number;
    /**
     * 计算 `点P` 到 `路径L` 的实际距离
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} l 路径L
     * @returns {number} 实际距离，单位：米
     */
    function distanceToLine(p: LngLatLike, l: LngLatLike[]): number;
    /**
     * 判断 `点P1` 是否在由 `点P2` 和 `点P3` 组成的线段上
     *
     * @param {LngLatLike} p1 点P1
     * @param {LngLatLike} p2 点P2
     * @param {LngLatLike} p3 点P3
     * @param {?number} [tolerance] 误差范围
     * @returns {boolean} 是否在内
     */
    function isPointOnSegment(p1: LngLatLike, p2: LngLatLike, p3: LngLatLike, tolerance?: number): boolean;
    /**
     * 判断 `点P` 是否在 `路径L` 上
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} l 路径L
     * @param {?number} [tolerance] 误差范围
     * @returns {boolean} 是否在内
     */
    function isPointOnLine(p: LngLatLike, l: LngLatLike[], tolerance?: number): boolean;
    /**
     * 判断 `点P` 是否在 `区域R` 的边上
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} r 区域R
     * @param {?number} [tolerance] 误差范围
     * @returns {boolean} 是否在边上
     */
    function isPointOnRing(p: LngLatLike, r: LngLatLike[], tolerance?: number): boolean;
    /**
     * 判断 `点P` 是否在 `组合区域RS` 的边上
     *
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[][]} rs 组合区域RS
     * @param {?number} [tolerance] 误差范围
     * @returns {boolean} 是否在边上
     */
    function isPointOnPolygon(p: LngLatLike, rs: LngLatLike[][], tolerance?: number): boolean;
    /**
     * 判断 `组合区域RS1` 和另一个 `组合区域RS2` 是否相交
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @param {LngLatLike[]} rs1 组合区域RS1
     * @param {LngLatLike[]} rs2 组合区域RS2
     * @returns {boolean} 是否相交
     */
    function doesPolygonPolygonIntersect(rs1: LngLatLike[], rs2: LngLatLike[]): boolean;
    /**
     * 计算 `点P` 到 `区域R` 的实际距离
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @param {LngLatLike} p 点P
     * @param {LngLatLike[]} r 区域R
     * @returns {number} 实际距离，单位：米
     */
    function distanceToPolygon(p: LngLatLike, r: LngLatLike[]): number;
    /**
     *
     *
     * @deprecated AMap Web API 2.x 中已废弃
     * @param {(LngLatLike[] | PixelLike[])} shape1
     * @param {(LngLatLike[] | PixelLike[])} shape2
     * @returns {number[]}
     */
    function triangulateShape(shape1: LngLatLike[] | PixelLike[], shape2: LngLatLike[] | PixelLike[]): number[];
  }
}
