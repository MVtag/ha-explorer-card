import type { ExplorerRoom, NormalizedPoint, NormalizedPosition } from "../models/config";

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function normalizeRoomKey(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase()
    .replace(/[\s_-]+/g, " ");
}

function pointInPolygon(point: NormalizedPoint, polygon: NormalizedPoint[]): boolean {
  if (polygon.length < 3) return false;
  let inside = false;
  const [x, y] = point;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const [xi, yi] = polygon[i];
    const [xj, yj] = polygon[j];
    const intersects =
      yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi || Number.EPSILON) + xi;
    if (intersects) inside = !inside;
  }

  return inside;
}

function averagePoint(points: NormalizedPoint[]): NormalizedPoint {
  if (!points.length) return [0.5, 0.5];
  const [x, y] = points.reduce(
    ([sumX, sumY], [pointX, pointY]) => [sumX + pointX, sumY + pointY],
    [0, 0],
  );
  return [x / points.length, y / points.length];
}

function polygonCentroid(points: NormalizedPoint[]): NormalizedPoint | undefined {
  if (points.length < 3) return undefined;

  let twiceArea = 0;
  let x = 0;
  let y = 0;

  for (let i = 0; i < points.length; i += 1) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[(i + 1) % points.length];
    const cross = x1 * y2 - x2 * y1;
    twiceArea += cross;
    x += (x1 + x2) * cross;
    y += (y1 + y2) * cross;
  }

  if (Math.abs(twiceArea) < Number.EPSILON) return undefined;
  return [x / (3 * twiceArea), y / (3 * twiceArea)];
}

function boundedPosition(position: NormalizedPosition): NormalizedPosition {
  return { x: clamp01(position.x), y: clamp01(position.y) };
}

export function roomReferences(room: ExplorerRoom): string[] {
  return [room.id, room.area_id, room.name, ...(room.aliases ?? [])]
    .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
    .map(normalizeRoomKey);
}

export function findRoomByReference(
  rooms: ExplorerRoom[],
  value?: string,
): ExplorerRoom | undefined {
  if (!value?.trim()) return undefined;
  const key = normalizeRoomKey(value);
  return rooms.find((room) => roomReferences(room).includes(key));
}

export function getRoomPresenceAnchor(room: ExplorerRoom): NormalizedPosition {
  if (room.presence_anchor) return boundedPosition(room.presence_anchor);
  if (room.label) return boundedPosition(room.label);

  const centroid = polygonCentroid(room.points);
  if (centroid && pointInPolygon(centroid, room.points)) {
    return boundedPosition({ x: centroid[0], y: centroid[1] });
  }

  const average = averagePoint(room.points);
  if (pointInPolygon(average, room.points)) {
    return boundedPosition({ x: average[0], y: average[1] });
  }

  if (room.points.length) {
    const xs = room.points.map(([x]) => x);
    const ys = room.points.map(([, y]) => y);
    const center: NormalizedPoint = [
      (Math.min(...xs) + Math.max(...xs)) / 2,
      (Math.min(...ys) + Math.max(...ys)) / 2,
    ];
    if (pointInPolygon(center, room.points)) {
      return boundedPosition({ x: center[0], y: center[1] });
    }

    return boundedPosition({ x: room.points[0][0], y: room.points[0][1] });
  }

  return { x: 0.5, y: 0.5 };
}
