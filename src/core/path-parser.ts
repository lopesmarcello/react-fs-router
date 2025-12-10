// Converts file paths to route paths following Next.JS conventions

export class PathParser {
  static fileToRoute(filePath: string): string {
    let route = filePath
      // Remove pages prefix
      .replace(/^\/src\/pages\//, "")
      // Remove file extension
      .replace(/\.(tsx?|jsx?)$/, "")
      // Convert index to root
      .replace(/\/index$/, "")
      .replace(/^index$/, "")
      // Convert [param] to :param
      .replace(/\[\[\.\.\.([^\]]+)\]\]/g, "*?") // [[...slug]] -> *? (optional catch-all)
      .replace(/\[\.\.\.([^\]]+)\]/g, "*") // [...slug] -> *
      .replace(/\[([^\]]+)\]/g, ":$1") // [id] -> :id
      // Remove route groups (auth) -> auth becomes nothing
      .replace(/\(([^)]+)\)\/?/g, "");

    // Ensure leading slash
    if (!route.startsWith("/")) {
      route = "/" + route;
    }

    // Handle root
    if (route === "/" || route === "") {
      return "/";
    }

    // Clean multiple slashes
    route = route.replace(/\/+/g, "/");

    return route;
  }

  static sortRoutes(routes: Array<{ path: string; [key: string]: any }>) {
    return routes.sort((a, b) => {
      const aSegments = a.path.split("/").filter(Boolean);
      const bSegments = b.path.split("/").filter(Boolean);

      for (let i = 0; i < Math.max(aSegments.length, bSegments.length); i++) {
        const aSegment = aSegments[i] || "";
        const bSegment = bSegments[i] || "";

        // Static vs dynamic
        const aIsDynamic = aSegment.startsWith(":") || aSegment === "*";
        const bIsDynamic = bSegment.startsWith(":") || bSegment === "*";

        if (!aIsDynamic && bIsDynamic) return -1;
        if (aIsDynamic && !bIsDynamic) return 1;

        // Catch-all vs Dynamic
        if (aSegment === "*" && bSegment.startsWith(":")) return 1;
        if (bSegment === "*" && aSegment.startsWith(":")) return -1;
      }

      // Longer paths first
      return bSegments.length - aSegments.length;
    });
  }
}
