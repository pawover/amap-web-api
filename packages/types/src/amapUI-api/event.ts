declare global {
  namespace AMapUI {
    type PointEventType = "pointClick" | "pointMouseover" | "pointMouseout";
    type PathEventType = PointEventType | "pathClick" | "pathMouseover" | "pathMouseout";
    type PathNavigatorEventType = "start" | "pause" | "move" | "stop";
  }

}

export {};
